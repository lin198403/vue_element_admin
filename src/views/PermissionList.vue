<template>
  <div>
    <el-table
      :data="permissionListStore.permissionList"
      :border="true"
      row-key="id"
    >
      <el-table-column prop="permissionName" :label="$t('permissionList.name')" />
      <el-table-column prop="permissionMark" :label="$t('permissionList.mark')" />
      <el-table-column prop="permissionDesc" :label="$t('permissionList.description')" />
    </el-table>
  </div>
</template>

<script setup>
  import usePermissionListStore from '@/stores/permissionList'
  const permissionListStore = usePermissionListStore()
</script>