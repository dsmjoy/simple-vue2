const path = require('path')

const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var entries = function () {
    let dir = path.resolve(__dirname, './src/entries')
    let entryFiles = glob.sync(dir + '/*.js')

    let map = {}

    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[ filename ] = filePath
    })
    return map
}

const webpackConfig = {
    entry: Object.assign(
        entries(),
        {
            vendors: './src/vendors.js'
        }
    ),
    output: {
        path: path.resolve(__dirname, './build'),
        // publicPath: '/',
        filename: process.env.NODE_ENV === 'development' ? './js/[name].js' : './js/[name].js',
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
                use: {
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
                }
            },
            // 图片
            {
                test: /\.(png|jpg|gif|svg)(\?.+)?$/,
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
                test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
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
        new webpack.optimize.CommonsChunkPlugin({
          name: ["vendors", "manifest"]
        }),

        new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify( process.env.NODE_ENV )
          }
        })
    ],
    devServer: {
        host: '127.0.0.1',
        port: 80
    }
}

let files = entries()

for(let filename in files) {

    let extractTextPlugin = new ExtractTextPlugin({
        filename: './css/' + filename + '.css',
        allChunks: true
    })

    let htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: filename + '.html',
        chunks: [filename, 'vendors', 'manifest'],
        hash: true
    })

    webpackConfig.plugins.push(extractTextPlugin, htmlWebpackPlugin)
}

module.exports = webpackConfig
