/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 10:53
 */
import { window } from 'ssr-window'

/**
 * read
 * @param file
 * @param options
 * @returns {Promise<unknown>}
 */
export function readFile(file, options) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      resolve(e.target.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * convert file size
 * @param nBytes
 * @param decimalPlaces How many decimal places to keep
 * @returns {{unit: string, text: string, value: number}}
 */
export function convertFileSize(nBytes, decimalPlaces = 3) {
  const aMultiples = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let value = nBytes
  let unit = 'Byte'
  for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    value = nApprox.toFixed(decimalPlaces)
    unit = aMultiples[nMultiple]
  }
  return {
    text: value + unit,
    value: +value,
    unit
  }
}

/**
 * base64 to blob data
 * @param base64
 * @param type
 * @returns {Blob}
 */
export function base64ToBlob (base64, type) {
  const dataInfo = getBase64Info(base64)
  const data = window.atob(dataInfo.data)
  type = type || dataInfo.type

  const ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], { type: type })
}

/**
 * get base64 info
 * @param base64
 * @returns {{data: *, type: string}}
 */
export function getBase64Info(base64) {
  // base64 format:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  const arr = base64.split(',')
  let type = ''
  if (/data:(\w+\/\w+);base64/.test(arr[0])) {
    type = RegExp.$1
  }
  return {
    type: type,
    data: arr[1]
  }
}

export function toBlobUrl (blob) {
  const windowURL = window.URL || window.webkitURL
  return windowURL.createObjectURL(blob)
}
