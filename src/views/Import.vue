<template>
  <upload-component
    accept=".xlsx, .xls"
    :multiple="true"
    :size="500"
    :limit="3"
    @http-request="httpRequestHandler"
  >
    <div class="el-icon--upload iconfont">
      &#xe656;
    </div>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip="{ accept, size }">
      <div class="el-upload__tip">
        {{ accept ? accept : '' }} with a size less than {{ size }} kb
      </div>
    </template>
  </upload-component>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import excel from '@/utils/excel'
  import { EXCEL_HEADERS } from '@/constant'
  import { userManageImportApi } from '@/api'
  import useLocaleStore from '@/stores/locale'
  import UploadComponent from '@/components/UploadComponent.vue'
  const i18n = useI18n()
  const localeStore = useLocaleStore()

  const httpRequestHandler = async options => {
    const { file, onSuccess, onError } = options
    const { name } = file
    const { eloyeeTable } = EXCEL_HEADERS
    const excelData = await excel.importFunc(file, eloyeeTable[localeStore.locale])
    
    // excel is empty
    if(excelData.length === 0) {
      onError(i18n.t('import.excel_empty', [name]))
      return
    }
    

    // excel is not empty
    const resBody = excelData.map(el => {
      const { openTime, role, ...other } = el
      return {
        ...other,
        role: role?.split(' '),
        openTime: excel.excelDate(openTime)
      }
    })

    const { message } = await userManageImportApi(resBody)

    if(message === i18n.t('import.succes_if')) {
      onSuccess()
    } else {
      onError(i18n.t('import.error_http'))
    }
  }
  
</script>

<style lang="scss" scoped>
  .el-icon--upload {
    line-height: normal;
  }
</style>
