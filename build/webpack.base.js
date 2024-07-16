// webpack.base.js
const path = require("path");
const webpack = require("webpack");

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
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配 .ts, .tsx文件
        // webpack 的 loader 默认在单线程执行,现代电脑一般都有多核cpu,可以借助多核cpu开启多线程loader解析,
        // 可以极大地提升loader解析的速度,thread-loader就是用来开启多进程解析loader的,
        // 使用时,需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行
        // 由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader(下面会讲),所以这里只配置了多进程解析js,
        // 开启多线程也是需要启动时间,大约600ms左右,所以适合规模比较大的项目
        use: ["thread-loader", "babel-loader"],
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的ts,tsx进行loader解析
      },
      {
        // 从右往左,从下往上的,遇到less文件,使用less-loader解析为css
        // 匹配到css文件后先用css-loader解析css, 最后借助style-loader把css插入到头部style标签中
        test: /.(css|less)$/, //匹配 css和less 文件
        use: [
          "style-loader",
          "css-loader",
          // 新增
          // postcss-loader：处理css时自动加前缀
          // autoprefixer：决定添加哪些浏览器前缀到css中
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        // 对于图片文件,webpack4使用file-loader和url-loader来处理的,但webpack5不使用这两个loader了,而是采用自带的asset-module来处理
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件，
    // 所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
    // 修改webpack.base.js，注意把高频出现的文件后缀放在前面
    extensions: [".js", ".tsx", ".ts"],
    // 设置别名alias,设置别名可以让后续引用的地方减少路径的复杂度
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    //需要把process.env.BASE_ENV注入到业务代码里面,就可以通过该环境变量设置对应环境的接口地址和其他数据
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
};
