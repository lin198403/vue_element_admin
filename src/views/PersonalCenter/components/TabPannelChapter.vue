<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in userChapter"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      {{ item.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
  defineProps({
    userChapter: {
      type: Array,
      required: true
    }
  })
</script>