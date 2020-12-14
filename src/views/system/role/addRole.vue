<template>
    <el-dialog title="新增角色" width="600px" :visible.sync="addRoleVisible" append-to-body>
      <el-form size="small" :model="roleForm" ref="roleForm" :rules="roleRules" label-width="100px" label-position="right">
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="编号：" prop="code">
              <el-input v-model="roleForm.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称：" prop="name">
              <el-input v-model="roleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="roleForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit('roleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as API from "@/api/system/role";
export default {
  data(){
      return{
          addRoleVisible:false,
          roleForm:{
              code:'',
              name:'',
              remark:''
          },
          roleRules:{},
      }
  },
  methods:{
      show(){
          this.addRoleVisible = true
      },
      addSubmit(){
          this.$refs.roleForm.validate((valid) => {
              if (valid) {
                  API.addRole(this.roleForm).then(
                      response=>{
                          if(response.success){
                              this.addRoleVisible=false;
                              this.$message.success('新增角色成功');
                              this.$emit('callback')
                          }else{
                              this.$message.error(response.message)
                          }
                      }
                  )
              } 
          }); 
      }
  }
}
</script>