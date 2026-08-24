import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dna-3d-portfolio1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    host: 'localhost',
    port: 5173
  }
});