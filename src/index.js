/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-06 10:44
 */
import * as utils from './utils/index'
import { handleMediaFile } from './core/index'
import { TOUCH_EVENTS } from './constants/touch-events'
export * from './utils/index'

function ZxImageProcess() {

}

ZxImageProcess.prototype = {
  constructor: ZxImageProcess
}

export default ZxImageProcess

export {
  ZxImageProcess,
  utils,
  handleMediaFile,
  TOUCH_EVENTS
}
