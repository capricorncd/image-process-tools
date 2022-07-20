/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/18 16:52:05 (GMT+0900)
 */
import { reactive } from 'vue'
import {
  MediaFileHandlerData,
  MediaFileHandlerOptions,
} from '@image-process/core'

export const defaultOptions: MediaFileHandlerOptions = {
  mimeType: 'image/jpeg',
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 1000,
  enableDevicePixelRatio: false,
  isForce: false,
  cropInfo: {
    sx: 0,
    sy: 0,
    sw: 0,
    sh: 0,
  },
  currentTime: 0,
}

type StoreKeys = 'form' | 'result' | 'file'

type StoreValue<T = StoreKeys> = T extends 'form'
  ? MediaFileHandlerOptions
  : T extends 'result'
  ? MediaFileHandlerData
  : T extends 'file'
  ? File
  : never

interface StoreInterface {
  form: MediaFileHandlerOptions
  result: MediaFileHandlerData
  file: File
  setValue(key: StoreKeys, value: StoreValue)
}

export const store = reactive<StoreInterface>({
  form: JSON.parse(JSON.stringify(defaultOptions)),
  result: null,
  file: null,
  setValue(filed: keyof StoreInterface, value) {
    console.log(filed, value)
    this[filed] = value
  },
})
