/**
 * Created by zx1984 9/9/2018
 * https://github.com/zx1984
 */
import dom from './dom-core'
import broadcast from './broadcast'
/**
 * 初始化$input[type=file]
 * @param _this
 */
export function initInput (_this) {
  let opts = _this.options
  let selector = opts.selector

  const $btn = dom.isHTMLElement(selector) ? selector : dom.query(selector)
  if ($btn === null) {
    broadcast.emit('error', {
      code: 3,
      msg: `Element ${selector} is not found in document!`
    })
    return
  }

  const $input = dom.createElm('input', {
    id: _this.inputId,
    style: 'display:none;',
    type: 'file',
    accept: 'image/*'
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
        msg: 'Any file is not selected!'
      })
    } else {
      _this.handle(files[0])
    }
  })
  // 触发文件选择
  dom.addEvent($btn, 'click', _ => {
    $input.click()
  })
}
