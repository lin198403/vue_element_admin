<template>
  <el-dropdown>
    <el-avatar 
      :src="userStore.user.avatar"
      :size="40"
      class="el-dropdown-link"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><router-link to="/personalCenter">{{ $t('routers.personal_center') }}</router-link></el-dropdown-item>
        <el-dropdown-item @click="logOutHandler">{{ $t('sign_out') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import useUserStore from '@/stores/user'
  import logOutLogic from '@/logic/logOutLogic'
  const userStore = useUserStore()

  const logOutHandler = () => {
    logOutLogic()
  }
</script>