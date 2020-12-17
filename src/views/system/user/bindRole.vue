<template>
    <el-dialog title="绑定角色" width="600px" :visible.sync="dialogVisible" append-to-body>
        <el-table
            :data="listRole"
            border
            ref="multipleTable"
            stripe
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column label="角色编码" prop="code" header-align="center"></el-table-column>
            <el-table-column label="角色名称" prop="name" header-align="center"></el-table-column>
            <!-- <el-table-column label="备注" prop="remark" header-align="center"></el-table-column> -->
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doConfirm()">用户授权</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/system/role";
import * as API2 from "@/api/system/user";
export default {
    data(){
        return{
            dialogVisible:false,
            userInfoId:null,
            multipleSelection:[],
            listRole:[]
        }
    },
    methods:{
        getRoleList(){
            API2.queryUserRole({userInfoId:this.userInfoId}).then(
                response => {
                    this.listRole = response.result
                    this.$nextTick(()=>{
                        response.result.forEach(item=>{
                            if(item.checked){
                                this.$refs.multipleTable.toggleRowSelection(item);
                            }
                        })
                    })
                }
            );
        },
        doConfirm(){
            if(this.multipleSelection.length == 0){
                this.$message.warning('请先选择要绑定的角色')
                return
            }
            let obj = {
                "userInfoId":this.userInfoId,  
                "roles":[]
            }
            this.multipleSelection.forEach(item=>{
                obj.roles.push(item.code)
            })
            API2.bidUserRole({json:JSON.stringify(obj)}).then(res=>{
                
            })
        },
        show(row){
            console.log(row)
            this.userInfoId = row.loginUserId
            this.dialogVisible = true
            this.listRole=  []
            this.getRoleList()
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        }
    }
}
</script>