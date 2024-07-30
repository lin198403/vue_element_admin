import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { THEME_COLOR, THEME_COLOR_DEFAULT } from '@/constant'

const useThemeColorStore = defineStore('themeColor', () => {

  const themeColor = ref(getItem(THEME_COLOR) || THEME_COLOR_DEFAULT)

  const setThemeColor = newVal => {

    // 同步
    themeColor.value = newVal

    // 本地缓存
    setItem(THEME_COLOR, newVal)

  }

  return { themeColor, setThemeColor }
})

export default useThemeColorStore
