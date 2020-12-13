<template>
    <el-dialog title="绑定角色" width="600px" :visible.sync="dialogVisible" append-to-body>
        <el-table
            :data="listRole"
            border
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
        <pagination
            style="position: relative;width: 100%;"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getRoleList"
        ></pagination>
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
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                code: '',
                name:''
            },
            userInfoId:null,
            multipleSelection:[],
            listRole:[],
            total:0
        }
    },
    methods:{
        getRoleList(){
            API.listRole(this.queryParams).then(
                response => {
                    this.listRole = response.result
                    this.total = response.page.total;
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
            this.getRoleList()
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        }
    }
}
</script>