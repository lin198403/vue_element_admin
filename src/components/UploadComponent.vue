<template>
  <div>
    <el-upload
      ref="uploadRef"
      :accept="accept"
      :limit="limit"
      :multiple="true"
      :drag="true"
      :http-request="httpRequestHandler"
      :before-upload="beforeUploadHandler"
      :on-exceed="exceedHandler"
      :on-error="errorHandler"
      :on-success="successHandler"
    >
      <slot></slot>
      <template #tip>
        <slot name="tip" :accept :size></slot>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { genFileId } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  const router = useRouter()
  const uploadRef = ref()
  const i18n = useI18n()

  const props = defineProps({
    accept: {
      type: String,
      required: false
    },
    limit: {
      type: Number,
      required: false
    },
    size: {
      type: Number,
      required: false,
      default: 500
    }
  })
  
  const beforeUploadHandler = async rawFile => {
    const { name, size } = rawFile
    const isType = (props.accept.split(', ').indexOf(`.${name.replace(/.+\./, '')}`) > -1)
    const isSize = ((size / 1024) < props.size)
    if(!isType) {
      ElMessage({
        type: 'error',
        message: i18n.t('uploadComponent.format_error', [name]),
      })
      return false
    }
    if(!isSize) {
      ElMessage({
        type: 'error',
        message: i18n.t('uploadComponent.size_error', [name, props.size]),
      })
      return false
    }
  }

  const exceedHandler = files => {
    
    if(files.length <= props.limit) {

      uploadRef.value.clearFiles()


      files.forEach(el => {
        el.uid = genFileId()
        uploadRef.value.handleStart(el)
        
      })     

      uploadRef.value.submit()
      
      return
    }

    ElMessage({
      type: 'error',
      message: i18n.t('uploadComponent.multiple_error', [props.limit]),
    })

  }

  const emit = defineEmits(['httpRequest'])
  const httpRequestHandler = options => {
    emit('httpRequest', options)
  }


  const errorHandler = error => {
    ElMessage({
      type: 'error',
      message: error,
    })
  }


  const successHandler = async (response, uploadFile, uploadFiles) => {
    const statusArr = uploadFiles.map(file => file.status)
    const isCompleted = statusArr.every(el => el === 'success')
    if(isCompleted) {
      ElMessage({
        type: 'success',
        message: i18n.t('uploadComponent.http_success', [uploadFiles.length]),
        onClose: () => {
          router.go(-1)
          uploadRef.value.clearFiles()
        },
      })
    }
  }


</script>