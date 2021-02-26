<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="产品名称" prop="name">
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
              :clearable='false'
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
      <el-table-column label="产品名称" prop="productName" header-align="center" show-overflow-tooltip min-width="100">
      </el-table-column>
      <el-table-column label="产品价格" width="90" prop="productPrice" header-align="center"></el-table-column>
      <el-table-column label="所属厂家" prop="companyName" header-align="center"></el-table-column>
      <el-table-column label="产品介绍" prop="text" header-align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title=""
            width="200"
            trigger="hover"
            :content="scope.row.text">
            <a href="javascript:void(0)"  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 110px;" slot="reference">
              {{ scope.row.text}}
            </a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="图片展示" prop="productUrl" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.productUrl)}">
            <el-image size="small" v-for="(img,index) in scope.row.productUrl.split(',')" :src="img" :key="index"
                      style="width: 45px;height: 45px;"></el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180" prop="createTime" header-align="center"></el-table-column>
      <el-table-column label="发布人" width="120" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="当前状态" width="120" prop="auditStatus" header-align="center">
        <template slot-scope="scope">
          <dictionary-name option-name="AUDIT_STATUS" :value="scope.row.auditStatus"></dictionary-name>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyData(scope.row)">编辑</el-button>
          <el-button type="text" @click="delData(scope.row)">删除</el-button>
          <el-button type="text" :disabled="scope.row.auditStatus=='PASS'" @click="auditData(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog title="新增产品" width="800px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="submitForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品价格" prop="productPrice"  :rules="[Validate.required('价格',true),Validate.allNumber]">
              <el-input v-model="submitForm.productPrice">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="submitForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="submitForm.contacPhone"></el-input>
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
            <el-form-item label="发布公司" prop="companyName">
              <el-input v-model="submitForm.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品介绍" prop="text">
              <el-input v-model="submitForm.text" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品图片" prop="productUrl">
              <upload-img ref="formProduct" v-model="submitForm.productUrl" :limit="4"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="修改产品" width="800px" :visible.sync="modifyVisible" append-to-body>
      <el-form :model="modifyForm" ref="modifyForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="modifyForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品价格" prop="productPrice" :rules="[Validate.required('价格',true),Validate.allNumber]">
              <el-input v-model="modifyForm.productPrice">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactUser">
              <el-input v-model="modifyForm.contactUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacPhone">
              <el-input v-model="modifyForm.contacPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所在地" prop="address">
              <el-input v-model="modifyForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="发布公司" prop="companyName">
              <el-input v-model="modifyForm.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品介绍" prop="text">
              <el-input v-model="modifyForm.text" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <el-form-item label="产品图片" prop="productUrl">
              <upload-img ref="formProduct" v-model="modifyForm.productUrl" :limit="4"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
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
import * as API from "@/api/frozen/index";
import Validate from "@/commom/validate";

export default {
  name: "frozen",
  data() {
    return {
      // 遮罩层
      loading: true,
      Validate:Validate,
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
      auditVisible:false,
      vehicleLicenseNum: '',
      auditform: {
        id: '',
        auditStatus: 'REJECT',
        auditResult: ''
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        status: '',
        publishTime: [],
        dateStart: '',
        dateEnd: '',
      },
      submitForm: {
        contacPhone: '',
        contactUser: '',
        productName: '',
        text: '',
        companyName:'',
        productPrice:'',
        address: '',
        productUrl:''

      },
      modifyForm: {},
      formRules: {
        productName: [
           {required: true, message: '产品名称必填', trigger: 'blur'},
         ],
        contactUser: [
           {required: true, message: '联系人必填', trigger: 'blur'},
         ],
        contacPhone: [
           {required: true, message: '联系电话必填', trigger: 'blur'},
         ],
        address: [
           {required: true, message: '详细地址必填', trigger: 'blur'},
         ],
        companyName: [
           {required: true, message: '发布公司必填', trigger: 'blur'},
         ],
        text: [
           {required: true, message: '产品介绍必填', trigger: 'blur'},
         ],

        productUrl: [
           {required: true, message: '请上传产品图片', trigger: 'blur'},
         ],
      },

    };
  },
  created() {
    this.getList();
  },
  watch: {
    'addVisible'(val) {
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()

      }
    },
    'modifyVisible'(val) {
      let vm = this
      if (!val) {
        vm.$refs.formProduct.clearFileList()

      }
    }
  },
  methods: {
    addInfo() {
      this.addVisible = true
    },
    addSubmit(formNmame) {

      this.submitForm.productUrl = this.$refs.formProduct.getFileList()
        .join(',');
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          API.addPage(this.submitForm).then(
            res => {
              if (res.success) {
                this.getList()
                this.addVisible = false
                this.$message.success('发布成功');
                this.$refs['submitForm'].resetFields()
              }
            }
          )
        }})

    },
    getList() {
      this.loading = true;
      if (this.queryParams.publishTime) {
        this.queryParams.dateStart = this.queryParams.publishTime[0]
        this.queryParams.dateEnd = this.queryParams.publishTime[1]
      }

      API.listPage(this.queryParams).then(
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
                  if (this.modifyForm.productUrl && this.modifyForm.productUrl != '') {
                    this.$refs.formProduct.setFileList(
                      this.modifyForm.productUrl.split(',')
                    )
                  }
                }, 0)
                this.modifyVisible = true
              }
            }
          )


    },
    modifySubmit() {
      this.modifyForm.productUrl = this.$refs.formProduct.getFileList()
        .join(',');
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
      API.updPage(this.modifyForm).then(
        res => {
          if (res.success) {
            this.$message.success('修改成功');
            this.modifyVisible = false
            this.getList()
          }
        }
      )}})
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
              this.getList()
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


    reset() {
      this.resetForm("form");
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
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
