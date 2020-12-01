<template>
  <span>{{name}}</span>
</template>

<script>
import common from '../../commom/common.js'
export default {
  name: "dictionaryName",
  props: {
    value: { //数据字典父选项选项的编号
      required: true
    },
    optionName: { //数据字典父选项选项的编号
      type: String,
      required: true
    }
  },
  computed:{
    name: function () {
      if(this.value||this.value=='0') {
        return common.dictionary.getName(this.optionName, this.value);
      }
      return null;
    }
  }
}
</script>

<style scoped>

</style>
