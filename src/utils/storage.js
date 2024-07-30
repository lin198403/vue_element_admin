
// 设置
const setItem = (key, value) => {

  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
  
}


// 获取
const getItem = key => {
  return localStorage.getItem(key)
}


// 删除某一个
const removeItem = key => {
  localStorage.removeItem(key)
}


// 删除所有
const clear = () => {
  localStorage.clear()
}

export {
  setItem,
  getItem,
  removeItem,
  clear
}