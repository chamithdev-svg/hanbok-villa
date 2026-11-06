import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/',

  build: {
    rollupOptions: {
      input: {
        terms: resolve(process.cwd(), 'terms.html'),
        refundPolicy: resolve(process.cwd(), 'refund-policy.html'),
        privacyPolicy: resolve(process.cwd(), 'privacy-policy.html'),
        main: resolve(process.cwd(), 'index.html'),
        booking: resolve(process.cwd(), 'booking.html'),
        gallery: resolve(process.cwd(), 'gallery.html'),
        explore: resolve(process.cwd(), 'explore.html'),
        admin: resolve(process.cwd(), 'admin.html'),
        cancellation: resolve(process.cwd(), 'cancel-booking.html'),
      },
    },
  },
})