const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    // entry: './src/main.js',  // 单入口
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: process.env.NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].js?[chunkhash]',
    },
    // 独立构建, 在浏览器运行的时候构建，所以引入的vue会更大一些，因为需要打包进模板编译， 通过vue-template-compiler 预编译模板
    // resolve: {
    //     alias: {
    //       'vue$': 'vue/dist/vue.common.js'
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //insertAt=top style 标签插在head最顶部，这里是为了方便重置element-ui的样式
                    //因为 element-ui 通过import引入。所以匹配到这个rules，所以被插在了顶部
                    { loader: "style-loader?insertAt=top" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader?insertAt=top" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                    { loader: "postcss-loader" }
                ],
            },
            // 配合.babelrc
            {
                test: /\.js$/,
                use: 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            //  vue-loader 配置， 新版vue-loader 整合了 vue-style-loader
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                // ExtractTextPlugin 插件，单独提取css
                  loaders: {
                    scss: ExtractTextPlugin.extract({
                        use: 'css-loader!sass-loader!postcss-loader',
                        fallback: 'vue-style-loader'
                    }),
                    css: ExtractTextPlugin.extract({
                        loader: 'css-loader!postcss-loader',
                        fallback: 'vue-style-loader'
                    })
                  }
                }
            },
            // 图片
            {
                test: /\.(png|jpg|gif)(\?.+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '/images/[hash:8].[ext]'
                    }
                }
            },
            // 字体
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '/fonts/[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // js 注入到模板内
      new HtmlWebpackPlugin({
          template: './src/template.html',
          filename: 'index.html'
      }),

      new ExtractTextPlugin({
          filename: 'css/style.css?[contenthash]',
          allChunks: true
      }),

      new webpack.optimize.CommonsChunkPlugin({
          name: ["vendor", "manifest"]
      }),

      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify( process.env.NODE_ENV )
          }
      })
    ],
    devServer: {
      host: '127.0.0.1',
      port: 80,
      proxy: {
        '/api/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      },
    //   historyApiFallback: {
    //     index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    //   }
    },
}
