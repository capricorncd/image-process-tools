/**
 * Created by zx1984 9/7/2018
 * https://github.com/zx1984
 */
// import broadcast from './broadcast'

/**
 * 文件数据转为base64
 * @param file 需要转换的原始文件对象
 */
export function fileToBase64 (file) {
  return new Promise((resolve, reject) => {
    if (!file && typeof file !== 'object') {
      reject({ msg: `fileToBase64(file)::file is ${file}` })
      return
    }
    // 实例化FileReader
    let reader = new FileReader()
    // readAsDataURL方法用于读取指定Blob或File的内容。
    // 当读操作完成，readyState变为DONE, loadend被触发，
    // 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。
    reader.readAsDataURL(file)
    reader.onload = function () {
      let base64 = this.result
      // 文件类型判断
      if (/^data:image\//i.test(base64)) {
        resolve(base64)
      } else {
        reject({msg: `${file.name} is not Image File!`})
      }
      file = null
    }

    reader.onerror = function (e) {
      reject({msg: `Error, FileReader "${file.name}"!`, data: e})
      file = null
    }
  })
}

/**
 * 创建blob url
 * @param blob Blob数据
 * @returns {*}
 */
export function blobToUrl (blob) {
  return URL.createObjectURL(blob)
}

/**
 * base64转换为Blob数据
 * @param base64Data
 * @returns {*}
 */
export function toBlobData (base64Data) {
  // base64数据格式:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  let type, onlyData
  if (/^data:(\w+\/\w+);base64,(.+)/.test(base64Data)) {
    type = RegExp.$1
    onlyData = RegExp.$2
  } else {
    broadcast.emit('error', {
      msg: `toBlobData(data):: ${base64Data} is not base64 data!`
    })
    return null
  }

  let data = window.atob(onlyData)
  let ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], {type: type})
}
