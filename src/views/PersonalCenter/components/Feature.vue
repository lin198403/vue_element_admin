<template>
  <div>{{$t('profile.title_project_features')}}</div>
  <ul>
    <li 
      v-for="item in userFeature"
      :key="item.id"
    >
      <div>{{ item.title }}</div>
      <el-progress 
        :percentage="item.percentage" 
        :status="item.percentage > 90 ? 'success' : (item.percentage > 60 ? 'warning' : 'exception')"
      />
    </li>
  </ul>
</template>

<script setup>
  defineProps({
    userFeature: {
      type: Array,
      required: true
    }
  })
</script>