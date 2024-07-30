import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zhCn from './lang/zh-cn'

import pinia from '@/utils/pinia'
import useLocaleStore from '@/stores/locale'
const localeStore = useLocaleStore(pinia)

const i18n = createI18n({
  legacy: false,
  locale: localeStore.locale,
  messages: {
    en,
    zhCn
  }
})

export default i18n