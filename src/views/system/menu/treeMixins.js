import * as API from "@/api/system/menu";
export default {
    data(){
        return{
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
        }
    },
    methods:{
        getTree(){
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
        }

    }
}