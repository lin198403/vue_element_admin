import { ref } from 'vue'
import { defineStore } from 'pinia'

const userRoleListStore = defineStore('roleList', () => {

  const roleList = ref([])

  const setRoleList = newVal => {
    roleList.value = newVal
  }

  return { roleList, setRoleList }
})

export default userRoleListStore