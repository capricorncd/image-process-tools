/**
 * Created by capricorncd 9/7/2018
 * https://github.com/capricorncd
 */
import util from './util'
// document
const d = document

// dom-core
const dom = {
  /**
   * 创建DOM元素
   * @param tag 标签名称
   * @param opts 标签属性
   * @returns {Element}
   */
  createElm (tag = 'div', opts) {
    let $el = d.createElement(tag)
    if (opts && opts instanceof Object) {
      for (let key in opts) {
        if (opts.hasOwnProperty(key)) {
          $el.setAttribute(key, opts[key])
        }
      }
    }
    return $el
  },

  /**
   * 创建Vdom
   * @param vnode
   * @returns {*}
   */
  createVdom (vnode) {
    if (!vnode) return null
    if (typeof vnode === 'string') {
      return d.createTextNode(vnode)
    }
    let tag = vnode.tag
    let attrs = vnode.attrs
    let child = vnode.child
    if (!tag && !attrs && !child) return null
    // 创建dom
    const $el = dom.createElm(tag || 'div', attrs)
    if (Array.isArray(child) && child.length) {
      let $itemNode
      child.forEach(item => {
        $itemNode = dom.createVdom(item)
        if ($itemNode) $el.appendChild($itemNode)
      })
    } else if (child && typeof child === 'string') {
      $el.appendChild(d.createTextNode(child))
    }
    return $el
  },

  /**
   * 创建canvas
   * @param $el image/canvas 对象
   * @param params canvas创建参数
   * @returns {*|Element}
   */
  createCanvas ($el, params) {
    const $canvas = this.createElm('canvas', {
      width: params.dw,
      height: params.dh
    })
    const ctx = $canvas.getContext('2d')
    ctx.drawImage($el, params.sx, params.sy, params.sw, params.sh, params.dx, params.dy, params.dw, params.dh)
    return $canvas
  },

  /**
   * 获取$el的css样式
   * @param $el
   * @param prop 指定属性
   * @returns {*}
   */
  getStyle ($el, prop) {
    if (!dom.isHTMLElement($el)) return null
    const style = window.getComputedStyle($el, null)
    let result = null
    if (prop) {
      try {
        result = style[util.strToHump(prop)]
      } catch (e) {}
    } else {
      result = style
    }
    return result
  },

  /**
   * 获取最大z-index
   * @returns {Number}
   */
  maxZIndex () {
    const $els = d.getElementsByTagName('*')
    let $el, css, zindex
    let arr = []
    for (let i = 0; i < $els.length; i++) {
      $el = $els[i]
      if ($el.nodeType !== 1) continue
      css = dom.getStyle($el) || {}
      if (css.position !== 'static') {
        zindex = util.int(css.zIndex)
        if (zindex > 0) arr.push(zindex)
      }
    }
    return util.int(Math.max.apply(null, arr))
  },

  /**
   * $el是否为HTML元素节点
   * @param $el
   * @returns {*|boolean}
   */
  isHTMLElement ($el) {
    return $el && $el instanceof HTMLElement
  },

  query (selector, context = d) {
    return context.querySelector(selector)
  },

  /**
   * overflow: hidden
   * @param $el
   */
  lock ($el) {
    if (typeof $el === 'undefined') {
      $el = dom.query('body')
    }
    if (dom.isHTMLElement($el)) {
      $el.style.overflow = 'hidden'
    }
  },

  /**
   * overflow: ''
   * @param $el
   */
  unlock ($el) {
    if (typeof $el === 'undefined') {
      $el = dom.query('body')
    }
    if (dom.isHTMLElement($el)) {
      $el.style.overflow = ''
    }
  },

  /**
   * 事件绑定
   * @param $el
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @param useCapture 是否在冒泡阶段
   */
  addEvent ($el, eventName, handler, useCapture = false) {
    if (!$el || !eventName || !handler) return
    if ($el.length) {
      for (let i = 0; i < $el.length; i++) {
        addEventListener($el[i], eventName, handler, useCapture)
      }
    } else {
      addEventListener($el, eventName, handler, useCapture)
    }
  },
  removeEvent ($el, eventName, handler, useCapture = false) {
    if (!$el || !eventName || !handler) return
    if ($el.length) {
      for (let i = 0; i < $el.length; i++) {
        removeEventListener($el[i], eventName, handler, useCapture)
      }
    } else {
      removeEventListener($el, eventName, handler, useCapture)
    }
  }
}

function addEventListener ($el, eventType, fn, useCapture) {
  if ($el.addEventListener) {
    $el.addEventListener(eventType, fn, useCapture)
  } else if ($el.attachEvent) {
    $el.attachEvent(eventType, fn)
  } else {
    $el[`on${eventType}`] = fn
  }
}

function removeEventListener ($el, eventType, fn, useCapture) {
  if ($el.removeEventListener) {
    $el.removeEventListener(eventType, fn, useCapture)
  } else if ($el.detachEvent) {
    $el.detachEvent(eventType, fn)
  } else {
    $el[`on${eventType}`] = null
  }
}

export default dom
