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
      path: path.resolve(__dirname, './dist'),
    //   publicPath: '/dist/',
      filename: '[name].js?v=[chunkHash]'
    },
    // 独立构建, 在浏览器运行的时候构建，所以引入的vue会更大一些，因为需要打包进模板编译， 通过vue-template-compiler 预编译模板
    // resolve: {
    //     alias: {
    //       'vue$': 'vue/dist/vue.common.js'
    //     }
    // },
    module: {
        rules: [
            // 配合.babelrc
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            //  vue-loader 配置， 新版vue-loader 整合了 vue-style-loader
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                // ExtractTextPlugin 插件，单独提取css
                  loaders: {
                    'scss': ExtractTextPlugin.extract({
                      use: 'css-loader!sass-loader!postcss-loader',
                      fallback: 'vue-style-loader',
                    //   publicPath: ''   // 可以单独配置publicPth
                    }),
                    'css': ExtractTextPlugin.extract({
                        loader: 'css-loader!postcss-loader',
                        fallback: 'vue-style-loader',
                        // publicPath: ''   // 可以单独配置publicPth
                    })
                  }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    plugins: [
        // js 注入到模板内
      new HtmlWebpackPlugin({
        template: 'template.html',
        filename: 'index.html'
      }),

      new ExtractTextPlugin('style.css?[contenthash]'),

      new webpack.optimize.CommonsChunkPlugin({
          name: ["vendor", "manifest"]
      })
    ]
}
