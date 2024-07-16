// webpack.base.js
const path = require("path");

// 把最终构建好的静态资源都引入到一个html文件中,这样才能在浏览器中运行
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包文件出口
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4 需要配置 clean-webpack-plugin 来删除 dist 文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              "@babel/preset-react", // 处理 JSX 文件
              "@babel/preset-typescript", // 处理TSX 文件为 JSX
            ],
          },
        },
      },
    ],
  },
  resolve: {
    // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件，
    // 所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
    // 修改webpack.base.js，注意把高频出现的文件后缀放在前面
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
};
