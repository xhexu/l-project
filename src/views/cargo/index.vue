<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="货主姓名" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入货主姓名"
              clearable
              size="small"
              style="width: 12rem"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="queryParams.type">
              <el-radio :label="0">个人</el-radio>
              <el-radio :label="1">企业</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
          @click="addShipper"
        >新增货主
        </el-button>
      </el-col>

    </el-row>

    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="shipperList"
      border
      stripe>
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
      <el-table-column label="货主名称" prop="name" header-align="center" width="100"></el-table-column>
      <el-table-column label="职业" prop="position" header-align="center" width="150"></el-table-column>
      <el-table-column label="账户类型" prop="type" header-align="center" width="80"></el-table-column>
      <el-table-column label="地址" prop="address" header-align="center"></el-table-column>
      <el-table-column label="联系电话" prop="mobile" header-align="center" width="110"></el-table-column>
      <el-table-column label="账号状态" align="center" width="100" prop="status" header-align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'PASS' ? 'success' : 'warning'"
            disable-transitions>{{ scope.row.status == 'PASS' ? '审核通过' : '未审核' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope" v-if="scope.row.status!=='PASS'">
          <el-button type="text" @click="auditShipper(scope.row)">审 核</el-button>
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

    <shipper-add ref="shipper-add" @success-fn="handleQuery"></shipper-add>
  </div>
</template>

<script>
import * as API from "@/api/cargo/index";
import ShipperAdd from './add'

export default {
  name: "Shipper",
  components: {ShipperAdd},
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      shipperList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: undefined,
        name: undefined
      },
    };
  },
  created() {
    this.shipperAllList();
  },
  methods: {
    shipperAllList() {
      this.loading = true;
      let obj = JSON.parse(JSON.stringify(this.queryParams))
      obj.type = obj.type == 1?"企业":obj.type == 0?"个人":""
      API.shipperAllList(obj).then(
        response => {
          this.loading = false;
          if (response.success) {
            this.shipperList = response.result
            this.total = response.page.total;
          }
        }
      ).catch(err => this.loading = false);
    },
    //货主审核
    auditShipper(row) {
      let {id} = row
      this.$confirm('确定要通过当前货主？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.auditShipper({id, status: "PASS"}).then(res => {
          this.$message.success("货主审核通过")
          this.handleQuery()
        });
      })
    },
    addShipper() {
      this.$refs['shipper-add'].show()
    },
    // 表单重置
    reset() {
      this.$refs['queryForm'].resetFields();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.shipperAllList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.handleQuery();
    }
  }
};
</script>
