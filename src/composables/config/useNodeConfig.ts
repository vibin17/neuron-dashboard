import { queryNodeConfig, queryPluginConfigInfo, submitNodeConfig } from '@/api/config'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import type { ParamInfo, PluginInfo } from '@/types/config'
import type { DriverDirection } from '@/types/enums'
import { TypeOfPluginParam } from '@/types/enums'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetPluginMsgIdMap } from './usePlugin'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'

interface Field {
  key: string
  info: ParamInfo
}

type Props = Readonly<{
  direction: DriverDirection
}>

export default (props: Props) => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const { initMap, getNodeMsgById } = useNodeMsgMap(props.direction, false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const configForm: Ref<Record<string, any>> = ref({})
  const defaultConfigData: Ref<Record<string, any>> = ref({})
  const configuredData: Ref<Record<string, any>> = ref({})
  const fieldList: Ref<Array<Field>> = ref([])
  const isLoading = ref(false)
  const formCom = ref()
  const isSubmitting = ref(false)

  const node = computed(() => route.params.node.toString())

  const getNodeConfig = async () => {
    try {
      const { data } = await queryNodeConfig(node.value)
      if (data && data?.params && typeof data.params === 'object') {
        configuredData.value = data.params
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const createInitValue = (param: ParamInfo) => {
    const defaultValue = param.default
    if (defaultValue !== undefined) {
      let newDefaultValue = defaultValue
      const reg = /\$\{node-name\}/
      /**
       * if the default value contains ${node-name},
       * change the default value of ${node-name} to curent node name
       *  */
      if (typeof defaultValue === 'string' && reg.test(defaultValue)) {
        newDefaultValue = defaultValue.replace(reg, node.value)
      }
      return newDefaultValue
    }

    const initValueMap = {
      [TypeOfPluginParam.Int]: null,
      [TypeOfPluginParam.String]: '',
      [TypeOfPluginParam.Boolean]: null,
      [TypeOfPluginParam.Enum]: '',
      [TypeOfPluginParam.Map]: '',
      [TypeOfPluginParam.File]: '',
    }
    return initValueMap[param.type as TypeOfPluginParam] || ''
  }

  const initFormFromPluginInfo = (info: PluginInfo) => {
    // TODO: delete params after api changed
    const { tag_type, params, ...fields } = info
    const keys = Object.keys(fields)
    return keys.reduce((obj, currentKey) => {
      obj[currentKey] = createInitValue(info[currentKey])
      return obj
    }, {} as Record<string, any>)
  }

  const createFieldListFormPluginInfo = (info: PluginInfo) => {
    // TODO: delete params after api changed
    const { params, tag_type, ...fields } = info
    return Object.keys(fields).map((key) => {
      return {
        key,
        info: fields[key],
      }
    })
  }

  // get plugin default value
  const getPluginInfo = async () => {
    const pluginName = getNodeMsgById(node.value).plugin
    const pluginMsgName = pluginMsgIdMap[pluginName]?.name

    const nodePluginName = pluginMsgName || pluginName
    if (nodePluginName) {
      const { data } = await queryPluginConfigInfo(nodePluginName)
      const pluginInfo: PluginInfo = data
      if (!pluginInfo) {
        defaultConfigData.value = {}
        fieldList.value = []
        return
      }

      const pluginInitInfo = initFormFromPluginInfo(pluginInfo)
      defaultConfigData.value = cloneDeep(pluginInitInfo)
      fieldList.value = createFieldListFormPluginInfo(pluginInfo)
    }
  }

  const fillOutTheFormFromConfiguredData = () => {
    const defaultConfigDatakeys = Object.keys(defaultConfigData.value) // according fieldList value
    const defaultConfigDataL = defaultConfigDatakeys.length
    if (!defaultConfigDataL) {
      configForm.value = { ...defaultConfigData.value }
    } else {
      for (let i = 0; i < defaultConfigDataL; i += 1) {
        const key = defaultConfigDatakeys[i]
        const value = configuredData.value[key]
        if (value === '' || value === undefined || value === null) {
          const defaultValue = defaultConfigData.value[key]
          configForm.value[key] = defaultValue
        } else {
          configForm.value[key] = configuredData.value[key]
        }
      }
    }
  }

  const shouldFieldShow = (fieldData: Field) => {
    if (!fieldData.info.condition) {
      return true
    }
    const { field, value } = fieldData.info.condition
    return configForm.value[field] === value
  }

  const cancel = () => {
    router.back()
  }

  const submit = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await submitNodeConfig(node.value, configForm.value)
      EmqxMessage.success(t('common.submitSuccess'))
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    configForm.value = cloneDeep(defaultConfigData.value)
  }

  onMounted(async () => {
    isLoading.value = true
    await Promise.all([initMap(), initMsgIdMap()])
    await Promise.all([getPluginInfo(), getNodeConfig()])
    fillOutTheFormFromConfiguredData()
    isLoading.value = false
  })

  return {
    node,
    configForm,
    fieldList,
    isLoading,
    formCom,
    isSubmitting,
    shouldFieldShow,
    submit,
    cancel,
    reset,
  }
}
