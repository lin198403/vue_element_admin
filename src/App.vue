<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
  
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  import dayjs from "dayjs"
  import 'dayjs/locale/zh-cn'
  import { RouterView } from 'vue-router'
  import { ref } from 'vue'
  import watchLocate from '@/utils/watchLocate'
  import useThemeColorStore from './stores/themeColor'
  import changeStyle from './utils/changeStyle'
  const themeColorStore = useThemeColorStore()

  // 国际化
  const locale = ref('')

  watchLocate(cur => {
    if(cur === 'zhCn') {
      locale.value = zhCn
      dayjs.locale('zh-cn')
    }

    if(cur === 'en') {
      locale.value = en
      dayjs.locale('en')
    }
  }, {
    immediate: true
  })

  // 换肤 - 本地缓存
  changeStyle(themeColorStore.themeColor)
</script>