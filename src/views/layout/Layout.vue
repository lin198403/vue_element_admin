<template>
  <el-container class="layout">
    <el-aside class="layout-aside">
      <el-row>
        <el-col :span="24">
          <el-avatar 
            :src="userStore.user.avatar"
            :size="90"  
          />
        </el-col>
      </el-row>
      <side-menu class="guide-side-menu layout-menu"/>
    </el-aside>
    <el-container class="layout-main">
      <el-header class="layout-header">
        <nav-bar />
        <tag-bar class="guide-tag-bar" />
      </el-header>
      <el-main class="layout-content">

        <router-view v-slot="{ Component }" v-if="$route.name !== 'writeArticles' && $route.name !== 'articleEdit'">
          <template v-if="Component">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </template>
        </router-view>

        <router-view v-slot="{ Component }" :key="`${$route.fullPath}_${localeStore.locale}`" v-else>
          <template v-if="Component">
            <transition name="fade" mode="out-in">
              <Suspense>
                <component :is="Component"></component>

                <template #fallback>
                  正在加载...
                </template>
              </Suspense>
            </transition>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { RouterView } from 'vue-router'
  import useUserStore from '@/stores/user'
  import userRoleListStore from '@/stores/roleList'
  import usePermissionListStore from '@/stores/permissionList'
  import useLocaleStore from '@/stores/locale'
  import { roleListApi, permissionListApi } from '@/api'
  import asyncData from '@/utils/asyncData'
  import watchLocate from '@/utils/watchLocate'
  import SideMenu from './components/SideMenu.vue'
  import NavBar from './components/navbar/index.vue'
  import TagBar from './components/TagBar.vue'
  const userStore = useUserStore()
  const roleListStore = userRoleListStore()
  const permissionListStore = usePermissionListStore()
  const localeStore = useLocaleStore()

  const initFunc = async () => {

    const [ { data: roleListData}, { data: permissionListData} ] = await asyncData([roleListApi(), permissionListApi()])
    
    roleListStore.setRoleList(roleListData)

    permissionListStore.setPermissionList(permissionListData)

  }


  onMounted(async () => {
    await initFunc()
  })


  watchLocate(async () => {
    await initFunc()
  })

</script> 

<style scoped lang="scss">
.layout {
  height: 100vh;
  .layout-aside {
    display: flex;
    flex-direction: column;
    .layout-menu {
      flex: 1;
    }
  }
  .layout-main {
    .layout-header {
      height: auto;
    }
    .layout-content {
      padding-bottom: 0;
    }
  }
}
</style>