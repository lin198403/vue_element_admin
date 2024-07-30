import axios from "axios"
import useTokenStore from "@/stores/token"
import useLocaleStore from "@/stores/locale"
import logOutLogic from "@/logic/logOutLogic"


const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})


// request interceptor
service.interceptors.request.use(config => {

  // 设置 Accept-Language
  const localeStore = useLocaleStore()
  config.headers['Accept-Language'] = localeStore.locale

  // 请求头添加 icode 属性
  config.headers.icode = 'helloqianduanxunlianying'
  
  // 请求头添加 token
  if(config.url !== '/sys/login') {
    const tokenStore = useTokenStore()
    config.headers.Authorization = `Bearer ${tokenStore.token}`
  }
  
  return config

}, error => {

  return Promise.reject(error)

})


// response interceptor
service.interceptors.response.use(response => {

  // 2xx

  const { data: { data, message, success } } = response
  
  return Promise.resolve({ data, message, success })

}, error => {
  console.log(error)
  console.log(error.response)
 
  const { status, data, config: { url, baseURL }} = error.response

  // 401
  if(status === 401) {
    logOutLogic()
  }
  
  ElNotification({
    type: 'error',
    title: 'Error',
    message: `接口请求失败：${data.message} (${status})\n${baseURL}${url}`
  })
  
  return Promise.reject(error)

})


export default service