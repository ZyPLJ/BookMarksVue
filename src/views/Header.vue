<template>
  <el-row>
    <el-col :span="4">
      <el-row>
        <div class="demo-type">
          <div>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
        </div>
        <el-col :span="1"></el-col>
        <div class="icon" @click="drawer = true"><font-awesome-icon icon="fa-solid fa-gear" size="1x" /></div>
      </el-row>
    </el-col>
  </el-row>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
<div class="theme-list">
         <p>亮色<el-divider direction="vertical" />暗黑</p>
         <!--  v-model 绑定 themeConfig.isDark-->
         <el-switch
           v-model="themeConfig.isDark"
           inline-prompt
           active-icon="Sunny"
           inactive-icon="Moon"
         />
     </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { useDark } from '@vueuse/core';

const drawer = ref(false)
//使用useDark 
const isDark = useDark()
//主题配置
const themeConfig = reactive({
  isDark: isDark,
});
</script>
<style scoped>
.icon{
    line-height:54px;
}
.icon:hover{
        cursor: pointer;
}
</style>