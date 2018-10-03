/**
 * Created by capricorncd 9/7/2018
 * https://github.com/capricorncd
 */
import dom from '../dom-core'
import util from '../util'
import broadcast from '../broadcast'
import { browser, touchEvents } from './touch-event'
import { handleTouches, getTouches } from './touch-zoom'

const MIN_SIZE = 60

// default options
const DEFAULT_OPTIONS = {
  width: 750,
  height: 750,
  // 确定按钮样式
  submitStyle: '',
  // 取消按钮样式
  cancelStyle: ''
}


// crop class
class CropClass {
  /**
   * constructor
   * @param opts
   */
  constructor (opts) {
    // 裁剪框缩放比例
    this.cropRatio = 1
    // 显示状态
    this.visible = false
    // 裁剪框容器
    this.$wrapper = null
    // image
    this.$img = null
    // 裁剪框位置信息
    this.cropBoxPos = {}
    this.options = Object.assign({}, DEFAULT_OPTIONS, opts)
    // init
    this._init(this.options)
    dom.addEvent(window, 'resize', _ => {
      this.initCropBosPosition()
    })
  }

  _init (opts) {
    // 禁用选中图片
    dom.addEvent(document, 'selectstart', e => {
      e.preventDefault()
    })

    // let zIndex = 1
    let zIndex = dom.maxZIndex() + 1

    // 裁剪容器
    const cropVnode = {
      attrs: {
        class: 'zx-image-crop-container',
        style: `z-index:${zIndex};display:none;`
      },
      child: [
        {
          attrs: {
            class: 'zx-image-crop-wrapper'
          },
          child: [
            {
              attrs: {
                class: 'crop-line-box'
              }
            }
          ]
        },
        {
          tag: 'img',
          attrs: {
            class: 'zx-image-target'
          }
        },
        {
          attrs: {
            class: 'zx-crop-btns-wrapper'
          },
          child: [
            {
              tag: 'button',
              attrs: {
                class: '__cancel',
                style: opts.cancelStyle
              },
              child: '取 消'
            },
            {
              tag: 'button',
              attrs: {
                class: '__submit',
                style: opts.submitStyle
              },
              child: '确 定'
            }
          ]
        }
      ]
    }
    // 创建创建容器
    this.$wrapper = dom.createVdom(cropVnode)
    this.$body = dom.query('body')
    this.$body.appendChild(this.$wrapper)
    this.$img = dom.query('.zx-image-target', this.$wrapper)
    // 初始化事件
    this._initEvent()
    this.initCropBosPosition()
  }

  /**
   * 初始化裁剪框位置
   * @param newOpts 新参数
   * @private
   */
  initCropBosPosition (newOpts) {
    // 更新this.options
    if (newOpts) {
      this.options = Object.assign({}, this.options, newOpts)
    }
    let opts = this.options
    let winWidth = window.innerWidth
    let winHeight = window.innerHeight
    let width = Math.min(opts.width, winWidth * 0.8)
    let height = opts.height / opts.width * width
    let top = (winHeight - height) / 2
    let left = (winWidth - width) / 2
    let borderWidth = Math.max(top, left)
    // 裁剪比例
    this.cropRatio = opts.width / width
    // 尺寸信息
    this.cropBoxPos = {
      winWidth,
      winHeight,
      width,
      height,
      borderWidth,
      top,
      left,
      bottom: top + height,
      right: left + width
    }
    const $lineBox = dom.query('.crop-line-box', this.$wrapper)
    $lineBox.style.top = (top - borderWidth) + 'px'
    $lineBox.style.left = (left - borderWidth) + 'px'
    $lineBox.style.width = width + 'px'
    $lineBox.style.height = height + 'px'
    $lineBox.style.borderWidth = borderWidth + 'px'
    // 按钮位置
    const $btnsWrapper = dom.query('.zx-crop-btns-wrapper', this.$wrapper)
    $btnsWrapper.style.top = this.cropBoxPos.bottom + 20 + 'px'
  }

