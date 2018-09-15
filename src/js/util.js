/**
 * Created by capricorncd 9/6/2018
 * https://github.com/capricorncd
 */
const USER_AGENT = navigator.userAgent
export default {
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
    return o && typeof o === 'object' && !this.isArray(o)
  },

  /**
   * 生成随机id字符串
   * @param prefix
   * @returns {string}
   */
  randomId (prefix = '') {
    return 'zxipt_' + prefix + '_' + (+new Date())
  }
}
