<template>
  <div class="cargo-registry">
    <el-scrollbar wrap-class="cargo-wrap-class">
      <div class="main">
        <h3 style="text-align:center;margin:20px 0">注册货主信息</h3>

        <el-form :model="submitForm" ref="submitForm"
                 :rules="formRules" label-width="120px">

            <el-row>
              <el-col :span="18">
                <el-form-item label="货主类型" prop="goodsType">
                  <dictionary-select option-name="CARGO_OWNER_TYPE" v-model="submitForm.goodsType"></dictionary-select>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row v-if="submitForm.goodsType=='personal'">
            <el-col :span="18">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="submitForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="submitForm.goodsType=='company'">
            <el-col :span="18">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="submitForm.companyName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="submitForm.goodsType=='company'">
            <el-col :span="18">
              <el-form-item label="联系人" prop="contactPeople">
                <el-input v-model="submitForm.contactPeople"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="身份证号" prop="idcard">
                <el-input v-model="submitForm.idcard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="submitForm.phone">
                  <template  slot="append">
                    <el-button v-if="vifMsg" @click="sendvidCode" type="primary" class='cu-btn bg-color shadow'>验证码</el-button>
                    <el-button v-if="!vifMsg" class='cu-btn shadow'>{{count}}</el-button>
                  </template>
                </el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="验证码" prop="vifCode">
                <el-input v-model="submitForm.vifCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row style="text-align:center">
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="cargoRegistry">注 册</el-button>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import * as API from "@/api/cargo/index";

  var vifcodetime;
  export default {
    data() {
      return {
        count: 60,
        vifMsg: true,
        submitForm: {
          goodsType: '',
          name: '',
          companyName: '',
          contactPeople: '',
          idcard: '',
          phone: '',
          vifCode: '',
        },
        formRules: {}
      }
    },
    methods: {

      sendvidCode() {
        let vm = this;
        if (this.submitForm.phone) {
          API.sendVifCode(this.submitForm.phone).then(res => {
            if (res.success) {
              this.vifMsg = false;
              this.$message.success('发送成功');
              vifcodetime = setInterval(function () {
                vm.count = vm.count - 1;
                if (vm.count <= 0) {
                  vm.vifMsg = true;
                  clearInterval(vifcodetime);//
                  vm.vifMsg = true;
                }
              }, 1000);
            }
          })

        } else {
          this.$message.warning('手机号格式不正确');
        }
      },
      cargoRegistry() {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            API.register(this.submitForm).then(res => {
              this.$message.success('注册成功')
              this.$refs['submitForm'].resetFields()
              this.$router.push({path:'/login'})
            }).catch(err => this.$message.warning(err.message))
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cargo-registry {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/login-background.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .main {
      width: 600px;
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 0 10px 1px #e0e0e0;
    }

  }
</style>
<style>
  .cargo-wrap-class {
    height: 600px;

  }
  .bg-color{
    background: #FF7B23 !important;
    color: #fff !important;
  }
</style>
