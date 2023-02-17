<template>
  <el-menu
      :default-active="route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
     <el-menu-item index="/Initializebbar">
      <el-icon><font-awesome-icon icon="fa-solid fa-file-lines" /></el-icon>
      <template #title>初始化书签</template>
    </el-menu-item>
        <el-menu-item index="/">
      <el-icon><font-awesome-icon icon="fa-solid fa-bookmark" /></el-icon>
      <template #title>所有书签</template>
    </el-menu-item>
    <el-menu-item index="/TopMain">
      <el-icon><font-awesome-icon icon="fa-solid fa-arrow-up-1-9" /></el-icon>
      <template #title>书签置顶栏</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRoute,useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
