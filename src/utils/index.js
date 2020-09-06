/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 11:33
 */
import { createCanvas, createElement } from './dom'
import { readFile, convertFileSize, base64ToBlob, getBase64Info, toBlobUrl } from './file'
import { hasOwn, isUndefined, isNumber, isFunction, isString, isArray, isObject } from './check'

function toNumber(a) {
  return a >> 0
}

export {
  base64ToBlob,
  convertFileSize,
  createCanvas,
  createElement,
  getBase64Info,
  hasOwn,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
  readFile,
  toBlobUrl,
  toNumber
}
