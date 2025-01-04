<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item v-for="(menu, key) in menus" :key="key" :index="menu.path">
      <el-icon><font-awesome-icon :icon="menu.icon" /></el-icon>
      <template #title>{{ menu.name }}</template>
    </el-menu-item>
    <el-menu-item v-for="(menu, key) in menustow" :key="key" :index="menu.path" class="el-menu-item__title">
      <el-icon><font-awesome-icon :icon="menu.icon" /></el-icon>
      <template #title>
        {{ menu.name }}
        <div class="item_btn" @click="DelAside(menu.id)">
          <el-icon style="color:red"><CircleCloseFilled /></el-icon>
        </div>
      </template>
    </el-menu-item>
    <el-button type="primary" style="width: 100%" @click="visible = true">
      <el-icon :size="20">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </el-icon>
    </el-button>
  </el-menu>

  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">添加你的菜单！</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled/></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <el-form
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="icon 图标" prop="icon">
        <el-select
          v-model="formLabelAlign.icon"
          placeholder="icon 图标"
          prop="icon"
          @change="ceshi"
        >
          <el-option
            v-for="item in cities"
            :key="item"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
            >
              {{ item.value }}</span
            >
          </el-option>
        </el-select>
        <el-icon :size="20">
          <font-awesome-icon :icon="formLabelAlign.icon" />
        </el-icon>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { addMenus, GetMenus,DeleteMenus } from "../http/index";
import { ElMessage, ElMessageBox } from 'element-plus'

const ceshi = ()=>{
  console.log(formLabelAlign.icon)
}

const ruleFormRef = ref<FormInstance>();
const route = useRoute();
const router = useRouter();
const isCollapse = ref(true);
const visible = ref(false);
const selectValue = ref();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const rules = reactive<FormRules>({
  name: [{ required: true, message: "必填", trigger: "blur" }],
  icon: [{ required: true, message: "必填", trigger: "blur" }],
});

//菜单
const menus = reactive({
  Initializebbar: {
    name: "初始化书签",
    path: "/Initializebbar",
    icon: "fa-solid fa-file-lines",
  },
  InitAuto: {
    name: "初始化书签(自动)",
    path: "/InitAuto",
    icon: "fa-solid fa-file-lines",
  },
  Bookmarks: {
    name: "所有书签",
    path: "/",
    icon: "fa-solid fa-bookmark",
  },
  TopMain: {
    name: "书签置顶栏",
    path: "/TopMain",
    icon: "fa-solid fa-arrow-up-1-9",
  }
});
const menustow = ref();
const value = ref("");
const cities = [
  {
    value: "fa-solid fa-file-lines",
    label: "文本",
  },
  {
    value: "fa-solid fa-bookmark",
    label: "书签",
  },
  {
    value: "fa-solid fa-arrow-up-1-9",
    label: "向上",
  },
  {
    value: "fa-solid fa-magnifying-glass",
    label: "搜索",
  },
  {
    value: "fa-solid fa-images",
    label: "图片",
  },
  {
    value: "fa-solid fa-star",
    label: "收藏",
  },
  {
    value: "fa-solid fa-tag",
    label: "标记",
  }, 
  {
    value: "fa-solid fa-thumbs-up",
    label: "大拇指",
  }, 
  {
    value: "fa-solid fa-database",
    label: "数据库",
  }, 
  {
    value: "fa-solid fa-server",
    label: "服务器",
  }
];

const formLabelAlign = reactive({
  id:0,
  uid:"",
  name: "",
  path: "",
  icon: "",
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const count = (await GetMenus()).data;
      if (count.data.length >= 7) {
        ElMessage.warning(`以达到最大添加数目!`);
      } else {
        let uid = generateUID();
        formLabelAlign.path = "/dynamic-page/" + (uid);
        formLabelAlign.uid = uid;
        const res = (await addMenus(formLabelAlign)).data;
        console.log(res);
        if (res.statusCode == 200) {
          ElMessage({
            message: `${res.message}`,
            type: "success",
          });
          const restow = (await GetMenus()).data;
          menustow.value = restow.data;
          visible.value = false;
        } else {
          ElMessage.error(`${res.message}`);
        }
      }
    } else {
      console.log("error submit!", fields);
      ElMessage.error(`请填写完整数据!`);
    }
  });
};
onMounted(() => {
  load()
});

const load =async ()=>{
  const res = (await GetMenus()).data;
  menustow.value = res.data;
}

const DelAside = (id: any) => {
  ElMessageBox.confirm(
    '你确定要删除该菜单，里面的链接将会一同消失！！！',
    '删除菜单',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let res = (await DeleteMenus(id)).data
      if(res.statusCode == 200){
        ElMessage.success(`${res.message}`)
      }else{
        ElMessage.warning(`${res.message}`)
      }
      await load()
      router.replace("/Initializebbar")
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

//随机UID
const generateUID = ()=>{
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-menu-item__title .item_btn {
  position: absolute;
  top: 0;
  right: 0;
}
.item_btn{
  display: none;
  width:30px;
  height:100%;
}
.el-menu-item__title:hover > .item_btn {
  display: block;
}
</style>
