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
      :data="DataList"
      border
      stripe>
        <el-table-column label="公司logo" prop="logo" header-align="center"></el-table-column>
        <el-table-column label="公司名称" prop="name" header-align="center"></el-table-column>
        <el-table-column label="内容介绍" prop="content" header-align="center"></el-table-column>
        <el-table-column label="联系人" prop="contactUser" header-align="center"></el-table-column>
        <el-table-column label="联系电话" prop="contacPhone" header-align="center"></el-table-column>
        <el-table-column label="产品图" prop="productUrl" header-align="center"></el-table-column>
        <el-table-column label="发布时间" prop="createTime" header-align="center"></el-table-column>
      <el-table-column label="发布人" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="当前状态" prop="status" header-align="center"></el-table-column>
        <el-table-column label="操作" min-width="120" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="text" @click="modifyData(scope.row)">编辑</el-button>
                <el-button type="text" @click="delData(scope.row)">删除</el-button>
                <el-button type="text" @click="auditData(scope.row)">审核</el-button>
            </template>
        </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getYellowList"
    />

    <el-dialog title="发布信息" width="800px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
        :rules="yellowRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="submitForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="time">
              <el-input v-model="submitForm.time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="submitForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="submitForm.contacPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="submitForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="网址" prop="networkUrl">
              <el-input v-model="submitForm.networkUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="submitForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="content">
              <el-input v-model="submitForm.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司简介" prop="companyExplain" style="width:100%">
              <el-input type="textarea" v-model="submitForm.companyExplain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业Logo" prop="logo">
              <upload-img ref="formLogo" v-model="submitForm.logo" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品图片" prop="productUrl">
              <upload-img ref="formProduct" v-model="submitForm.productUrl" ></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="修改发布信息" width="800px" :visible.sync="modifyVisible" append-to-body>
      <el-form :model="modifyForm" ref="modifyForm"
        :rules="yellowRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="modifyForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="time">
              <el-input v-model="modifyForm.time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="modifyForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="modifyForm.contacPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="modifyForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="网址" prop="networkUrl">
              <el-input v-model="modifyForm.networkUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="modifyForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="content">
              <el-input v-model="modifyForm.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司简介" prop="companyExplain" style="width:100%">
              <el-input type="textarea" v-model="modifyForm.companyExplain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业Logo" prop="logo">
              <upload-img ref="formLogo" v-model="modifyForm.logo" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品图片" prop="productUrl">
              <upload-img ref="formProduct" v-model="modifyForm.productUrl" ></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('modifyFormForm')">确 定</el-button>
        </span>

    </el-dialog>


  </div>
</template>

<script>
import * as API from "@/api/yellow/index";

export default {
  name: "Yellowpage",
  data() {
    return {
      // 遮罩层
      loading: true,
      action:process.env.VUE_APP_BASE_API+'/upload/file',
      total: 0,
      DataList:[],
      addVisible:false,
      modifyVisible:false,
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
        name:'',
        contactUser:'',
        time:'',
        contacPhone:'',
        email:'',
        networkUrl:'',
        address:'',
        content:'',
        companyExplain:'',
        logo:'',
        productUrl:'',

      },
      modifyForm:{},
      yellowRules:{
       /* logo: [
          {required: true, message: '请上传LOGO', trigger: 'blur'},
        ],
        productUrl: [
          {required: true, message: '请上传产品图', trigger: 'blur'},
        ],*/
      },

    };
  },
  created() {
    this.getYellowList();
  },
  watch:{
    'addVisible'(val){
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()
        vm.$refs.formLogo.clearFileList()
      }
    },
    'modifyVisible'(val){
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()
        vm.$refs.formLogo.clearFileList()
      }
    }
  },
  methods: {
    addInfo(){
        this.addVisible = true
    },
    addSubmit(formNmame){
      this.submitForm.logo = this.$refs.formLogo.getFileList()
        .join(',');
      console.log(this.$refs.formProduct.getFileList())
      this.submitForm.productUrl = this.$refs.formProduct.getFileList()
        .join(',');
       API.addYellowPage(this.submitForm).then(
         res=>{
           if(res.success){
             this.getYellowList()
             this.$message.success('发布成功');
           }
         }
       )
    },
    getYellowList() {
      this.loading = true;
      API.listYellowPage(this.queryParams).then(
        response => {
          if(response.success){
            this.loading=false
            this.DataList=response.result
            this.total=response.page.total
          }

        }
      ).catch(err=>this.loading = false);
    },

    modifyData(row){
      let param={}
      param.id=row.id
      API.queryPage(param).then(
        res=>{
          if(res.success){
            this.modifyForm=res.result
            this.modifyVisible=true
          }
        }
      )
    },
    modifySubmit(){
    API.updPage(this.modifyForm).then(
      res=>{
        if(res.success){
          this.$message.success('修改成功');
          this.modifyVisible=false
          this.getYellowList()
        }
      }
    )
    },
    delData(row){
      let param={}
      param.id=row.id
      this.$confirm('确定要删除当前数据吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delPage(param).then(
          res=>{
            if(res.success){

              this.$message.success('已删除');
              this.getYellowList()
            }
          }
        )
      })

    },
    auditData(row){

    },




    reset() {
      this.resetForm("form");
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getYellowList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
