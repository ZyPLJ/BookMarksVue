<template>
  <div>
    <AddCard @click="dialog = true" class="DyPage" />
    <!-- 根据不同的参数展示不同的内容 -->
    <el-row :gutter="20">
        <el-col
        :span="4"
      style="margin-top: 10px"
      v-for="(item, index) in NewCard?.data"
      key="index"
      class="animate__animated  h DyPage"
    >
      <AddCardtwo :NewCard="item" @click="ToUrl" @loadNewCar="loadNewCar"/>
    </el-col>
      </el-row>
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="添加一个网站跳转链接!"
      :before-close="handleClose"
      direction="ltr"
      class="demo-drawer"
    >
      <hr />
      <div class="content">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="起个名吧" prop="Name">
            <el-col :span="16">
              <el-input v-model="ruleForm.Name" />
            </el-col>
          </el-form-item>
          <el-form-item label="网站路径" prop="Url">
            <el-col :span="16">
              <el-input v-model="ruleForm.Url" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-button
                type="primary"
                @click="submitForm(ruleFormRef)"
                style="width: 100%"
              >
                新增
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-button @click="resetForm(ruleFormRef)" style="width: 100%"
                >重置</el-button
              >
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref,watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRoute } from "vue-router";
import AddCard from "../components/AddCard.vue";
import AddCardtwo from "../components/AddCardtwo.vue";
import {AddNewBook,GetAllNewBook} from "../http/index"
import { ElMessage } from 'element-plus'
import { fa } from "element-plus/es/locale";
import "animate.css";

const card = ref();
const route = useRoute();
const dialog = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  Name: "",
  Url: "",
  Uid:route.params.id
});
const NewCard = ref()
const rules = reactive<FormRules>({
  Name: [{ required: true, message: "必填", trigger: "blur" }],
  Url: [{ required: true, message: "必填", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      var res = (await AddNewBook(ruleForm)).data
      console.log(res)
      if(res.statusCode == 200){
          ElMessage.success(`${res.message}`)
          dialog.value = false
          loadNewCar()
      }else{
        ElMessage.error(`${res.message}`)
      }
    } else {
      console.log("error submit!", fields);
      ElMessage.warning(`请填写正确的参数`)
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(async ()=>{
  loadNewCar()
})
const loadNewCar =async ()=>{
  NewCard.value = (await GetAllNewBook(route.params.id)).data
}

watch(()=>route.params.id,async (newvalue,oldvalue)=>{
  loadNewCar()
  ruleForm.Uid = newvalue
})

</script>
<style scoped>
.content {
  margin-top: 20px;
}
.h:hover {
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
.DyPage{
  margin-top:10px;
}
</style>
