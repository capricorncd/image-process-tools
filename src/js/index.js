/**
 * Created by zx1984 9/6/2018
 * https://github.com/zx1984
 */
import broadcast from './broadcast'
import Crop from './crop'
import { fileToBase64 } from './convert'
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
  constructor (opts) {
    const options = Object.assign({}, DEFAUTL_OPTIONS, opts)
    console.log(options)
    broadcast.on('error', err => {
      options.error(err)
    })
    this.init(options)
  }

  init (opts) {
    crop = new Crop({
      wrapper: opts.cropWrapper,
      width: opts.width,
      height: opts.height
    })
  }

  handle (file) {
    // 文件类型判断
    fileToBase64(file, (err, base64) => {
      if (err) {
        broadcast.emit('error', err)
        return
      }
      // console.log(base64)
      crop.updateImage(base64)
      crop.show()
    })
  }
}

export { ZxImageProcess }
