<template>
  <el-cascader
    size="small"
    placeholder="请输入关键词"
    :options="districtArea"
    :clearable=true
    v-model="currentValue"
    @change="handleChange"
    filterable
  ></el-cascader>
</template>

<script>

  import request from '@/utils/request'

  export default {
    props: {
      value: {},
      callback: Function,
      needCallBack: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // districtArea=[]
      currentValue: {
        // 动态计算currentValue的值
        get: function () {
          if (!this.value) {
            return [];
          }
          if (Array.isArray(this.value)) {
            return this.value;
          } else {
            return this.value.split(",");
          }
        },

        set: function (val) {
          this.$emit('input', val); // 通过$emit触发父组件
        }
      }
    },
    created() {
      this.getAreaData()
    },
    data() {
      return {
        districtList: [],
        districtArea: []
      }
    },
    methods: {
      getAreaData() {
        request({
          url: 'district/commonOptionArea',
          method: 'get',
        }).then(res => {
            if (res.success) {
              this.districtArea = res.result
            }
          }
        )
      },
      handleChange(val) {
        let vm = this;
        if (vm.needCallBack) {
          let prov = '';
          let city = '';
          let area = '';

          if (val && val.length == 3) {
            vm.districtArea.forEach(item => {
              vm.traverseTree(item);
            });

            vm.districtList.forEach(item => {
              if (item.value == val[0]) {
                prov = item.label;
              }
              if (item.value == val[val.length - 2]) {
                city = item.label;
              }
              if (item.value == val[val.length - 1]) {
                area = item.label;
              }
            });

            vm.callback(prov + city + area); // 将参数传回父组件中的回调函数
          }
        }
      },
      traverseNode(node) {
        let district = {}
        district.value = node.value;
        district.label = node.label;
        this.districtList.push(district);
      },
      traverseTree(node) {
        if (!node) {
          return;
        }
        this.traverseNode(node);
        if (node.children && node.children.length > 0) {
          var i = 0;
          for (i = 0; i < node.children.length; i++) {
            this.traverseTree(node.children[i]);
          }
        }
      }
    }
  }
</script>

