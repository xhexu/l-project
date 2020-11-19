<template>
    <div class="cargo-registry">
        <el-scrollbar wrap-class="cargo-wrap-class">
            <div class="main">
                <h3 style="text-align:center;margin:20px 0">注册货主信息</h3>
                <el-form :model="submitForm" ref="submitForm" :rules="formRules" :inline="true" label-width="90px">
                    <el-divider content-position="left">公司信息</el-divider>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="公司名称" prop="companyName">
                                <el-input
                                    v-model="submitForm.companyName"
                                    placeholder="请输入公司名称"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="公司简称" prop="companyShortName">
                                <el-input
                                    v-model="submitForm.companyShortName"
                                    placeholder="请输入公司简称"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="企业电话" prop="companyPhone">
                                <el-input
                                    v-model="submitForm.companyPhone"
                                    placeholder="请输入企业电话"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="办公地址" prop="companyAddr">
                                <el-input
                                    v-model="submitForm.companyAddr"
                                    placeholder="请输入办公地址"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮政编码" prop="postalCode">
                                <el-input
                                    v-model="submitForm.postalCode"
                                    placeholder="请输入邮政编码"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="企业邮箱" prop="companyEmail">
                                <el-input
                                    v-model="submitForm.companyEmail"
                                    placeholder="请输入企业邮箱"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="企业网址" prop="companyUrl">
                                <el-input
                                    v-model="submitForm.companyUrl"
                                    placeholder="请输入企业网址"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="经营范围" prop="businessScope">
                                <el-input
                                    v-model="submitForm.businessScope"
                                    placeholder="请输入经营范围"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属行业" prop="industry">
                                <el-input
                                    v-model="submitForm.companyPhone"
                                    placeholder="请输入所属行业"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider content-position="left">开户行信息</el-divider>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开户名" prop="accountName">
                                <el-input
                                    v-model="submitForm.accountName"
                                    placeholder="请输入开户名"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="银行行号" prop="bankNumber">
                                <el-input
                                    v-model="submitForm.bankNumber"
                                    placeholder="请输入银行行号"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="银行全称" prop="bankFullName">
                                <el-input
                                    v-model="submitForm.bankFullName"
                                    placeholder="请输入开户银行全称"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账号" prop="bankAccount">
                                <el-input
                                    v-model="submitForm.bankAccount"
                                    placeholder="请输入银行账号"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider content-position="left">联系人信息</el-divider>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="contactName">
                                <el-input
                                    v-model="submitForm.contactName"
                                    placeholder="请输入联系人"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系手机" prop="contactPhone">
                                <el-input
                                    v-model="submitForm.contactPhone"
                                    placeholder="请输入联系手机"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证号码" prop="contactIdcard">
                                <el-input
                                    v-model="submitForm.contactIdcard"
                                    placeholder="请输入身份证号码"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱" prop="contactEmail">
                                <el-input
                                    v-model="submitForm.contactEmail"
                                    placeholder="请输入邮箱"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系手机" prop="contactPhone">
                                <el-input
                                    v-model="submitForm.contactPhone"
                                    placeholder="请输入联系手机"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider content-position="left">法人信息</el-divider>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="法人姓名" prop="legalName">
                                <el-input
                                    v-model="submitForm.legalName"
                                    placeholder="请输入法人姓名"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证号码" prop="legalIdcard">
                                <el-input
                                    v-model="submitForm.legalIdcard"
                                    placeholder="请输入法人身份证号码"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="法人手机" prop="legalPhone">
                                <el-input
                                    v-model="submitForm.legalPhone"
                                    placeholder="请输入法人手机"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row style="text-align:center">
                    <el-button @click="$router.go(-1)">返回首页</el-button>
                    <el-button type="primary" @click="cargoRegistry">注  册</el-button>
                </el-row>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import * as API from "@/api/cargo/index";
export default {
    data(){
        return{
            submitForm:{
                companyName:"",//公司名称
                companyShortName:"",//公司简称
                companyPhone:"",//企业电话
                companyAddr:"",//办公地址
                postalCode:"",//邮政编码
                companyEmail:"",//企业邮箱
                companyUrl:"",//企业网址
                businessScope:"",//经营范围
                industry:"",//所属行业
                accountName:"",//开户名
                bankNumber:"",//银行行号
                bankFullName:"",//开户银行全称
                bankAccount:"",//银行账号
                contactName:"",//联系人姓名
                contactPhone:"",//联系人手机
                contactIdcard:"",//联系人身份证号码
                contactEmail:"",//联系人邮箱
                legalName:"",//法人姓名
                legalIdcard:"",//法人身份证号码
                legalPhone:"",//法人手机
                unifiedSocialCreditCode:"",//统一社会信用代码
                companyRegTime:"",//公司成立时间
                companyEffectiveTime:"",//有效开始时间
                companyInvalidTime:"",//有效结束时间
                companyRegType:"",//注册类型
                companySize:"",//公司规模
                regAddr:"",//注册地址
                actualCarrierBusinessLicense:"",//营业执照号码
                businessLicenseAnnex:"",//营业执照
                legalAnnex:"",//法定代表人证件
                roadTransportPermitAnnex:"",//道路运输许可证
                openingPermitAnnex:"",//开户许可证
                taxAuthorities:"",//税务机关
                taxAuthoritiesAnnex:"",//税务机关附件
            },
            formRules:{}
        }
    },
    methods:{
        cargoRegistry(){
            this.$refs['submitForm'].validate((valid) => {
                if (valid) {
                    API.cargoRegistry(this.submitForm).then(res=>{
                        this.$message.success('注册成功')
                        this.$refs['submitForm'].resetFields()
                    }).catch(err=>this.$message.warning(err.message))
                } 
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.cargo-registry{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/login-background.png");
    display: flex;
    align-items: center;
    justify-content: center;
    .main{
        width: 1000px;
        background: #ffffff;
        box-shadow: 0 0 10px 1px #e0e0e0;
    }
}
</style>
<style>
.cargo-wrap-class{
    height:600px;
}
</style>