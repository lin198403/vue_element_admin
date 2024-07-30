import useUserStore from '@/stores/user'

const hasPermission = (value = '') => {
  const userStore = useUserStore()
  return userStore.user.permission.points.includes(value)
}


const permission = (el, binding) => {
  const { value } = binding
  if(!hasPermission(value)) {
    el?.parentElement?.removeChild(el)
  }
}

export default permission