import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import PC from 'phecda-client/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3699',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    Icons({ compiler: 'vue3' }),
    Inspect(),
    PC({
      localPath: '../server/pmeta.js',
      port: ' http://localhost:3699/',
    }),
    VueMacros({
      setupBlock: true,
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    AutoImport({
      dirs: ['./src/**/*'],
      imports: ['vue', 'vue-router', {
        'phecda-vue': ['useV', 'useR', 'useO', 'Init', 'Tag', 'Storage', 'Watcher', 'Global', 'Clear', 'emitter'],
        'phecda-client': ['useC', 'createReq'],
        'axios': [['default', 'axios']],
      }],
      resolvers: [
      ],
    }),
    Components({
      dirs: ['./src/components', './src/views'],
      directoryAsNamespace: false,
      resolvers: [
        IconsResolver({
        })],
    }),
    ReactivityTransform(),
    UnoCSS(),

  ],
})
