<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          系统菜单
        </div>
        <menu-tree :config="treeConfig"></menu-tree>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card" shadow="never">
      <div class="content-wrapper">
        <el-form v-if="!hidden" ref="form" size="small" :model="model" :rules="rules" label-width="100px">
          <el-form-item label="当前操作">
            {{ this.mode === 'edit' ? '修改菜单' : '新增菜单' }}
          </el-form-item>
          <el-form-item label="编号:" prop="code">
            <el-input v-model="model.code" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称:" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="父级编码" prop="parentCode">
            <el-input v-model="model.parentCode"></el-input>
          </el-form-item>
          <el-form-item label="类型:" prop="type">
          <dictionary-select v-model="model.type" :dataSource="systemMenuType" styles="width: 100%"></dictionary-select>
          </el-form-item>
          <el-form-item label="路径:" prop="url">
            <el-input v-model="model.url"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序:" prop="sort">
            <el-input-number v-model="model.sort" style="width: 100px;"></el-input-number>
          </el-form-item>
          <el-form-item label="显示图标:" prop="icon">
            <el-input v-model="model.icon"></el-input>
          </el-form-item>
          <el-form-item label="级别:" prop="level">
            <el-input-number v-model="model.level" style="width: 100px;"></el-input-number>
          </el-form-item>
          <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
        <el-alert v-else title="根节点不可修改" type="error" :closable="false"></el-alert>
      </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as API from "@/api/system/menu";
// import menuTree from "./menuTree";

export default {
  name: 'menuItem',
  components: {},
  data() {
    return {
      systemMenuType:[
        { code: 'MENU', name: '菜单' },
        { code: 'BUTTON', name: '按钮' },
        { code: 'PAGE', name: '页面' },
      ],
      queryParams: {
        systemCode: 'LWEB'
      },
      treeConfig: {
        expandKeys: ['root'],
        checkbox: false,
        key: 'code',
        props: {
          children: 'children',
          label: 'name'
        },
        data: [],
        buts: [{
          componentType: 'auto-icon',
          config: {type: 'el-icon-delete', clickFun: this.deleteFun, onlyIcon: true}, leafAction: true
        }, {
          componentType: 'auto-icon',
          config: {type: 'el-icon-circle-plus', clickFun: this.addFormShow, onlyIcon: true}, leafAction: false
        }],
        nodeClick: this.nodeClick
      },
      hidden: false,
      mode: 'new',
      model: {
        id: undefined,
        code: undefined,
        name: undefined,
        parentCode: undefined,
        type: undefined,
        url: undefined,
        sort: 0,
        icon: undefined,
        level: undefined,
      },
      rules: {
        name: [{required: true, message: '名称不能为空', trigger: 'change'}],
        url: [{required: true, message: '路径不能为空', trigger: 'change'}],
        sort: [{required: true, message: '顺序不能为空', trigger: 'change'}],
      },
    }
  },
  mounted() {
    let vm = this;
    vm.getTree()

  },
  methods: {
    getTree() {
      API.menuTreeAll(this.queryParams).then(
        response => {
          if (response.success) {
            function converDtreeData1(params) {
              params = params || {};
              var parentVal = params.parentVal; // 默认 null
              var level = params.level || 1;
              var code = params.code || 'code';
              var parentCode = params.parentCode || 'parentCode';
              var name = params.name || 'name';
              var list = params.list;
              var jsonArr = [];
              var newList = [];
              for (var i = 0; i < list.length; i++) {
                var nodeParentVal = list[i][parentCode] || '';
                if (parentVal == nodeParentVal) {
                  jsonArr.push({
                    code: list[i][code]
                    , name: list[i][name]
                    , isLast: false
                    , level: level
                    , spared: false
                    , parentCode: parentVal
                    , basicData: list[i] // 自定义数据
                  });
                } else {
                  newList.push(list[i]);
                }
              }
              // if(jsonArr.length==0){
              //     return  newList;
              // }
              level++;
              for (var i = 0; i < jsonArr.length; i++) {
                var arr = converDtreeData1({
                  list: newList
                  , parentVal: jsonArr[i].code
                  , level: level
                  , code: code
                  , parentCode: parentCode
                  , name: name
                });
                if (arr.length == 0) {
                  jsonArr[i].isLast = true;
                } else {
                  jsonArr[i].children = arr;
                }
              }
              return jsonArr;
            }

            var l = converDtreeData1({
              list: response.result,
              parentVal: ''
              //  , code: 'code'   // 有默认值
              //   , parentCode: 'parentCode'  // 有默认值
              //   , name: 'name'
            });

            this.treeConfig.data = [{
              code: 'root',
              name: '系统菜单',
              children: l
            }];


          }
        }
      )

    },
    nodeClick(obj, node, tree) {
      this.mode = 'edit';
      if (obj.code == 'root') {
        this.hidden = true;
        return;
      } else {
        console.log(obj)
        this.hidden = false;
        let data = {
          id: obj.basicData.id
        }
        API.getMenu(data).then(
          response => {
            if (response.success) {
              this.model = response.result
            }
          }
        )
      }

    },
    addFormShow(obj) {
      this.mode = 'new';
      this.hidden = false;
      console.log(obj)
      this.model.parentCode = obj.basicData.code;
      this.model.id = undefined;
      this.model.code = undefined;
      this.model.name = undefined;
      this.model.type = undefined;
      this.model.url = undefined;
      this.model.sort = undefined;
      this.model.icon = undefined;
      this.model.level = undefined;
    },
    save() {
      if( this.mode == 'edit'){
        API.updateMenu(this.model).then(
          res=>{
            if(res.success){
              this. getTree()
              this.$message.success('菜单已修改');
            }
          }
        )
      }else  {
        API.addMenu(this.model).then(
          res=>{
            if(res.success){
              this. getTree()
              this.$message.success('新增菜单成功');
            }
          }
        )
      }

    },
    updateFunSub() {

    },
    deleteFun(data) {
      let param = {
        id: []
      }
      param.id.push(data.basicData.id)
      API.delMenu(param).then(
        response => {
          if (response.success) {
            this.$message.success('菜单已删除');
            this. getTree()
          }
        }
      )
    },
  }
}
</script>
