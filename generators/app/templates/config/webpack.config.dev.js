/**
 * 创建人：李智勇
 * 创建时间： 2017/4/18.
 * 描述：webpack 开发环境配置文件
 */
const commonConfig = require('./common.config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');

let config={
    // devtool 指明了sourcemap的生成方式，它有七个选项，具体请参考 https://segmentfault.com/a/1190000004280859
    // sourcemap 的作用就是为调试代码提供便利
    // cheap-module-eval-source-map 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。
    devtool: 'cheap-module-eval-source-map',
    // 页面入口文件配置
    entry: [
        'webpack-dev-server/client?http://localhost:3000/',
        'webpack/hot/dev-server',
        // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        './src/index.js'
    ],

    output: { // output项告诉webpack怎样存储输出结果以及存储到哪里
        filename: 'bundle.js',

        path: path.join(rootPath, 'dist'),
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        // “path”仅仅告诉Webpack结果存储在哪里

        publicPath: './'
        //模板、样式、脚本、图片等资源对应的server上的路径
        // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    }
};
let devConfig = Object.assign(commonConfig, config);

let devPlugins=[
    new HtmlWebpackPlugin({
        template: './src/index.html',

        filename: 'index.html',

        inject: 'body'
    }),
    // 启用热替换,仅开发模式需要
    new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序，,仅开发模式需要
    new webpack.NoEmitOnErrorsPlugin()
];

for (let i=0,l=devPlugins.length; i<l; i++) {
    devConfig.plugins.push(devPlugins[i]);
}
module.exports = devConfig;
