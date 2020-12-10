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
          <el-form-item label="状态" prop="status">
            <el-input
              v-model="queryParams.status"
              placeholder="状态"
              clearable
              size="small"
              style="width: 12rem"
              @keyup.enter.native="handleQuery"
            />
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
      :data="DataList"
      border
      stripe>
      <el-table-column label="产品名称" prop="titleName" header-align="center" show-overflow-tooltip min-width="100">
      </el-table-column>
      <el-table-column label="封面" prop="imgUrl" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.imgUrl)}">
            <el-image size="small" v-for="(img,index) in scope.row.imgUrl.split(',')" :src="img" :key="index"
                      style="width: 45px;height: 45px;"></el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="产品内容" prop="textContent" header-align="center">
        <template slot-scope="scope">
          <a href="javascript:void(0)" style="color: #409EFF" @click.stop="()=>{detail(scope.row)}">
            详情
          </a>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" prop="createTime" header-align="center"></el-table-column>
      <el-table-column label="发布人" prop="createUser" header-align="center"></el-table-column>
      <el-table-column label="审核状态" prop="auditStatus" header-align="center">
        <template slot-scope="scope">
          <dictionary-name option-name="AUDIT_STATUS" :value="scope.row.auditStatus"></dictionary-name>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120" align="center" class-name="small-padding fixed-width">
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

    <el-dialog title="发布" width="800px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="titleName">
              <el-input v-model="submitForm.titleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="封面" prop="imgUrl">
              <upload-img ref="formimg" v-model="submitForm.imgUrl" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="详细内容" prop="textContent">
            <el-card style="height: 355px;">
              <quill-editor
                v-model="submitForm.textContent"
                ref="myQuillEditor"
                style="height: 350px;"
                :options="editorOption"
              ></quill-editor>
            </el-card>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="修改信息" width="800px" :visible.sync="modifyVisible" append-to-body>
      <el-form :model="modifyForm" ref="modifyForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="titleName">
              <el-input v-model="modifyForm.titleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="封面" prop="imgUrl">
              <upload-img ref="formimg" v-model="modifyForm.imgUrl" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="详细内容" prop="textContent">
            <el-card style="height: 355px;">
              <quill-editor
                v-model="modifyForm.textContent"
                ref="myQuillEditor"
                style="height: 350px;"
                :options="editorOption"
              ></quill-editor>
            </el-card>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
        </span>

    </el-dialog>
    <el-dialog title="查看" width="800px" :visible.sync="detailVisible" append-to-body>
      <el-form :model="currentRow" ref="modifyForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="titleName">
              {{currentRow.titleName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="封面" prop="imgUrl">
              <a href="javascript:void(0)" style="color: #409EFF" @click.stop="()=>{clickImg(currentRow.imgUrl)}">
                查看图片
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="详细内容" prop="imgUrl">

            <pre class="ql-editor" v-html="currentRow.textContent"></pre>
          </el-form-item>

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
  import * as API from "@/api/businnessInfo/index";


  export default {
    name: "businessInfo",
    data() {
      return {
        // 遮罩层
        loading: true,
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
        detailVisible: false,
        currentRow: {},
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
          titleName: '',
          imgUrl: '',
          textContent: '',

        },
        editorOption: {
          placeholder: '请输入内容',
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{header: 1}, {header: 2}], // 1、2 级标题
              [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
              [{script: "sub"}, {script: "super"}], // 上标/下标
              [{indent: "-1"}, {indent: "+1"}], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{size: ["small", false, "large", "huge"]}], // 字体大小
              [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
              [{color: []}, {background: []}], // 字体颜色、字体背景颜色
              [{font: []}], // 字体种类
              [{align: []}], // 对齐方式
              ["clean"], // 清除文本格式
              ["link", "image", "video"] // 链接、图片、视频
            ], //工具菜单栏配置
          },
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
          syntax: true, //语法检测
        },
        modifyForm: {},
        auditVisible: false,
        auditform: {
          id: '',
          auditStatus: 'REJECT',
          auditResult: ''
        },
        formRules: {
          /* logo: [
             {required: true, message: '请上传LOGO', trigger: 'blur'},
           ],
           productUrl: [
             {required: true, message: '请上传产品图片', trigger: 'blur'},
           ],*/
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
          vm.$refs.formimg.clearFileList()

        }
      },
      'modifyVisible'(val) {
        let vm = this
        if (!val) {
          vm.$refs.formimg.clearFileList()

        }
      }
    },
    methods: {
      addInfo() {
        this.addVisible = true
      },
      addSubmit(formNmame) {
        this.submitForm.imgUrl = this.$refs.formimg.getFileList()
          .join(',');
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
                if (this.modifyForm.imgUrl && this.modifyForm.imgUrl != '') {
                  this.$refs.formimg.setFileList(
                    this.modifyForm.imgUrl.split(',')
                  )
                }
              }, 0)
              this.modifyVisible = true
            }
          }
        )
      },
      modifySubmit() {

        this.modifyForm.imgUrl = this.$refs.formimg.getFileList()
          .join(',');
        API.updPage(this.modifyForm).then(
          res => {
            if (res.success) {
              this.$message.success('修改成功');
              this.modifyVisible = false
              this.getList()
            }
          }
        )
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
      detail(row) {
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
<style>
  .editor {
    line-height: normal !important;
    height: 800px;
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>
