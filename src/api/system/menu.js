import request from '@/utils/request'
import de from "element-ui/src/locale/lang/de";

export const systemMenuType = [
  { code: 'MENU', name: '菜单' },
  { code: 'BUTTON', name: '按钮' },
  { code: 'PAGE', name: '页面' },
];
// 查询菜单树
export function menuTreeAll(query) {
  return request({
    url: '/sysmenu/treeAll',
    method: 'post',
    params: query
  })
}


// 查询菜单详细
export function getMenu(data) {

  return request({
    url: '/sysmenu/detail',
    method: 'post',
    data:data
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sysmenu/add',
    method: 'post',
    data: data
  })
}// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/sysmenu/update',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(param) {
  let data={
    ids:param.id.toString()
  }
  return request({
    url: '/sysmenu/delete' ,
    method: 'post',
    data:data
  })
}




// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/sysmenu/listPage',
    method: 'get',
    params: query
  })
}

export function getTree(query){
  return request({
    url:'/sysmenu/tree',
    method:'post',
    params:query,
  })

}


// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}



