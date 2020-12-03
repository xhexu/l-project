<template>
    <el-dialog title="新增常用地址" width="500px" :visible.sync="dialogVisible" append-to-body>
        <el-form :rules="formRules" :model="formModel" ref="add-form">

            <el-form-item label="地址" prop="name">
                <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="详情地址" prop="addressInfo">
                <el-input v-model="formModel.addressInfo"></el-input>
            </el-form-item>
            <el-form-item label="是否默认" prop="defaultFlag">
               <el-radio-group v-model="formModel.defaultFlag">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
            </el-form-item>
        </el-form>
       
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doConfirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/userAddr/index";
export default {
    data(){
        return{
            dialogVisible:false,
            edit:false,
            formModel:{
                name:'',
                addressInfo:'',
                defaultFlag:''
            },
            formRules:{
                name:{ required: true, message: '请输入地址名称', trigger: 'blur' },
                addressInfo:{ required: true, message: '请输入详细地址名称', trigger: 'blur' },
                defaultFlag:{ required: true, message: '请选择是否默认', trigger: 'change' }
            }
        }
    },
    methods:{
        show(row){
            if(row){
                this.edit = true
                Object.assign(this.formModel,row)
            }
            this.dialogVisible = true
        },
        doConfirm(){
            this.$refs['add-form'].validate((valid) => {
                if (valid) {
                    if(this.edit){
                        API.modifyUserAddr(this.formModel).then(res=>{
                            this.$message.success('常用地址修改成功')
                            this.dialogVisible = false
                            this.$emit('callback')
                        })
                    }else{
                        API.addUserAddr(this.formModel).then(res=>{
                            this.$message.success('常用地址新增成功')
                            this.dialogVisible = false
                            this.$emit('callback')
                        })
                    }
                } 
            });
        }
    }
}
</script>