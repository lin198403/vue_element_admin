<template>
  <el-row class="header-row">
    <el-col class="header-col">
      <breadcrumb class="guide-breadcrumb" />
    </el-col>
    <el-col class="header-col">
      
      <guide class="guide-start" />

      <search class="guide-search" />

      <full-screen class="guide-fullscreen" />
      
      <skin class="guide-skin" />
        
      <lang-component class="guide-lang-select" />

      <personal class="guide-personal" />

      <i class="iconfont guide-setting">&#xe78e;</i>

    </el-col>
  </el-row>

  
</template>

<script setup>
  import Breadcrumb from './components/Breadcrumb.vue'
  import Guide from './components/Guide.vue'
  import Search from './components/Search.vue'
  import FullScreen from './components/FullScreen.vue'
  import Skin from './components/Skin.vue'
  import LangComponent from '@/components/LangComponent.vue'
  import Personal from './components/Personal.vue'  
</script>


<style lang="scss" scoped>
.header-row {
  align-items: center;
  justify-content: space-between;
  .header-col {
    display: flex;
    align-items: center;
    flex: none;
  }
}
</style>