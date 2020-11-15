import request from '@/utils/request'

// 查询司机列表
export function listDriver(query) {
  return request({
    url: '/driver/list',
    method: 'post',
    data: query
  })
}

export function bindVehicle(data) {
    return request({
      url: '/driver/bindVehicle',
      method: 'get',
      params: data
    })
}