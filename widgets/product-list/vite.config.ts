import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
import { version } from './package.json';

export default defineConfig(({ command }) => ({
  plugins: [react(), cssInjectedByJs()],
  server: {
    port: 5101,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 4101,
    strictPort: true,
    cors: true,
  },
  css: {
    modules: {
      generateScopedName: 'pl_[name]__[local]__[hash:base64:5]',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom/client', 'react/jsx-dev-runtime'],
  },
  define: command === 'build' ? { 'process.env.NODE_ENV': '"production"' } : {},
  build: {
    outDir: `dist/${version}`,
    minify: 'esbuild',
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
  },
}));
