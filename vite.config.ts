/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 09:54:35 (GMT+0900)
 */
/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { toCamelCase } from 'zx-sml'
// @ts-ignore
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: toCamelCase(pkg.name),
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
  },
  test: {
    environment: 'jsdom',
  },
})
