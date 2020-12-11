import request from '@/utils/request'


// 列表
export function listPage(query) {
  return request({
    url: 'iceDose/list',
    method: 'post',
    data: query
  })
}
//发布
export function addPage(data) {
  return request({
    url: '/iceDose/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/iceDose/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/iceDose/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/iceDose/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/iceDose/export',
    method: 'post',
    data: data
  })
}
//审核
export function auditPage(data) {
  return request({
    url: '/iceDose/audit',
    method: 'post',
    data: data
  })
}




