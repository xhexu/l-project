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
      <el-table-column label="发布时间" prop="createTime" header-align="center" show-overflow-tooltip min-width="100">
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
