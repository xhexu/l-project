<template>
  <div class="login">
    <div style="position: absolute;right: 10px;top: 10px;">
      <el-button @click="$router.push({path:'/cargo-registry'})">货主加入</el-button>
      <el-button>司机加入</el-button>
    </div>
    <div style="display:flex;background:#fff;height:400px;align-items: center;">
      <div class="login-sketch"></div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
<!--        <h3 class="title">冷掌柜</h3>-->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" type="text" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
            <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="loginForm.pwd"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item> -->
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;border-radius: 50px;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>

          <div class="login-label">
              <span style="color:#FF7B23" @click="retrievePassword">找回密码</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color:#FF7B23" @click="$router.push({path:'/protocol'})">平台协议</span>
          </div>

        </el-form-item>
      </el-form>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2020 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        account: "",
        phone: "",
        type:'pc',
        pwd:"",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        pwd: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        // code: [{ required: false, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        type: 'pc'
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
              // this.getCode();
            });
        }
      });
    },

    retrievePassword(){
      this.$router.push({path:'/retrievePassword'})
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.png");
  background-size: cover;
  &-label{
    margin:20px 0;
    display:flex;
    align-items: center;
    justify-content: space-between;
    span{
      cursor: pointer;
    }
    span:hover{
      opacity: 0.7;
    }
  }
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color:#FF7B23;
}
.login-sketch{
  width: 400px;
  height: 100%;
  background-image: url("../assets/image/chahua.png");
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 300px;
  padding: 25px 25px 5px 25px;
  background-size: cover;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
