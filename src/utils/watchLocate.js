import { watch } from 'vue'
import useLocaleStore from "@/stores/locale"

const watchLocate = (callback = () => {}, immediate = {} ) => {

  const localeStore = useLocaleStore()

  watch(
    () => localeStore.locale,
    (cur, prev) => {
      callback(cur, prev) 
    },
    immediate
  )
}

export default watchLocate