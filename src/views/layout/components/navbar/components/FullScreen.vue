<template>
  <i 
    class="iconfont"
    @click="fullScreenHandler"
    v-html="fullScreenText"
  ></i>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import screenfull from 'screenfull'


  const isFullScreen = ref(false)
  const fullScreenHandler = () => {
    screenfull.isEnabled && screenfull.toggle()
  }
  screenfull.onchange(() => {
    isFullScreen.value = screenfull.isFullscreen
  })
  const fullScreenText = computed(() => {
    return isFullScreen.value ? '&#xe8fa;' : '&#xe61f;'
  })
</script>