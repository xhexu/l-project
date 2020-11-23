<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="始发地" prop="outturnAddress">
            <el-input
              v-model="queryParams.outturnAddress"
              placeholder="请输入始发地"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="目的地" prop="shipmentAddress">
            <el-input
              v-model="queryParams.shipmentAddress"
              placeholder="请输入目的地"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车型" prop="demandVehicleL">
            <el-input
              v-model="queryParams.demandVehicleL"
              placeholder="车型"
              clearable
              size="small"
              style="width: 12rem"
            ></el-input>
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
        >发布</el-button>
      </el-col>

    </el-row>

    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="goodsList"
      border
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column label="货源编号" prop="code" header-align="center" min-width="130"></el-table-column>
      <el-table-column label="装货地" prop="shipmentAddress" header-align="center"></el-table-column>
      <el-table-column label="卸货地" prop="outturnAddress" header-align="center"></el-table-column>
      <el-table-column label="需求车辆长度" prop="demandVehicleL" header-align="center" min-width="120"></el-table-column>
      <el-table-column label="需求车辆类型" prop="demandVehicleT" header-align="center" min-width="120"></el-table-column>
      <el-table-column label="里程" prop="mileage" header-align="center"></el-table-column>
      <el-table-column label="行驶时效" prop="travelTime" header-align="center"></el-table-column>
      <el-table-column label="需求类型" prop="demandType" header-align="center"></el-table-column>
      <el-table-column label="出发时间" prop="departTime" header-align="center" min-width="150"></el-table-column>
      <el-table-column label="到达时间" prop="destTime" header-align="center" min-width="150"></el-table-column>
      <el-table-column label="运输价格" prop="price" header-align="center"></el-table-column>
      <el-table-column label="是否开票" prop="invoice" header-align="center"></el-table-column>
      <el-table-column label="联系人" prop="contactUser" header-align="center"></el-table-column>
      <el-table-column label="联系电话" prop="contactPhone" header-align="center" min-width="130"></el-table-column>
      <el-table-column label="创建人" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" header-align="center"></el-table-column>
     <!-- <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div>

            <el-button type="text" @click="doAssign(scope.row)">指派</el-button>

          </div>


        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <publish-goods ref="publish-goods"></publish-goods>
<!--    <price ref="price-dialog"></price>-->
<!--    <assign ref="assign-dialog"></assign>-->
  </div>
</template>

<script>
import * as API from "@/api/releaseGoods/index";
import publishGoods from './publish'
// import price from './price'
// import assign from './assign'
export default {
  name: "releasegoods",
  components:{
    publishGoods
    // ,price
    // ,assign
  },
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
      // 总条数
      total: 0,
      // 角色表格数据
      goodsList: [],
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        outturnAddress: '',//始发地
        shipmentAddress: '',//目的地
        demandVehicleL: '',//车型
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
    this.getList();
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
    getList() {
      this.loading = true;
      API.listOrder(this.queryParams).then(
        response => {
          this.loading = false;
      /*    let list = []
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
          this.goodsList = list*/
          this.goodsList=response.result
          this.total = response.page.total;
        }
      ).catch(()=>this.loading = false);
    },
    //查看报价
    queryPrice(row){
      this.$refs['price-dialog'].show(row)
    },
    //指派
    doAssign(row){
      this.$refs['assign-dialog'].show(row)
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
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
      this.getList();
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


    //下单
    handleAdd() {
      this.$refs['publish-goods'].show()
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
          this.getList();
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
