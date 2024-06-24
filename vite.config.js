import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from "vite-plugin-eslint";
import { baseUrl } from './src/config/environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: baseUrl,
  build: {
    outDir: "./dist/ww"
  }
});