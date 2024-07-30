<template>
  <el-scrollbar>
    <el-row>
      <el-col :span="24">
          <el-menu 
            router
            :default-active="defaultActiveIndex"
            class="aside-menu"
          >
            <menu-router-component :menuList="menuStore.menu" />
          </el-menu>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import userMenuStore from '@/stores/menu'
  import MenuRouterComponent from '@/components/MenuRouterComponent.vue'
  const route = useRoute()
  const menuStore = userMenuStore()

  
  // 设置当前索引
  const defaultActiveIndex = computed(() => route.path)
  
</script>

<style lang="scss" scoped>
.aside-menu {
  border-right: none;
}
</style>