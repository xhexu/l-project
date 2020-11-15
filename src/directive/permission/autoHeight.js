import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
const doResize = async(el, binding, vnode) => {
    const { componentInstance: $table } = await vnode
    const { value } = binding
    if (!$table.height) {
      throw new Error(`表格必须设置height,比如height="100px"`)
    }
    const bottomOffset = (value && value.bottomOffset) || 40//底部分页组件高度
    if (!$table) return
    const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
    $table.layout.setHeight(height)
    $table.doLayout()
}
export default {
    bind(el, binding, vnode) {
        el.resizeListener = async() => {
          await doResize(el, binding, vnode)
        }
        addResizeListener(el, el.resizeListener)
        addResizeListener(window.document.body, el.resizeListener)
    },
    unbind(el) {
        removeResizeListener(el, el.resizeListener)
    },
    async insert(el, binding, vnode){
        await doResize(el, binding, vnode)
    }
}