<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="司机姓名" prop="code">
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
    </el-form>


    <el-table 
      v-adaptive 
      height="100px" 
      v-loading="loading" 
      :data="driverDataList" 
      border
      stripe>
        <el-table-column label="司机姓名" prop="name" header-align="center"></el-table-column>
        <el-table-column label="性别" prop="sex" width="50" header-align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobile" header-align="center"></el-table-column>
        <el-table-column label="住址" prop="address" header-align="center"></el-table-column>
        <el-table-column label="车牌号" prop="vehicleLicenseNum" header-align="center"></el-table-column>
        <el-table-column label="行驶证号" prop="drivingPermitNum" header-align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible=true,chooseRow=scope.row">绑定车辆</el-button>
            </template>
        </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getOrderInfoList"
    />

    <el-dialog title="绑定车辆" width="200px" :visible.sync="dialogVisible" append-to-body>
        <el-input v-model="vehicleLicenseNum" placeholder="请输入车牌号"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="!vehicleLicenseNum" @click="doBindCar">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/api/driver/index";

export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      driverDataList:[],
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
      }
    };
  },
  created() {
    this.getOrderInfoList();
  },
  methods: {
    getOrderInfoList() {
      this.loading = true;
      API.listDriver(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.driverDataList = response.result
            this.total = response.page.total;
          }
        }
      );
    },
    doBindCar(){
        let {id} = this.chooseRow
        API.bindVehicle({id:id,vehicleLicenseNum:this.vehicleLicenseNum}).then(res=>{
            if(res.success){
                this.$message.success('绑定成功')
                this.dialogVisible = false
                this.handleQuery()
            }else{
                this.$message.warning(res.message)
            }
        })
    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getOrderInfoList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>