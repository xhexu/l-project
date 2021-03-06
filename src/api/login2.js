import request from '@/utils/request'

// 登录方法
export function login(loginObj) {
  return request({
    url: '/user/login',
    method: 'get',
    params: loginObj
  })
}
//选择用户进行登录
export function selectUser(data) {
  return request({
    url: '/user/selectUser',
    method: 'post',
    data: data
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
//获取短信验证码
export function getVifCode(params) {
  return request({
    url: '/user/sendSmsVifCod',
    method: 'post',
    data:params
  })
}