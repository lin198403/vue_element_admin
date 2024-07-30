<template>
  <template
    v-for="item in menuList"
    :key="item.id"
  >
    <el-sub-menu
      v-if="item.children && (item.children.length !== 0)"
      :index="item.id"
    >
      <template #title>
        <slot :item="item"></slot>
      </template>

      <menu-normal-component :menuList="item.children">
        <template #default="{ item }">
          <slot :item="item"></slot>
        </template>
      </menu-normal-component>

    </el-sub-menu>
    <el-menu-item 
      v-else
      :index="item.id"
    >
      <slot :item="item"></slot>
    </el-menu-item>
  </template>
</template>


<script setup>
  import MenuNormalComponent from '@/components/MenuNormalComponent.vue'

  defineProps({
    menuList: Object
  })

</script>