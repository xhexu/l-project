<template>
  <div class="app-container " >
    <div style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-plus" @click="addInfo()">新增</el-button>
    </div>
    <el-row>
      <el-col :span="8" v-for="(item,index) in DataList" :key="index">
        <el-card class="box-card margin-20" >
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(bannerImg,index) in item.banners" :key="index">
              <img :src="bannerImg" alt="">
            </el-carousel-item>

          </el-carousel>

          <div slot="header" class="clearfix">

            <span @click="showDetail(item)">{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" @click="delData(item)" type="text">删除 </el-button>
          </div>
        </el-card>
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
      delData(item){
        let param = {}
        param.id = item.id
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
  .margin-20{
    margin: 0 20px 10px 0;
  }



</style>
