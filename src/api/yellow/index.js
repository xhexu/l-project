import request from '@/utils/request'

// 黄页列表
export function listYellowPage(query) {
  return request({
    url: '/driver/list',
    method: 'post',
    data: query
  })
}