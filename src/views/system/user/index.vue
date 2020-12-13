<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="用户名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="queryParams.phone"
              placeholder="手机号"
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="addUser()">新增</el-button>
    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="driverDataList"
      border
      stripe>
        <el-table-column label="用户名" prop="name" header-align="center"></el-table-column>
        <el-table-column label="账号" prop="account" header-align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone" header-align="center"></el-table-column>
        <el-table-column label="身份证号" prop="idcard" header-align="center"></el-table-column>
        <el-table-column label="性别" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <!-- <el-button type="primary" icon="el-icon-delete" round @click="delUser(scope.row)">删除</el-button> -->
              <el-button type="text" @click="delUser(scope.row)">删除</el-button>
              <el-button type="text" @click="bindRole(scope.row)">角色授权</el-button>
              <el-button type="text" @click="queryRole(scope.row)">角色列表</el-button>
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

    <el-dialog title="新增用户" width="500px" :visible.sync="addUserVisible" append-to-body>
      <el-form size="small" :model="userForm" ref="userForm" :rules="userRules" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号：" prop="account">
              <el-input v-model="userForm.account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="userForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('userForm')">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="已绑定角色列表" width="500px" :visible.sync="bindRoleVisible" append-to-body>
      <ul>
        <li v-for="(item,index) in bindRoleList" :key="index" style="display:flex;line-height:50px;height:50px;justify-content: space-around;
    border-bottom: 1px solid #e0e0e0;">
          <span>{{item.code}}</span>
          
          {{item.name}}
        </li>
      </ul>
    </el-dialog>
   
   <bind-role ref="bind-role"></bind-role>
  </div>
</template>

<script>
import * as API from "@/api/system/user";
import BindRole from './bindRole.vue';
export default {
  name: "Role",
  components:{BindRole},
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      driverDataList:[],
      addUserVisible:false,
      chooseRow:null,
      dialogVisible:false,
      bindRoleVisible:false,
      vehicleLicenseNum:'',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        account: undefined,
        phone: undefined,
        name:undefined
      },
      userForm:{
        account:'',
        name:'',
        phone:''
      },
      userRules:{}
    };
  },
  created() {
    this.getOrderInfoList();
  },
  methods: {
    addUser(){
      this.addUserVisible=true
    },
    bindRole(row){
      this.$refs['bind-role'].show(row)
    },
    queryRole(row){
      let {loginUserId} = row
      API.queryUserRole({userInfoId:loginUserId}).then(res=>{
        this.bindRoleList = res.result
        this.bindRoleVisible = true
      })
    },
    addSubmit(formNmame){
      API.addUser(this.userForm).then(
        response => {
          if(response.success){
            this.addUserVisible=false
            this.$message.success('新增用户成功')
            this.getOrderInfoList();
          }else {
            this.$message.error(response.message)
          }
        }
      );
    },
    getOrderInfoList() {
      this.loading = true;
      API.listUser(this.queryParams).then(
        response => {
          this.loading = false;
          if(response.success){
            this.driverDataList = response.result
            this.total = response.page.total;
          }
        }
      );
    },
    delUser(row){
      let userId=[];
      userId.push(row.id)
      this.$confirm('确定要删除当前用户吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delUser(userId).then(
          response => {
            this.loading = false;
            if(response.success){
              this.$message.success('用户已删除')
              this.getOrderInfoList();
            }
          }
        );
      })

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
