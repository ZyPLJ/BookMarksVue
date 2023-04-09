<template>
  <el-row>
    <el-col :span="3">
      <el-input v-model="query.Search" class="w-50 m-2 select" placeholder="书签名">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-col>
   <el-col :span="3" :offset="1">
       <el-select 
          v-model="Classid" 
          placeholder="筛选你的书签"
          @change="ChangeClass"
          class="select"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="item in BookClass?.data"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
      </el-col>
      <el-col :span="3" :offset="14">
         <el-tag
      class="mx-1"
      size="large"
    >
      数量:{{BookCount}}
    </el-tag>
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
import { GetAllBook,Getclassification,GetCount } from "../http/index";
import { ref, watch,computed,toRaw, onMounted } from "vue";
import { Calendar, Search } from "@element-plus/icons-vue";
import "animate.css";
import { ElMessage } from "element-plus";


//书签分类
const Classid = ref('');
const totalCount = ref(1000);
const query = ref();
query.value = {
  PageSize: 12,
  Page: 1,
  Search: "",
  Classid:Classid.value
};
const Book = ref();
const BookClass = ref();
const BookCount = ref('')
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
const ChangeClass = async() =>{
  query.value.Classid = Classid.value
  console.log(query.value)
  GetBook()
}

/*
* filter过滤
*/
// const ChangeClass = computed(()=>{
//     if (Book.value == undefined) return Book.value;
//   return Book?.value.data.filter((b) => {
//     return (!BookName.value||b.item === BookName.value || Book.value === 0)
//   })
// })

onMounted(async()=>{
  BookClass.value = (await Getclassification()).data;
  BookCount.value = ((await GetCount()).data).data
})
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
.select {
    border: none;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    font-size: 16px;
    outline: none;
}
</style>