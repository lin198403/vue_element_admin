import http from "./utils/http"

// 登录
export function loginApi(data) {
  return http.post('/sys/login', data)
}

// 获取用户信息
export function profileApi() {
  return http.get('/sys/profile')
}

// 获取项目功能
export function userFeatureApi() {
  return http.get('/user/feature')
}

// 获取项目章节
export function userChapterApi() {
  return http.get('/user/chapter')
}

// 获取员工列表
export function userManageListApi(params) {
  return http.get('/user-manage/list', params)
}

// 新增员工 (Excel import)
export function userManageImportApi(data) {
  return http.post('/user-manage/batch/import', data)
}

// 通过 id，删除用户
export function userManageDeteleByIdApi(id) {
  return http.get(`/user-manage/detele/${id}`)
}


// 通过id，获取用户详情
export function userManageDetailByIdApi(id) {
  return http.get(`/user-manage/detail/${id}`)
}

// 获取所有角色
export function roleListApi() {
  return http.get('/role/list')
}

// 获取所有权限
export function permissionListApi() {
  return http.get('/permission/list')
}

// 通过id，给某个用户分配角色
export function updateRoleApi(userId, data) {
  return http.post(`/user-manage/update-role/${userId}`, data)
}

// 通过id，获取某个角色的已有权限
export function rolePermissionByIdApi(roleId) {
  return http.get(`/role/permission/${roleId}`)
}

// 通过id.给某个角色分配权限
export function roleDistributePermissionByIdApi(data) {
  return http.post(`/role/distribute-permission`, data)
}

// 获取文章列表
export function articleListApi(params) {
  return http.get(`/article/list`, params)
}

// 修改文章排序
export function articleSortApi(data) {
  return http.post('/article/sort', data)
}

// 通过 id，删除文章
export function articleDeleteApi(id) {
  return http.get(`/article/delete/${id}`)
}


// 通过 id，获取文章详情
export function articleDetailApi(id) {
  return http.get(`/article/${id}`)
}

// 创建文章
export function articleCreateApi(data) {
  return http.post(`/article/create`, data)
}

// 编辑文章
export function articleEditApi(data) {
  return http.post(`/article/edit`, data)
}