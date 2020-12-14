const data = {
  systemMenuType: [
    {code: 'MENU', name: '菜单'},
    {code: 'BUTTON', name: '按钮'},
    {code: 'PAGE', name: '页面'},
  ],
  COMPANY_NATURE: [
    {code: 'PRIVATE_COMPANY', name: '民营企业'},
    {code: 'COUNTRY_COMPANY', name: '国有企业'},
    {code: 'PUBLIC_COMPANY', name: '集体企业'},
    {code: 'JOINT_COMPANY', name: '联营企业'},
    {code: 'SHARES_COMPANY', name: '股份合作制企业'},
    {code: 'OWN_COMPANY', name: '个体户'},
    {code: 'PARTNER_COMPANY', name: '合伙企业'},
    {code: 'OTHER_COMPANY', name: '其他企业'},
  ],
  AUDIT_STATUS:[
    {code:'AUDIT',name:'待审核'},
    {code:'NOT_AUDIT',name:'未审核'},
    {code:'REJECT',name:'已驳回'},
    {code:'PASS',name:'审核通过'},
  ],
  CARGO_OWNER_TYPE:[
    {code:'personal',name:'个人'},
    {code:'company',name:'企业'}
  ]
}
export default data
