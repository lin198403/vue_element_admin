<template>
  <el-scrollbar>
    <el-row :gutter="20">
      <el-col :span="7">
        <div>{{ $t('profile.title_introduce') }}</div>
        <thumbnail-avatar />
        <introduction />
        <feature :userFeature="userFeature"/>
      </el-col>
      <el-col :span="17">
        <Tabs 
          :userFeature="userFeature" 
          :userChapter="userChapter"
        />
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { userFeatureApi, userChapterApi } from '@/api'
  import asyncData from '@/utils/asyncData'
  import watchLocate from '@/utils/watchLocate'
  import ThumbnailAvatar from './components/ThumbnailAvatar.vue'
  import Introduction from './components/Introduction.vue'
  import Feature from './components/Feature.vue'
  import Tabs from './components/Tabs.vue'


  const userFeature = ref([])
  const userChapter = ref([])
  const initFunc = async () => {

    const [ { data: userFeatureData }, { data: userChapterData }  ] = await asyncData([userFeatureApi(), userChapterApi()])

    userFeature.value = userFeatureData
    
    userChapter.value = userChapterData

  }


  onMounted(async () => {
    await initFunc()
  })


  watchLocate(async () => {
    await initFunc()
  })

</script>