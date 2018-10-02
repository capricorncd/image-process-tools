/**
 * Created by capricorncd 9/6/2018
 * https://github.com/capricorncd
 */
const USER_AGENT = navigator.userAgent
const util = {
  /**
   * bit to kib
   * @param bit
   * @returns {number}
   */
  bitToKib (bit) {
    return bit / 1024
  },

  /**
   * 文件大小单位转化
   * @param size
   * @returns {string}
   */
  conversion (size) {
    // 计算文件大小多少kb
    let kb = util.bitToKib(size)
    return kb >= 1024 ? util.int(kb / 1024 * 100) / 100 + 'M' : util.int(kb) + 'KB'
  },
  /**
   * 将数据转换为可上传用数据
   * @param {String} data
   * @param {String} type 生成文件类型
   * @return blob数据
   */
  toBlobData (data, type) {
    // 获取base64数据
    // data = data.split(',')[1]
    let dataInfo = getBase64Info(data)
    data = window.atob(dataInfo.data)
    type = type || dataInfo.type

    let ia = new Uint8Array(data.length)
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i)
    }
    // canvas.toDataURL 返回的默认格式是 image/png
    return new Blob([ia], {type: type})
  },

  /**
   * 创建blob url
   * @param blob file或blob
   * @returns {*}
   */
  toBlobUrl (blob) {
    const windowURL = window.URL || window.webkitURL
    return windowURL.createObjectURL(blob)
  },

  /**
   * 缩放比列
   * @param {Number} numerator 分子
   * @param {Number} denominator 分母
   */
  ratio (numerator, denominator) {
    return numerator / denominator
  },
  /**
   * 强制转换为整型
   * @param m
   * @returns {*}
   */
  int (m) {
    let n = parseInt(m)
    return isNaN(n) ? 0 : n
  },

  /**
   * 将伪数组，转换为数组
   * @param pseudoArray 伪数组
   * @returns {*}
   */
  slice (pseudoArray, index = 0) {
    if (pseudoArray.length && pseudoArray[0]) {
      return Array.prototype.slice.call(pseudoArray, index)
    }
    return []
  },

  /**
   * 字符串'font-size'转换为驼峰
   * @param str
   * @returns {string}
   */
  strToHump (str) {
    return str ? str.toString().replace(/-(\w)/g, (group, item) => item.toUpperCase()) : ''
  },

  isAndroid () {
    return USER_AGENT.toLowerCase().indexOf('android') >= 0
  },

  isArray (arr) {
    return Array.isArray(arr)
  },

  isObject (o) {
    return o && typeof o === 'object' && !util.isArray(o)
  },

  /**
   * 生成随机id字符串
   * @param prefix
   * @returns {string}
   */
  randomId (prefix = '') {
    return 'zximageprocess_' + prefix + '_' + (+new Date())
  }
}

/**
 * 获取base64字符串的数据及类型
 * @param data
 */
function getBase64Info (data) {
  // base64数据格式:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  let arr = data.split(',')
  let type = ''
  if (/data:(\w+\/\w+);base64/.test(arr[0])) {
    type = RegExp.$1
  }
  return {
    type: type,
    data: arr[1]
  }
}

export default util
