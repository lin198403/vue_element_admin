import { createRouter, createWebHistory } from 'vue-router'


// 公有路由表
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/Layout.vue'),
    redirect: '/personalCenter',
    children: [
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () => import('@/views/PersonalCenter/index.vue'),
        meta: {
          title: 'personal_center',
          icon: '&#xe6b1;'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401.vue')
  }
]


// 私有路由表
export const privateRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/layout/Layout.vue'),
    redirect: '/user/eloyeeManage',
    meta: {
      title: 'user',
      icon: '&#xe609;',
      roles: ['userManage', 'roleList', 'permissionList']
    },
    children: [
      {
        path: 'eloyeeManage',
        name: 'eloyeeManage',
        component: () => import('@/views/EloyeeManage.vue'),
        meta: {
          title: 'employee_manage',
          icon: '&#xe660;',
          roles: ['userManage']
        }
      },
      {
        path: 'import',
        name: 'import',
        component: () => import('@/views/Import.vue'),
        meta: {
          title: 'import',
          roles: ['userManage']
        }
      },
      {
        path: 'userInfo/:id',
        name: 'userInfo',
        component: () => import('@/views/UserInfo.vue'),
        meta: {
          title: 'staff_information',
          roles: ['userManage']
        }
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/RoleList.vue'),
        meta: {
          title: 'role_list',
          icon: '&#xe600;',
          roles: ['roleList']
        }
      },
      {
        path: 'permissionList',
        name: 'permissionList',
        component: () => import('@/views/PermissionList.vue'),
        meta: {
          title: 'permission_list',
          icon: '&#xe641;',
          roles: ['permissionList']
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/layout/Layout.vue'),
    redirect: '/article/writeArticles',
    meta: {
      title: 'article',
      icon: '&#xe659;',
      roles: ['articleRanking', 'articleCreate']
    },
    children: [
      {
        path: 'writeArticles',
        name: 'writeArticles',
        component: () => import('@/views/WriteArticles.vue'),
        meta: {
          title: 'write_articles',
          icon: '&#xe62e;',
          roles: ['articleCreate']
        }
      },
      {
        path: 'articleRanking',
        name: 'articleRanking',
        component: () => import('@/views/ArticleRanking.vue'),
        meta: {
          title: 'article_ranking',
          icon: '&#xe60e;',
          roles: ['articleRanking']
        }
      },
      {
        path: 'articleDetail/:id',
        name: 'articleDetail',
        component: () => import('@/views/ArticleDetail.vue'),
        meta: {
          title: 'article_detail',
          roles: ['articleRanking']
        }
      },
      {
        path: 'articleEdit/:id',
        name: 'articleEdit',
        component: () => import('@/views/WriteArticles.vue'),
        meta: {
          title: 'editor_article',
          roles: ['articleRanking']
        }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404'}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})


export default router
