<template>
    <el-dialog title="绑定菜单" width="600px" :visible.sync="addRoleVisible" append-to-body>
        <menu-tree ref="menu-tree"></menu-tree>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="doConfirm">绑定菜单</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/system/role";
import menuTree from './menuTree'
export default {
    components:{menuTree},
    data(){
        return{
            addRoleVisible:false,
            roleCode:null
        }
    },
    methods:{
        show(row){
            this.addRoleVisible = true
            this.roleCode = row.code
            this.$nextTick(()=>{
                this.queryRoleMenu(this.roleCode,(data)=>{
                    this.$refs['menu-tree'].initTreeByData(data)
                })
            })
        },
        queryRoleMenu(roleCode,callback){
            let obj = {roleCode,systemCode:'LWEB'}
            API.queryRoleMenu(obj).then(res=>{
                callback&&callback(res.result)
            })
        },
        doConfirm(){
            let menus = this.$refs['menu-tree'].getCheckedKeys()
            this.bindMenu(menus)
        },
        bindMenu(menus){
            let obj = {
                menuSystemCode:"LWEB",
                menus:menus,
                roleCode:this.roleCode
            }
            API.bidRoleMenu({json:JSON.stringify(obj)}).then(res=>{
                this.$message.success('菜单绑定成功')
            })
        },
        
    }
}
</script>