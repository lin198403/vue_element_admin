<template>
  <el-avatar :size="150" :src="userStore.user.avatar" />
  <div>{{ userStore.user.username }}</div>
  <div>{{ userStore.user.title }}</div>
</template>


<script setup>
  import useUserStore from '@/stores/user'
  const userStore = useUserStore()
</script>