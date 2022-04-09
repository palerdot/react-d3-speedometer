import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'

const devMode = process.env.NODE_ENV === 'development'

// ref: https://blog.openreplay.com/the-ultimate-guide-to-getting-started-with-the-rollup-js-javascript-bundler
function terserConfig() {
  return terser({
    ecma: 2020,

    mangle: { toplevel: true },

    compress: {
      module: true,
      toplevel: true,
      unsafe_arrows: true,
      drop_console: !devMode,
      drop_debugger: !devMode,
    },

    output: { quote_style: 1 },
  })
}

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
        sourcemap: devMode ? 'inline' : false,
        plugins: [terserConfig()],
      },
      // ref: https://blog.logrocket.com/does-my-bundle-look-big-in-this/
      treeshake: {
        moduleSideEffects: false,
      },
      // IMPORTANT: This plugins is different from output plugins
      plugins: [
        nodeResolve({}),
        analyze({
          summaryOnly: true,
        }),
      ],
    },
  },
  test: {
    globals: true,
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**',
    ],
  },
})
