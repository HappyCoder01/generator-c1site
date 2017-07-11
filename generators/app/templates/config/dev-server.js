/**
 * 创建人：李智勇
 * 创建时间： 2017/4/20.
 * 描述：开发环境下的服务
 */
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev.js');
const port = 3000;
const rootPath = path.join(__dirname, '..');
// 监听的端口是3000，届时可以在在浏览器输入 localhost:3000 直接访问

const server = new webpackDevServer(webpack(config), {
    contentBase : rootPath,
    hot    : false,
    quiet  : false,
    noInfo : true,
    lazy   : false,
    inline: true,
    stats  : {
        colors : true
    },
    historyApiFallback : true
});

server.listen(port, 'localhost', function () {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
