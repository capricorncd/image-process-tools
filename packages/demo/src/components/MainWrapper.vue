<template>
  <el-main>
    <el-form-item>
      <label for="fileInput" class="el-button el-button--danger is-round"
        >Choose File</label
      >
      <input
        id="fileInput"
        class="file-input"
        type="file"
        @change="fileChange"
      />
      <span class="file-name">{{ store.file?.name }}</span>
    </el-form-item>
    <div class="img-wrapper">
      <dl v-if="store.result" class="info">
        <dt>Current</dt>
        <dd><span>width: </span>{{ store.result.width }}</dd>
        <dd><span>height: </span>{{ store.result.height }}</dd>
        <dd><span>size: </span>{{ store.result.size.text }}</dd>
        <dd><span>type: </span>{{ store.result.type }}</dd>
        <dt>Raw</dt>
        <dd><span>width: </span>{{ store.result.raw.width }}</dd>
        <dd><span>height: </span>{{ store.result.raw.height }}</dd>
        <dd><span>size: </span>{{ store.result.raw.size.text }}</dd>
        <dd><span>type: </span>{{ store.result.raw.type }}</dd>
      </dl>
      <img :src="store.result?.url" alt="" />
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { store } from '../store'

const fileChange = (e: Event) => {
  const el = e.target as HTMLInputElement
  const file = el.files?.[0] as File
  store.setValue('file', file)
}
</script>

<style scoped lang="scss">
$pcHeight: calc(100vh - 60px);

main {
  overflow-y: auto;
  background: #eee;
}

label {
  margin-right: 1em;
}
.file-name {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  opacity: 0.5;
}
.file-input {
  display: none;
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
      & + dt {
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid #ffffff2a;
      }
    }
  }
}
</style>
