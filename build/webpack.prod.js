// webpack.prod.js
const path = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.base.js");
// 在开发环境我们希望css嵌入在style标签里面,方便样式热替换,但打包时我们希望把css单独抽离出来,方便配置缓存策略
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 上面配置了打包时把css抽离为单独css文件的配置,打开打包后的文件查看,可以看到默认css是没有压缩的,需要手动配置一下压缩css的插件。
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
});
