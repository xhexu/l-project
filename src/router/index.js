import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },

  {
    path: '/retrievePassword',
    component: (resolve) => require(['@/views/password'], resolve),
    hidden: true
  },
  {
    path: '/cargo-registry',
    component: (resolve) => require(['@/views/cargo/registry'], resolve),
    hidden: true
  },
  {
    path: '/protocol',
    component: (resolve) => require(['@/views/protocol'], resolve),
    hidden: true
  },
  /*{
    path: '',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'order',
        component: (resolve) => require(['@/views/order/index'], resolve),
        name: 'Order',
        meta: { title: '订单管理', icon: 'dashboard', noCache: false, affix: false }
      }
    ]
  },*/
  {
    path: '/information',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '信息发布', icon: 'tree-table', noCache: false, affix: false },
    children: [
      {
        path: 'businessInfo',
        component: (resolve) => require(['@/views/businessInfo/index'], resolve),
        name: 'BusinessInfo',
        meta: { title: '招商信息', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'needShop',
        component: (resolve) => require(['@/views/needShop/index'], resolve),
        name: 'NeedShop',
        meta: { title: '求购信息', icon: 'dashboard', noCache: false, affix: false }
      },

    ]
  },
  {
    path: '/businessManage',
    component:  Layout,
    redirect: 'noredirect',
    meta:{title:'企业管理',icon: 'tree-table', noCache: false, affix: false},
    children: [
      {
        path: 'yellowpage',
        component: (resolve) => require(['@/views/yellowpage/index'], resolve),
        name: 'Yellowpage',
        meta: { title: '厂家黄页', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'distribution',
        component: (resolve) => require(['@/views/distribution/index'], resolve),
        name: 'Distribution',
        meta: { title: '分销客户', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'frozenMachibe',
        component: (resolve) => require(['@/views/frozenMachibe/index'], resolve),
        name: 'FrozenMachibe',
        meta: { title: '冻品机械', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'frozenIngredient',
        component: (resolve) => require(['@/views/frozenIngredient/index'], resolve),
        name: 'FrozenIngredient',
        meta: { title: '冻品配料', icon: 'dashboard', noCache: false, affix: false }
      },

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'frozen',
    children: [{
      path: 'frozen',
      component: (resolve) => require(['@/views/frozen/index'], resolve),
      name: 'Frozen',
      meta: {title: '产品管理', icon: 'dashboard', noCache: false, affix: false}
    }]
  },
  {
    path: '/logistics',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '物流信息', icon: 'tree-table', noCache: false, affix: false },
    children: [
      {
        path: 'releasegoods',
        component: (resolve) => require(['@/views/releaseGoods/index'], resolve),
        name: 'releasegoods',
        meta: { title: '货源发布', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'vehicle',
        component: (resolve) => require(['@/views/vehicle/index'], resolve),
        name: 'releasegoods',
        meta: { title: '查找车源', icon: 'dashboard', noCache: false, affix: false }
      }
    ]
  },

  {
    path: '/platform',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '平台运营', icon: 'tree-table', noCache: false, affix: false },
    children: [
      {
        path: 'cargo',
        component: (resolve) => require(['@/views/cargo/index'], resolve),
        name: 'Cargo',
        meta: { title: '货主管理', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'driver',
        component: (resolve) => require(['@/views/driver/index'], resolve),
        name: 'Driver',
        meta: { title: '司机管理', icon: 'dashboard', noCache: false, affix: false }
      },
      {
        path: 'report',
        component: (resolve) => require(['@/views/report/index'], resolve),
        name: 'Peport',
        meta: { title: '营运报表', icon: 'build', noCache: false, affix: false }
      }
    ]
  },
  {
    path: '/system',
    redirect: 'noredirect',
    component: Layout,
    meta: { title: '系统管理', icon: 'tree-table', noCache: false, affix: false },
    children: [
      {
        path: 'user',
        component: (resolve) => require(['@/views/system/user/index'], resolve),
        name: 'User',
        meta: { title: '用户管理', icon: 'tree', noCache: false, affix: false }
      },{
        path: 'role',
        component: (resolve) => require(['@/views/system/role/index'], resolve),
        name: 'Role',
        meta: { title: '角色管理', icon: 'peoples', noCache: false, affix: false }
      },{
        path: 'menu',
        component: (resolve) => require(['@/views/system/menu/index'], resolve),
        name: 'Menu',
        meta: { title: '菜单管理', icon: 'tree-table', noCache: false, affix: false }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/dict',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'type/data/:dictId(\\d+)',
  //       component: (resolve) => require(['@/views/system/dict/data'], resolve),
  //       name: 'Data',
  //       meta: { title: '字典数据', icon: '' }
  //     }
  //   ]
  // },
  // {
  //   path: '/job',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'log',
  //       component: (resolve) => require(['@/views/monitor/job/log'], resolve),
  //       name: 'JobLog',
  //       meta: { title: '调度日志' }
  //     }
  //   ]
  // },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
