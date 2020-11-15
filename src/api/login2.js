import request from '@/utils/request'

// 登录方法
export function login(loginObj) {
  return request({
    url: '/user/login',
    method: 'get',
    params: loginObj
  })
}
// 获取用户详细信息
export function getInfo(params) {
  return request({
    url: '/user/getuserinfo',
    method: 'post',
    data:params
  })
}