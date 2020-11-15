<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="菜单名" prop="title">
            <el-input
              v-model="queryParams.title"
              placeholder="菜单名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="菜单编号" prop="code">
            <el-input
              v-model="queryParams.code"
              placeholder="菜单编号"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="queryParams.account"
              placeholder="账号"
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
        <el-table-column label="菜单编码" prop="code" header-align="center"></el-table-column>
        <el-table-column label="菜单名" prop="title" header-align="center"></el-table-column>
        <el-table-column label="URL" prop="url" header-align="center"></el-table-column>
        <el-table-column label="图标" prop="icon" header-align="center"></el-table-column>
        <el-table-column label="菜单类型" prop="type" :formatter="formatType" header-align="center"></el-table-column>
        <el-table-column label="创建者" prop="createUser" header-align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :formatter="formatTime" header-align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible=true,chooseRow=scope.row">修改</el-button>
            <el-button type="text" @click="dialogVisible=true,chooseRow=scope.row">删除</el-button>
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
import * as API from "@/api/system/menu";

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
        account: undefined,
        phone: undefined,
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
      API.listMenu(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.driverDataList = response.result
            this.total = response.page.total;
          }
        }
      );
    },
    formatTime(row){
      return this.formatDate(row.createTime)
    },
    formatType(row){
      return row.type == 1?"菜单":(row.type==2?"按钮":"其它")
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