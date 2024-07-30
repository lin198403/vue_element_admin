import { defineStore } from 'pinia'
import { ref } from 'vue'

const userMenuStore = defineStore('menu', () => {

  const menu = ref([])

  const setMenu = routes => {

    const filterRoutes = routes.filter(el => el.path.match(/^\/[\w]+$/)) 
    menu.value = generationData(filterRoutes)

  }

  return { menu, setMenu }

})



function generationData (filterRoutes, parentPath = '') {
  
  const whiteList = ['import', 'userInfo/:id', 'articleDetail/:id', 'articleEdit/:id']

  const arr = []

  filterRoutes.forEach(el => {
    
    if(JSON.stringify(el.meta) !== '{}' && JSON.stringify(el.meta) !== undefined && whiteList.indexOf(el.path) === -1) {
      arr.push({
        path: parentPath ? `${parentPath}/${el.path}` : el.path,
        icon: el.meta.icon,
        title: el.meta.title
      })

      if(JSON.stringify(el.children) !== '[]' && JSON.stringify(el.children) !== undefined) {

        arr[arr.length-1].children = generationData(el.children, el.path)
        
      }

    } else {

      if(JSON.stringify(el.children) !== '[]' && JSON.stringify(el.children) !== undefined) {

        arr.push(...generationData(el.children, el.path))

      }

    }

  })

  return arr
}

export default userMenuStore