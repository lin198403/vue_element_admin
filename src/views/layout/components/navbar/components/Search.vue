<template>
  <div>
    <i 
      class="iconfont"
      @click="openDialoghHandler"
    >&#xe611;</i>

    <el-dialog 
      v-model="isShowDialog"
      width="30%"
      :show-close="false"
      @closed="closedDialogHandler"
    >
      <div>
        <el-input
          v-model="searchModel"
          :placeholder="$t('form.search_placeholder')"
          @input="searchInputHandler"
        />
        <i class="iconfont">&#xe611;</i>
      </div>
      <ul v-if="searchResult.length !== 0">
        <li 
          v-for="(item, index) in searchResult"
          :key="index"
          @click="clickHandler(item.item.path)"
        >
          {{ item.item.title.join(' > ') }}
      </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Fuse from 'fuse.js'
  import { useI18n } from 'vue-i18n'
  import userMenuStore from '@/stores/menu'
  import watchLocate from '@/utils/watchLocate'
  const i18n = useI18n()
  const router = useRouter()
  const menuStore = userMenuStore()

  const isShowDialog = ref(false)
  const searchModel = ref('')
  const searchResult = ref([])
  let fuse = null

  const openDialoghHandler = () => {
    isShowDialog.value = true
  }

  const closedDialogHandler = () => {

    searchModel.value = ''
    searchResult.value = []

  }

  watchLocate(() => {
    fuse = initFuse(generateSearchData(menuStore.menu))
  }, {
    immediate: true
  })

    
  const searchInputHandler = keyword => {

    searchResult.value = fuse.search(keyword)

  }
    
  const clickHandler = path => {

    router.push(path)
    isShowDialog.value = false

  }

  
  // 构造搜索数据库
  function generateSearchData(arr = [], parent = ''){
    let result = []
    if(arr.length === 0) {
      return
    }
    arr.forEach(el => {
      const { path, title  } = el
      const baseTitle = [
        i18n.t(`routers.${title}`)
      ]
      parent && baseTitle.unshift(i18n.t(`routers.${parent}`))
      result.push({
        path,
        title: [...baseTitle]
      })

      if(el.children) {
        result = [...result, ...generateSearchData(el.children, title)]
      }
    })

    return result
  }


  // 初始化 Fuse 实例
  function initFuse(data) {
    return new Fuse(data, {
      threshold: 0.1,
      shouldSort: false,
      findAllMatches: true,
      keys: ['title']
    })
  }

</script>