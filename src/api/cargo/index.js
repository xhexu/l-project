import request from '@/utils/request'

// 查询货主列表
export function shipperAllList(query) {
  return request({
    url: '/order/shipperAllList',
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