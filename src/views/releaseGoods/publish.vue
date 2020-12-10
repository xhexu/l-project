<template>
  <el-dialog title="发布货源" width="920px" :visible.sync="dialogVisible" append-to-body>
    <el-form :model="submitForm" ref="submitForm" :rules="formRules" :inline="true" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="装货地" prop="shipmentAddress">
            <el-input
              v-model="submitForm.shipmentAddress"
              placeholder=""
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卸货地" prop="outturnAddress">
            <el-input
              v-model="submitForm.outturnAddress"
              placeholder=""
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车辆长度" prop="demandVehicleL">
            <el-input
              v-model="submitForm.demandVehicleL"
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
          <el-form-item label="里程" prop="mileage">
            <el-input
              v-model="submitForm.mileage"
              placeholder="请输入卸货地"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行驶时效" prop="travelTime">
            <el-input
              v-model="submitForm.travelTime"
              placeholder="请输入时效"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="出发时间" prop="departTime">
              <el-date-picker
                style="width:200px"
                type="datetime"
                value-format="yyyy-MM-dd hh:MM:ss"
                v-model="submitForm.departTime"
                placeholder="请输入出发时间">
              </el-date-picker>
            </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="到达时间" prop="destTime">
            <el-date-picker
              style="width:200px"
              type="datetime"
              value-format="yyyy-MM-dd hh:MM:ss"
              v-model="submitForm.destTime"
              placeholder="请输入到达时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运输价格" prop="price">
            <el-input
              v-model="submitForm.price"
              placeholder="请输入运输价格"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人" prop="contactUser">
            <el-input
              v-model="submitForm.contactUser"
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input
              v-model="submitForm.contactPhone"
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="invoice" label="是否开票">
            <el-radio-group v-model="submitForm.invoice">
              <el-radio label="开票"></el-radio>
              <el-radio label="不开票"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="invoice" label="需求类型">
            <el-radio-group v-model="submitForm.demandType">
              <el-radio value="1" label="临时"></el-radio>
              <el-radio value="2" label="长期"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注" prop="remark" style="width:100%">
            <el-input
              type="textarea"
              v-model="submitForm.remark"
              placeholder="请输入备注"
              clearable
            />
          </el-form-item>
        </el-col>
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
import * as API from "@/api/releaseGoods/index";

export default {
  data() {
    // 验证手机 
    let checkPhone = (rule, value, callback) => {
        let reg = /^1[345789]\d{9}$/
        if(!value){
            callback(new Error('请输入联系电话'))
        }else if (!reg.test(value)) {
            callback(new Error('手机号格式不正确'))
        } else {
            callback()
        }
    }
    return {
      dialogVisible: false,
      submitForm: {
        shipmentAddress: "",     	// 装货地
        shipmentAddressInfo: "", 	// 装货地详细地址
        demandVehicleL: "",    		// 需求长度
        demandVehicleT: "",      	// 需求车辆类型
        mileage: "",   		//里程
        travelTime: "",   		//行驶时效
        demandType: "",      	// 需求类型
        departTime: "",  	// 出发时间
        destTime: "",      		// 到达时间
        price: "",      		// 价格
        invoice: "",    		// 是否开票
        contactUser: "",        	//联系人
        contactPhone: "",          	// 联系电话
        remark:''        //备注
      },
      formRules: {
        shipmentAddress: [
          {required: true, message: '请输入装货地址', trigger: 'blur'},
        ],
        departTime: [
          {required: true, message: '请输入出发时间', trigger: 'blur'},
        ],
        outturnAddress: [
          {required: true, message: '请输入卸货地址', trigger: 'blur'},
        ],
        contactPhone: [ { required: true, validator:checkPhone,type:'number',trigger: "blur" }],
        contactUser: [
          {required: true, message: '请输入联系人', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    doPublishOrder() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          API.addGoods(this.submitForm).then(res => {
            if (res.success) {
              this.$message.success('货源发布成功')
              this.dialogVisible = false
              this.$refs['submitForm'].resetFields()
              this.$emit('callback')
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      });
    },
  }
}
</script>
