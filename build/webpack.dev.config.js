const config = require('./config.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

//fs.open('./build/env.js', 'w', function(err, fd) {
//    const buf = 'module.exports = "development";';
//    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
//});
config.env = "development";


module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
        ], {
            ignore: [
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: { colors: true },
        host: config.dev.host,
        port: config.dev.port,
        proxy: {
            //匹配代理的url
            '/api': {
            // 目标服务器地址
              target: config.dev.serviceUrl,
              //路径重写
              pathRewrite: {'^/api' : config.dev.serviceRewritePath},
              changeOrigin: true
            }
        }
    }
});