<template>
  <div class="app-container " >
    <div style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-plus" @click="addInfo()">新增</el-button>
    </div>
    <el-row>
      <el-col :span="8" v-for="(item,index) in DataList" :key="index">
        <div >
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(bannerImg,index) in item.banners" :key="index">
              <img :src="bannerImg" alt="">
            </el-carousel-item>

          </el-carousel>
          <div class="carousel-title" @click="showDetail(item)">{{item.name}}</div>

        </div>
      </el-col>
    </el-row>
    <el-dialog title="新增" width="800px" :visible.sync="addVisible" append-to-body>
      <el-form :model="submitForm" ref="submitForm"
               :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="submitForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="submitForm.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('submitForm')">确 定</el-button>
        </span>

    </el-dialog>

  </div>
</template>

<script>
  import * as API from "@/api/banner/index";


  export default {
    name: "Banner",
    data() {
      return {
        // 遮罩层
        loading: true,
        DataList: [],


        submitForm: {
          name: '',
          sort: '',
        },
        addVisible:false,
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
      this.getList();
    },
    watch: {},
    methods: {

      getList() {
        this.loading = true;

        API.listPage().then(
          response => {
            if (response.success) {
              this.loading = false
              this.DataList=response.result

            }

          }
        ).catch(err => this.loading = false);
      },
      showDetail(item){
        const { href } = this.$router.resolve({
          path: '/information/bannerDetail',
          query: { name: item.name ,id:item.id}
        })
        window.location.href = href;
      },
      addInfo(){
        this.addVisible = true
      },
      addSubmit(){
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
