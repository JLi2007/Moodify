import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-use-face-detection': path.resolve(__dirname, './detection/node_modules/react-use-face-detection'),
    },
  },
});

// const serverConfig = {
//   fs: {
//     cachedChecks: false
//   }
// };

