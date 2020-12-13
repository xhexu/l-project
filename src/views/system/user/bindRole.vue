<template>
    <el-dialog title="绑定角色" width="600px" :visible.sync="dialogVisible" append-to-body>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doConfirm">用户授权</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible:false
        }
    },
    methods:{
        doConfirm(){

        },
        show(row){
            this.dialogVisible = true
        }
    }
}
</script>