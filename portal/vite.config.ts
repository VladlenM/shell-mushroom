import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5100,
    strictPort: true,
  },
  preview: {
    port: 4100,
    strictPort: true,
  },
  css: {
    modules: {
      generateScopedName: 'portal_[name]__[local]__[hash:base64:5]',
    },
  },
});
