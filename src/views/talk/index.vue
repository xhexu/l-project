<template>
  <div class="app-container ">
    <el-row>
      <el-col :span="8" v-for="(item,index) in DataList" :key="index">
        <el-card class="box-card margin-20">
          <div :class="item.theme.length>5?'text-space':''">
            {{ item.theme }}
          </div>
          <div class="margin-20">
            <el-image size="small" v-for="(img,index) in item.imgUrl.split(',')" :src="img" :key="index"
                      style="width: 80px;height: 80px;"></el-image>
          </div>
          <div class="talk-style">
            <div>
              <span>评论:{{ item.commentsCount }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>点赞:{{ item.clickPraise }}</span>
            </div>

            <div><span>创建时间:{{ item.createTime }}</span></div>
          </div>
          <div slot="header" class="clearfix">
            <el-avatar v-if="item.userLogo &&item.userLogo.length>0&& item.userLogo!=null" size="small"
                       :src="item.userLogo.split(',')[0]"></el-avatar>
            <span>{{ item.userName }}</span>
            <span @click="showDetail(item)">{{ item.name }}</span>
            <el-button style="float: right; padding: 3px 0" @click="showDetail(item)" type="text">详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as API from "@/api/talk/index";


export default {
  name: "talk",
  data() {
    return {
      // 遮罩层
      loading: true,
      DataList: [],


      submitForm: {
        name: '',
        sort: '',
      },
      addVisible: false,
      modifyForm: {},
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
            this.DataList = response.result

          }

        }
      ).catch(err => this.loading = false);
    },
    showDetail(item) {
      this.$message.success('开发中');

      /*   const {href} = this.$router.resolve({
           path: '/banner/bannerDetail',
           query: {name: item.name, id: item.id}
         })
         window.location.href = href;*/
    },
    addSubmit() {
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
.margin-20 {
  margin: 0 20px 15px 0;
}

.text-space {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.talk-style {
  display: flex;
  justify-content: space-between;
}


</style>
