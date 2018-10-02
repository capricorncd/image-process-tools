/**
 * Created by capricorncd 9/9/2018
 * https://github.com/capricorncd
 */
import dom from './dom-core'
import broadcast from './broadcast'
import { handleMediaFile } from './handler/index'

/**
 * 初始化$input[type=file]
 * @param _this
 */
export function initInput (_this, opts) {
  let selector = opts.selector
  // 触发input[type=file]的按钮
  const $btn = dom.isHTMLElement(selector) ? selector : dom.query(selector)
  if ($btn === null) {
    broadcast.emit('error', {
      code: 3,
      message: `Element ${selector} is not found in document!`
    })
    return
  }

  /**
   * 创建input
   * @type {*|Element}
   */
  const $input = dom.createElm('input', {
    style: 'display:none;',
    type: 'file',
    accept: opts.accept
  })
  _this.$body.appendChild($input)

  // 清除input.value，防止出现重复选择同一文件无效bug
  dom.addEvent($input, 'click', _ => {
    $input.value = ''
  })

  // 监听input change
  dom.addEvent($input, 'change', _ => {
    let files = $input.files || []
    if (files.length === 0) {
      broadcast.emit('error', {
        code: 4,
        message: 'Any file is not selected!'
      })
    } else {
      let file = files[0]
      // check file type
      let fileType = file.type
      if (/^(image|video)/.test(fileType)) {
        // 重新裁剪时使用
        _this.file = file
        handleMediaFile(file, RegExp.$1, opts)
      } else {
        broadcast.emit('error', {
          code: 7,
          message: 'Incorrect file type'
        })
      }
    }
  })

  // 触发文件选择
  dom.addEvent($btn, 'click', _ => {
    $input.click()
  })
}
