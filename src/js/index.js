/**
 * Created by zx1984 9/6/2018
 * https://github.com/zx1984
 */
import broadcast from './broadcast'
import Crop from './crop'
import {
  blobToUrl,
  fileToBase64
} from './convert'
import '../style/index.styl'

// default options
const DEFAUTL_OPTIONS = {
  width: 0,
  height: 0,
  crop: true,
  cropWrapper: null,
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
    const options = Object.assign({}, DEFAUTL_OPTIONS, opts)
    console.log(options)
    broadcast.on('error', err => {
      options.error(err)
    })
    this.init(options)
  }

  /**
   * init
   * @param opts
   */
  init (opts) {
    // 同时设置宽高，视为裁剪图片
    if (opts.width > 0 && opts.height > 0) {
      crop = new Crop({
        wrapper: opts.cropWrapper,
        width: opts.width,
        height: opts.height
      })

      // 裁剪图片
      broadcast.on('crop-submit', params => {
        log(params)
      })
    }
  }

  /**
   * 文件处理
   * @param file
   */
  handle (file) {
    // 文件类型判断
    fileToBase64(file, (err, base64) => {
      if (err) {
        broadcast.emit('error', err)
        return
      }
      this.file = file
      this.base64 = base64
      // console.log(base64)
      crop.updateImage(blobToUrl(file))
      crop.show()
    })
  }
}

export { ZxImageProcess }
