<template>
  <el-tree
    ref="tree"
    :props="defaultProps"
    :data="data"
    :show-checkbox="checkbox"
    :default-expanded-keys="expandKeys"
    :node-key="key"
    check-strictly
    :expand-on-click-node="clickExpend"
    @node-expand="expandClick"
    @node-click="nodeClick"
    @check-change="funHandel">
    <span class="custom-tree-node" style="float: right" slot-scope="{ node, data }">
      <span><auto-icon v-if="data.icon" disabled :config="{type:data.icon,onlyIcon:true}"></auto-icon> &nbsp;{{ node.label }}</span>
      <span v-if="config.buts">
        <component
          v-for="(con,index) in config.buts"
          :key="index+'icon'"
          :value="data"
          v-show="!con.leafAction || !(data.children && data.children.length>0)"
          :is="con.componentType"
          :config="con.config"></component>
      </span>
    </span>
  </el-tree>
</template>

<script>
// 选择器 中数据列表
export default {
  name: 'menuTree',
  props:{
    value : {
      type: [String, Object, Boolean, Number,Array],
      default(){
        return []
      }
    },
    config:{
      type:Object,
      default(){
        return {}
      }
    },
  },
  data(){
    return{
      nodeClick2:() => {},
      expandKeys:[],
      checkbox:true,
      data:[],
      defValue:[],
      key:'key',
      clickExpend:false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created(){
    this.init();
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(this.defValue);
  },
  watch:{
    value:{
      handler:function (val) {
        if(typeof val !== 'string'){
          this.$refs.tree.setCheckedKeys(val);
        }
      },
      deep:true
    },
    config:{
      handler:function (val) {
        this.data = val.data;
      },
      deep:true
    }
  },
  methods: {
    init(){
      if(this.config.key){
        this.key=this.config.key;
      }
      if(this.config.data){
        this.data = this.config.data;
      }
      if(this.config.props){
        this.defaultProps.label=this.config.props.label;
      }
      if(this.config.expandKeys){
        this.expandKeys=this.config.expandKeys;
      }
      if(typeof this.config.checkbox != 'undefined'){
        this.checkbox=this.config.checkbox;
      }
      if(typeof this.config.clickExpend != 'undefined'){
        this.clickExpend=this.config.clickExpend;
        this.nodeClick2 = this.cli
      }
      this.defValue = this.value;
    },
    funHandel(val,b,c) {
      this.defValue = this.$refs.tree.getCheckedKeys();
      this.$emit('input', this.defValue);
    },
    nodeClick(data,node){
      if(this.config.nodeClick){
        this.config.nodeClick(data,node);
      }
    },
    expandClick(data,node){
      if(this.clickExpend && this.config.nodeClick){
        this.config.nodeClick(data,node);
      }
    },
  }
}
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>
