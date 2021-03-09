<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="公司名" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="公司名"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="auditStatus">
            <dictionary-select option-name="AUDIT_STATUS" v-model="queryParams.auditStatus"></dictionary-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布时间" prop="publishTime">
            <el-date-picker
              v-model="queryParams.publishTime"
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
    <div style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-plus" @click="addInfo()">发 布</el-button>
    </div>
    <el-table
      v-loading="loading"
      v-adaptive
      height="100px"
      :data="DataList"
      border
      stripe>
      <el-table-column label="公司logo" prop="logo" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.logo)}">
            <el-avatar v-if="scope.row.logo &&scope.row.logo.length>0&& scope.row.logo!=null" size="small"
                       :src="scope.row.logo.split(',')[0]"></el-avatar>
            <span v-else>暂无头像</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" prop="name" header-align="center" show-overflow-tooltip min-width="150">
        <template slot-scope="scope">
          <a href="javascript:void(0)" style="color: #409EFF;" @click="detailInfo(scope.row)">
            {{ scope.row.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="内容介绍" prop="content" header-align="center" min-width="150">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            :content="scope.row.content">
            <a href="javascript:void(0)"
               style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 110px;" slot="reference">
              {{ scope.row.content }}
            </a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="企业性质" prop="companyNature" header-align="center">
        <template slot-scope="scope">
          <dictionary-name option-name="COMPANY_NATURE" :value="scope.row.companyNature"></dictionary-name>
        </template>
      </el-table-column>
      <el-table-column label="注册资本" prop="registerCapital" header-align="center" show-overflow-tooltip
                       min-width="120"></el-table-column>
      <el-table-column label="营业执照" prop="licenseUrl" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.licenseUrl)}">
            <el-image v-if="scope.row.licenseUrl && scope.row.licenseUrl.length>0 && scope.row.licenseUrl!=null"
                      size="small" v-for="(img,index) in scope.row.licenseUrl.split(',')" :src="img" :key="index"
                      style="width: 45px;height: 45px;"></el-image>
            <span v-else> 暂无</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="生产许可" prop="productUrl" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.productUrl)}">
            <el-image v-if="scope.row.productUrl && scope.row.productUrl.length>0&& scope.row.productUrl!=null"
                      size="small" v-for="(img,index) in scope.row.productUrl.split(',')" :src="img" :key="index"
                      style="width: 45px;height: 45px;"></el-image>
            <span v-else> 暂无</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="联系人" prop="contactUser" header-align="center"></el-table-column>
      <el-table-column label="联系电话" prop="contacPhone" header-align="center" show-overflow-tooltip
                       min-width="130"></el-table-column>
      <el-table-column label="发布时间" prop="createTime" header-align="center" show-overflow-tooltip
                       min-width="150"></el-table-column>
      <el-table-column label="发布人" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="当前状态" prop="auditStatus" header-align="center">
        <template slot-scope="scope">
          <dictionary-name option-name="AUDIT_STATUS" :value="scope.row.auditStatus"></dictionary-name>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="140" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyData(scope.row)">编辑</el-button>
          <el-button type="text" :disabled="scope.row.exist" @click="collectData(scope.row)">收藏</el-button>
          <el-button type="text" @click="delData(scope.row)">删除</el-button>
          <el-button type="text" :disabled="scope.row.auditStatus=='PASS'" @click="auditData(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getYellowList"
    />

    <el-dialog title="发布信息" width="1000px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="submitForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立时间" prop="time">
              <el-date-picker
                align="right"
                type="date"
                v-model="submitForm.time"
                placeholder="选择日期"
              >
              </el-date-picker>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业性质" prop="companyNature">
              <dictionary-select option-name="COMPANY_NATURE" v-model="submitForm.companyNature"></dictionary-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本" prop="registerCapital"
                          :rules="[Validate.required('价格',true),Validate.allNumber]">
              <el-input v-model="submitForm.registerCapital">
                <template slot="append">万元</template>
              </el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="submitForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="submitForm.contacPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业邮箱" prop="email">
              <el-input v-model="submitForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="企业网址" prop="networkUrl">
              <el-input v-model="submitForm.networkUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="submitForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="content">
              <el-input v-model="submitForm.content" type="textarea"></el-input>
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
          <el-col :span="12">
            <el-form-item label="企业Logo" prop="logo">
              <upload-img ref="formLogo" v-model="submitForm.logo" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照" prop="licenseUrl">
              <upload-img ref="formLicense" v-model="submitForm.licenseUrl" :limit="2"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="生产许可" prop="productUrl">
              <upload-img ref="formProduct" v-model="submitForm.productUrl" :limit="2"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="修改发布信息" width="1000px" :visible.sync="modifyVisible" append-to-body>
      <el-form :model="modifyForm" ref="modifyForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="modifyForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立时间" prop="time">

              <el-date-picker
                align="right"
                type="date"
                v-model="modifyForm.time"
                placeholder="选择日期"
              >

              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业性质" prop="companyNature">
              <dictionary-select option-name="COMPANY_NATURE" v-model="modifyForm.companyNature"></dictionary-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本" prop="registerCapital"
                          :rules="[Validate.required('价格',true),Validate.allNumber]">
              <el-input v-model="modifyForm.registerCapital"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="modifyForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="modifyForm.contacPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业邮箱" prop="email">
              <el-input v-model="modifyForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="企业网址" prop="networkUrl">
              <el-input v-model="modifyForm.networkUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="modifyForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="content">
              <el-input v-model="modifyForm.content" type="textarea"></el-input>
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
          <el-col :span="12">
            <el-form-item label="企业Logo" prop="logo">
              <upload-img ref="formLogo" v-model="modifyForm.logo" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照" prop="licenseUrl">
              <upload-img ref="formLicense" v-model="modifyForm.licenseUrl" :limit="2"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="生产许可" prop="productUrl">
              <upload-img ref="formProduct" v-model="modifyForm.productUrl" :limit="2"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="查看详细信息" width="800px" :visible.sync="detailVisible" append-to-body>
      <el-form :model="currentRow" ref="modifyForm"
               label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              {{ currentRow.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="time">
              {{ currentRow.time }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业性质" prop="companyNature">
              <dictionary-name option-name="COMPANY_NATURE" v-model="currentRow.companyNature"></dictionary-name>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本" prop="registerCapital">
              {{ currentRow.registerCapital }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactUser">
              {{ currentRow.contactUser }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacPhone">
              {{ currentRow.contacPhone }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业邮箱" prop="email">
              {{ currentRow.email }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业网址" prop="networkUrl">
              {{ currentRow.networkUrl }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              {{ currentRow.address }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="content">
              {{ currentRow.content }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司简介" prop="companyExplain" style="width:100%">
              {{ currentRow.companyExplain }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业Logo" prop="logo">
              <a href="javascript:void(0)" style="color: #409EFF" @click.stop="()=>{clickImg(currentRow.logo)}">
                查看图片
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="营业执照" prop="licenseUrl">
              <a href="javascript:void(0)" style="color: #409EFF" @click.stop="()=>{clickImg(currentRow.licenseUrl)}">
                查看图片
              </a>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="生产许可" prop="productUrl">
              <a href="javascript:void(0)" style="color: #409EFF" @click.stop="()=>{clickImg(currentRow.productUrl)}">
                查看图片
              </a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="detailVisible = false">取 消</el-button>

        </span>

    </el-dialog>
    <el-dialog title="审核" :visible.sync="auditVisible" width="600px">
      <el-form size="small" inline :model="auditform" label-width="100px" :rules="auditRules" ref="auditform">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核状态:" prop="auditStatus">
              <el-radio v-model="auditform.auditStatus" label="PASS">通过</el-radio>
              <el-radio v-model="auditform.auditStatus" label="REJECT">拒绝</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见：" prop="auditResult" :rules="[{required:(auditform.auditStatus === 'REJECT')}]">
              <el-input type="textarea" :rows="2" :maxlength="200" placeholder="最多200个字符！"
                        v-model="auditform.auditResult"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="auditVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="auditSubmit()">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/api/yellow/index";
import Validate from "@/commom/validate";

export default {
  name: "Yellowpage",
  data() {
    return {
      // 遮罩层
      loading: true,
      Validate: Validate,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      action: process.env.VUE_APP_BASE_API + '/upload/file',
      total: 0,
      DataList: [],
      addVisible: false,
      modifyVisible: false,
      chooseRow: null,
      dialogVisible: false,
      vehicleLicenseNum: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        auditStatus: '',
        publishTime: [],
        dateStart: '',
        dateEnd: '',
      },
      submitForm: {
        name: '',
        contactUser: '',
        time: '',
        contacPhone: '',
        email: '',
        networkUrl: '',
        address: '',
        content: '',
        companyNature: '',
        registerCapital: '',
        companyExplain: '',
        logo: '',
        productUrl: '',
        licenseUrl: '',

      },
      modifyForm: {},
      formRules: {
        name: [
          {required: true, message: '企业名称必填', trigger: 'blur'},
        ],
        time: [
          {required: true, message: '成立时间必填', trigger: 'blur'},
        ],
        companyNature: [
          {required: true, message: '企业性质必填', trigger: 'blur'},
        ],
        contactUser: [
          {required: true, message: '联系人必填', trigger: 'blur'},
        ],
        contacPhone: [
          {required: true, message: '联系电话必填', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '企业邮箱必填', trigger: 'blur'},
        ],
        address: [
          {required: true, message: '详细地址必填', trigger: 'blur'},
        ],
        networkUrl: [
          {required: true, message: '企业网址必填', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '主营业务必填', trigger: 'blur'},
        ],
        companyExplain: [
          {required: true, message: '公司简介必填', trigger: 'blur'},
        ],
        logo: [
          {required: true, message: '请上传LOGO', trigger: 'blur'},
        ],
        licenseUrl: [
          {required: true, message: '请上传营业执照', trigger: 'blur'},
        ],
        productUrl: [
          {required: true, message: '请上传生产许可', trigger: 'blur'},
        ],
      },
      detailVisible: false,
      currentRow: {},
      auditVisible: false,
      auditform: {
        id: '',
        auditStatus: 'REJECT',
        auditResult: ''
      },
      auditRules: {}

    };
  },
  created() {
    this.getYellowList();
  },
  watch: {
    'addVisible'(val) {
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()
        vm.$refs.formLogo.clearFileList()
        vm.$refs.formLicense.clearFileList()
      }
    },
    'modifyVisible'(val) {
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()
        vm.$refs.formLogo.clearFileList()
        vm.$refs.formLicense.clearFileList()
      }
    }
  },
  methods: {
    addInfo() {
      this.addVisible = true
    },
    addSubmit(formNmame) {
      this.submitForm.logo = this.$refs.formLogo.getFileList()
        .join(',');

      this.submitForm.productUrl = this.$refs.formProduct.getFileList()
        .join(',');
      this.submitForm.licenseUrl = this.$refs.formLicense.getFileList()
        .join(',');
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          API.addYellowPage(this.submitForm).then(
            res => {
              if (res.success) {
                this.getYellowList()
                this.addVisible = false
                this.$message.success('发布成功');
                this.$refs['submitForm'].resetFields()
              }
            }
          )
        }
      })

    },
    getYellowList() {
      this.loading = true;
      if (this.queryParams.publishTime) {
        this.queryParams.dateStart = this.queryParams.publishTime[0]
        this.queryParams.dateEnd = this.queryParams.publishTime[1]
      }

      API.listYellowPage(this.queryParams).then(
        response => {
          if (response.success) {
            this.loading = false
            this.DataList = response.result
            this.total = response.page.total
          }

        }
      ).catch(err => this.loading = false);
    },

    modifyData(row) {
      let param = {}
      param.id = row.id
      API.queryPage(param).then(
        res => {
          if (res.success) {
            this.modifyForm = res.result
            setTimeout(() => {
              if (this.modifyForm.logo && this.modifyForm.logo != '') {
                this.$refs.formLogo.setFileList(
                  this.modifyForm.logo.split(',')
                )
              }
              if (this.modifyForm.productUrl && this.modifyForm.productUrl != '') {
                this.$refs.formProduct.setFileList(
                  this.modifyForm.productUrl.split(',')
                )
              }
              if (this.modifyForm.licenseUrl && this.modifyForm.licenseUrl != '') {
                this.$refs.formLicense.setFileList(
                  this.modifyForm.licenseUrl.split(',')
                )
              }
            }, 0)
            this.modifyVisible = true
          }
        }
      )
    },
    modifySubmit() {
      this.modifyForm.logo = this.$refs.formLogo.getFileList()
        .join(',');

      this.modifyForm.productUrl = this.$refs.formProduct.getFileList()
        .join(',');
      this.modifyForm.licenseUrl = this.$refs.formLicense.getFileList()
        .join(',');

      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          API.updPage(this.modifyForm).then(
            res => {
              if (res.success) {
                this.$message.success('修改成功');
                this.modifyVisible = false
                this.getYellowList()
              }
            }
          )
        }
      })
    },
    delData(row) {
      let param = {}
      param.id = row.id
      this.$confirm('确定要删除当前数据吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delPage(param).then(
          res => {
            if (res.success) {

              this.$message.success('已删除');
              this.getYellowList()
            }
          }
        )
      })

    },
    collectData(row) {
      let param = {}
      param.id = row.id
      this.$confirm('确定要收藏当前记录吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "再想想",
        type: "danger"
      }).then(() => {
        API.collect(param).then(
          res => {
            if (res.success) {
              this.$message.success('收藏成功');
              this.getYellowList()
            }
          }
        )
      })

    },
    auditData(row) {
      this.auditVisible = true
      this.auditform.id = row.id
    },
    auditSubmit() {
      API.auditPage(this.auditform).then(
        res => {
          if (res.success) {
            this.getList()
            this.auditVisible = false
            this.$message.success('数据已审核');
            this.$refs['auditform'].resetFields()
          }
        }
      )
    },

    detailInfo(row) {
      this.currentRow = row
      this.detailVisible = true;
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
    },
    clickImg(url) {
      this.$showImg(url)
    }
  }
};
</script>
