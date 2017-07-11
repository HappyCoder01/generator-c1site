/**
 * 创建人：李智勇
 * 创建时间： 2017/4/18.
 * 描述：webpack生产环境配置文件
 */
const commonConfig = require('./common.config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rootPath = path.join(__dirname, '..');

let config = {
    externals: {
        jquery: 'window.$'
    },
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(rootPath, 'build'),
        publicPath: './',
        filename: 'js/[name].[chunkhash:6].js'//[]中放置变量，name为entry对象中的key值，hash为一个哈希值文件加hash值则可以解决静态资源缓存问题
    }
};
let proConfig = Object.assign(commonConfig, config);
let proPlugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        // 压缩代码
        compressor: {
            warnings: false
        }
    }),

    new HtmlWebpackPlugin({
        template: './src/index.html',

        filename: 'index.html',

        inject: 'body',

        minify: {
            // 压缩HTML文件
            removeComments: true,
            // 移除HTML中的注释

            collapseWhitespace: true
            // 删除空白符与换行符
        }
    }),

    //压缩css
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /.(css|scss)$/,
        cssProcessorOptions: {discardComments: {removeAll: true}},
        canPrint: true
    })
];
for (let i=0,l=proPlugins.length; i<l; i++) {
    proConfig.plugins.push(proPlugins[i]);
}
module.exports = proConfig;