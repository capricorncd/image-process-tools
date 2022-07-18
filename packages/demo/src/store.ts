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

export const defaultOptions = {
  mimeType: 'image/jpeg',
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 1000,
  enableDevicePixelRatio: false,
  isForce: false,
}

type StoreKeys = 'form' | 'result' | 'fileName'

type StoreValue<T = StoreKeys> = T extends 'form'
  ? MediaFileHandlerOptions
  : T extends 'result'
  ? MediaFileHandlerData
  : T extends 'fileName'
  ? string
  : never

interface StoreInterface {
  form: MediaFileHandlerOptions
  result: MediaFileHandlerData
  fileName: string
  setValue(key: StoreKeys, value: StoreValue)
}

export const store = reactive<StoreInterface>({
  form: JSON.parse(JSON.stringify(defaultOptions)),
  result: null,
  fileName: '',
  setValue(filed: string, value) {
    console.log(filed, value)
    this[filed] = value
  },
})
