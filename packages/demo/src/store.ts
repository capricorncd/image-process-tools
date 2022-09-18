/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/18 16:52:05 (GMT+0900)
 */
import { reactive } from 'vue'
import {
  MediaFileHandlerResult,
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
  cropInfo: {
    sx: 0,
    sy: 0,
    sw: 0,
    sh: 0,
  },
  currentTime: 0,
}

type StoreKeys = 'form' | 'result' | 'file'

interface StoreInterface {
  form: MediaFileHandlerOptions
  result: MediaFileHandlerResult
  file: File | null
  setValue(
    key: StoreKeys,
    value: StoreInterface[keyof Omit<StoreInterface, 'setValue'>]
  )
}

export const store = reactive<StoreInterface>({
  form: {
    ...defaultOptions,
    cropInfo: { ...defaultOptions.cropInfo },
  },
  result: null,
  file: null,
  setValue(filed: keyof StoreInterface, value) {
    this[filed] = value
  },
})
