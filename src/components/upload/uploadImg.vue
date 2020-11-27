<template>
  <div>
    <el-upload
      :action="action"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :file-list="fileList"
      :disabled="disabled"
      :data="extraData"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :on-remove="handleRemove"
      :multiple="true"
      :accept="accept"
      :limit="limit"
      list-type="picture-card"
      :on-exceed="warning"
    >
      <i class="el-icon-plus"></i>
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>


export default {
  props: {
    disabled: Boolean, //是否禁用
    fileModule: {
      //文件模块，上传目录
      type: String,
      default: "tms"
    },
    limit: {
      type: Number,
      default: 100
    },
    accept:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      action: process.env.VUE_APP_BASE_API+'/upload/file',
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      extraData: {
        module: this.fileModule
      }
    };
  },
  watch: {
    fileList(val) {
      /*
                const _this = this;
                val.forEach(va => {
                    if(va.response.success === false){
                        _this.remove(va)
                    }
                })*/
    },
    deep: true
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      if (
        file.url.substring(file.url.lastIndexOf(".")).toLowerCase() ===
        ".jpg" ||
        file.url.substring(file.url.lastIndexOf(".")).toLowerCase() === ".png"
      ) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } else {
        window.open(file.url);
      }
    },
    handleChange(file, fileList) {
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          fileList[i].name = "查看";
        }
      }
      this.fileList = fileList;
    },
    /**
     * 获取文件url
     * @returns {Array} url列表 eg.[{'https://fuss10.elemecdn.com/3/63/4e7f3a1ebp/quality/100'}]
     */
    getFileList() {
      let result = [];
      let fileList = this.fileList;
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[0].response.success === true) {
            let responseInfo = fileList[i].response.result;
            result.push(responseInfo);
          }
        }
      }
      return result;
    },
    /**
     * 设置FileList
     * @param newFileList eg.[{'https://fuss10.elemecdn.com/3/63/4e7f3a1ebp/quality/100'}]
     */
    setFileList(newFileList) {
      let vm = this;
      if (newFileList) {
        for (let i = 0; i < newFileList.length; i++) {
          if (newFileList[i] && newFileList[i].trim() != "") {
            let fileInfo = {};
            fileInfo.name = "查看";
            fileInfo.response = { success: true };
            fileInfo.url = newFileList[i];
            vm.fileList.push(fileInfo);
          }
        }
      }
    },
    /**
     * 清空文件列表
     */
    clearFileList() {
      this.fileList = [];
    },
    uploadError(err, file, fileList) {
      this.$message.error("上传失败!,系统异常");
    },
    uploadSuccess(response, file, fileList) {
      if (!response.success) {
        if (response.businessException) {
          this.$message.error("上传失败!" + response.message);
        } else {
          this.$message.error("上传失败!");
        }
        fileList.splice(fileList.indexOf(file), 1);
      }
    },
    warning() {
      let vm = this;
      vm.$message.warning("文件个数超出限制！");
    }
  }
};
</script>
