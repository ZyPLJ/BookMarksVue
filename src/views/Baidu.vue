<template>
  <div class="baidu">    
    <el-row justify="center" align="center">     
      <el-col :span="12">       
        <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="百度一下"
    @select="handleSelect"
    style="width:280px;box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            font-size: 16px;
            outline: none;"
  >
    <template #suffix>
      <el-icon class="el-input__icon" @click="handleIconClick">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete> 
        <el-button
          type="primary"
          @click="ToBaidu"
          style="
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            font-size: 16px;
            outline: none;
          ">百度一下</el-button>    
      </el-col>   
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { jsonp } from "vue-jsonp";
import { GetBaidu } from "../http/index";

const state = ref("");
const links = ref<LinkItem[]>([]);

interface LinkItem {
  value: string;
}

const loadAll = () => {
  if (state.value === "") {
    return [];
  }
  const script = document.createElement("script");
  const url =
    "https://suggestion.baidu.com/su?wd=" + state.value + "&cb=callback";
  script.src = url;
  document.body.appendChild(script);
  window.callback = (data) => {
    let b = data.s.map((item) => {
      return { value: item };
    });
    links.value = b;
    delete window.callback;
  };
};

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;
  console.log(results);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (results.length === 0) {
      loadAll();
    }
    cb(results);
  }, 600 * Math.random());
};

const createFilter = (queryString: string) => {
  return (item: LinkItem) => {
    return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const handleSelect = (item: LinkItem) => {
  window.open("http://www.baidu.com/s?wd=" + item.value);
  console.log(item);
};

const ToBaidu = () => {
  window.open("http://www.baidu.com/s?wd=" + state.value);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

<style scoped>
.baidu{
  height: 580px;
}
</style>
