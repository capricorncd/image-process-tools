/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 11:34:51 (GMT+0900)
 */
/// <reference types="vite/client" />

// declare module "*.vue" {
//   import * as Vue from 'vue'
//   export default Vue
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
