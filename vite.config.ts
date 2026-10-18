
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/hanbok-villa/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        booking: resolve(process.cwd(), 'booking.html'),
        gallery: resolve(process.cwd(), 'gallery.html'),
        explore: resolve(process.cwd(), 'explore.html'),
        admin: resolve(process.cwd(), 'admin.html'),
      },
    },
  },
})
