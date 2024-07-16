// webpack.prod.js
const path = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式, 会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css", // 抽离css的输出目录和名称
    }),
  ],
});
