<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号" prop="code">
            <el-input
              v-model="queryParams.code"
              placeholder="请输入订单号"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态" prop="roleKey">
            <el-input
              v-model="queryParams.roleKey"
              placeholder="请输入订单状态"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="装货地" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="角色状态"
              clearable
              size="small"
              style="width: 12rem"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卸货地" prop="roleName">
            <el-input
              v-model="queryParams.roleName"
              placeholder="请输入卸货地"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="车牌号" prop="vehicleNumber">
            <el-input
              v-model="queryParams.vehicleNumber"
              placeholder="请输入车牌号"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="司机姓名" prop="driverName">
            <el-input
              v-model="queryParams.driverName"
              placeholder="请输入司机姓名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 12rem"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >下单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >批量下单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >下单模板</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table 
      v-adaptive 
      height="100px" 
      v-loading="loading" 
      :data="orderList" 
      border
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column label="订单信息" prop="orderInfo" header-align="center">
        <template slot-scope="scope">
          <ul>
            <li><span>订单号：</span>{{scope.row.orderInfo.code}}</li>
            <li><span>货物名称：</span>{{scope.row.orderInfo.cargoName}}</li>
            <li><span>货物包装：</span>{{scope.row.orderInfo.cargoPack}}</li>
            <li><span>订单状态：</span>{{formatOrderStatus(scope.row.orderInfo.status)}}</li>
            <!-- <li><span>付款状态：</span>？？？</li> -->
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="装卸信息" prop="handlingInfo" header-align="center">
        <template slot-scope="scope">
          <ul>
            <li><span>装货地址：</span>{{scope.row.handlingInfo.shipmentAddressInfo}}</li>
            <li><span>卸货地址：</span>{{scope.row.handlingInfo.outturnAddressInfo}}</li>
            <li><span>装货时间：</span>{{formatDate(scope.row.handlingInfo.shipmentTime)}}</li>
            <!-- <li><span>运输距离：</span>？？？</li> -->
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="运费信息" prop="freightInfo" header-align="center">
        <template slot-scope="scope">
          <ul>
            <!-- <li><span>司机运费：</span>？？？</li>
            <li><span>是否开票：</span>？？？</li> -->
            <li><span>司机姓名：</span>{{scope.row.freightInfo.driverName}}</li>
            <li><span>司机电话：</span>{{scope.row.freightInfo.driverPhone}}</li>
            <li><span>车牌号码：</span>{{scope.row.freightInfo.licenseNumber}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="运输信息" prop="tranInfo" header-align="center">
        <template slot-scope="scope">
          <ul>
            <li><span>发车时间：</span>{{scope.row.tranInfo.departTime}}</li>
            <li><span>到达时间：</span>{{scope.row.tranInfo.arrivalTime}}</li>
            <!-- <li><span>当前位置：</span>？？？</li> -->
            <li><span>轨迹信息：</span><el-link type="warning">查看轨迹</el-link></li>
            <li><span>回单信息：</span><el-link type="warning">查看回单</el-link></li>
          </ul>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div>
            <el-button type="text">编辑</el-button>
            <el-button type="text">指派</el-button>
            <el-button type="text">评价</el-button>
          </div>
          
          <el-button type="text">取消</el-button>
          <el-button type="text">记录</el-button>
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
  </div>
</template>

<script>
import { listOrder, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus } from "@/api/order/index";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/system/dept";

export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
        code:undefined,//订单号
        driverName:undefined,//司机姓名
        vehicleNumber:undefined//车牌号
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getOrderInfoList();
  },
  methods: {
    formatOrderStatus(status){
      switch (status){
        case 'ORDER_ENQUIRY':
          return '询价中'
        case 'ORDER_ASSIGN':
          return '运输中'
        case 'ORDER_ARRIVE':
          return '已到达'
        case 'ORDER_OVER':
          return '已完成'
        case 'ORDER_CANCEL':
          return '已取消'
      }
    },
    getOrderInfoList() {
      this.loading = true;
      listOrder(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          debugger
          this.loading = false;
          let list = []
          response.result.forEach(item=>{
            Object.keys(item).forEach(key=>{
              if(key.toLowerCase().indexOf('time')>-1&&item[key]){
                item[key] = this.formatDate(item[key])
              }
            })
            list.push({
              orderInfo:item,
              handlingInfo:item,
              freightInfo:item,
              tranInfo:item
            })
          })
          this.orderList = list
          this.total = response.page.total;
        }
      ).catch(()=>this.loading = false);
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false,
      this.menuNodeAll = false,
      this.deptExpand = true,
      this.deptNodeAll = false,
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getOrderInfoList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    
    
    /** 新增按钮操作 */
    handleAdd() {

    },
    /** 修改按钮操作 */
    handleUpdate(row) {

    },
   
    
   
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          
        }).then(() => {
          this.getOrderInfoList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有角色数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRole(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>