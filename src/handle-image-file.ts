/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 11:31
 */
import {
  ImageProcessRawInfo,
  ImageProcessOptions,
  ImageProcessResult,
  ImageProcessCropInfo,
  ImageProcessResolve,
  ImageProcessReject,
} from '../types'
import {
  isObject,
  fileToBase64,
  createElement,
  formatBytes,
  splitBase64,
  createBlobURL,
  base64ToBlob,
} from 'zx-sml'
import { DEFAULT_OPTIONS } from './options'

const base64Reg = /^data:(.+?);base64/
const imageReg = /^image\/.+/

/**
 * create canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 * @param el
 * @param params
 * @returns {*}
 */
function createCanvas(
  el: HTMLImageElement | HTMLCanvasElement,
  params: ImageProcessCropInfo
): HTMLCanvasElement {
  const dpr = params.enableDevicePixelRatio ? window.devicePixelRatio || 1 : 1
  const canvas = createElement<HTMLCanvasElement>('canvas')
  canvas.width = params.dw * dpr
  canvas.height = params.dh * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.drawImage(
    el,
    params.sx,
    params.sy,
    params.sw,
    params.sh,
    params.dx,
    params.dy,
    params.dw,
    params.dh
  )
  return canvas
}

/**
 * handle image file
 * @param file
 * @param options
 * @returns {Promise<ImageProcessResult>}
 */
export function handleImageFile(
  file: File | string,
  options?: Partial<ImageProcessOptions>
): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    const _options: ImageProcessOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
    }
    // base64
    if (typeof file === 'string' && base64Reg.test(file)) {
      handleImageBase64(file, _options, resolve, reject)
    }
    // file
    else if (file instanceof File && imageReg.test(file.type)) {
      fileToBase64(file)
        .then((base64) => {
          handleImageBase64(base64, _options, resolve, reject)
        })
        .catch(reject)
    }
    // other
    else {
      reject(new Error(`Invalid file, ${file}`))
    }
  })
}

function handleImageBase64(
  base64: string,
  options: ImageProcessOptions,
  resolve: ImageProcessResolve,
  reject: ImageProcessReject
): void {
  const { type: rawType } = splitBase64(base64)
  const blob = base64ToBlob(base64, rawType)
  const img = new Image()
  img.onload = () => {
    const raw: ImageProcessRawInfo = {
      element: img,
      blob: blob,
      data: base64,
      url: createBlobURL(blob),
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      type: rawType,
      size: formatBytes(blob.size),
    }
    if (options.width > 0 && options.height > 0) {
      cropImage(raw, options, resolve, reject)
    } else if (
      options.width > 0 ||
      options.height > 0 ||
      options.longestSide > 0
    ) {
      proportionalZoom(raw, options, resolve, reject)
    } else {
      checkResult({ ...raw, raw }, options, resolve)
    }
  }
  img.onerror = reject
  img.src = base64
}

function cropImage(
  raw: ImageProcessRawInfo,
  options: ImageProcessOptions,
  resolve: ImageProcessResolve,
  reject: ImageProcessReject
): void {
  try {
    const cropInfo: ImageProcessCropInfo = isObject(options.cropInfo)
      ? {
          ...(options.cropInfo as ImageProcessCropInfo),
          dx: 0,
          dy: 0,
          dw: options.width,
          dh: options.height,
        }
      : initCropInfo(raw, options)
    // check enableDevicePixelRatio
    if (
      !Object.prototype.hasOwnProperty.call(cropInfo, 'enableDevicePixelRatio')
    ) {
      cropInfo.enableDevicePixelRatio = options.enableDevicePixelRatio
    }
    const el = createCanvas(raw.element, {
      enableDevicePixelRatio: options.enableDevicePixelRatio,
      sx: cropInfo.sx,
      sy: cropInfo.sy,
      sw: cropInfo.sw,
      sh: cropInfo.sh,
      dx: 0,
      dy: 0,
      dw: cropInfo.sw,
      dh: cropInfo.sh,
    })
    imageProcess(
      el,
      raw,
      options,
      {
        ...cropInfo,
        sx: 0,
        sy: 0,
        sw: el.width,
        sh: el.height,
      },
      resolve
    )
  } catch (err) {
    reject(err)
  }
}

/**
 * proportional zoom image
 * @param raw
 * @param options
 * @param resolve
 * @param reject
 */
