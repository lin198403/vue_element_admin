<template>
  <div>
    <div>
      <el-tag 
        v-for="(tag, index) in tags" 
        :key="tag.title" 
        type="info"
        closable 
        @close="closeHandler({ type:0, index })"
        @click="clickHandler(tag.path)"
        @mouseup="mouseupHandler"
        @contextmenu.prevent="contextmenuHandler($event, index)"
        :class="[
          'tag',
          { 'tag-active': tag.path === route.path }
        ]"
      >
        {{ $t(`routers.${tag.title}`) }}
      </el-tag>
    </div>

    <ul
      class="contextmenu"
      ref="contextmenuRef"
      v-show="showContextmenu"
      @contextmenu.prevent
      @mousedown.stop
    >
      <li @click="refreshHandler">刷新</li>
      <li @click="closeHandler({type: 1, index: currentIndex})">关闭其他</li>
      <li @click="closeHandler({type: 2, index: currentIndex})">关闭右侧</li>
    </ul>
  </div>
</template>

<script setup>
  import { reactive, watch, ref, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const tags = reactive([])
  const currentIndex = ref()
  const showContextmenu = ref(false)
  const contextmenuRef = ref(null)
  const whiteList = [
    'userInfo',
    'articleDetail',
    'articleEdit'
  ]

  watch(
    () => route.path,
    () => {
      setTags()
    },
    {
      immediate: true
    }
  )

  const clickHandler = path => {
    router.push(path)
  }

  const closeHandler = ({type, index}) => {
    closeTags({type, index})
    closeContextmenu()
  }
  
  const mouseupHandler = evt => {
    if(evt.button === 2) {
      openContextmenu()
    }
  }
  
  const contextmenuHandler = (evt, index) => {
    const { x, y } = evt
    contextmenuRef.value.style.position = 'fixed'
    contextmenuRef.value.style.left = x + 'px'
    contextmenuRef.value.style.top = y + 'px'
    contextmenuRef.value.style.zIndex = 99
    currentIndex.value = index
  }

  const refreshHandler = () => {
    router.go(0)
    closeContextmenu()
  }
  onMounted(() => {
    document.body.addEventListener('mousedown', closeContextmenu)
  })
  onUnmounted(() => {
    document.body.removeEventListener('mousedown', closeContextmenu)
  })
  
  function setTags() {

    const { path, meta: { title }, name} = route
    
    const haveTag = tags.findIndex(el => el.path === path)
    if((haveTag === -1) && (whiteList.indexOf(name) === -1)) {
      tags.push({
        title,
        path
      })
    }
  }

  function closeContextmenu () {
    showContextmenu.value = false
  }

  function openContextmenu () {
    showContextmenu.value = true
  }


  // type 0: 关闭自己 1: 关闭其他 2: 关闭右侧
  function closeTags({type, index}) {
    if(type === 0) {
      tags.splice(index, 1)
    }
    if(type === 1) {
      tags.splice(0, index)
      tags.splice(1)
    }
    if(type === 2) {
      tags.splice(index + 1)
    }

  }
</script>

<style lang="scss" scoped>
  .tag {
    margin-right: 5px;
    margin-top: 5px;
    &.tag-active {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      background-color: transparent;
      :deep(i) {
        color: var(--el-color-primary);
        &:hover {
          background-color: var(--el-color-primary);
          color: var(--el-color-white);
        }
      }
    }
  }

  .contextmenu {
    list-style: none;
    --padding-space: 10px;
    font-size: var(--el-font-size-base);
    width: 100px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 8px 1px #f4f4f4;
    padding-top: var(--padding-space);
    padding-bottom: var(--padding-space);
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    li {
      padding: 5px 20px;
      &:hover {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
  }
</style>