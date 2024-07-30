import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setItem, getItem } from '@/utils/storage'
import { LOCALE } from '@/constant'

const useLocaleStore = defineStore('locale', () => {

  const locale = ref(getItem(LOCALE) || 'zhCn')
  
  
  const setLocale = newVal => {
    
    // 同步
    locale.value = newVal

    // 本地缓存
    setItem(LOCALE, newVal)

  }


  return { locale, setLocale }

})

export default useLocaleStore