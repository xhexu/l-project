<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="货物名称" prop="code">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入司机姓名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="queryParams.mobile"
              placeholder="请输入订单状态"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌号" prop="vehicleLicenseNum">
            <el-input
              v-model="queryParams.vehicleLicenseNum"
              placeholder="请输入订单状态"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:5px">
          <el-col :span="6">
              <el-button type="cyan" icon="el-icon-search" size="mini" @click="dialogVisible=true">发布订单</el-button>
          </el-col>
      </el-row>
    </el-form>


    <el-table 
      v-adaptive 
      height="100px" 
      v-loading="loading" 
      :data="shipperList" 
      border
      stripe>
        <el-table-column label="货物名称" prop="cargoName" header-align="center"></el-table-column>
        <el-table-column label="货物包装" prop="cargoPack" header-align="center"></el-table-column>
        <el-table-column label="装货地" prop="shipmentAddressInfo" header-align="center"></el-table-column>
        <el-table-column label="卸货地" prop="outturnAddressInfo" header-align="center"></el-table-column>
        <el-table-column label="货物重量" prop="weight" header-align="center"></el-table-column>
        <el-table-column label="货物体积" prop="volume" header-align="center"></el-table-column>
        <el-table-column label="车辆类型" prop="demandVehicleT" header-align="center"></el-table-column>
        <el-table-column label="订单状态" align="center" width="80" prop="status" header-align="center">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.status === '询价中' ? 'primary' : scope.row.status === '已到达'?'success':'warning'"
                    disable-transitions>{{scope.row.status}}
                </el-tag>
            </template>
        </el-table-column>
        
        <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible=true,chooseRow=scope.row">确认报价</el-button>
            </template>
        </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="shipperAllList"
    />

    <el-dialog title="订单发布" width="920px" :visible.sync="dialogVisible" append-to-body>
        <el-form :model="submitForm" ref="submitForm" :rules="formRules" :inline="true" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="运单编号" prop="code">
                        <el-input
                            v-model="submitForm.code"
                            placeholder="请输入运单编号"
                            clearable
                        />
                    </el-form-item>
                </el-col>
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
                    <el-form-item label="备注" prop="remark">
                        <el-input
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
            <el-button type="primary" @click="doPublishOrder">发 布</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/api/cargo/index";

export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      shipperList:[],
      chooseRow:null,
      dialogVisible:false,
      vehicleLicenseNum:'',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        vehicleLicenseNum: undefined,
        mobile: undefined,
        name:undefined
      },
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
      }
    };
  },
  created() {
    this.shipperAllList();
  },
  methods: {
    shipperAllList() {
      this.loading = true;
      API.shipperAllList(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.shipperList = response.result
            this.total = response.page.total;
          }
        }
      ).catch(err=>this.loading = false);
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
    releaseOrder(){

    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.shipperAllList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>