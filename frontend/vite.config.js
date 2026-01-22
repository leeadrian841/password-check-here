import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevServer = mode === 'development';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/password-check-here/',
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: ['deps-update-1.preview.emergentagent.com', '.emergentagent.com', '.preview.emergentagent.com'],
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'build',
      sourcemap: false,
    },
    define: {
      // For compatibility with libraries that check process.env
      'process.env': {},
    },
  };
});
