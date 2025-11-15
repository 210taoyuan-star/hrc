import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.mp4')) {
            return 'videos/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
})