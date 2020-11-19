<template>
    <el-dialog title="订单发布" width="920px" :visible.sync="dialogVisible" append-to-body>
        <el-form :model="submitForm" ref="submitForm" :rules="formRules" :inline="true" label-width="80px">
            <el-row>
                <!-- <el-col :span="8">
                    <el-form-item label="运单编号" prop="code">
                        <el-input
                            v-model="submitForm.code"
                            placeholder="请输入运单编号"
                            clearable
                        />
                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                    <el-form-item label="货物名称" prop="cargoName">
                        <el-input
                            v-model="submitForm.cargoName"
                            placeholder="请输入货物名称"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="货物包装" prop="cargoPack">
                        <el-input
                            v-model="submitForm.cargoPack"
                            placeholder="请输入货物包装"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="装货时间" prop="demandTime">
                        <el-input
                            v-model="submitForm.demandTime"
                            placeholder="请输入装货时间"
                            clearable
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="装货地" prop="shipmentAddress">
                        <el-input
                            v-model="submitForm.shipmentAddress"
                            placeholder="请输入装货地"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="卸货地" prop="outturnAddress">
                        <el-input
                            v-model="submitForm.outturnAddress"
                            placeholder="请输入卸货地"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="车辆长度" prop="demandVehicleL">
                        <el-input
                            v-model="submitForm.demandVehicleL"
                            placeholder="请输入需求车辆长度"
                            clearable
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="车辆类型" prop="demandVehicleT">
                        <el-input
                            v-model="submitForm.demandVehicleT"
                            placeholder="请输入车辆类型"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="货物重量" prop="weight">
                        <el-input
                            v-model="submitForm.weight"
                            placeholder="请输入货物重量"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="货物体积" prop="volume">
                        <el-input
                            v-model="submitForm.volume"
                            placeholder="请输入货物体积"
                            clearable
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="订单标价" prop="bidPrice">
                        <el-input
                            v-model="submitForm.bidPrice"
                            placeholder="请输入订单标价"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="需求时间" prop="demandTime">
                        <el-date-picker
                            style="width:200px"
                            v-model="submitForm.demandTime"
                            type="datetime"
                            placeholder="选择需求时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="备注" prop="remark" style="width:100%">
                    <el-input
                        type="textarea"
                        v-model="submitForm.remark"
                        placeholder="请输入备注"
                        clearable
                    />
                </el-form-item>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doPublishOrder">
                发 布
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/order/index";
export default {
    data(){
        return{
            dialogVisible:false,
            submitForm:{
                code:"",    		// 运单编号
                cargoName:"",   		//货物名称
                cargoPack:"",   		//货物包装
                shipmentAddress:"",     	// 装货地
                shipmentAddressInfo:"", 	// 装货地详细地址
                outturnAddress:"",      	// 卸货地
                outturnAddressInfo:"",  	// 卸货地详细地址
                demandVehicleL:"",      	// 需求车辆长度
                demandVehicleT:"",      	// 需求车辆类型
                weight:"",      		// 货物重量
                volume:"",      		// 货物体积
                bidPrice:"",    		// 订单标价
                demandTime:"",        	//需求时间
                remark:"",          	// 备注
            },
            formRules:{
                code: [
                    { required: true, message: '请输入运单编号', trigger: 'blur' },
                ],
                cargoName: [
                    { required: true, message: '请输入货物名称', trigger: 'blur' },
                ],
                cargoPack: [
                    { required: true, message: '请输入货物包装', trigger: 'blur' },
                ],
                shipmentAddress: [
                    { required: true, message: '请输入装货地址', trigger: 'blur' },
                ],
                outturnAddress: [
                    { required: true, message: '请输入卸货地址', trigger: 'blur' },
                ],
                weight: [
                    { required: true, message: '请输入货物重量', trigger: 'blur' },
                ],
                volume: [
                    { required: true, message: '请输入货物体积', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        show(){
            this.dialogVisible = true
        },
        doPublishOrder(){
            this.$refs['submitForm'].validate((valid) => {
                if (valid) {
                    API.addOrder(this.submitForm).then(res=>{
                        if(res.success){
                            this.$message.success('订单发布成功')
                            this.dialogVisible = false
                            this.$refs['submitForm'].resetFields()
                            this.handleQuery()
                        }else{
                            this.$message.warning(res.message)
                        }
                    })
                } 
            });
        },
    }
}
</script>