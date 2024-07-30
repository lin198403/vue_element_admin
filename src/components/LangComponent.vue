<template>
  <el-dropdown @command="changeLanguage">
    <i class="iconfont">&#xe605;</i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="en">en</el-dropdown-item>
        <el-dropdown-item command="zhCn">中文</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import useLocaleStore from '@/stores/locale'
  const i18n = useI18n()
  const localeStore = useLocaleStore()
  
  // 切换语言
  const changeLanguage = lang => {
    i18n.locale.value = lang
    localeStore.setLocale(lang)
  }
</script>