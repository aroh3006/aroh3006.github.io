import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        writeups: resolve(__dirname, 'writeups.html'),
        'fam-ctf-2026': resolve(__dirname, 'writeups/fam-ctf-2026.html'),
      }
    }
  }
})
