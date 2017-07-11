/**
 * 创建人：李智勇
 * 创建时间： 2017/4/18.
 * 描述：webpack，开发环境与生产环境公用配置文件
 */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const rootPath = path.join(__dirname, '..');

module.exports = {
    // 实际就是自动添加后缀，默认是当成js文件来查找路径
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },

    //配置不同文件的loader
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                include:[
                    path.resolve(rootPath, "src"),
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include:[
                    path.resolve(rootPath, "src"),
                ],
                exclude: /node_modules/
            },
            {
                test: /.(css|scss)$/,
                include:[
                    path.resolve(rootPath, "src"),
                ],
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader?{browsers:["> 1%","last 3 version"]}',
                        {
                            loader: 'postcss-loader',
                            options:{
                                plugins: ()=>[
                                    require('postcss-import'),
                                    require('postcss-discard-comments'),
                                    require('postcss-simple-vars'),
                                    require('postcss-nested'),
                                    require('postcss-mixins'),
                                    require('postcss-extend')
                                ]
                            }
                        }
                    ]
                })

            },
            //小于10k的字体文件、图片、图标等以base64编码内嵌到页面中，减少http请求
            //开发环境的所有图片、图标等超过10k都会放到相应的文件夹（字体：font、图片：img）下，
            //通过url-loader中配置publicPath+output+name来保证css中的路径没问题
            //publicPath+output+name决定了css中对应的路径地址
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
                include:[
                    path.resolve(rootPath, "src"),
                ],
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000&name=[name].[hash:6].[ext]&outputPath=font/&publicPath=../'
            },
            {
                test: /\.(gif|jpe?g|png|ico)$/,
                include:[
                    path.resolve(rootPath, "src"),
                ],
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000&name=[name].[hash:6].[ext]&outputPath=img/&publicPath=../'
            }
        ]
    },

    plugins: [
        //css语法检测
        new StyleLintPlugin({configFile:'./.stylelintrc'}),
        //提取css文件
        new ExtractTextPlugin('css/[name].[contenthash:6].css'),
    ]
};