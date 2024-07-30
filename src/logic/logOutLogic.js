import router, { privateRoutes } from '@/router'
import useTokenStore from '@/stores/token'
import useUserStore from '@/stores/user'

const removeDynamicRoutes = () => {

  privateRoutes.map(el => el.name).forEach(el => {
    if(router.hasRoute(el)) {
      router.removeRoute(el)
    }
  })
  
}

const clearData = () => {
  const tokenStore = useTokenStore()
  const userStore = useUserStore()
  
  tokenStore.deleteToken()
  userStore.deleteUser()
}


const logOutLogic = () => {

  router.replace('/login')

  removeDynamicRoutes()

  clearData()

}




export default logOutLogic