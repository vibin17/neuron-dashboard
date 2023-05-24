<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog"
    :title="$t(`${dialogTitle}`)"
    :z-index="2000"
  >
    <emqx-form ref="formRef" :model="groupForm" :rules="groupRules">
      <emqx-form-item prop="group" :label="$t('config.groupName')" required>
        <emqx-input v-model.trim="groupForm.group" :disabled="isEdit" />
      </emqx-form-item>
      <emqx-form-item prop="interval" :label="$t('config.interval')" required>
        <emqx-input v-model.number="groupForm.interval">
          <template #append>ms</template>
        </emqx-input>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" :loading="isSubmitting" @click="submit">
          {{ $t(`${confirmBtnText}`) }}
        </emqx-button>
        <emqx-button size="small" @click="close">
          {{ $t('common.cancel') }}
        </emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElDialog } from 'element-plus'
import type { GroupFormDefault, GroupForm, TemplateGroupForm } from '@/types/config'

const createRawForm = (): GroupFormDefault => ({
  group: '',
  interval: null,
})

const emit = defineEmits(['update:modelValue', 'update:dialogVisible', 'submitted', 'close'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<GroupFormDefault | GroupForm | TemplateGroupForm>,
    default: () => {
      return { group: '', interval: null }
    },
  },
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  isEdit: { type: Boolean, deafult: false },
  isSubmitting: { type: Boolean, deafult: false },
  rules: {
    type: Object,
    default: () => ({}),
  },
})

const { t } = useI18n()

const formRef = ref()
const groupForm = computed({
  get: () => props.modelValue,
  set: (val: GroupFormDefault) => {
    emit('update:modelValue', val)
  },
})

const groupRules = computed(() => {
  return {
    ...props.rules,
    group: [
      {
        required: true,
        message: t('config.groupNameRequired'),
      },
    ],
    interval: [
      {
        required: true,
        message: t('config.readIntervalRequired'),
      },
      {
        validator(rule: unknown, value: string) {
          const ret = []
          if (Number.isNaN(Number(value))) {
            ret.push(new Error(t('config.readIntervalError')))
          }
          return ret
        },
      },
      {
        type: 'number',
        min: 100,
        message: t('config.readIntervalMinimumError'),
        trigger: 'blur',
      },
    ],
  }
})

const dialogTitle = computed(() => {
  const title = props.isEdit ? 'config.editGroup' : 'config.createGroup'
  return title
})
const confirmBtnText = computed(() => {
  return !props.isEdit ? 'common.create' : 'common.submit'
})

const resetFields = () => {
  formRef.value.form.resetFields()
}
const initForm = () => {
  groupForm.value = createRawForm()
}

const showDialog = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    if (!val) {
      resetFields()
      initForm()
    }
    emit('update:dialogVisible', val)
  },
})

const submit = async () => {
  await formRef.value.validate()
  emit('submitted')
}
const close = () => {
  showDialog.value = false
  emit('close')
}
</script>