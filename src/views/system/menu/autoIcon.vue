<template>
  <div class="auto-icon" :class="{'show-color':!disabled}" @click.stop="funHandel">
    <SvgIcon style="min-width: 29px" v-if="iconType === 'svg'" :icon-class="iconClass"></SvgIcon>
    <i  v-if="iconType === 'icon'" :class="iconClass"></i>
    <span v-if="!onlyIcon"> {{config.text || value || ''}}</span>
  </div>
</template>

<script>
// grid 中操作按钮  ; grid 操作列，
import SvgIcon from '@/components/SvgIcon/index';
export default {
  name: 'AutoIcon',
  components:{
    SvgIcon
  },
  props:{
    value : {
      type: [String, Object, Boolean, Number],
      default : ''
    },
    config:{
      type:[Object,String],
      default(){
        return {}
      }
    },
    disabled:{
      type: Boolean,
      default(){
        return false
      }
    }
  },
  data(){
    return{
      iconType:'',
      iconClass:'icon',
      onlyIcon:false
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch:{
    config:{
      handler:function (val) {
        this.setConfig(val);
      }
    }
  },
  created() {
    this.setConfig(this.config);
  },
  methods: {
    funHandel() {
      if(this.config.clickFun){
        this.config.clickFun(this.config.row||this.value,this.value);
      }
    },
    setConfig(con){
      if(con.onlyIcon){
        this.onlyIcon = con.onlyIcon;
      }
      let iconClass_ = con.type;
      if(iconClass_){
        if(iconClass_.indexOf('el-icon') > -1){
          this.iconType='icon';
        }else{
          this.iconType = 'svg';
        }
        this.iconClass = iconClass_;
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.auto-icon {
  padding: 0;
  float: left;
  text-align: center;
  min-width: 30px;
}
.show-color{
  color:#FF7B23;
  cursor:pointer;
  &:hover {
    color: #FF7B23;
  }
}
</style>
