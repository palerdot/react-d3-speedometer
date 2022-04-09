// IMPORTANT: Slim config by externalizing 'd3'
// There are bunch of 'd3-*' modules that are dependencies for 'react-d3-speedometer'
// If the project already uses them as dependencies, they can use the slim build

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
    outDir: path.resolve(__dirname, 'dist/slim'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      name: 'ReactSpeedometer',
      formats: ['es'],
      // fileName: format => `react-d3-speedometer.${format}.js`,
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'react-dom',
        'd3-array',
        'd3-color',
        'd3-ease',
        'd3-format',
        'd3-interpolate',
        'd3-scale',
        'd3-selection',
        'd3-shape',
        'd3-transition',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
        extend: true,
        sourcemap: devMode ? 'inline' : false,
        plugins: [terserConfig()],
      },

      // ref: https://blog.logrocket.com/does-my-bundle-look-big-in-this/
      treeshake: {
        moduleSideEffects: false,
      },
      // IMPORTANT: This plugins is different from output plugins
      plugins: [
        nodeResolve(),
        // analyze({
        //   summaryOnly: true,
        //   filterSummary: true,
        // }),
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
