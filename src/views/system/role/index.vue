<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="姓名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编号" prop="code">
            <el-input
              v-model="queryParams.code"
              placeholder="编号"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button size="mini" type="primary" icon="el-icon-plus" @click="addRole()">新增</el-button>
    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="driverDataList"
      border
      stripe>
        <el-table-column label="角色编码" prop="code" header-align="center"></el-table-column>
        <el-table-column label="角色名" prop="name" header-align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" header-align="center"></el-table-column>
        <el-table-column label="操作" width="240" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" @click="modifyRole(scope.row)">修改</el-button>
              <el-button type="text" @click="delRole(scope.row)">删除</el-button>
              <el-button type="text" @click="bindMenu(scope.row)">绑定菜单</el-button>
              <el-button type="text" @click="bindUsers(scope.row)">绑定用户</el-button>
            </template>
        </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getRoleList"
    />

    
    <el-dialog title="修改角色" width="600px" :visible.sync="modifyRoleVisible" append-to-body>
      <el-form size="small" :model="modifyForm" ref="modifyForm" :rules="roleRules" label-width="100px" label-position="left">
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
    <add-role ref="add-role"></add-role>
    <bind-menu ref="bind-menu"></bind-menu>
    <bind-users ref="bind-users"></bind-users>
  </div>
</template>

<script>
import * as API from "@/api/system/role";
import AddRole from './addRole'
import BindMenu from './bindMenu.vue';
import BindUsers from './bindUsers'
export default {
  name: "Role",
  components:{AddRole,BindMenu,BindUsers},
  data() {
    BindMenu
    return {
      // 遮罩层
      loading: true,
      total: 0,
      driverDataList:[],
      chooseRow:null,
      addRoleVisible:false,
      modifyRoleVisible:false,
      dialogVisible:false,
      vehicleLicenseNum:'',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: '',
        name:''
      },
      roleForm:{
        code:'',
        name:'',
        remark:''
      },
      roleRules:{},
      modifyForm:{}
    };
  },
  created() {
    this.getRoleList()
  },
  methods: {
    
    bindMenu(row){
      this.$refs['bind-menu'].show(row)
    },
    bindUsers(row){
      this.$refs['bind-users'].show(row)
    },
    addRole(){
      this.$refs['add-role'].show()
    },
    addSubmit(){
      API.addRole(this.roleForm).then(
        response=>{
          if(response.success){
            this.addRoleVisible=false;
            this.$message.success('新增角色成功');
             this.getRoleList();
          }else{
            this.$message.error(response.message)
          }
        }
      )
    },
    getRoleList() {
      this.loading = true;
      API.listRole(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.driverDataList = response.result
            this.total = response.page.total;
          }
        }
      );
    },
    delRole(row){
      let roleId=[];
      roleId.push(row.id)
      this.$confirm('确定要删除当前角色吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delRole(roleId).then(
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
    modifyRole(row){
      API.getRole(row.id).then(
        response => {
          if(response.success){
            this.modifyForm = response.result
            this.modifyRoleVisible=true

          }
        }
      );

    },
    modifySubmit(){
      API.updateRole(this.modifyForm).then(
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
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getRoleList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
