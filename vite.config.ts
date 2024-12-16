import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'
// import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
    babel: {
      plugins: [
        'babel-plugin-macros',

      ]
    }
  }),
  dynamicImport()],
  // server: {
  //   proxy: {
  //     '/auth': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //       credentials: 'include',
  //       ws: true,
  //     },
  //     '/api': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //       credentials: 'include',
  //       ws: true,
  //     },
  //     '/user': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //       credentials: 'include',
  //       ws: true,
  //     },
  //     '/sanctum/csrf-cookie': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build'
  }
});