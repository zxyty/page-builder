const { join } = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./common");
const CleanHtmlRel = require("./plugins/cleanHtmlRel");

module.exports = {
  mode: "production",

  entry: common.entry,

  output: common.output,

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),

    new CopyWebpackPlugin(
      common.copyPluginConfig.patterns,
      common.copyPluginConfig.options
    )
  ]
    // .concat(process.env.ANALYZER ? new BundleAnalyzerPlugin() : [])
    .concat(
      common.htmlPluginConfig.map(c => {
        return new HtmlPlugin(
          Object.assign({}, c, {
            template: join(__dirname, "..", "src", "index.ejs")
          })
        );
      })
    )
    .concat([new CleanHtmlRel()]),

  module: {
    rules: [
      common.templateLoader,
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      common.lessLoader,
      common.htmlLoader,
      common.mdLoader
    ]
  },

  resolve: {
    ...common.resolve
  }

  // externals: common.externals
};
