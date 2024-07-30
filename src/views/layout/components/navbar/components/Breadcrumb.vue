<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key = 'item.path'
      :to="index === (breadcrumbList.length - 1) ? '' : item.path"
    >
      {{ $t(`routers.${item.meta.title}`) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const breadcrumbList = ref([])
  watch(
    () => route.path, 
    () => {
      breadcrumbList.value = route.matched.filter(el => el.meta && el.meta.title)
    },
    {
      immediate: true
    }
  )
</script>