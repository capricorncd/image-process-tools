<template>
  <el-main>
    <h1>{{ store.fileName || 'Please choose a file!' }}</h1>
    <div class="img-wrapper">
      <dl v-if="store.result" class="info">
        <dt>Info</dt>
        <dd><span>width: </span>{{ store.result.width }}</dd>
        <dd><span>height: </span>{{ store.result.height }}</dd>
        <dd><span>size: </span>{{ store.result.size.text }}</dd>
      </dl>
      <img :src="store.result?.url" alt="" />
    </div>
  </el-main>
</template>

<script setup>
import { store } from '../store'
</script>

<style scoped lang="scss">
$pcHeight: calc(100vh - 60px);

main {
  overflow-y: auto;
  background: #eee;
}

.img-wrapper {
  position: relative;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  .info {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 2px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    font-size: 12px;
    dd {
      display: flex;
      margin: 0;
      font-weight: 300;
      align-items: center;
      justify-content: space-between;
      span {
        margin-right: 2em;
      }
    }
  }
}
</style>
