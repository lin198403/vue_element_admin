<template>
  <el-collapse accordion >
    <el-collapse-item 
      v-for="item in userFeature"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
  defineProps({
    userFeature: {
      type: Array,
      required: true
    }
  })
</script>