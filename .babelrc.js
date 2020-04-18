const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "58",
        ie: "11"
      },
      useBuiltIns: "usage",
      corejs: "core-js@3"
    }
  ],
  "@babel/preset-react",
  "@babel/preset-typescript",
];
const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ],
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  [
    "import",
    {
      libraryName: "antd",
      style: true
    },
    "antd"
  ],
  // "./webpack/loaders/remoteComponent.js"
  // "module:remote-share-components-loader/lib/index.js"
];
if (process.env["BABEL_ENV"] && process.env["BABEL_ENV"] === "production") {
} else {
  plugins.push([
    "@babel/plugin-transform-runtime",
    {
      helpers: false,
      regenerator: true,
      corejs: 2
    }
  ]);
  // plugins.push("react-hot-loader/babel");
}

module.exports = {
  presets,
  plugins
};
