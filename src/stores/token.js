import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

const useTokenStore = defineStore('token', () => {

  const token = ref(getItem(TOKEN) || '')
  
  const setToken = newVal => {
    
    // 同步
    token.value = newVal

    // 本地缓存
    setItem(TOKEN, newVal)

  }


  const deleteToken = () => {

    // 同步
    token.value = ''

    // 本地缓存
    removeItem(TOKEN)
    
  }

  return { token, setToken, deleteToken }

})

export default useTokenStore