<template>
  <el-form
    :model="ruleForm"
    :rules="{
      username: [
        { required: true, message: $t('form.username_rule_required'), trigger: 'change' }
      ],
      password: [
        { required: true, message: $t('form.password_rule_required'), trigger: 'change' }
      ]
    }"
    ref="ruleFormRef"
  >
    <el-form-item prop="username">
      <span class="iconfont">&#xe60a;</span>
      <el-input 
        v-model="ruleForm.username"
        type="text"
        :placeholder="$t('form.username')" 
      />
    </el-form-item>
    <el-form-item prop="password">
      <span class="iconfont">&#xe709;</span>
      <el-input 
        v-model="ruleForm.password"
        type="password"
        :placeholder="$t('form.password')" 
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button 
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        {{ $t('form.login_btn') }}
      </el-button>
    </el-form-item>
  </el-form>
  
  <lang-component />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { loginApi } from '@/api'
  import useTokenStore from '@/stores/token'
  import LangComponent from '@/components/LangComponent.vue'
  const router = useRouter()
  const tokenStore = useTokenStore()


  // 初始化表单字段
  const ruleForm = reactive({
    username: 'super-admin',
    password: 'E10ADC3949BA59ABBE56E057F20F883E'
  })

  
  // 提交表单
  const ruleFormRef = ref()
  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {

        // 获取 token
        const { data: { token } } = await loginApi({
          username: ruleForm.username,
          password: ruleForm.password
        })
       
        // 存储 token
        tokenStore.setToken(token)
        
        // 跳转页面
        router.push('/')
        
      } else {
        console.log(fields)
      }
    })
  }
</script>
