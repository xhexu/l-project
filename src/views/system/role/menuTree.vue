<template>
    <div>
        <el-scrollbar wrap-class="menu-tree-wrap-class">
            <el-tree 
                :data="treeData" 
                :props="defaultProps" 
                show-checkbox
                node-key="code"
                default-expand-all
                :default-checked-keys="defaultCheckedKeys"
                ref="menu-tree">
            </el-tree>
        </el-scrollbar>
    </div>
</template>
<script>
import * as API from "@/api/system/menu";
import data from '../../../commom/data';
let compareFn  = function(obj1,obj2){
    var val1 = obj1.level;
    var val2 = obj2.level;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }   
}
export default {
    data(){
        return{
            treeData:[],
            queryParams: {
                systemCode: 'LWEB'
            },
            defaultProps:{
                children: 'children',
                label: 'name'
            },
            defaultCheckedKeys:[]
        }
    },
    methods:{
        getCheckedKeys(){
            return this.$refs['menu-tree'].getCheckedKeys()
        },
        initTreeByData(data){
            this.treeData = []
            this.defaultCheckedKeys = []
            data = data.sort(compareFn)
            this.treeDataFormat(data)
            // this.treeData = data
        },
        initTree(){
            this.treeData = []
            API.menuTreeAll(this.queryParams).then(res=>{
                //排序
                res.result = res.result.sort(compareFn)
                // console.log(res.result)
                this.treeDataFormat(res.result)
                console.log(this.treeData)
            })
            
        },
        treeDataFormat(data){
            data.forEach(item=>{
                item.children = []
                if(item.checked){
                    this.defaultCheckedKeys.push(item.code)
                }
                if(item.level == 1){
                    this.treeData.push(item)
                }else if(item.level == 2){
                    let _index = this.treeData.findIndex(tr=>{
                        return tr.code == item.parentCode
                    })
                    if(_index>-1){
                        this.treeData[_index].children.push(item)
                    }else{
                        this.treeData.children = []
                        this.treeData.children.push(item)
                    }
                }
            })
        }
    }
}
</script>