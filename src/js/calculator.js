/**
 * Created by zx1984 9/9/2018
 * https://github.com/zx1984
 */
import util from './util'
import broadcast from './broadcast'
export default {
  /**
   * 计算缩放参数
   * @param opts
   * @param info 图片信息{width, height, type, size, element}
   * @returns {{sw: *, sh: *, scaling: number, cw: *, ch: *}}
   */
  scaleInfo (opts, info) {
    // 目标图片尺寸
    let targetWidth = util.int(opts.width)
    let targetHeight = util.int(opts.height)

    let iw = info.width
    let ih = info.height

    // 提示：图片实际尺寸，小于目标尺寸
    if (iw < targetWidth || ih < targetHeight) {
      broadcast.emit('error', {
        code: 9,
        msg: 'The size of the current image file is smaller than the crop size.'
      })
    }

    // 缩放比列
    let scaling = 1

    // width only
    if (targetWidth > 0) {
      scaling = ratio(iw, targetWidth)
      targetHeight = Math.floor(targetWidth * ih / iw)
    }
    // height only
    else if (targetHeight > 0) {
      scaling = ratio(ih, targetHeight)
      targetWidth = Math.floor(targetHeight * iw / ih)
    }

    // canvas裁剪参数
    return {
      // source x-coordinate y-coordinate
      // sx: 0,
      // sy: 0,
      // source width height
      sw: iw,
      sh: ih,
      // Scaling ratio
      scaling: scaling,
      // destination x-coordinate
      // dx: 0,
      // dy: 0,
      // destination width height
      dw: targetWidth,
      dh: targetHeight
    }
  }
}

/**
 * 缩放比列
 * @param {Number} numerator 分子
 * @param {Number} denominator 分母
 */
function ratio (numerator, denominator) {
  return numerator / denominator
}

/**
 * 转换文件大小及单位
 * @param size bit
 * @returns {string}
 */
export function conversion (size) {
  // 计算文件大小多少kb
  let kb = util.int(size / 1024 * 100) / 100
  return kb >= 1024 ? util.int(kb / 1024 * 100) / 100 + 'M' : kb + 'KB'
}
