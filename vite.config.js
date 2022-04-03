import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ref: https://vitejs.dev/guide/build.html#library-mode

module.exports = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      name: 'ReactSpeedometer',
      fileName: format => `react-d3-speedometer.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
})
