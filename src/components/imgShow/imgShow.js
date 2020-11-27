
import imgShow from './imgShow.vue';
// 定义插件对象
const Preview = {};
// vue的install方法，用于定义vue插件
Preview.install = function (Vue, options) {
  const PreviewViewInstance = Vue.extend(imgShow);
  let current;
  const initInstance = () => {
    // 实例化vue实例
    current = new PreviewViewInstance();
    let msgBoxEl = current.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$showImg = (url,index) => {
    if (!current) {
      initInstance();
    }
    current.showImg(url,index)
  };
};
export default Preview;
