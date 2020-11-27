import request from '@/utils/request'


// 黄页列表
export function listPage(query) {
  return request({
    url: 'iceMachibe/list',
    method: 'post',
    data: query
  })
}
//发布黄页
export function addPage(data) {
  return request({
    url: '/iceMachibe/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/iceMachibe/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/iceMachibe/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/iceMachibe/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/iceMachibe/export',
    method: 'post',
    data: data
  })
}



