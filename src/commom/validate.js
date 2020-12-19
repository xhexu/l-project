export const Validate={
  licenseNumber:{pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂]{1}$/,message:'请输入正确的车牌号'},
  //挂厢号--
  trailerLicenseNumber: {pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[挂]{1}$/, message: '请输入正确的挂厢号!例：沪A00001挂'},
  //手机号
  phone:{pattern:/^1[0-9]{10}$/,message:'请输入手机号'},
  //必填项
  required(val,flag){
    return   { required: flag, message: val+'不能为空!', trigger: 'blur'};
  },
  //8位整数2小数含0
  allNumber: {pattern: /^(([1-9]\d{0,6})|0)(\.\d{1,2})?$/, message: '请输入正确的数字!'},
  //正整数
  number: {pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入正整数!'},
  //正数不含0
  plus: {pattern: /^\d+(\.\d+)?$/, message: '请输入大于0的数字值!'},
  //银行卡号
  bank:{pattern:/^\d{0,30}$/,message:'请输入正确的银行卡号'}
}

export default Validate
