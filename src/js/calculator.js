/**
 * Created by capricorncd 9/9/2018
 * https://github.com/capricorncd
 */
import util from './util'
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

    const iw = info.width
    const ih = info.height

    // 提示：图片实际尺寸，小于目标尺寸
    // if (iw < targetWidth || ih < targetHeight) {
    //   broadcast.emit('error', {
    //     code: 9,
    //     msg: 'The size of the current image file is smaller than the crop size.'
    //   })
    // }

    // 缩放比列
    let scaling = 1

    // width only
    if (targetWidth > 0) {
      scaling = util.ratio(iw, targetWidth)
      targetHeight = Math.floor(targetWidth * ih / iw)
    }
    // height only
    else if (targetHeight > 0) {
      scaling = util.ratio(ih, targetHeight)
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
  },
  /**
   * 计算生成图片裁剪位置及尺寸
   * @param {Number} iw // 原图宽
   * @param {Number} ih // 原图高
   */
  autoCropInfo (iw, ih, opts) {
    // 目标图片尺寸
    const targetWidth = util.int(opts.width)
    const targetHeight = util.int(opts.height)

    // 缩放比列
    let scaling = 1

    // 图片开始裁剪位置 x,y坐标
    let sx = 0
    let sy = 0
    // canvas 尺寸
    let canvasWidth = iw
    let canvasHieght = ih
    // 等比缩放后的图片尺寸
    let sw = iw
    let sh = ih

    // 裁剪图片代码 **********************************
    // 等比缩放到合适大小，在居中裁剪
    // if (IS_CROP && targetWidth > 0 && targetHeight > 0) {
    if (targetWidth > 0 && targetHeight > 0) {
      // canvas的尺寸即为裁剪设置尺寸
      canvasWidth = targetWidth
      canvasHieght = targetHeight

      // 假设裁剪图片宽，等于目标宽度
      // 按目标宽度调整图片尺寸：图片宽度 === 裁剪框宽
      sw = targetWidth
      sh = Math.floor(targetWidth * ih / iw)

      scaling = util.ratio(iw, targetWidth)

      // 图片高度超出裁剪框，能正常裁剪
      if (sh >= targetHeight) {
        sx = 0
        sy = util.int((sh - targetHeight) / 2 * scaling)
      } else {
        // 不满足裁剪需求，需重新缩放：图片高度 === 裁剪框高度
        scaling = util.ratio(ih, targetHeight)
        sw = Math.floor(targetHeight * iw / ih)
        // sh = targetHeight
        sx = util.int((sw - targetWidth) / 2 * scaling)
        sy = 0
      }
    } else if (targetWidth > 0) {
      // 缩放图片代码 **********************************
      // 只设置了宽度
      scaling = util.ratio(iw, targetWidth)
      canvasWidth = targetWidth
      canvasHieght = Math.floor(targetWidth * ih / iw)
    } else if (targetHeight > 0) {
      // 只设置了宽度
      scaling = util.ratio(ih, targetHeight)
      canvasWidth = Math.floor(targetHeight * iw / ih)
      canvasHieght = targetHeight
    }

    return {
      sx, // 裁剪开始x坐标
      sy, // 裁剪开始y坐标
      sw: canvasWidth * scaling,
      sh: canvasHieght * scaling,
      scaling,
      cw: canvasWidth,
      ch: canvasHieght
    }
  }
}
