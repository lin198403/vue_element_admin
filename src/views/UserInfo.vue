<template>
  <div>
    <el-row>
      <el-col>
        {{ $t('userInfo.title') }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-descriptions 
        :border="true"
        :column="2"
        >
          <el-descriptions-item :label="$t('userInfo.username')">
            {{ detail.username }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.gender')">
            {{ detail.gender }}
          </el-descriptions-item>
          
          <el-descriptions-item :label="$t('userInfo.ethnic_group')">
            {{ detail.nationality }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.mobile')">
            {{ detail.mobile }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.place_of_residence')">
            {{ detail.province }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.onboarding_time')">
            {{ dayFormat.format(detail.openTime) }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.remark')" :span="2">
            <el-tag
              v-for="(item, index) in detail.remark"
              :key="index"
            >
              {{ item }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.address')" :span="2">
            {{ detail.address }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="4">
        <el-image shape="square" fit="fill" :src="detail.avatar">
          <template #error>
            <div class="iconfont">&#xe65b;</div>
          </template>
        </el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-descriptions 
          :border="true"
          :column="1"
          direction="vertical"
        >
          <el-descriptions-item :label="$t('userInfo.experience')">
            <ul>
              <li
                v-for="(item, index) in detail.experience"
                :key="index"
              >
                <span>{{ dayFormat.format(item.startTime, 'YYYY.MM.DD') }} -- {{ dayFormat.format(item.endTime, 'YYYY.MM.DD') }}</span>
                <span>{{ item.title }}</span>
                <span>{{ item.desc }}</span>
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.specialized')">
            {{ detail.major }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('userInfo.glory')">
            {{ detail.glory }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        {{ $t('userInfo.signature') }}：____________
        
        {{ $t('userInfo.date') }}：____________
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
  import { onMounted, ref, inject, onActivated } from 'vue'
  import { useRoute } from 'vue-router'
  import watchLocate from '@/utils/watchLocate'
  import { userManageDetailByIdApi } from '@/api'
  const route = useRoute()
  const dayFormat = inject('dayFormat')

  const detail = ref({})
  const initFunc = async () => {
    const { params: { id }} = route
    const { data } = await userManageDetailByIdApi(id)
    detail.value = data ? data : {}
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
