import request from '@/utils/request'


// 列表
export function listPage(query) {
  return request({
    url: 'iceMachibeNew/list',
    method: 'post',
    data: query
  })
}
//发布
export function addPage(data) {
  return request({
    url: '/iceMachibeNew/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/iceMachibeNew/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/iceMachibeNew/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/iceMachibeNew/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/iceMachibeNew/export',
    method: 'post',
    data: data
  })
}

//审核
export function auditPage(data) {
  return request({
    url: '/iceMachibeNew/audit',
    method: 'post',
    data: data
  })
}



