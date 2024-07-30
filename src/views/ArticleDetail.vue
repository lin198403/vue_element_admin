<template>
  <div>
    <el-row>
      <el-col :span="24">{{ detail.title }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        {{ detail.author }}
        {{ dayFormat.format(detail.publicDate) }}
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="w-e-text-container">
          <div v-html="detail.content" data-slate-editor></div>
        </div>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <el-button 
          v-if="JSON.stringify(detail) !== '{}' "
          type="primary" 
          :link="true"
          @click="clickHandler(detail._id)"
        >
          {{ $t('articleDetail.edit_btn') }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { ref, onMounted, onActivated, inject } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { articleDetailApi } from '@/api'
  import watchLocate from '@/utils/watchLocate'
  const route = useRoute()
  const router = useRouter()
  const dayFormat = inject('dayFormat')

  const detail = ref({})
  const initFunc = async () => {
    const { params: { id }} = route
    const { data } = await articleDetailApi(id)
    detail.value = data ? data : {}
  }
  
  const clickHandler= id => {
    router.push(`/article/articleEdit/${id}`)
  }

  onMounted(async () => {
    await initFunc()
  })

  watchLocate(async () => {
    await initFunc()
  })

  let isFirst = true
  onActivated(async() => {
    if(!isFirst) {
      await initFunc()
      return 
    }
    isFirst = false
  })
</script>