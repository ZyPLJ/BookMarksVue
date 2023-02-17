<template>
  <el-row>
    <el-col :span="3">
      <el-input v-model="query.Search" class="w-50 m-2" placeholder="书签名">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <el-col
      :span="6"
      style="margin-top: 10px"
      v-for="(item, index) in Book?.data"
      key="index"
      class="animate__animated h"
    >
      <MainCard :Book="item" />
    </el-col>
  </el-row>
  <div class="fenye">
    <!-- 分页 -->
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="query.Page"
      :page-size="query.PageSize"
      background
      layout="prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import MainCard from "../components/MainCard.vue";
import { GetAllBook } from "../http/index";
import { ref, watch } from "vue";
import { Calendar, Search } from "@element-plus/icons-vue";
import "animate.css";
import { id, tr } from "element-plus/es/locale";
import { ElMessage } from "element-plus";

const totalCount = ref(1000);
const query = ref();
query.value = {
  PageSize: 12,
  Page: 1,
  Search: "",
};
const Book = ref();
const GetBook = async () => {
  try {
    Book.value = (await GetAllBook(query.value)).data;
    totalCount.value = Book.value.pagination.totalItemCount;
  } catch (error) {
    ElMessage.error(`error:${error.message}`);
  }
};
const handlePageSizeChange = (pageSize: any) => {
  query.value.pageSize = pageSize;
  GetBook();
};
const handleCurrentPageChange = (page: any) => {
  query.value.Page = page;
  GetBook();
};
watch(
  () => query.value.Search,
  (newvalue, oldvalue) => {
    if (newvalue != oldvalue) {
      query.value.Search = newvalue;
      GetBook();
    }
    console.log(newvalue, oldvalue);
  }
);

GetBook();
</script>
<style scoped>
.fenye {
  margin-top: 2%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.h:hover {
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
</style>