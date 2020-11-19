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