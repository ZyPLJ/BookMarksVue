<template>
  <el-row :gutter="12">
    <el-col
      :span="6"
      style="margin-top: 10px"
      v-for="(item, index) in Book?.data"
      key="index"
      class=" animate__animated h"
    >
      <MainCard :Book="item" v-on:GetBook="GetBook"/>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import MainCard from "../components/MainCard.vue";
import { GetTopBookmarks } from "../http/index";
import { ref,watch } from "vue";
import { Calendar, Search } from '@element-plus/icons-vue'
import 'animate.css'
import { id, tr } from "element-plus/es/locale";
import { ElMessage } from "element-plus";


const Book = ref();
const GetBook = async () => {
  try {
     Book.value = (await GetTopBookmarks()).data;
  } catch (error) {
    ElMessage.error(`error:${error.message}`)
  }
};

GetBook();
</script>
<style scoped>
.h:hover{
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
</style>