import request from '@/utils/request'


// 黄页列表
export function listYellowPage(query) {
  return request({
    url: 'follower/list',
    method: 'post',
    data: query
  })
}
//发布黄页
export function addYellowPage(data) {
  return request({
    url: '/follower/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/follower/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/follower/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/follower/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/follower/export',
    method: 'post',
    data: data
  })
}

//审核
export function auditPage(data) {
  return request({
    url: '/follower/audit',
    method: 'post',
    data: data
  })
}

