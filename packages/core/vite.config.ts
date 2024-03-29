/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 09:54:35 (GMT+0900)
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { toCamelCase } from 'zx-sml'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, '../../dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: toCamelCase(pkg.name),
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
  },
})
