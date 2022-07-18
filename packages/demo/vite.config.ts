/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 09:54:35 (GMT+0900)
 */
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  build: {
    emptyOutDir: false,
    outDir: '../../dist',
  },
})
