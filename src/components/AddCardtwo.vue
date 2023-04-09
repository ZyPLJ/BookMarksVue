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
        <span>书签名称：{{ NewCard.name }}</span>
      </div>
      <div class="top">
        <div class="URL_text">
          <span> URL：{{ NewCard.url }} </span>
        </div>
      </div>
    </div>
    <hr  style="margin-top:8px;"/>
    <div class="top">
      <div class="bottom">
        <el-button type="danger" :icon="Delete" @click="DelCard()" />
      </div>
    </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, toRefs, onMounted, computed, compile } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { DelNewBook } from "../http/index";
import { Delete } from '@element-plus/icons-vue'

const emit = defineEmits(["loadNewCar"]);
const props = defineProps({
  NewCard: {
    type: Array,
  },
});
const { NewCard } = toRefs(props);
onMounted(() => {
  console.log(NewCard?.value);
});

//解析url
const newurl = computed(() => {
  try {
    var pattern =
    /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  return (
    "https://api.iowen.cn/favicon/" +
    (NewCard?.value.url).match(pattern)[0] +
    ".png"
  );
  } catch (error) {
    return null;
  }
});

const jumpUrl = () => {
  window.open(NewCard?.value.url);
};

const DelCard = () => {
  ElMessageBox.confirm(`你要删除${NewCard?.value.name}吗？`, "删除图标", {
    confirmButtonText: "OK",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      var res = (await DelNewBook(NewCard?.value.id)).data;
      console.log(res);
      if (res.statusCode == 200) {
        ElMessage({
          type: "success",
          message: `${res.message}`,
        });
      } else if (res.statusCode == 201) {
        ElMessage({
          type: "warning",
          message: `${res.message}`,
        });
      } else {
        ElMessage({
          type: "error",
          message: `${res.message}`,
        });
      }
      emit("loadNewCar");
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "删除失败",
      });
    });
};
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