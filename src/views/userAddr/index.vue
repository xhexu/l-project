<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="地址" prop="addressInfo">
            <el-input
              v-model="queryParams.addressInfo"
              placeholder="请输入地址"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关联用户" prop="relationUser">
            <el-input
              v-model="queryParams.relationUser"
              placeholder="请输入关联用户"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否默认" prop="defaultFlag">
            <el-radio-group v-model="queryParams.defaultFlag">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
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

    <div style="margin-bottom:10px" >
        <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新 增</el-button>
    </div>

    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="userAddrList"
      border
      stripe>
        <el-table-column label="区域" prop="province" header-align="center">
          <template slot-scope="scope">
            {{scope.row.provinceName}} - {{scope.row.cityName}} - {{scope.row.areaName}}
          </template>
        </el-table-column>
        <el-table-column label="详细地址" prop="addressInfo" header-align="center"></el-table-column>
        <el-table-column label="关联用户账号" prop="relationUser" header-align="center"></el-table-column>
        <el-table-column label="默认地址" width="80" prop="defaultFlag" header-align="center" align="center" :formatter="formatter"></el-table-column>
        <el-table-column label="创建时间" width="160" prop="createTime" header-align="center"></el-table-column>
        <el-table-column label="修改时间" width="160" prop="modifyTime" header-align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="text" @click="doEdit(scope.row)">修改</el-button>
                <el-button type="text" @click="doDelete(scope.row)">删除</el-button>
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

    <add-addr ref="add-addr" @callback="handleQuery"></add-addr>

  </div>
</template>

<script>
import * as API from "@/api/userAddr/index";
import AddAddr from './addAddr'
export default {
  name: "Addr",
  components:{AddAddr},
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      userAddrList:[],
      chooseRow:null,
      dialogVisible:false,
      vehicleLicenseNum:'',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        addressInfo: undefined,
        relationUser: undefined,
        defaultFlag:undefined
      }
    };
  },
  created() {
    this.getOrderInfoList();
  },
  methods: {
    getOrderInfoList() {
      this.loading = true;
      API.listUserAddr(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.userAddrList = response.result
            this.total = response.page.total;
          }
        }
      ).catch(err=>this.loading = false);
    },
    formatter(row, column) {
        return row.defaultFlag?"是":"否";
    },
    showAddDialog(){
        this.$refs['add-addr'].show()
    },
    doEdit(row){
        this.$refs['add-addr'].show(row)
    },
    doDelete(row){
        let {id} = row
        this.$confirm('确定删除当前地址？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            API.deleteUserAddr({id}).then(res=>{
                this.$message.success('常用地址删除成功')
                this.handleQuery()
            })
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