function proportionalZoom(
  raw: ImageProcessRawInfo,
  options: ImageProcessOptions,
  resolve: ImageProcessResolve,
  reject: ImageProcessReject
): void {
  try {
    if (options.longestSide > 0 && !options.width && !options.height) {
      if (raw.width >= raw.height) {
        options.width = options.longestSide
      } else {
        options.height = options.longestSide
      }
    }

    const cropInfo: ImageProcessCropInfo = {
      enableDevicePixelRatio: options.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: raw.width,
      sh: raw.height,
      dx: 0,
      dy: 0,
      dw: options.width,
      dh: options.height,
    }

    if (options.width > 0) {
      // The original image width is smaller than the target cropping width,
      // and don't force the image width
      if (raw.width < options.width && !options.isForce) {
        checkResult({ ...raw, raw }, options, resolve)
        return
      }
      cropInfo.dh = (raw.height * options.width) / raw.width
      options.height = cropInfo.dh
    } else {
      // The original image height is smaller than the target cropping height,
      // and don't force the image height
      if (raw.height < options.height && !options.isForce) {
        checkResult({ ...raw, raw }, options, resolve)
        return
      }
      cropInfo.dw = (raw.width * options.height) / raw.height
      options.width = cropInfo.dw
    }

    imageProcess(raw.element, raw, options, cropInfo, resolve)
  } catch (err) {
    reject(err)
  }
}

function checkResult(
  res: ImageProcessResult,
  options: ImageProcessOptions,
  resolve: ImageProcessResolve
): void {
  if (res.type !== options.mimeType) {
    res.type = options.mimeType
    processImage(
      res.element,
      res.raw,
      options,
      {
        enableDevicePixelRatio: options.enableDevicePixelRatio,
        sx: 0,
        sy: 0,
        sw: res.width,
        sh: res.height,
        dx: 0,
        dy: 0,
        dw: res.width,
        dh: res.height,
      },
      resolve
    )
  } else {
    resolve(res)
  }
}

function imageProcess(
  el: HTMLImageElement | HTMLCanvasElement,
  raw: ImageProcessRawInfo,
  options: ImageProcessOptions,
  cropInfo: ImageProcessCropInfo,
  resolve: ImageProcessResolve
): void {
  let nextScalePx =
    raw.width > raw.height ? raw.width - cropInfo.dw : raw.height - cropInfo.dh
  if (nextScalePx > options.perResize) {
    const radio = raw.height / raw.width
    while (nextScalePx > options.perResize) {
      nextScalePx -= options.perResize
      // There is a problem with getting the EL width and height value here
      cropInfo.sw = el.width
      cropInfo.sh = el.height
      cropInfo.dw = options.width + nextScalePx
      cropInfo.dh = cropInfo.dw * radio
      el = createCanvas(el, cropInfo)
    }
    cropInfo.sw = el.width
    cropInfo.sh = el.height
    cropInfo.dw = options.width
    cropInfo.dh = options.height
  }

  processImage(el, raw, options, cropInfo, resolve)
}

function processImage(
  el: HTMLImageElement | HTMLCanvasElement,
  raw: ImageProcessRawInfo,
  options: ImageProcessOptions,
  cropInfo: ImageProcessCropInfo,
  resolve: ImageProcessResolve
): void {
  const canvas = createCanvas(el, cropInfo)
  const mineType = options.mimeType
  const base64 = canvas.toDataURL(mineType, options.quality)
  const blob = base64ToBlob(base64, mineType)

  resolve({
    element: canvas,
    type: mineType,
    width: canvas.width,
    height: canvas.height,
    blob: blob,
    data: base64,
    url: createBlobURL(blob),
    size: formatBytes(blob.size),
    raw,
  })
}

function initCropInfo(
  raw: ImageProcessRawInfo,
  options: ImageProcessOptions
): ImageProcessCropInfo {
  const { width: rw, height: rh } = raw
  const { width, height } = options
  let cropInfo
  const tempWidth = (rh * width) / height
  if (rw > tempWidth) {
    cropInfo = {
      sx: (rw - tempWidth) / 2,
      sy: 0,
      sw: tempWidth,
      sh: rh,
    }
  } else {
    const tempHeight = (rw * height) / width
    cropInfo = {
      sx: 0,
      sy: (rh - tempHeight) / 2,
      sw: rw,
      sh: tempHeight,
    }
  }
  return {
    ...cropInfo,
    dx: 0,
    dy: 0,
    dw: width,
    dh: height,
  }
}
