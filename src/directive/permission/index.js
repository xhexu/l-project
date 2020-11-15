import hasRole from './hasRole'
import hasPermi from './hasPermi'
import autoHeight from './autoHeight'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive('adaptive', autoHeight)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  window['adaptive'] = autoHeight
  Vue.use(install); // eslint-disable-line
}

export default install
