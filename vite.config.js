import { fileURLToPath, URL } from 'node:url'
import { sync } from 'glob'
import { defineConfig } from 'vite'

const getPath = path => fileURLToPath(new URL(`./${path}`, import.meta.url))

const root = getPath('src')
const outDir = getPath('dist')
const publicDir = getPath('public')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  publicDir,
  plugins: [],
  resolve: {
    alias: {
      '@': getPath('src')
    }
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: sync(`${root}/**/*html`)
    }
  }
})