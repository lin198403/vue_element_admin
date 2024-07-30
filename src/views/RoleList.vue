<template>
  <div>
    <el-table 
      :data="roleListStore.roleList" 
      :border="true"
    >
      <el-table-column prop="title" :label="$t('roleList.name')" />
      <el-table-column prop="describe" :label="$t('roleList.description')" />
      <el-table-column>
        <template #header>
          {{ $t('roleList.operate') }}
        </template>
        <template #default="{ row }">
          <el-button type="success" size="small" @click="permissionsHandler(row)" v-permission="'distributePermission'">{{ $t('roleList.assign_permissions') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <dialog-component 
      v-model="permissionOpts.showDialog" 
      :title="$t('roleList.assign_permissions')" 
      @closed-event="closedHandler"
      @confirm-event="confirmHandler"
      @open-event="openHandler"
    >
      <el-tree 
        ref="treeRef"
        node-key="id"
        :data="permissionListStore.permissionList"
        :props="props"
        :show-checkbox="true"
        :default-expand-all="true"
        :check-strictly="true"
      />
    </dialog-component>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import userRoleListStore from '@/stores/roleList'
  import usePermissionListStore from '@/stores/permissionList'
  import { rolePermissionByIdApi, roleDistributePermissionByIdApi } from '@/api'
  const roleListStore = userRoleListStore()
  const permissionListStore = usePermissionListStore()
  import DialogComponent from '@/components/DialogComponent.vue'


  const treeRef = ref() 
  const props = {
    label: 'permissionName',
    children: 'children'
  }
  

  const permissionOpts = reactive({
    showDialog: false,
    roleId: ''
  })
  const permissionsHandler = async (row) => {

    const { id } = row
    permissionOpts.showDialog = true
    permissionOpts.roleId = id

  }


  const openHandler = async () => {

    const { data, success } = await rolePermissionByIdApi(permissionOpts.roleId)
    success && treeRef.value.setCheckedKeys(data, false)

  }

  const closedHandler = () => {

    treeRef.value.setCheckedKeys([], false)
    
  }

  

  const confirmHandler = async () => {
    
    const { message, success } = await roleDistributePermissionByIdApi({

      permissions: treeRef.value.getCheckedKeys(false),
      roleId: permissionOpts.roleId

    })

    if(success) {

      ElMessage({
        type: 'success',
        message: `${message}`,
      })

    } else {

      ElMessage({
        type: 'error',
        message: `${message}`,
      })

    }
  }

</script>