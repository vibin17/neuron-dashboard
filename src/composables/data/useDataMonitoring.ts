import { ref, Ref, computed, onUnmounted } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { addSubscription, deleteSubscription, queryGroupList, queryTagList, queryWebDriverList } from '@/api/config'
import { GroupData } from '@/types/config'
import { getMonitoringData } from '@/api/data'
import { useI18n } from 'vue-i18n'
import { TagDataInMonitoring } from '@/types/data'
import { paginate } from '@/utils/utils'
import { useTagAttributeTypeSelect } from '../config/useAddTag'
import { PluginKind, TagAttributeType, TagType } from '@/types/enums'
import useSouthDriver from '@/composables/config/useSouthDriver'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'

export const useSubscribeForGetMonitoringData = () => {
  let defaultDashboardId: undefined | number = undefined
  const getDefaultDashboardId = async () => {
    try {
      const data = await queryWebDriverList()
      defaultDashboardId = data[0]?.id
      if (!defaultDashboardId) {
        throw new Error('Can not find default dashboard')
      }
      return Promise.resolve()
    } catch (error: any) {
      EmqxMessage.error(error.message)
      return Promise.reject()
    }
  }
  const initPromise = getDefaultDashboardId()

  const subscribe = async (nodeID: number, groupName: string) => {
    try {
      await initPromise
      await addSubscription({
        dst_node_id: defaultDashboardId as number,
        src_node_id: nodeID,
        name: groupName,
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  const unsubscribe = async (nodeID: number, groupName: string) => {
    try {
      await initPromise
      await deleteSubscription({
        dst_node_id: defaultDashboardId as number,
        src_node_id: nodeID,
        name: groupName,
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  return {
    subscribe,
    unsubscribe,
  }
}

export interface TagDataInTable extends TagDataInMonitoring {
  attribute: Array<number>
  type: number
  tagName: string
  valueToShow: string
  address: string
  error: number
}

export default () => {
  const { t } = useI18n()

  const { subscribe, unsubscribe } = useSubscribeForGetMonitoringData()

  const { southDriverList: nodeList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  let selectedGroup: undefined | { nodeID: number; groupName: string } = undefined
  const currentGroup: Ref<{ nodeID: number | string; groupName: string }> = ref({
    nodeID: '',
    groupName: '',
  })
  const currentNodeName = computed(() => {
    if (!currentGroup.value.nodeID) {
      return ''
    }
    const node = nodeList.value.find(({ id }) => id === currentGroup.value.nodeID)
    return node ? node.name : ''
  })

  const pageController = ref({
    num: 1,
    size: 100,
    total: 0,
  })
  const totalData: Ref<Array<TagDataInTable>> = ref([])
  const showValueByHexadecimal = ref(false)
  let tagMsgMap: Record<string, any> = {}
  let pollTimer: undefined | number = undefined
  const updated = ref(Date.now())
  const { tagAttrValueMap } = useTagAttributeTypeSelect()
  const { transToHexadecimal } = useWriteDataCheckNParse()
  /**
   * This variable is that when the monitoring data is obtained,
   * the request returns the error code 2014,
   * and the count starts when the subscription is re-subscribed.
   * If the re-subscription reaches 3 times,
   * the re-subscription is stopped to prevent unlimited sending of requests.
   */
  const reSubCount: { groupName: undefined | string; lastTimestamp: number; count: number } = {
    groupName: undefined,
    lastTimestamp: 0,
    count: 0,
  }

  const tableEmptyText = computed(() =>
    !currentGroup.value.nodeID || !currentGroup.value.groupName ? t('data.selectGroupTip') : t('common.emptyData'),
  )

  const tableData = computed(() => {
    return paginate(totalData.value, pageController.value.size, pageController.value.num)
  })

  const unsubscribeCurrentGroup = () => {
    if (selectedGroup) {
      return unsubscribe(selectedGroup.nodeID, selectedGroup.groupName)
    }
    return Promise.resolve()
  }

  const selectedNodeChanged = async () => {
    currentGroup.value.groupName = ''
    await unsubscribeCurrentGroup()
    selectedGroup = undefined
    const data = await queryGroupList(Number(currentGroup.value.nodeID))
    groupList.value = data
  }

  const reSubAfterReturnError = async () => {
    const { groupName, lastTimestamp, count } = reSubCount
    const { nodeID, groupName: currentGroupName } = currentGroup.value
    let canReSubAndRequest = false
    if (Date.now() - lastTimestamp < 500 && groupName === currentGroupName && count < 3) {
      canReSubAndRequest = true
    } else if (Date.now() - lastTimestamp > 500 || groupName !== currentGroupName) {
      reSubCount.count = 0
      reSubCount.groupName = currentGroupName
      canReSubAndRequest = true
    }
    if (canReSubAndRequest) {
      reSubCount.count += 1
      reSubCount.lastTimestamp = Date.now()
      await subscribe(Number(nodeID), currentGroupName)
      getTableData()
    }
  }

  const getTagDetail = async () => {
    if (!selectedGroup?.nodeID || !selectedGroup.groupName) {
      return {}
    }
    const tags = await queryTagList(selectedGroup?.nodeID, selectedGroup.groupName)
    const tagNameMap: Record<string | number, any> = {}
    tags.forEach(
      ({ id, attribute, type, name, address }) =>
        (tagNameMap[name] = {
          attribute: tagAttrValueMap[attribute as keyof typeof tagAttrValueMap],
          type,
          tagName: name,
          address,
        }),
    )
    return Promise.resolve(tagNameMap)
  }

  const getTableData = async () => {
    const { nodeID, groupName } = currentGroup.value
    if (!nodeID || !groupName || !currentNodeName.value) {
      return
    }
    try {
      const { data } = await getMonitoringData(currentNodeName.value, currentGroup.value.groupName)
      updated.value = Date.now()
      totalData.value = (data.tags || []).map((item) => {
        const ret = Object.assign(item, tagMsgMap[item.name as string])
        if (!('value' in ret) || ret.value === undefined) {
          ret.value = ''
        }
        return ret
      })
      handleShowValueByHexadecimalChanged()
      pageController.value.total = totalData.value.length
      startPoll()
    } catch (error: any) {
      if (error?.response?.data?.error === 2014) {
        reSubAfterReturnError()
      }
    }
  }

  const initPageController = () => {
    pageController.value.num = 1
    pageController.value.total = 0
  }

  const startPoll = () => {
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
    pollTimer = window.setInterval(() => {
      getTableData()
    }, 3000)
  }

  const selectedGroupChanged = async () => {
    const { nodeID, groupName } = currentGroup.value
    if (!nodeID || !groupName) {
      return
    }

    await unsubscribeCurrentGroup()
    selectedGroup = { nodeID: Number(nodeID), groupName }
    await subscribe(Number(nodeID), groupName)
    tagMsgMap = await getTagDetail()
    initPageController()
    getTableData()
  }

  const handleSizeChange = (size: number) => {
    pageController.value.size = size
    pageController.value.num = 1
  }

  const valueToShow = async (tagData: TagDataInTable) => {
    const { type, value, error } = tagData
    if (error) {
      return error
    }
    if (!showValueByHexadecimal.value) {
      if ((type === TagType.DOUBLE || type === TagType.FLOAT) && value === 0) {
        return '0.0'
      }
      return value
    }
    if (type === TagType.BYTE || type === TagType.BOOL || type === TagType.BIT || type === TagType.STRING) {
      return value
    }
    const data = await transToHexadecimal(tagData)
    return data
  }

  const handleShowValueByHexadecimalChanged = () => {
    totalData.value.forEach(async (item) => {
      item.valueToShow = await valueToShow(item)
    })
  }

  const canWrite = (item: TagDataInTable) => {
    return item.attribute && item.attribute.some((item) => item === TagAttributeType.Write)
  }

  onUnmounted(() => {
    unsubscribeCurrentGroup()
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
  })

  window.onbeforeunload = function () {
    unsubscribeCurrentGroup()
  }

  return {
    nodeList,
    groupList,
    currentGroup,
    currentNodeName,
    pageController,
    tableData,
    showValueByHexadecimal,
    updated,

    tableEmptyText,

    handleShowValueByHexadecimalChanged,
    canWrite,
    getTableData,
    selectedNodeChanged,
    selectedGroupChanged,
    handleSizeChange,
  }
}