<template>
    <div class="retrievePassword">
        <div class="container">
            <el-button type="text" style="position: absolute; left: 10px;top: 10px;" @click="goback"> 返回首页</el-button>
            <h4 style="margin:20px 0">修改密码</h4>
            <div style="width:350px">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
                
                    <el-form-item prop="phone" label="手机号">
                        <el-input v-model="loginForm.phone" type="text" auto-complete="off" placeholder="账号">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="vifCode" label="验证码">
                        <el-input
                            v-model="loginForm.vifCode"
                            auto-complete="off"
                            placeholder="验证码"
                            style="width: 60%"
                        >
                            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                        </el-input>
                        <div class="login-code">
                            <span @click="getVifCode">{{vifText}}</span>
                        </div>
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
                    <el-form-item prop="pwdAgain" label="确认密码">
                        <el-input
                            v-model="loginForm.pwdAgain"
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
           
        </div>
    </div>
</template>
<script>
import * as API from "@/api/login2";

export default {
    data(){
        let validatorPwdAgain =  (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'))
            } else {
                const pwd = this.loginForm.pwd
                if (pwd == value) {
                    callback()
                } else {
                    return callback(new Error('两次输入的密码不一致'))
                }
            }
        }
        // 验证手机 
        let checkPhone = (rule, value, callback) => {
            let reg = /^1[345789]\d{9}$/
            if(!value){
                callback(new Error('手机号不能为空'))
            }else if (!reg.test(value)) {
                callback(new Error('手机号格式不正确'))
            } else {
                callback()
            }
        }
        return{
            loading:false,
            vifText:"获取验证码",
            loginForm: {
                account: "",
                phone: "",
                pwd:"",
                code: "",
                vifCode:""
            },
            loginRules: {
                phone: [ { required: true, validator:checkPhone,type:'number',trigger: "blur" }],
                pwd: [{ required: true, trigger: "blur", message: "密码不能为空" }],
                pwdAgain:[{ required: true, validator:validatorPwdAgain, trigger: "blur"}],
                vifCode: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
            },
        }
    },
    methods:{
        handleLogin(){

        },
        goback(){
            this.$router.go(-1);
        },
        getVifCode(){
            let result = this.$refs.loginForm.validateField('phone',error=>{
                if(!error){
                    let time = 60
                    let interval = setInterval(()=>{
                        time-=1
                        this.vifText = "验证码("+time+")s"
                        if(time == 0){
                            this.vifText = "获取验证码"
                            clearInterval(interval)
                        }
                    },1000)
                    API.getVifCode({phone:this.loginForm.phone}).then(res=>{
                        clearInterval(interval)
                    }).catch(err=>{
                        this.vifText = "获取验证码"
                        clearInterval(interval)
                    })
                }
            });
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
    .login-code {
        width: 38%;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        float: right;
        img {
            cursor: pointer;
            vertical-align: middle;
        }
    }
    .login-code:hover{
        opacity: 0.5;
    }
  .container{
        width: 40%;
        background-color: #ffffff;
        box-shadow: 0 0 10px 1px #e0e0e0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        border-radius: 5px;
  }
}
</style>