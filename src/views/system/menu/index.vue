<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="编号" prop="code">
            <el-input
              v-model="queryParams.code"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="菜单名称" prop="title">
            <el-input
              v-model="queryParams.title"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="父编号" prop="parentCode">
            <el-input
              v-model="queryParams.parentCode"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型" prop="type">
            <el-input
              v-model="queryParams.type"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" style="float: right">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="addData()">新增</el-button>

    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="dataList"
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
          <el-button type="text" @click="modifyData(scope.row)">修改</el-button>
          <el-button type="text" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog title="新增菜单" width="600px" :visible.sync="addVisible" append-to-body>
      <el-form size="small" :model="addForm" ref="addForm" :rules="checkRules" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号：" prop="code">
              <el-input v-model="addForm.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：" prop="title">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="url">
              <el-input v-model="addForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改菜单" width="600px" :visible.sync="modifyVisible" append-to-body>
      <el-form size="small" :model="modifyForm" ref="modifyForm" :rules="roleRules" label-width="100px"
               label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号：" prop="code">
              <el-input v-model="modifyForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="modifyForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="modifyForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="modifyRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
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
      dataList: [],
      chooseRow: null,
      addVisible: false,
      modifyVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: '',
        title: '',
        parentCode: '',
        type: '',
      },
      addForm:{
        code: '',
        title: '',
        url:'',
        icon:'',
        sequence:'',
        systemCode:'',
        parentCode: '',
        type: ''
      },
      checkRules:{},
      modifyForm:{}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      API.listMenu(this.queryParams).then(
        response => {
          this.loading = false;
          if (response.success) {
            this.dataList = response.result
            this.total = response.page.total;
          }
        }
      );
    },
    formatTime(row) {
      return this.formatDate(row.createTime)
    },
    delData(row){
      let roleId=[];
      roleId.push(row.id)
      this.$confirm('确定要删除当前菜单吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delMenu(roleId).then(
          response => {
            this.loading = false;
            if(response.success){
              this.$message.success('角色已删除')
              this.getRoleList();
            }
          }
        );
      })
    },
    modifyData(row){
      API.getMenu(row.id).then(
        response => {
          if(response.success){
            this.modifyForm = response.result
            this.modifyVisible=true

          }
        }
      );

    },
    modifySubmit(){
      API.updateMenu(this.modifyForm).then(
        response=>{
          if(response.success){
            this.modifyRoleVisible=false;
            this.$message.success('修改角色成功');
            this.getRoleList();
          }else{
            this.$message.error(response.message)
          }
        }
      )
    },
    formatType(row) {
      return row.type == 1 ? "菜单" : (row.type == 2 ? "按钮" : "其它")
    },
    doBindCar() {
      let {id} = this.chooseRow
      API.bindVehicle({id: id, vehicleLicenseNum: this.vehicleLicenseNum}).then(res => {
        if (res.success) {
          this.$message.success('绑定成功')
          this.dialogVisible = false
          this.handleQuery()
        } else {
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
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
