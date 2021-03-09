import request from '@/utils/request'


export function queryList(data) {
  return request({
    url: '/recommend/list',
    method: 'post',
    data: data
  })
}


export function delPage(data) {
  return request({
    url: '/recommend/del',
    method: 'post',
    data: data
  })
}


export function auditPage(data) {
  return request({
    url: '/recommend/audit',
    method: 'post',
    data: data
  })
}
