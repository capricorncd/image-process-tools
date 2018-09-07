/**
 * Created by zx1984 9/7/2018
 * https://github.com/zx1984
 */
// import broadcast from './broadcast'

/**
 * 图片文件数据转为base64
 * @param file 文件
 * @param callback 回调
 */
export function fileToBase64 (file, callback) {
  if (!file && typeof file !== 'object') {
    callback({ msg: `file is ${file}` })
    return
  }
  // 实例化FileReader
  const reader = new FileReader()
  // readAsDataURL方法用于读取指定Blob或File的内容。
  // 当读操作完成，readyState变为DONE, loadend被触发，
  // 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。
  reader.readAsDataURL(file)
  reader.onload = function () {
    const base64 = this.result
    // 文件类型判断
    if (!/^data:image\//i.test(base64)) {
      callback({msg: `"${file && file.name}" is not Image File!`})
      return
    }
    callback(null, base64)
    file = null
  }

  reader.onerror = function (e) {
    callback({msg: `Error, FileReader "${file.name}"!`, data: e})
    file = null
  }
}
