<template>
    <el-dialog :title="title" width="620px" :visible.sync="addRoleVisible" append-to-body>
        <div>
            <h4 style="margin:5px 0">已添加的用户</h4>

            <el-tag
                v-for="tag in users"
                :key="tag.userInfoId"
                closable
                style="margin:0 5px 5px 0"
                @close="handleClose(tag)">
                
                {{tag.account}}-{{tag.name}}-{{getUserType(tag.userType)}}
            </el-tag>

            <h4 style="margin:5px 0">添加用户</h4>

            <div style="display:flex;">
                <el-select
                    v-model="value"
                    filterable
                    remote
                    placeholder="请输入用户名"
                    :remote-method="remoteMethod"
                    clearable
                    :loading="loading">
                        <el-option
                            v-for="item in options"
                            :key="item.userInfoId"
                            :label="'('+item.userTypeName+')    '+item.name"
                            :value="item.userInfoId">
                        </el-option>
                </el-select>
                <el-button style="margin-left:10px" type="primary" @click="doConfirm">添加用户</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import * as API from '@/api/system/role'
export default {
    data(){
        return{
            addRoleVisible:false,
            users:[],
            options:[],
            value:'',
            loading:false,
            roleObj:'',
            title:''
        }
    },
    methods:{
        show(row){
            console.log(row)
            this.roleObj = row
            this.title = `角色【${row.name}】的用户配置`
            this.addRoleVisible = true
            this.value = ''
            this.queryRoleUser()
        },
        getUserType(type){
            if(type == 'platform'){
                return '平台'
            }
            return type == 'goods'?'货主':type=='driver'?'司机':'信息部'
        },
        handleClose(tag){
             this.$confirm('确定删除当前用户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.deleteRoleUser({id:tag.id}).then(res=>{
                    this.$message.success('删除成功')
                    this.queryRoleUser()
                })
            })
        },        
        queryRoleUser(){
            API.queryRoleUser({roleCode:this.roleObj.code}).then(res=>{
                this.users = res.result
            })
        },
        remoteMethod(query){
            this.loading = true
            API.queryRoleUserByName({
                roleCode:this.roleObj.code,
                name:query
            }).then(res=>{
                this.loading = false
                this.options = res.result
            })
        },
        doConfirm(){
            let _list = this.users.filter(item=>{
                return item.userInfoId == this.value
            })
            if(_list.length>0){
                this.$message.warning('当前用户已添加，不能重复绑定')
                return
            }

            API.addRoleUser({
                roleCode:this.roleObj.code,
                userInfoId:this.value
            }).then(res=>{
                this.value = ''
                this.queryRoleUser()
                this.$message.success('角色绑定用户成功')
            })
        }
    }
}
</script>