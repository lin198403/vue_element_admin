<template>
  <div>
    <el-dialog
      v-model="model"
      :title="title"
      @closed="closedHandler"
      @open="openHandler"
    >
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeBtnHandler">{{ $t('dialogComponent.close_text')}}</el-button>
          <el-button type="primary" @click="confirmBtnHandler">
            {{ $t('dialogComponent.confirm_text') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  const model = defineModel()
  
  defineProps({
    title: {
      type: String
    }
  })

  const emit = defineEmits(['closedEvent', 'confirmEvent', 'openEvent'])
  
  const closeDialog = () => {

    model.value = false

  }

  const closeBtnHandler = () => {

    closeDialog()

  }

  const confirmBtnHandler = () => {

    emit('confirmEvent')
    closeDialog()
    
  }

  const closedHandler = () => {

    emit('closedEvent')

  }

  const openHandler = () => {

    emit('openEvent')

  }
</script>