<template>
    <div class="retrievePassword">
        <div class="container">
            <h4>修改密码</h4>
            <div style="width:300px">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
                
                    <el-form-item prop="account" label="手机号">
                        <el-input v-model="loginForm.account" type="text" auto-complete="off" placeholder="账号">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pwd" label="新密码">
                        <el-input
                            v-model="loginForm.pwd"
                            type="password"
                            auto-complete="off"
                            placeholder="新密码"
                            @keyup.enter.native="handleLogin"
                        >
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pwd" label="确认密码">
                        <el-input
                            v-model="loginForm.pwd"
                            type="password"
                            auto-complete="off"
                            placeholder="确认密码"
                            @keyup.enter.native="handleLogin"
                        >
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button
                            :loading="loading"
                            size="medium"
                            type="primary"
                            style="width:100%;border-radius: 50px;"
                            @click.native.prevent="handleLogin"
                        >
                            <span v-if="!loading">提  交</span>
                            <span v-else>提 交 中...</span>
                        </el-button>

                       
                    </el-form-item>
                </el-form>
            </div>
            <span @click="goback">返回首页</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false,
            loginForm: {
                account: "",
                phone: "",
                pwd:"",
                code: ""
            },
            loginRules: {
                account: [{ required: true, trigger: "blur", message: "用户名不能为空" }],
                pwd: [{ required: true, trigger: "blur", message: "密码不能为空" }],
                // code: [{ required: false, trigger: "change", message: "验证码不能为空" }]
            },
        }
    },
    methods:{
        handleLogin(){

        },
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.retrievePassword {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.png");
  background-size: cover;

  .container{
        width: 50%;
        height: 50%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
  }
}
</style>