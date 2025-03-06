import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',   // Ensure the build outputs to the correct folder
    rollupOptions: {
      input: './index.html',   // Ensure it knows which HTML to process
    },
  },
})
