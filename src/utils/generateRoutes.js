import { privateRoutes } from '@/router'

const hasPermission = (route, roles) => {
  if(route?.meta?.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }

  if(route.name === 'NotFound') {
    return true
  }
}


const filterDynamicRoutes = (routes, roles) => {

  const res = []

  routes.forEach(route => {

    if(hasPermission(route, roles)) {

      const { children = undefined, ...other } = route
      
      res.push(other)

      if(children) {
        
        res[res.length - 1].children = filterDynamicRoutes(children, roles)
       
      }
    }
  })

  return res
  
}

const generateRoutes = roles => {
 
  return filterDynamicRoutes(privateRoutes, roles)

}

export default generateRoutes