<template>
  <div class="content">
    <el-upload
    class="upload-demo"
    drag
    action="http://47.113.150.96:9031/Api/GetBookmarks/BookMarks"
    multiple
    method="post"
    name="file"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
    style="width:500px;"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
         请上传正确的BookMarks文件！！！，大小不超过2MB
      </div>
    </template>
  </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {GetBookmarks} from "../http/index"
import { ElMessage } from "element-plus";
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  ElMessage.success(`${response.message}`)
}

const handleAvatarError:UploadProps['onError'] = (
  response,
  UploadFilled
) =>{
   ElMessage.error(`${response.message}`)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件不能超过 2MB!')
    return false
  }
  return true
}

</script>
<style scoped>
.content{
     display: flex;
   flex-flow: row wrap;
   justify-content: center;
      align-items: center;
        height: 60vh;
}
</style>
