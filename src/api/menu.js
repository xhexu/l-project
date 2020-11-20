import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}




export function listMenu(query){
  return request({
    url:'/sysmenu/listPage',
    method:'get',
    params:query,
  })

}

export function updateMenu(query){
  return request({
    url:'/sysmenu/listPage',
    method:'post',
    params:query,
  })

}

export function getMenu(query){
  return request({
    url:'/sysmenu/tree',
    method:'get',
    params:query,
  })

}
