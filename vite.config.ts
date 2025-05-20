import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
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
});
