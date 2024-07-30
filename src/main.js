import './assets/css/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import dayFormat from '@/utils/dayFormat'
import './permission'  // 导航守卫（登录鉴权）
import { permission } from '@/directives/index'

const app = createApp(App)
app.provide('dayFormat', dayFormat)
app.directive('permission', permission)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')


