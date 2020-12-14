<template>
    <div>
        <el-tree 
            :data="treeData" 
            :props="defaultProps" 
            show-checkbox
            node-key="code"
            default-expand-all
            ref="menu-tree">
        </el-tree>
    </div>
</template>
<script>
import * as API from "@/api/system/menu";
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
            }
        }
    },
    methods:{
        getCheckedKeys(){
            return this.$refs['menu-tree'].getCheckedKeys()
        },
        initTree(){
            this.treeData = []
            let compare  = function(obj1,obj2){
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
            API.menuTreeAll(this.queryParams).then(res=>{
                //排序
                
                res.result = res.result.sort(compare)
                console.log(res.result)


                res.result.forEach(item=>{
                    item.children = []
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
                console.log(this.treeData)
            })
            
        }
    }
}
</script>