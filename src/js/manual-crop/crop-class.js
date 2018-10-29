/**
 * Created by capricorncd 9/7/2018
 * https://github.com/capricorncd
 */
import dom from '../dom-core'
import util from '../util'
import broadcast from '../broadcast'
import { browser, touchEvents } from './touch-event'
import { handleTouches, getTouches } from './touch-zoom'

// default options
const DEFAULT_OPTIONS = {
  width: 750,
  height: 750,
  // 确定按钮样式
  submitStyle: '',
  // 取消按钮样式
  cancelStyle: '',
  submitText: '确 定',
  rotateText: '旋转90度'
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
    // 图片位置
    this.translate = {
      x: 0,
      y: 0
    }
    // 图片旋转角度
    this.angle = 0
    // options
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
                class: '__rotate',
                style: opts.cancelStyle
              },
              child: opts.rotateText
            },
            {
              tag: 'button',
              attrs: {
                class: '__submit',
                style: opts.submitStyle
              },
              child: opts.submitText
            }
          ]
        },
        {
          attrs: {
            class: '__close'
          }
        }
      ]
    }
    // 创建创建容器
    this.$wrapper = dom.createVdom(cropVnode)
    this.$body = dom.query('body')
    this.$body.appendChild(this.$wrapper)
    this.$img = dom.query('.zx-image-target', this.$wrapper)
    // 初始化事件
    this._initEvent(this.$img)
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

  /**
   * 初始化事件
   * @private
   */
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
      let isRotate = !!(this.angle % 180)
      // 浏览器兼容处理
      // 鼠标滚动方向
      let wheelDelta = e.wheelDelta || -e.detail
      this._scale(wheelDelta, isRotate)
    })
    // 确定
    const $btnSubmit = dom.query('.__submit', this.$wrapper)
    dom.addEvent($btnSubmit, 'click', _ => {
      this._submit()
    })
    // 旋转
    const $btnRotate = dom.query('.__rotate', this.$wrapper)
    dom.addEvent($btnRotate, 'click', _ => {
      this._rotate()
    })
    // 取消
    const $btnCancel = dom.query('.__close', this.$wrapper)
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
    // 是否旋转
    let isRotate = false
    // 开始
    dom.addEvent($crop, touchEvents.start, e => {
      $img.className = 'zx-image-target is-move'
      // log(e.type)
      // 防止触发浏览器图片拖动行为
      // e.preventDefault()
      isMousedownOnImage = true
      isTouchEvent = e.type === 'touchstart'

      isRotate = !!(this.angle % 180)

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
        let pos = $img.getBoundingClientRect()
        let tran = this.translate
        moveBeforePostion = {
          pageX,
          pageY,
          x: pageX - tran.x,
          y: pageY - tran.y,
          left: pos.left,
          top: pos.top
        }
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
        this._scaleHandler(scale > 1, 0.02, isRotate)
      } else {
        this._handleMove(e, moveBeforePostion, isTouchEvent, isRotate)
      }
    })

    // 释放鼠标
    dom.addEvent(document, touchEvents.end, e => {
      $img.className = 'zx-image-target'
      isMousedownOnImage = false
      if (isTouchEvent) {
        fingers = e.touches.length
      }
    })
  }

  /**
   * 移动处理
   * @param e
   * @param moveBeforePostion 移动前所在坐标
   * @param isTouchEvent
   * @param isRotate
   */
  _handleMove (e, moveBeforePostion, isTouchEvent, isRotate) {
    let pageX = isTouchEvent ? e.targetTouches[0].pageX : (e.pageX || e.clientX)
    let pageY = isTouchEvent ? e.targetTouches[0].pageY : (e.pageY || e.clientY)
    // x、y轴移动的距离
    let tran = {
      x: pageX - moveBeforePostion.x,
      y: pageY - moveBeforePostion.y
    }
    // log(pageX, pageY, moveBeforePostion)
    this._moveBoundary(tran, isRotate)
  }

  _moveBoundary (tran, isRotate) {
    let moveX = tran.x
    let moveY = tran.y
    let box = this.cropBoxPos
    let $img = this.$img
    // check image position
    let pos = $img.getBoundingClientRect()
    // log(pos)
    // log(l, t)
    // ie11 无x/y属性
    if (isRotate) {
      // 左边界
      let left = (box.winWidth + pos.width - pos.height - box.width) / 2
      if (left <= moveX) {
        moveX = left
      }
      // 上边界
      let top = (box.winHeight + pos.height - pos.width - box.height) / 2
      if (top <= moveY) {
        moveY = top
      }
      // 右边界
      let right = left + box.width - pos.width
      if (moveX <= right) {
        moveX = right
      }
      // 下边界
      let bottom = top + box.height - pos.height
      if (moveY <= bottom) {
        moveY = bottom
      }
    } else {
      if (moveX > box.left) {
        moveX = box.left
      }
      if (moveX <= box.right - pos.width) {
        moveX = box.right - pos.width
      }
      if (moveY > box.top) {
        moveY = box.top
      }
      if (moveY <= box.bottom - pos.height) {
        moveY = box.bottom - pos.height
      }
    }
    this.translate.x = moveX
    this.translate.y = moveY
    $img.style.transform = `translateX(${this.translate.x}px) translateY(${this.translate.y}px) rotate(${this.angle}deg)`
  }

  /**
   * _scale
   * @param wheelDelta
   * @param isRotate
   * @private
   */
  _scale (wheelDelta, isRotate) {
    this._scaleHandler(wheelDelta > 0, 0.1, isRotate)
  }

  /**
   * rotate
   * @private
   */
  _rotate () {
    const $img = this.$img
    this.angle += 90
    let pos = $img.getBoundingClientRect()
    // 90/270deg 视为被旋转
    let isRotate = !!(this.angle % 180)
    let box = this.cropBoxPos

    // 旋转后宽高
    let rotatedWidth = pos.height
    let rotatedHeight= pos.width
    // 图片新尺寸, 元素尺寸
    let iw, ih, originalWidth, originalHeight
    // 需要缩放图片
    if (isRotate) {
      if (rotatedWidth < box.width) {
        ih = box.width
        iw = rotatedHeight * ih / rotatedWidth
      }
      if (rotatedHeight < box.height) {
        iw = box.height
        ih = rotatedWidth * iw / rotatedHeight
      }
      originalWidth = pos.width
      originalHeight = pos.height
    } else {
      if (rotatedWidth < box.width) {
        iw = box.width
        ih = rotatedHeight * iw / rotatedWidth
      }
      if (rotatedHeight < box.height) {
        iw = box.height
        ih = rotatedWidth * iw / rotatedHeight
      }
      originalWidth = pos.height
      originalHeight = pos.width
    }

    if (iw && ih) {
      // 重置图片尺寸
      $img.style.width = iw + 'px'
      $img.style.height = ih + 'px'
      // 增加的尺寸
      let increasedWidth = originalWidth - iw
      let increasedHeight = originalHeight - ih
      // 重置图片位置
      let translate = this.translate
      this.translate = {
        x: translate.x + increasedWidth / 2,
        y: translate.y + increasedHeight / 2
      }
    }
    // 设置图片style
    $img.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px) rotate(${this.angle}deg)`
  }

  /**
   * @param isEnlarge 是否放大
   * @param ratio 缩放系数
   * @param isRotate 是否被旋转
   * @private
   */
  _scaleHandler (isEnlarge, ratio, isRotate) {
    const $img = this.$img
    let naturalWidth = $img.naturalWidth
    // let naturalHeight = $img.naturalHeight
    let imgWidth = $img.width
    let imgHeight = $img.height
    let box = this.cropBoxPos
    let iw, ih
    if (isEnlarge) {
      iw = imgWidth * (1 + ratio)
      ih = iw * imgHeight / imgWidth
      // 最大放大2倍
      if (iw >= naturalWidth * 3) return
    } else {
      if (isRotate) {
        if (imgWidth <= box.height || imgHeight <= box.width) {
          this._moveBoundary(this.translate, true)
          return
        }
        iw = imgWidth * (1 - ratio)
        ih = iw * imgHeight / imgWidth
        if (iw <= box.height) {
          iw = box.height
          ih = iw * imgHeight / imgWidth
        }
        if (ih <= box.width) {
          ih = box.width
          iw = ih * imgWidth / imgHeight
        }
      } else {
        if (imgWidth <= box.width || imgHeight <= box.height) {
          this._moveBoundary(this.translate, false)
          return
        }
        iw = imgWidth * (1 - ratio)
        ih = iw * imgHeight / imgWidth
        if (iw <= box.width) {
          iw = box.width
          ih = iw * imgHeight / imgWidth
        }
        if (ih <= box.height) {
          ih = box.height
          iw = ih * imgWidth / imgHeight
        }
      }
    }
    if (isRotate) {
      this._scaleByRotate(imgWidth, imgHeight, iw, ih)
    } else {
      this._scaleByNotRotate(imgWidth, imgHeight, iw, ih)
    }
  }

  /**
   * 旋转后的图片缩放处理
   * @param imgWidth
   * @param imgHeight
   * @param iw
   * @param ih
   * @private
   */
  _scaleByRotate (imgWidth, imgHeight, iw, ih) {
    const $img = this.$img
    // 增加的尺寸
    let increasedWidth = imgWidth - iw
    let increasedHeight = imgHeight - ih
    // 重置图片位置
    let translate = this.translate
    this.translate = {
      x: translate.x + increasedWidth / 2,
      y: translate.y + increasedHeight / 2
    }
    // 重置图片尺寸
    $img.style.width = iw + 'px'
    $img.style.height = ih + 'px'
    // 边界判断
    this._moveBoundary(this.translate, true)
  }

  /**
   * 未旋转图片缩放处理
   * @param imgWidth 缩放前图片尺寸
   * @param imgHeight
   * @param iw 缩放后图片尺寸
   * @param ih
   * @private
   */
  _scaleByNotRotate (imgWidth, imgHeight, iw, ih) {
    const $img = this.$img
    // 增加的尺寸
    let increasedWidth = imgWidth - iw
    let increasedHeight = imgHeight - ih
    // 重置图片位置
    let translate = this.translate
    this.translate = {
      x: translate.x + increasedWidth / 2,
      y: translate.y + increasedHeight / 2
    }
    // 重置图片尺寸
    $img.style.width = iw + 'px'
    $img.style.height = ih + 'px'
    // 边界判断
    this._moveBoundary(this.translate, false)
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
    this.angle = 0
    this.$img.src = url
    dom.addEvent(this.$img, 'load', _imageHander)

    let _this = this
    let box = _this.cropBoxPos
    function _imageHander () {
      let $img = _this.$img
      // window
      let winRatio = box.winWidth / box.winHeight
      // 图片尺寸重置
      let imgWidth = $img.naturalWidth
      let imgHeight = $img.naturalHeight
      let imgRatio = imgWidth / imgHeight
      let iw, ih
      // 屏幕尺寸限制，保证图片任意边不大于屏幕对应边
      if (imgRatio > winRatio && imgWidth > box.winWidth) {
        iw = box.winWidth
        ih = imgHeight * iw / imgWidth
      } else if (imgRatio < winRatio && imgHeight > box.winHeight) {
        ih = box.winHeight
        iw = imgWidth * ih / imgHeight
      } else {
        iw = imgWidth
        ih = imgHeight
      }
      // 裁剪框限制，保证图片任意边不小于裁剪框对应边
      let boxRatio = box.width / box.height
      if (imgRatio > boxRatio && imgHeight < box.height) {
        ih = box.height
        iw = imgWidth * ih / imgHeight
      } else if (imgRatio < boxRatio && imgWidth < box.width) {
        iw = box.width
        ih = imgHeight * iw / imgWidth
      }
      // 设置图尺寸
      $img.style.width = iw + 'px'
      $img.style.height = ih + 'px'
      let x = (box.winWidth - iw) / 2
      let y = (box.winHeight - ih) / 2
      $img.style.transform = `translate(${x}px, ${y}px) rotate(0)`
      _this.translate = {
        x,
        y,
      }
    }
  }

  _submit () {
    const $img = this.$img
    const opts = this.options
    // 缩放比例
    let ratio = this.cropRatio
    // 裁剪框位置
    let box = this.cropBoxPos
    // 图片位置
    let pos = $img.getBoundingClientRect()
    // 旋转角度
    let angle = this.angle % 360
    let isRotate = angle % 180
    let result = {
      angle,
      naturalWidth: isRotate ? $img.naturalHeight : $img.naturalWidth,
      naturalHeight: isRotate ? $img.naturalWidth : $img.naturalHeight,
      currentWidth: util.int(pos.width * ratio),
      currentHeight: util.int(pos.height * ratio),
      targetWidth: opts.width,
      targetHeight: opts.height,
      x: util.int((box.left - pos.left) * ratio),
      y: util.int((box.top - pos.top) * ratio)
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
