/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 10:47
 */
import { document, window } from 'ssr-window'
import { isObject } from './index'

/**
 * create html element
 * @param tag
 * @param attrs
 * @returns {any}
 */
export function createElement(tag, attrs) {
  const el = document.createElement(tag)
  if (isObject(attrs)) {
    Object.keys(attrs).forEach(key => {
      el.setAttribute(key, attrs[key])
    })
  }
  return el
}

/**
 * create canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 * @param el
 * @param params
 * @returns {*}
 */
export function createCanvas (el, params) {
  const dpr = params.enableDevicePixelRatio ? (window.devicePixelRatio || 1) : 1
  const canvas = createElement('canvas')
  canvas.width = params.dw * dpr
  canvas.height = params.dh * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.drawImage(el, params.sx, params.sy, params.sw, params.sh, params.dx, params.dy, params.dw, params.dh)
  // document.body.appendChild(canvas)
  return canvas
}
