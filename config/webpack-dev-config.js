const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //开发环境不需要压缩
const baseConfig = require('./webpack-base-config.js');

module.exports = webpackMerge(baseConfig, {
    module: {
        rules: [
            {
                test:/\.scss|sass|css$/,
                use: [
                    'style-loader',  //style-loader 主要 将css 插入到head 的style 标签中内联
                    'css-loader',
                    {
                        loader: 'postcss-loader',//通过自定义的插件和工具生态体系来重新定义css以兼容浏览器版本
                        options: {
                            sourceMap: true//使用前面sass-loader的sourceMap,编译效率更高
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: '#cheap-module-eval-source-map', //相对source-map（完整）更小，效率更高，官方推荐
    plugins: [
    ],
    devServer: {
        //设置基本目录
        contentBase: path.resolve(__dirname, '../dist'),

        //配置服务端口号
        port: '8888',

        //服务器的IP地址，可以使用ip,也可以使用localhost
        host: 'localhost',

        //服务端压缩是否开启
        compress: true,
    }

});
