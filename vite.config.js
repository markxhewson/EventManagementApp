import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://81.0.246.142:3001',
      '/uploads': 'http://81.0.246.142:3001'
    }
  }
})
