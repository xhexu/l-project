import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'Users-List'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setUsers(token) {
  return Cookies.set(UserKey, token)
}
export function getUsers() {
  return Cookies.get(UserKey)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
