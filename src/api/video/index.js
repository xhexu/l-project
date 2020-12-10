import request from '@/utils/request'


// 黄页列表
export function listPage(query) {
  return request({
    url: 'videoShow/list',
    method: 'post',
    data: query
  })
}
//发布黄页
export function addPage(data) {
  return request({
    url: '/videoShow/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/videoShow/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/videoShow/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/videoShow/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/videoShow/export',
    method: 'post',
    data: data
  })
}
//审核
export function auditPage(data) {
  return request({
    url: '/businessInfo/audit',
    method: 'post',
    data: data
  })
}


