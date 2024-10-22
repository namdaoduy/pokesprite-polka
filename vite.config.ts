import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// this library below is used to resolve absolute path based on tsconfig without extra setup
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
