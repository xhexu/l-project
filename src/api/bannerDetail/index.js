import request from '@/utils/request'


// 列表
export function listPage(query) {
  return request({
    url: 'banner/list',
    method: 'post',
    data: query
  })
}
//新增
export function addPage(data) {
  return request({
    url: 'banner/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: 'banner/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: 'banner/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: 'banner/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/businessInfo/export',
    method: 'post',
    data: data
  })
}



