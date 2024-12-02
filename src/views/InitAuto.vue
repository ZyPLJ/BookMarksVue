<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { AutoInitBookmarks } from "../http/index";
import { ElLoading } from 'element-plus'

const initAuto = (type) => {
  ElMessageBox.confirm(
      '确定要初始化' + type + '浏览器吗?',
      '提示',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
  .then(async () => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    const res = (await AutoInitBookmarks(type)).data;
    if(res.statusCode === 200){
      ElMessage.success(res.message);
    }else{
      ElMessage.error('初始化失败' + res.message);
    }
    loading.close()
  })
  .catch(() => {
    ElMessage.info('取消初始化')
  })
}
</script>

<template>
  <div class="flex">
    <el-card class="card" shadow="hover" @click="initAuto('Edge')">
      <template #header>Edge 浏览器</template>
      <img
          src="/images/8a85f90d064625d576de9599dc281168.jpeg"
          alt="Edge 浏览器"
      />
    </el-card>
    <el-card class="card" shadow="hover" @click="initAuto('Chrome')">
      <template #header>Chrome 浏览器</template>
      <img
          src="/images/ed10af070ef2c04d6da81edb987f9995.jpeg"
          alt="Chrome 浏览器"
      />
    </el-card>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.card {
  width: 480px;
  height: 300px; /* 确保卡片大小一致 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  width: 100%;
  height: calc(100% - 50px); /* 排除header的高度 */
  object-fit: contain; /* 避免图片被裁剪 */
  object-position: center;
}
</style>

