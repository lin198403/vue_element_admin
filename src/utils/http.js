import request from './request'

const http = {
  
  // post
  post: (url, data = {}) => {
    return request({
      method: 'post',
      url,
      data
    })
  },


  // get
  get: (url, params = {}) => {
    return request({
      method: 'get',
      url,
      params
    })
  }
}

export default http