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
    mounted(){
        this.initTree()
    },
    methods:{
        getCheckedKeys(){
            return this.$refs['menu-tree'].getCheckedKeys()
        },
        initTree(){
            API.menuTreeAll(this.queryParams).then(res=>{
                res.result.forEach(item=>{
                    item.children = []
                    if(item.level == 1){
                        this.treeData.push(item)
                    }else if(item.level == 2){
                        let _index = this.treeData.findIndex(tr=>{
                            return tr.code == item.parentCode
                        })
                        this.treeData[_index].children.push(item)
                    }
                })
                console.log(this.treeData)
            })
            
        }
    }
}
</script>