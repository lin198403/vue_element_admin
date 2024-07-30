<template>
  <el-avatar 
      :src="userStore.user.avatar"
      :size="40"
      class="el-dropdown-link"
    />
</template>

<script setup>
  import useUserStore from '@/stores/user'
  const userStore = useUserStore()
</script>