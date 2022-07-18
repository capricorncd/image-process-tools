<template>
  <el-aside width="320px">
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
      <span class="file-name">{{ store.fileName }}</span>
    </el-form-item>
    <div class="form">
      <el-form :model="form" label-position="top">
        <el-form-item label="mimeType">
          <el-input v-model="state.mimeTypeValue">
            <template #prepend>
              <el-select
                v-model="state.mimeTypePrefix"
                placeholder="Select"
                style="width: 90px"
              >
                <el-option label="image" value="image" />
                <el-option label="video" value="video" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="`perResize: ${form.perResize}`">
          <el-slider
            v-model="form.perResize"
            :min="10"
            :max="1000"
            :step="10"
          />
        </el-form-item>
        <el-form-item :label="`quality: ${form.quality}`">
          <el-slider v-model="form.quality" :max="1" :step="0.01" />
        </el-form-item>
        <el-form-item :label="`width: ${form.width}`">
          <el-slider
            v-model="form.width"
            :max="store.result?.raw?.width || 2000"
            :step="1"
          />
        </el-form-item>
        <el-form-item :label="`height: ${form.height}`">
          <el-slider
            v-model="form.height"
            :max="store.result?.raw?.height || 2000"
            :step="1"
          />
        </el-form-item>
        <el-form-item :label="`longestSide: ${form.longestSide}`">
          <el-slider
            v-model="form.longestSide"
            :max="
              store.result
                ? Math.max(store.result.raw.width, store.result.raw.height)
                : 2000
            "
            :step="1"
          />
        </el-form-item>
        <el-form-item
          :label="`enableDevicePixelRatio: ${form.enableDevicePixelRatio}`"
        >
          <el-switch v-model="form.enableDevicePixelRatio" />
        </el-form-item>
        <el-form-item :label="`isForce: ${form.isForce}`">
          <el-switch v-model="form.isForce" />
        </el-form-item>
        <!--      <el-form-item label="cropInfo">-->
        <!--        <el-switch v-model="form.isForce" />-->
        <!--      </el-form-item>-->
      </el-form>
    </div>
    <el-form-item class="button-wrapper">
      <el-button type="primary" @click="onSubmit"> OK </el-button>
      <el-button @click="reset"> Reset </el-button>
    </el-form-item>
  </el-aside>
</template>

<script setup>
import { reactive } from 'vue'
import { handleMediaFile } from '@image-process/core'
import { store, defaultOptions } from '../store'

// do not use same name with ref
const form = store.form

const onSubmit = () => {
  console.log('submit!')
  form.mimeType = `${state.mimeTypePrefix}/${state.mimeTypeValue}`
  store.setValue('form', form)
  handleFile()
}

const reset = () => {
  Object.keys(defaultOptions).forEach(
    (key) => (form[key] = defaultOptions[key])
  )
  store.mimeTypePrefix = 'image'
  store.mimeTypeValue = 'jpeg'
  store.setValue('form', form)
  handleFile()
}

const state = reactive({
  file: null,
  mimeTypePrefix: 'image',
  mimeTypeValue: 'jpeg',
})

const handleFile = () => {
  handleMediaFile(state.file, store.form)
    .then((res) => {
      console.log(res)
      store.setValue('result', res)
    })
    .catch((err) => {
      console.error(err)
    })
}

const fileChange = (e) => {
  state.file = e.target.files[0]
  store.setValue('fileName', state.file.name)
  handleFile()
}
</script>

<style scoped lang="scss">
$pcHeight: calc(100vh - 60px);
aside {
  position: relative;
  padding: 20px 20px 0;
  height: $pcHeight;
  overflow-x: hidden;
  overflow-y: auto;
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

.form {
  height: calc(100vh - 200px);
  overflow-y: auto;
  margin: 0 -20px 0 -20px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
