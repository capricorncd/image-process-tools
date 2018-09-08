/**
 * Created by zx1984 9/8/2018
 * https://github.com/zx1984
 */
/**
 * ************************************
 * browser
 * ************************************
 */
export const browser = {
  ie10: window.navigator.msPointerEnabled,
  ie11: window.navigator.pointerEnabled
}

/**
 * ************************************
 * support
 * ************************************
 */
const support = {
  touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
  classList: (function () {
    var div = document.createElement('div')
    return 'classList' in div
  })()
}
/*=========================
      Define Touch Events
      ===========================*/
let desktopEvents = ['mousedown', 'mousemove', 'mouseup']
if (browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']
if (browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup']

export const touchEvents = {
  touchStart : support.touch ? 'touchstart' : desktopEvents[0],
  touchMove : support.touch ? 'touchmove' : desktopEvents[1],
  touchEnd : support.touch ? 'touchend' : desktopEvents[2]
}
