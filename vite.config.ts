
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Standard process.env definition as requested
    'process.env': {},
    // Ensuring process.env.API_KEY is available to the GenAI SDK
    'process.env.API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY || process.env.API_KEY),
  },
  build: {
    outDir: 'dist',
  }
});
