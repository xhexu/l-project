import request from '@/utils/request'

// 查询订单列表
export function listUserAddr(query) {
    return request({
      url: '/userAddr/list',
      method: 'post',
      data: query
    })
}

export function addUserAddr(query) {
    return request({
      url: '/userAddr/add',
      method: 'post',
      data: query
    })
}

export function modifyUserAddr(query) {
    return request({
      url: '/userAddr/modify',
      method: 'post',
      data: query
    })
}

export function deleteUserAddr(query) {
    return request({
      url: '/userAddr/delete',
      method: 'post',
      data: query
    })
}