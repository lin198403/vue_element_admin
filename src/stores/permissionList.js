import { ref } from 'vue'
import { defineStore } from 'pinia'

const usePermissionListStore = defineStore('permissionList', () => {

  const permissionList = ref([])

  const setPermissionList = newVal => {
    permissionList.value = newVal
  }


  return { permissionList, setPermissionList }
})

export default usePermissionListStore