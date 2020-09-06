/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 18:33
 */
import { window } from 'ssr-window'
const na = window.navigator

const browser = {
  ie10: na.msPointerEnabled,
  ie11: na.pointerEnabled
}

const supportTouch = 'ontouchstart' in window

let desktopEvents = ['mousedown', 'mousemove', 'mouseup']
if (browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']
if (browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup']

export const TOUCH_EVENTS = {
  start: supportTouch ? 'touchstart' : desktopEvents[0],
  move: supportTouch ? 'touchmove' : desktopEvents[1],
  end: supportTouch ? 'touchend' : desktopEvents[2]
}
