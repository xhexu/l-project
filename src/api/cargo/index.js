import request from '@/utils/request'

// 查询货主列表
export function shipperAllList(query) {
  return request({
    url: '/shipper/list',
    method: 'post',
    data: query
  })
}
// 货主注册
export function register(data) {
  return request({
    url: '/bsecompanygoods/register',
    method: 'post',
    data: data
  })
}
// 验证码
export function sendVifCode(data) {
  var param={}
  param.phone=data
  return request({
    url: '/user/sendSmsVifCode',
    method: 'post',
    data: param
  })
}
//货主审核
export function auditShipper(query) {
  return request({
    url: '/shipper/audit',
    method: 'post',
    data: query
  })
}

//货主新增
export function addShipper(query) {
  return request({
    url: '/shipper/add',
    method: 'post',
    data: query
  })
}
//货主注册
export function cargoRegistry(data){
  return request({
    url: '/bsecompanygoods/reg',
    method: 'post',
    data: data
  })
}
