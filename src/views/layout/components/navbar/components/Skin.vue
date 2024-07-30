<template>
  <div class="skin">
    <i class="iconfont">&#xe617;</i>
    <el-color-picker 
      v-model="color" 
      show-alpha 
      :predefine="predefineColors" 
      @change="changeHandler"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useThemeColorStore from '@/stores/themeColor'
import changeStyle from '@/utils/changeStyle'
import { THEME_COLOR_DEFAULT } from '@/constant'
const themeColorStore = useThemeColorStore()

const color = ref(themeColorStore.themeColor)

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])


const changeHandler = color => {

  if(!color) color = THEME_COLOR_DEFAULT

  if(color === themeColorStore.themeColor) return

  themeColorStore.setThemeColor(color)

  changeStyle(color)
  
}
</script>


<style lang="scss" scoped>
.skin {
  position: relative;
  :deep(.el-color-picker) {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    top: 0;
    .el-color-picker__trigger {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style> 