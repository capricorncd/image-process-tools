/**
 * Created by zx1984 9/8/2018
 * https://github.com/zx1984
 */
const na = window.navigator
/**
 * ************************************
 * browser
 * ************************************
 */
export const browser = {
  ie10: na.msPointerEnabled,
  ie11: na.pointerEnabled
}

/**
 * ************************************
 * support touch
 * ************************************
 */
const supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)

/**
 * ************************************
 * Define Touch Events
 * ************************************
 */
let desktopEvents = ['mousedown', 'mousemove', 'mouseup']
if (browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']
if (browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup']

export const touchEvents = {
  start : supportTouch ? 'touchstart' : desktopEvents[0],
  move : supportTouch ? 'touchmove' : desktopEvents[1],
  end : supportTouch ? 'touchend' : desktopEvents[2]
}