  _initEvent () {
    // 裁剪框
    let $crop
    if (browser.ie10) {
      $crop = document
    } else {
      $crop = dom.query('.zx-image-crop-wrapper', this.$wrapper)
    }
    // 移动
    this._move($crop)
    // 缩放
    mouseWheel($crop, e => {
      // 浏览器兼容处理
      // 鼠标滚动方向
      let wheelDelta = e.wheelDelta || -e.detail
      this._scale(wheelDelta)
    })
    // 确定
    const $btnSubmit = dom.query('.__submit', this.$wrapper)
    dom.addEvent($btnSubmit, 'click', _ => {
      this._submit()
    })
    // 取消
    const $btnCancel = dom.query('.__cancel', this.$wrapper)
    dom.addEvent($btnCancel, 'click', _ => {
      broadcast.emit('crop-cancel')
      this.hide()
    })
  }

  /**
   * 移动， 拖动
   * @param $crop
   * @private
   */
  _move ($crop) {
    const $img = this.$img
    // 鼠标在图片上按下
    let isMousedownOnImage = false
    // isTouchEvent
    let isTouchEvent = false
    // 鼠标按下位置图片左上角位置
    let moveBeforePostion = {}
    // 手指数量
    let fingers = 0
    let startTouches = []
    // 开始
    dom.addEvent($crop, touchEvents.start, e => {
      // log(e.type)
      // 防止触发浏览器图片拖动行为
      // e.preventDefault()
      isMousedownOnImage = true
      isTouchEvent = e.type === 'touchstart'

      if (isTouchEvent) {
        fingers = e.touches.length
      }

      if (fingers > 1) {
        startTouches = getTouches(e, $img)
      }

      // prevent user enter with right and the swiper move (needs isTouchEvent)
      if (!isTouchEvent && 'which' in e && e.which === 3) {
        isMousedownOnImage = false
        return
      }

      if (!isTouchEvent || e.targetTouches.length === 1) {
        if (!isTouchEvent && !util.isAndroid()) {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }

        let pageX = isTouchEvent ? e.targetTouches[0].pageX : (e.pageX || e.clientX)
        let pageY = isTouchEvent ? e.targetTouches[0].pageY : (e.pageY || e.clientY)

        moveBeforePostion.x = pageX - $img.offsetLeft
        moveBeforePostion.y = pageY - $img.offsetTop
      }
    })

    // 拖动
    dom.addEvent(document, touchEvents.move, e => {
      if (!isMousedownOnImage) return
      // e.preventDefault()
      // log(e)
      if (!isTouchEvent && !util.isAndroid()) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }

      if (fingers > 1) {
        let scale = handleTouches(e, startTouches)
        this._scaleHandler(scale > 1, 0.02)
      } else {
        handleMove(e, $img, this.cropBoxPos, moveBeforePostion, isTouchEvent)
      }
    })

