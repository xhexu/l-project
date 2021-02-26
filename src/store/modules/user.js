// import { login, logout, getInfo } from '@/api/login'
import * as API from "@/api/login2";
import { getToken, setToken,setUsers,getUsers, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    users:[],
    userInfo:{},
    name: '',
    avatar: '',
    roles: [],//todo..后期对接动态菜单时实现
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_USERINFO: (state, users) => {
      state.userInfo = users
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, obj) {
      delete obj.rememberMe
      return new Promise((resolve, reject) => {
        API.login(obj).then(res => {
          if(res.success){
            setToken(res.result.jwt)
            setUsers(res.result.users)
            commit('SET_TOKEN', res.token)
            commit('SET_USERS', res.result.users)
            resolve(res.result.users)
          }else{
            resolve([])
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        let loginUserId = getUsers()//state.users[0].userId
        API.getInfo({loginUserId}).then(res => {
          const user = res.result
          const avatar = require("@/assets/image/default.png") //process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          // commit('SET_USERINFO',user)
          commit('SET_NAME', user.name)
          commit('SET_AVATAR', avatar)
          resolve(res)

        }).catch(error => {
          reject(error)
        })
      })
    },

    //todo...退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resolve()

        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   commit('SET_PERMISSIONS', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
