<template>
  <el-aside width="320px">
    <el-form :model="form" label-position="top">
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
      <el-form-item label="cropInfo">
        <div
          v-for="(key, i) in Object.keys(form.cropInfo)"
          :key="i"
          class="crop-info-item"
        >
          <span>{{ `${key}: ${form.cropInfo[key]}` }}</span>
          <el-slider
            v-model="form.cropInfo[key]"
            :max="maxCropInfo[key]"
            :step="1"
          />
        </div>
      </el-form-item>
      <el-form-item class="button-wrapper">
        <el-button type="primary" @click="onSubmit"> OK </el-button>
        <el-button @click="reset"> Reset </el-button>
      </el-form-item>
      <el-form-item :label="`Video currentTime: ${form.currentTime}`">
        <el-slider
          v-model="form.currentTime"
          :disabled="!maxCurrentTime"
          :max="maxCurrentTime"
          :step="0.01"
        />
      </el-form-item>
      <el-form-item label="mimeType: Output picture mimeType">
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
      <el-form-item :label="`quality: ${form.quality}`">
        <el-slider v-model="form.quality" :max="1" :step="0.01" />
      </el-form-item>
      <el-form-item :label="`perResize: ${form.perResize}`">
        <el-slider v-model="form.perResize" :min="10" :max="1000" :step="10" />
      </el-form-item>
      <el-form-item
        :label="`enableDevicePixelRatio: ${form.enableDevicePixelRatio}`"
      >
        <el-switch v-model="form.enableDevicePixelRatio" />
      </el-form-item>
      <el-form-item :label="`isForce: ${form.isForce}`">
        <el-switch v-model="form.isForce" />
      </el-form-item>
    </el-form>
  </el-aside>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { handleMediaFile, OptionsCropInfo } from '@image-process/core'
import { store, defaultOptions } from '../store'

watch(
  () => store.file,
  () => {
    handleFile()
  }
)

const maxCurrentTime = computed(() =>
  store.result?.videoInfo ? store.result.videoInfo.duration : 0
)

const maxCropInfo = computed(() => {
  const { width = 0, height = 0 } = store.result?.raw || {}
  const { sx, sy } = store.form.cropInfo as OptionsCropInfo
  return {
    sx: width,
    sy: height,
    sw: width - sx,
    sh: height - sy,
  }
})

// do not use same name with ref
const form = store.form

const onSubmit = () => {
  console.log('submit!')
  form.mimeType = `${state.mimeTypePrefix}/${state.mimeTypeValue.replace(
    /\s/g,
    ''
  )}`
  handleFile()
}

const reset = () => {
  Object.keys(defaultOptions).forEach((key) => {
    // @ts-ignore
    form[key] = defaultOptions[key]
  })
  state.mimeTypePrefix = 'image'
  state.mimeTypeValue = 'jpeg'
  handleFile()
}

const state = reactive({
  mimeTypePrefix: 'image',
  mimeTypeValue: 'jpeg',
})

const handleFile = () => {
  if (!store.file) return
  handleMediaFile(store.file, form)
    .then((res) => {
      console.log(res)
      store.setValue('result', res)
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>

<style scoped lang="scss">
$pcHeight: calc(100vh - 60px);
aside {
  position: relative;
  padding: 20px 20px 0;
  min-height: $pcHeight;
}

.crop-info-item {
  width: 100%;
  display: flex;
  align-items: center;
  span {
    $spanWidth: 60px;
    width: $spanWidth;
    flex: 0 0 $spanWidth;
  }
}
</style>
