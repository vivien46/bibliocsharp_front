import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    sourcemap: false,
  },
  publicDir: 'public',
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'https://mokadomnas.synology.me:7153',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
