<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="名称"
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
      <el-table-column label="名称" prop="name" header-align="center" show-overflow-tooltip min-width="150">
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
      <el-table-column label="联系人" prop="contactUser" header-align="center"></el-table-column>
      <el-table-column label="联系电话" prop="contacPhone" header-align="center" show-overflow-tooltip
                       min-width="130"></el-table-column>
      <el-table-column label="收藏时间" prop="createTime" header-align="center" show-overflow-tooltip
                       min-width="150"></el-table-column>
      <el-table-column label="收藏人" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="当前状态" prop="auditStatus" header-align="center">
        <template slot-scope="scope">
          <dictionary-name option-name="AUDIT_STATUS" :value="scope.row.auditStatus"></dictionary-name>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="140" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
        <!-- <el-row>
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
         </el-row>-->
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
import * as API from "@/api/recommend/index";
import Validate from "@/commom/validate";

export default {
  name: "recommend",
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
    this.getList();
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

    getList() {
      this.loading = true;
      if (this.queryParams.publishTime) {
        this.queryParams.dateStart = this.queryParams.publishTime[0]
        this.queryParams.dateEnd = this.queryParams.publishTime[1]
      }

      API.queryList(this.queryParams).then(
        response => {
          if (response.success) {
            this.loading = false
            this.DataList = response.result
            this.total = response.page.total
          }

        }
      ).catch(err => this.loading = false);
    },

    delData(row) {
      let param = {}
      param.id = row.id
      this.$confirm('确定要取消掌柜推荐数据吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.delPage(param).then(
          res => {
            if (res.success) {

              this.$message.success('已删除');
              this.getList();
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
