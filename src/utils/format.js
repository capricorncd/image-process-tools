/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-10-07 17:18 (GMT+0900)
 */
export function toNumber(a, defValue) {
  defValue = defValue || 0
  try {
    const n = Number(a)
    return isNaN(n) ? defValue : n
  } catch (e) {
    return defValue
  }
}
