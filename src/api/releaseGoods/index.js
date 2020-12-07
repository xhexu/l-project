import request from '@/utils/request'

// 查询货源列表
export function listOrder(query) {
  return request({
    url: '/supplyGoods/list',
    method: 'get',
    params: query
  })
}
//发布订单
export function addGoods(data) {
  return request({
    url: '/supplyGoods/add',
    method: 'post',
    data: data
  })
}
//删除货源
export function delGoods(data) {
  return request({
    url: '/supplyGoods/delete',
    method: 'post',
    data: data
  })
}
//定向指派
export function shipperAssign(data) {
  return request({
    url: '/shipper/assign',
    method: 'post',
    data: data
  })
}
