import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/shipper/orderList',
    method: 'get',
    params: query
  })
}
//发布订单
export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data: data
  })
}
//查看报价
export function queryPrice(data) {
  return request({
    url: '/shipper/queryPrice',
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
