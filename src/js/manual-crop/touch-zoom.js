/**
 * Created by capricorncd 9/13/2018
 * https://github.com/capricorncd
 */
import util from '../util'

/**
 * 处理touches
 * @param e
 * @param startTouches
 */
export function handleTouches (e, startTouches) {
  return calculateScale(startTouches, targetTouches(e.touches))
}

/**
 * 获取Touches
 * @param event
 * @param $container
 * @returns {Array}
 */
export function getTouches (event, $container) {
  const position = $container.getBoundingClientRect()
  return util.slice(event.touches).map(touch => {
    return {
      x: touch.pageX - position.left,
      y: touch.pageY - position.top
    }
  })
}

/**
 * 计算触点移动比例
 * @param startTouches
 * @param endTouches
 * @returns {number}
 */
function calculateScale (startTouches, endTouches) {
  const startDistance = getDistance(startTouches[0], startTouches[1])
  const endDistance = getDistance(endTouches[0], endTouches[1])
  return endDistance / startDistance
}

function getDistance (a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return Math.sqrt(x * x + y * y)
}

function targetTouches (touches) {
  return util.slice(touches).map(touch => {
    return {
      x: touch.pageX,
      y: touch.pageY
    }
  })
}
