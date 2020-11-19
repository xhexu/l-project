<template>
    <el-dialog 
        :title="title" 
        width="400px" 
        :visible.sync="dialogVisible" append-to-body>
        <el-form ref="assignForm" :model="assignForm" :rules="assignRules" label-width="80px">
            <el-form-item prop="phone" label="司机电话">
                <el-input v-model="assignForm.phone">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="name" label="司机姓名">
                <el-input v-model="assignForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item prop="card" label="驾驶车辆">
                <el-input v-model="assignForm.card" disabled></el-input>
            </el-form-item>
            <el-form-item prop="price" label="运费">
                <el-input v-model="assignForm.price" type="number">
                    <el-button slot="append">元</el-button>    
                </el-input>
            </el-form-item>
            <el-form-item prop="invoice" label="是否开票">
                <el-radio-group v-model="assignForm.invoice">
                    <el-radio label="开票"></el-radio>
                    <el-radio label="不开票"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div style="text-align:center">
            <el-button type="primary" @click="doAssign">定向指派</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as API from "@/api/order/index";
export default {
    data(){
        return{
            dialogVisible:false,
            title:"定向指派",
            orderInfo:{},
            assignForm:{
                orderCode:'',
                phone:'',
                name:'',
                price:'',
                invoice:''
            },
            assignRules:{
                price: [
                    { required: true, message: '请输入报价信息', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请选择指派的司机', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        show(row){
            let {orderInfo} = row
            this.orderInfo = orderInfo
            this.assignForm.orderCode = this.orderInfo.code
            this.title = "定向指派     订单号:"+this.orderInfo.code
            this.dialogVisible = true
            this.loading = true
        },
        doAssign(){
            this.$refs['assignForm'].validate((valid) => {
                if(valid){
                    API.shipperAssign(this.assignForm).then(res=>{
                        this.$message.success('定向指派成功')
                    }).catch(err=>{})
                    }
            })
        }
    }
}
</script>