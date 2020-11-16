import request from '@/utils/request'

// 查询货主列表
export function shipperAllList(query) {
  return request({
    url: '/order/shipperAllList',
    method: 'post',
    data: query
  })
}

export function addOrder(data) {
    return request({
      url: '/order/add',
      method: 'post',
      data: data
    })
}