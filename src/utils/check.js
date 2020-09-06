/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 11:58
 */
export function isObject(o) {
  return o && typeof o === 'object' && !isArray(o)
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isString(s) {
  return typeof s === 'string'
}

export function isNumber(n) {
  return typeof n === 'number'
}

export function isUndefined(a) {
  return typeof a === 'undefined'
}

export function hasOwn(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key)
}
