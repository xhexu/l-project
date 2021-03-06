import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import router from '../../router'

const permission = {
  state: {
    routes: constantRoutes,
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit },data) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters(data).then(res => {
          res.result = res.result.sort(compareFn)
          let menuData = treeDataFormat(res.result)
          const accessedRoutes = filterAsyncRouter(menuData)
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }
  }
}
function compareFn(obj1,obj2){
  var val1 = obj1.level;
  var val2 = obj2.level;
  if (val1 < val2) {
      return -1;
  } else if (val1 > val2) {
      return 1;
  } else {
      return 0;
  }
}
function treeDataFormat(data){
  let treeData = []
  data.forEach(item=>{
      item.children = []
      item.path = item.url
      item.meta = {
        title: item.name,
        icon: item.icon||'tree-table',
        noCache: false,
        affix: false
      }
      if(item.type == 'MENU'){
        if(item.level == 1){
          treeData.push(item)
        }else if(item.level == 2){
            let _index = treeData.findIndex(tr=>{
                return tr.code == item.parentCode
            })
            if(_index>-1){
                treeData[_index].children.push(item)
            }else{
                treeData.children = []
                treeData.children.push(item)
            }
        }else if(item.level == 3){//菜单只考虑到3级，未作递归处理
            for(let i=0;i<treeData.length;i++){
                let tr = treeData[i]
                let _index = tr.children.findIndex(t=>{
                    return t.code == item.parentCode
                })
                if(_index>-1){
                    tr.children[_index].children.push(item)
                }
            }
        }
      }
  })
  return treeData
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    // debugger
    if(route.url == '/platform'){
      route.children.push({
        path: '/banner/bannerDetail',
        component: (resolve) => require(['@/views/bannerDetail/index'], resolve),
        name: 'bannerDetail',
        meta: { title: '轮播详情', icon: 'dashboard', noCache: true, affix: false },
        hidden: true,
      })
    }
    // if(route.children.length == 0){
    //   route.alwaysShow = true
    // }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
