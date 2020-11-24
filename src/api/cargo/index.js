import request from '@/utils/request'

// 查询货主列表
export function shipperAllList(query) {
  return request({
    url: '/shipper/list',
    method: 'post',
    data: query
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