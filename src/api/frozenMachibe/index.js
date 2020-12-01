import request from '@/utils/request'


// 列表
export function listPage(query) {
  return request({
    url: 'frozenMachibeNew/list',
    method: 'post',
    data: query
  })
}
//发布
export function addPage(data) {
  return request({
    url: '/frozenMachibeNew/add',
    method: 'post',
    data: data
  })
}
//查看
export function queryPage(data) {
  return request({
    url: '/frozenMachibeNew/queryId',
    method: 'post',
    data: data
  })
}

//删除
export function delPage(data) {
  return request({
    url: '/frozenMachibeNew/del',
    method: 'post',
    data: data
  })
}
//修改
export function updPage(data) {
  return request({
    url: '/frozenMachibeNew/upd',
    method: 'post',
    data: data
  })
}
//导出
export function exportExcel(data) {
  return request({
    url: '/frozenMachibeNew/export',
    method: 'post',
    data: data
  })
}



