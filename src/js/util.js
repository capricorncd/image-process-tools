/**
 * Created by zx1984 9/6/2018
 * https://github.com/zx1984
 */
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
   * 字符串'font-size'转换为驼峰
   * @param str
   * @returns {string}
   */
  strToHump (str) {
    return str ? str.toString().replace(/-(\w)/g, (group, item) => item.toUpperCase()) : ''
  }
}
