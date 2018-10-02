/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/9/6 10:31
 */
import broadcast from './broadcast'
import dom from './dom-core'
import util from "./util"
import { initInput } from './input'
import { handleImageFile } from './handler/image'
import { handleVideoFile } from './handler/video'
import '../style/index.styl'

// default options
const DEFAUTL_OPTIONS = {
  // image, video
  accept: '',
  // 自动处理
  auto: false,
  width: 0,
  height: 0,
  selector: null,
  // 最大文件大小50M
  maxSize: 50,
  error () {},
  success () {}
}

let crop = {}

/**
 * ZxImageProcess
 */
class ZxImageProcess {
  /**
   * constructor
   * @param opts
   */
  constructor (opts) {
    // 参数处理
    let options = Object.assign({}, DEFAUTL_OPTIONS, opts)
    // error notify
    broadcast.on('error', err => {
      err.msg = err.message
      options.error(err)
    })
    // success notify
    broadcast.on('success', data => {
      options.success(data)
    })

    this._init(options)
  }

  /**
   * init
   * @param opts
   * @private
   */
  _init (opts) {
    // check selector
    if (!opts.selector || (typeof opts.selector !== 'string' && !dom.isHTMLElement(opts.selector))) {
      broadcast.emit('error', {
        code: 1,
        message: `The selector "${opts.selector}" is not valid in initialization parameter.`
      })
      return
    }
    this.options = opts
    // id
    this.id = util.randomId()
    // body Element
    this.$body = dom.query('body')
    // check body
    if (this.$body === null) {
      broadcast.emit('error', {
        code: 2,
        message: `Failed to initialize, Element body is not found in document!`
      })
      return
    }

    // 初始化input[type=file]
    initInput(this, opts)
  }

  /**
   * 重新裁剪
   */
  reCrop () {
    if (this.file) {
      crop.show()
    } else {
      broadcast.emit('error', {
        code: 5,
        message: '请先选择图片文件'
      })
    }
  }
}

ZxImageProcess.prototype.toBlobData = util.toBlobData
ZxImageProcess.prototype.conversion = util.conversion
ZxImageProcess.prototype.handleImageFile = handleImageFile
ZxImageProcess.prototype.handleVideoFile = handleVideoFile

export {
  ZxImageProcess,
  handleImageFile,
  handleVideoFile
}
