module.exports = {
  presets: [
    // ["react-app"],
    ["@babel/preset-react"],
    [
      "@babel/preset-env",
      {
        // "useBuiltIns": "entry"
        // modules: "commonjs",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-modules-commonjs",
  ],
  env: {
    production: {
      plugins: [
        ["transform-remove-console"],
        ["@babel/plugin-transform-modules-commonjs"],
        [
          "@babel/plugin-transform-runtime",
          {
            absoluteRuntime: false,
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        ],
        [
          "module-resolver",
          {
            root: ["./src"],
          },
        ],
        ["@babel/plugin-proposal-class-properties"],
      ],
      presets: [["minify"]],
    },
  },
}