    // 释放鼠标
    dom.addEvent(document, touchEvents.end, e => {
      isMousedownOnImage = false
      if (isTouchEvent) {
        fingers = e.touches.length
      }
    })
  }

  _scale (wheelDelta) {
    this._scaleHandler(wheelDelta > 0, 0.1)
  }

  /**
   * @param isEnlarge 是否放大
   * @param ratio 缩放系数
   * @private
   */
  _scaleHandler (isEnlarge, ratio) {
    const $img = this.$img
    let naturalWidth = $img.naturalWidth
    // let naturalHeight = $img.naturalHeight
    let imgWidth = $img.width
    let imgHeight = $img.height
    let iw, ih
    if (isEnlarge) {
      iw = imgWidth * (1 + ratio)
      // 最大放大2倍
      if (iw >= naturalWidth * 3) return
    } else {
      // 图片实际尺寸小于最小限制尺寸
      if (naturalWidth < MIN_SIZE) return
      iw = imgWidth * (1 - ratio)
      if (iw <= MIN_SIZE) return
    }
    ih = iw * imgHeight / imgWidth
    // check
    let cropBoxPos = this.cropBoxPos
    let imgPos = this.$img.getBoundingClientRect()
    // check image size
    if (iw <= cropBoxPos.width) {
      iw = cropBoxPos.width
      ih = imgPos.height / imgPos.width * iw
    }
    if (ih <= cropBoxPos.height) {
      ih = cropBoxPos.height
      iw = imgPos.width / imgPos.height * ih
    }
    $img.style.width = iw + 'px'
    $img.style.height = ih + 'px'

    // 图片增加的宽度、高度
    let addW = iw - imgWidth
    let addH = ih - imgHeight
    let css = dom.getStyle($img)
    let l = util.int(util.int(css.left) - addW / 2)
    let t = util.int(util.int(css.top) - addH / 2)
    // check image position
    if (cropBoxPos.left <= l) {
      l = cropBoxPos.left
    }
    if (l <= cropBoxPos.right - imgPos.width) {
      l = cropBoxPos.right - imgPos.width
    }
    if (cropBoxPos.top <= t) {
      t = cropBoxPos.top
    }
    if (t <= cropBoxPos.bottom - imgPos.height) {
      t = cropBoxPos.bottom - imgPos.height
    }

    $img.style.top = t + 'px'
    $img.style.left = l + 'px'
  }

  /**
   *
   * @param url 图片地址或base64
   */
  setImageSrc (url) {
    if (!this.$img || !url) {
      broadcast.emit('error', {
        code: 21,
        message: `Failed to setImageSrc(url)`
      })
      return
    }
    this.show()
    if (this.$img.src === url) return
    dom.removeEvent(this.$img, 'load', _imageHander)
    // 清除样式，防止图片变形
    this.$img.setAttribute('style', '')
    this.$img.src = url
    dom.addEvent(this.$img, 'load', _imageHander)

    let _this = this
    let cropBoxPos = _this.cropBoxPos
    function _imageHander () {
      let pos = this.getBoundingClientRect()
      this.style.top = (cropBoxPos.winHeight - pos.height) / 2 + 'px'
    }
  }

  _submit () {
    // 缩放比例
    let ratio = this.cropRatio
    // 裁剪框位置
    let cropBoxPos = this.cropBoxPos
    // 图片位置
    let imgPos = this.$img.getBoundingClientRect()
    let result = {
      naturalWidth: this.$img.naturalWidth,
      naturalHeight: this.$img.naturalHeight,
      currentWidth: util.int(imgPos.width * ratio),
      currentHeight: util.int(imgPos.height * ratio),
      targetWidth: this.options.width,
      targetHeight: this.options.height,
      x: util.int((cropBoxPos.left - imgPos.left) * ratio),
      y: util.int((cropBoxPos.top - imgPos.top) * ratio)
    }
    broadcast.emit('crop-submit', result)
    this.hide()
  }

  show () {
    if (this.visible) return
    this.visible = true
    this.$wrapper.style.display = ''
    dom.lock(this.$body)
  }

  hide () {
    if (this.visible) {
      this.visible = false
      this.$wrapper.style.display = 'none'
      dom.unlock(this.$body)
    }
  }
}

/**
 * 移动处理
 * @param e
 * @param cropBoxPos
 * @param $img
 */
function handleMove (e, $img, cropBoxPos, moveBeforePostion, isTouchEvent) {
  let pageX = isTouchEvent ? e.targetTouches[0].pageX : (e.pageX || e.clientX)
  let pageY = isTouchEvent ? e.targetTouches[0].pageY : (e.pageY || e.clientY)

  let l = pageX - moveBeforePostion.x
  let t = pageY - moveBeforePostion.y
  // check image position
  let imgPos = $img.getBoundingClientRect()
  // log(imgPos)
  // log(cropBoxPos)
  // ie11 无x/y属性
  if (cropBoxPos.left <= l) {
    l = cropBoxPos.left
  }
  if (l <= cropBoxPos.right - imgPos.width) {
    l = cropBoxPos.right - imgPos.width
  }
  if (cropBoxPos.top <= t) {
    t = cropBoxPos.top
  }
  if (t <= cropBoxPos.bottom - imgPos.height) {
    t = cropBoxPos.bottom - imgPos.height
  }
  $img.style.left = l + 'px'
  $img.style.top = t + 'px'
}

/**
 * 滚动鼠标事件
 * @param $el
 * @param wheelHandler
 */
export function mouseWheel ($el, wheelHandler) {
  // 鼠标滚动事件
  dom.addEvent($el, 'mousewheel', wheelHandler)
  // 火狐鼠标滚动事件
  dom.addEvent($el, 'DOMMouseScroll', wheelHandler)
}

export default CropClass
