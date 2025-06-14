import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#api': path.resolve(__dirname, 'src/api/'),
      '#components': path.resolve(__dirname, 'src/components/'),
      '#constants': path.resolve(__dirname, 'src/constants/'),
      '#hooks': path.resolve(__dirname, 'src/hooks/'),
      '#pages': path.resolve(__dirname, 'src/pages/'),
      '#router': path.resolve(__dirname, 'src/router/'),
      '#store': path.resolve(__dirname, 'src/store/'),
      '#store/reducers': path.resolve(__dirname, 'src/store/reducers/'),
      '#types': path.resolve(__dirname, 'src/types/'),
      '#utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  plugins: [react(), tailwindcss()],
});
