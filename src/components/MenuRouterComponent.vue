<template>
  <template
    v-for="item in menuList"
    :key="item.path"
  >
    <el-sub-menu
      v-if="item.children && (item.children.length !== 0)"
      :index="item.path"
    >
      <template #title>
        <i class="iconfont" v-html="item.icon"></i>
        <span>{{ $t(`routers.${item.title}`) }}</span>
      </template>

      <menu-router-component :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item 
      v-else
      :index="item.path"
    >
      <i class="iconfont" v-html="item.icon"></i>
      <span>{{ $t(`routers.${item.title}`) }}</span>
    </el-menu-item>
  </template>
</template>


<script setup>
  import MenuRouterComponent from '@/components/MenuRouterComponent.vue'
  defineProps({
    menuList: Object
  })


</script>

<style scoped lang="scss">
  i {
    margin-right: 8px;
  }
</style>