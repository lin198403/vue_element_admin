<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="{
      title: [
        { 
          validator: (rule, value, callback) => {
            if(!value) {
              callback(new Error(''))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },
      ],
      content: [
        { 
          validator: (rule, value, callback) => {
            if(value === '<p><br></p>' || !value) {
              callback(new Error(''))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },
      ]
    }"
  >
    <el-form-item prop="title">
      <el-input v-model="ruleForm.title" :placeholder="$t('writeArticles.title_placeholder')" />
    </el-form-item>

    <el-form-item prop="content">
      <wangeditor-component 
        v-model="ruleForm.content" 
        :placeholder="$t('writeArticles.content_placeholder')"
        :validateEvent="validateEvent"
      ></wangeditor-component>
    </el-form-item>

    <el-form-item>
      <el-button 
        type="primary" 
        :disabled="isDisabled"
        @click="submitForm(ruleFormRef)"
      >
        {{ $t('writeArticles.submit_btn') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
  import { reactive, ref, computed  } from 'vue'
  import { useRoute } from 'vue-router'
  import { articleDetailApi, articleCreateApi, articleEditApi } from '@/api'
  import WangeditorComponent from '@/components/WangeditorComponent.vue'
  
  const route = useRoute()
  const { params: { id } } = route
  

  // form
  const ruleFormRef = ref(null)
  const ruleForm = reactive({
    title: '',
    content: ''
  })
  const _initRuleForm = reactive({
    title: '',
    content: ''
  })
  
  const isDisabled = computed(() => {
    return (JSON.stringify(ruleForm) !== '{"title":"","content":""}') && (JSON.stringify(ruleForm) !== '{"title":"","content":"<p><br></p>"}') && (JSON.stringify(ruleForm) === JSON.stringify(_initRuleForm))
  })

  const validateEvent = ref(true)
  const resetForm = formEl => {
    if (!formEl) return
    validateEvent.value = false
    formEl.resetFields()
  }

  const submitForm = async formEl => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
  
      if (valid) {

        if(id) {
          const { success, message } = await articleEditApi({
            id,
            title: ruleForm.title,
            content: ruleForm.content
          })
          
          ElMessage({
            message: message,
            type: success ? 'success' : 'error',
            onClose: () => {
              _initRuleForm.title = ruleForm.title
              _initRuleForm.content = ruleForm.content
            }
          })

        } else {
          const { success, message } = await articleCreateApi({
            title: ruleForm.title,
            content: ruleForm.content
          })
          ElMessage({
            message: message,
            type: success ? 'success' : 'error',
            onClose: () => {
              resetForm(ruleFormRef.value)
            }
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }


  // edit
  const initFunc = async () => {
    if(id) {
      const { success, data } = await articleDetailApi(id)
      if(success) {
        const { title, content } = data
        ruleForm.title = title
        ruleForm.content = content
        _initRuleForm.title = title
        _initRuleForm.content = content
      }
    }
  }
  
  await initFunc()
  
  

</script>