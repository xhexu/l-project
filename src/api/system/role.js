import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/sysrole/listPage',
    method: 'get',
    params: query
  })
}
//角色绑定菜单
export function bidRoleMenu(data) {
  return request({
    url: '/sysrolemenu/bidRoleMenu',
    method: 'post',
    data: data
  })
}
//查询角色绑定的菜单
export function queryRoleMenu(data) {
  return request({
    url: '/sysrolemenu/queryRoleMenu',
    method: 'post',
    data: data
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: '/sysrole/add',
    method: 'post',
    data: data
  })
}
// 删除角色
export function delRole(roleId) {
  let data={}
  data.ids=roleId.toString()
  return request({
    url: '/sysrole/delete',
    method: 'post',
    data:data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/sysrole/update',
    method: 'post',
    data: data
  })
}
// 查询角色详细
export function getRole(roleId) {
  let data={}
  data.id=roleId
  return request({
    url: '/sysrole/detail',
    method: 'post',
    data:data
  })
}
// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}



// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}
// 查询角色绑定的用户
export function queryRoleUser(data) {
  return request({
    url: '/sysuserrole/queryRoleUser',
    method: 'post',
    data: data
  })
}
//删除角色用户
export function deleteRoleUser(data) {
  return request({
    url: '/sysuserrole/deleteRoleUser',
    method: 'post',
    data: data
  })
}
//删除角色用户
export function queryRoleUserByName(data) {
  return request({
    url: '/sysuserrole/queryRoleUserByName',
    method: 'post',
    data: data
  })
}

//新增角色用户
export function addRoleUser(data) {
  return request({
    url: '/sysuserrole/addRoleUser',
    method: 'post',
    data: data
  })
}
