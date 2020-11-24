<template>
    <el-dialog 
        title="新增货主" 
        width="500px" 
        :visible.sync="dialogVisible" append-to-body>

        <el-form :model="submitForm" ref="submitForm" :rules="formRules" label-width="80px">

            <el-form-item label="姓名" prop="name">
                <el-input v-model="submitForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="submitForm.type">
                    <el-radio :label="0">个人</el-radio>
                    <el-radio :label="1">企业</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="职位" prop="position">
                <el-input v-model="submitForm.position"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="submitForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="submitForm.address"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doConfirm">
                提 交
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/cargo/index";
export default {
    data(){
        let checkPhone = (rule, value, callback) => {
            let reg = /^1[345789]\d{9}$/
            if(!value){
                callback(new Error('手机号不能为空'))
            }else if (!reg.test(value)) {
                callback(new Error('手机号格式不正确'))
            } else {
                callback()
            }
        }
        return{
            dialogVisible:false,
            submitForm:{
                name:"",
                type:"",
                position:"",
                mobile:"",
                address:""
            },
            formRules:{
                name:[
                    { required: true, message: '请输入货主姓名', trigger: 'blur' },
                ],
                type:[
                    { required: true, message: '请选择类型', trigger: 'blur' },
                ],
                address:[
                    { required: true, message: '请输入地址信息', trigger: 'blur' },
                ],
                position:[
                    { required: true, message: '请输入职位信息', trigger: 'blur' },
                ],
                mobile: [ 
                    { required: true, validator:checkPhone,type:'number',trigger: "blur" }
                ],
            }
        }
    },
    methods:{
        show(){
            this.dialogVisible = true
        },
        doConfirm(){
            this.$refs['submitForm'].validate((valid) => {
                if(valid){
                    let obj = JSON.parse(JSON.stringify(this.submitForm))
                    obj.type = obj.type == 1?"企业":"个人"
                    API.addShipper(obj).then(res=>{
                        this.$message.success("货主新增成功")
                        this.dialogVisible = false
                        this.$emit("success-fn")
                    })
                }
            })
        }
    }
}
</script>