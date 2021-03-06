import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import _ from 'lodash';

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { formatDate,parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
import dictionarySelect from "@/components/select/dictionarySelect";
import dictionaryName from "@/components/select/dictionaryName";
import districtArea from "@/components/select/districtArea";
import uploadImg from "@/components/upload/uploadImg";
import menuTree from "@/views/system/menu/menuTree";
//自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
import autoIcon from "@/views/system/menu/autoIcon";


// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.formatDate = formatDate

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('menuTree', menuTree)
Vue.component('autoIcon', autoIcon)
Vue.component('dictionarySelect', dictionarySelect)
Vue.component('districtArea', districtArea)
Vue.component('dictionaryName', dictionaryName)
Vue.component('uploadImg', uploadImg)

import Preview from '@/components/imgShow/imgShow.js';
Vue.use(Preview);
Vue.use(permission)

/*import Swiper from "swiper";
import 'swiper/dist/css/swiper.css';
Vue.use(Swiper)*/


import  QuillEditor from  "vue-quill-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(QuillEditor)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
