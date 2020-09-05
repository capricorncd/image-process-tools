/**
 * Created by capricorncd 5/30/2018
 * https://github.com/capricorncd
 */
export default {
  /**
   * BroadCast
   */
  broadcast: {},

  /**
   * on
   * @param notifyName
   * @param fn
   */
  on (notifyName, fn) {
    if (!notifyName ||
      typeof notifyName !== 'string' ||
      !fn ||
      typeof fn !== 'function') return
    if (!this.broadcast[notifyName]) {
      this.broadcast[notifyName] = []
    }
    this.broadcast[notifyName].push(fn)
  },

  /**
   * emit
   * @param notifyName
   */
  emit (notifyName) {
    const notifyArr = this.broadcast[notifyName]
    if (!notifyArr) return
    const args = Array.prototype.slice.call(arguments, 1)
    for (let i = 0; i < notifyArr.length; i++) {
      try {
        notifyArr[i].apply(null, args)
      } catch (e) {
        this.emit('error', {
          code: 1,
          msg: `emit(${notifyName}): ${e.message}`,
          data: e
        })
      }
    }
  },

  /**
   * off
   * @param notifyName
   */
  off (notifyName) {
    if (this.broadcast[notifyName]) {
      this.broadcast[notifyName] = null
      delete this.broadcast[notifyName]
    }
  }
}
