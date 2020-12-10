<template>
  <div class="app-container ">
    <div style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-plus" @click="addInfo()">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="DataList"
      border
      stripe>

      <el-table-column label="图片" prop="imgUrl" header-align="center">
        <template slot-scope="scope">
          <a class="auto-preview" @click.stop="()=>{clickImg(scope.row.imgUrl)}">
            <el-image size="small" v-for="(img,index) in scope.row.imgUrl.split(',')" :src="img" :key="index"
                      style="width: 45px;height: 45px;"></el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" header-align="center" show-overflow-tooltip min-width="100">
      </el-table-column>
      <el-table-column label="发布人" prop="createUser" header-align="center" show-overflow-tooltip min-width="100">
      </el-table-column>
      <el-table-column label="发布时间" prop="createTime" header-align="center" show-overflow-tooltip min-width="150">
      </el-table-column>
      <el-table-column label="操作" min-width="120" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyData(scope.row)">编辑</el-button>
          <el-button type="text" @click="delData(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" width="800px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="submitForm.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="imgUrl">
              <upload-img ref="formimg" v-model="submitForm.imgUrl" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否外部链接:" prop="isExternal">
              <el-switch v-model="submitForm.isExternal" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="submitForm.isExternal==true">
          <el-col :span="12">
            <el-form-item label="链接地址" prop="externalUrl">
              <el-input v-model="submitForm.externalUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-card style="height: 355px;">
            <quill-editor
              v-model="submitForm.content"
              ref="myQuillEditor"
              style="height: 350px;"
              :options="editorOption"
            ></quill-editor>
          </el-card>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>

    <el-dialog title="修改" width="800px" :visible.sync="modifyVisible" append-to-body>
      <el-form :model="modifyForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="modifyForm.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="imgUrl">
              <upload-img ref="formimg" v-model="modifyForm.imgUrl" :limit="1"></upload-img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否外部链接:" prop="isExternal">
              <el-switch v-model="modifyForm.isExternal" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="modifyForm.isExternal==true">
          <el-col :span="12">
            <el-form-item label="链接地址" prop="externalUrl">
              <el-input v-model="modifyForm.externalUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-card style="height: 355px;">
            <quill-editor
              v-model="modifyForm.content"
              ref="myQuillEditor"
              style="height: 350px;"
              :options="editorOption"
            ></quill-editor>
          </el-card>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>

  </div>
</template>

<script>
  import * as API from "@/api/bannerDetail/index";


  export default {
    name: "Banner",
    data() {
      return {
        // 遮罩层
        loading: true,
        DataList: [],
        submitForm: {
          tid: this.$route.query.id,
          imgUrl: '',
          sort: '',
          isExternal:false,
          externalUrl:'',
          content:'',
        },
        editorOption:{
          placeholder: '请输入内容',
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
              [{ script: "sub" }, { script: "super" }], // 上标/下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ font: [] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ["clean"], // 清除文本格式
              ["link", "image", "video"] // 链接、图片、视频
            ], //工具菜单栏配置
          },
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
          syntax: true, //语法检测
        },
        addVisible: false,
        modifyVisible: false,
        modifyForm: {},
        formRules: {
          /* logo: [
             {required: true, message: '请上传LOGO', trigger: 'blur'},
           ],
          */
        },

      };
    },
    components: {},
    created() {
      this.getList(this.$route.query.id);
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

      getList(data) {

        this.loading = true;
        let param = {};
        param.tid=data
        API.listPage(param).then(
          response => {
            if (response.success) {
              this.loading = false
              this.DataList = response.result

            }

          }
        ).catch(err => this.loading = false);
      },

      addInfo() {
        this.addVisible = true
      },
      addSubmit() {
        this.submitForm.imgUrl = this.$refs.formimg.getFileList()
          .join(',');
        API.addPage(this.submitForm).then(
          res => {
            if (res.success) {
              this.addVisible = false
              this.$message.success('新增成功');
              this.getList(this.$route.query.id)
              this.$refs['submitForm'].resetFields()
            }
          }
        )
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

</style>
