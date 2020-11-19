<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="标题" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="标题"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分类" prop="phone">
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
        <el-col :span="8">
          <el-form-item label="发布时间" prop="account">
            <el-date-picker
                v-model="queryParams.time"
                type="daterange"
                range-separator="至"
                style="width: 16rem"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-bottom:10px" >
        <el-button type="primary" icon="el-icon-plus" @click="addInfo()">发  布</el-button>
    </div>
    <el-table
      v-adaptive
      height="100px"
      v-loading="loading"
      :data="driverDataList"
      border
      stripe>
        <el-table-column label="标题" prop="name" header-align="center"></el-table-column>
        <el-table-column label="分类" prop="account" header-align="center"></el-table-column>
        <el-table-column label="内容介绍" prop="phone" header-align="center"></el-table-column>
        <el-table-column label="联系人" prop="idcard" header-align="center"></el-table-column>
        <el-table-column label="联系电话" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="宣传图片" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="发布时间" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="当前状态" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="发布人" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="text" @click="delUser(scope.row)">编辑</el-button>
                <el-button type="text" @click="delUser(scope.row)">下架</el-button>
            </template>
        </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getOrderInfoList"
    />

    <el-dialog title="发布" width="500px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm" 
        :rules="yellowRules" label-width="80px">
        <el-row>
            <el-form-item label="标题" prop="account">
              <el-input v-model="submitForm.account"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="内容介绍" prop="name" style="width:100%">
              <el-input type="textarea" v-model="submitForm.name"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="phone">
              <el-input v-model="submitForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="submitForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址" prop="phone">
              <el-input v-model="submitForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" prop="phone">
              <el-input v-model="submitForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>
    </el-dialog>
   
  </div>
</template>

<script>
import * as API from "@/api/yellow/index";

export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      total: 0,
      driverDataList:[],
      addVisible:false,
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
      },
      submitForm:{
        account:'',
        name:'',
        phone:''
      },
      yellowRules:{}
    };
  },
  created() {
    this.getYellowList();
  },
  methods: {
    addInfo(){
        this.addVisible = true
    },
    addSubmit(formNmame){
      
    },
    getYellowList() {
      this.loading = true;
      API.listYellowPage(this.queryParams).then(
        response => {
         

        }
      ).catch(err=>this.loading = false);
    },

    reset() {
      this.resetForm("form");
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getOrderInfoList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
