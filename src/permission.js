import useTokenStore from './stores/token'
import useUserStore from './stores/user'
import userMenuStore from '@/stores/menu'
import router from '@/router'
import { profileApi } from '@/api'
import generateRoutes from '@/utils/generateRoutes'
const whiteList = [
  'login',
  '404',
  '401'
]


router.beforeEach(async (to, from, next) => {
  
  const tokenStore = useTokenStore()
  
  if(tokenStore.token) {

    // 已登录，不能访问登录页面
    if(to.name === 'login') {
      next('/')
    } else {

      const userStore = useUserStore()

      if(JSON.stringify(userStore.user) === '{}') {

        const { success, data } = await profileApi()
        success && userStore.setUser(data)
        
      
        const accessRoutes = generateRoutes(userStore.user.permission.menus)
        accessRoutes.forEach(el => {
          router.addRoute(el)
        })
        
        const menuStore = userMenuStore()
        menuStore.setMenu(router.getRoutes())
        
        next({...to, replace: true})

      } else {
        next()
      }

    }
  } else {
    // 未登录，只能访问登录页面、404页面等
    if(whiteList.indexOf(to.name) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})