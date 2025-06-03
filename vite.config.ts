import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/',
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
        loadPaths: [path.resolve(__dirname, './src')],
      },
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    fs: {
      strict: false,
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
