<template>
  <div class="common-layout dark" style="margin:8px">
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Aside from "./Aside.vue";
import Main from "./Main.vue";
import Header from './Header.vue';


</script>