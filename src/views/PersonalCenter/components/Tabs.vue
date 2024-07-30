<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="$t('profile.tab_title_feature')" name="feature">
      <tab-pannel-feature :userFeature="userFeature"/>
    </el-tab-pane>
    <el-tab-pane :label="$t('profile.tab_title_chapter')" name="chapter">
      <tab-pannel-chapter :userChapter="userChapter"/>
    </el-tab-pane>
    <el-tab-pane :label="$t('profile.tab_title_author')" name="author">
      <tab-pannel-author />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
  import { ref } from 'vue'
  import TabPannelFeature from './TabPannelFeature.vue'
  import TabPannelChapter from './TabPannelChapter.vue'
  import TabPannelAuthor from './TabPannelAuthor.vue'

  const activeName = ref('feature')

  defineProps({
    userFeature: {
      type: Array,
      required: true
    },
    userChapter: {
      type: Array,
      required: true
    }
  })
</script>