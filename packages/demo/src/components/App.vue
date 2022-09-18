<script setup>
import Header from './HeaderWrapper.vue'
import Main from './MainWrapper.vue'
import Aside from './AsideWrapper.vue'
</script>

<template>
  <div>
    <Header />
    <el-container>
      <Main />
      <Aside />
    </el-container>
  </div>
</template>
