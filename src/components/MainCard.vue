<template>
  <el-card>
    <div>
      <el-image :src="newurl" style="width: 25px; height: 25px">
        <template #error>
          <div class="image-slot">
            <el-icon><font-awesome-icon icon="fa-solid fa-images" /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div class="Card" @click="jumpUrl">
      <div class="top top_text" @click="jump()">
        <span>书签名称：{{ Book?.name }}</span>
      </div>
      <div class="top">
        <span>当前分级：{{ Book?.item }}--{{ Book?.children }}级</span>
      </div>
      <div class="top">
        <div class="URL_text">
          <span> URL：{{ Book?.url }} </span>
        </div>
      </div>
    </div>
    <hr  style="margin-top:8px;"/>
    <div class="top">
      <div class="bottom">
        <el-button
          type="primary"
          primary
          class="button"
          v-if="Book.isTop"
          @click="CancelGetBook"
          >取消置顶</el-button
        >
        <el-button
          type="primary"
          primary
          class="button"
          v-else
          @click="setLoadGetBook"
          >设置置顶</el-button
        >
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, toRefs, onMounted, computed } from "vue";
import { SetTopBookMark, CancelTopBookMark } from "../http/index";
import { ElMessage } from "element-plus";

const props = defineProps({
  Book: {
    type: Array,
  },
});
const { Book } = toRefs(props);
onMounted(() => {
  console.log(Book?.value);
});
const jumpUrl = () => {
  window.open(Book?.value.url);
};

const emit = defineEmits(["GetBook"]);
const CancelGetBook = async () => {
  var res = (await CancelTopBookMark(Book?.value.id)).data;
  if (res.statusCode == 200) {
    ElMessage.success(`${res.message}`);
    emit("GetBook");
  } else {
    ElMessage.error(`取消置顶失败：${res.message}`);
  }
};
const setLoadGetBook = async () => {
  var res = (await SetTopBookMark(Book?.value.id)).data;
  if (res.statusCode == 200) {
    if(res.successful == false){
          ElMessage.warning(`${res.message}`);
    }else{
    ElMessage.success(`${res.message}`);
    }
  } else {
    ElMessage.error(`置顶失败：${res.message}`);
  }
};

//解析url
const newurl = computed(()=>{
  var pattern = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/  
  return 'https://api.iowen.cn/favicon/' + (Book?.value.url).match(pattern)[0] +'.png'
})
</script>

<style scoped>
.top {
  margin-top: 8px;
}
.URL_text {
  /*1. 先强制一行内显示文本*/
  white-space: nowrap;
  /*2. 超出的部分隐藏*/
  overflow: hidden;
  /*3. 文字用省略号替代超出的部分*/
  text-overflow: ellipsis;
  font-size: 12px;
}
.top_text {
  /*1. 先强制一行内显示文本*/
  white-space: nowrap;
  /*2. 超出的部分隐藏*/
  overflow: hidden;
  /*3. 文字用省略号替代超出的部分*/
  text-overflow: ellipsis;
}
.bottom {
  margin-top: 5px;
  line-height: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  padding: 3px;
  min-height: auto;
  font-size: 12px;
}
.Card:hover{
      cursor: pointer;
}

</style>