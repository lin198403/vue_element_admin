import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {

  let user = ref({})

  const setUser = newVal => {

    user.value = newVal

  }
  
  const deleteUser = () => {

    user.value = {}
    
  }

  return { user, setUser, deleteUser }

})


export default useUserStore