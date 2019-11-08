const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ugJS = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack-base-config.js');

module.exports = webpackMerge(baseConfig, {
    output: {
        path: path.join(__dirname, '../dist/static'),
        filename: 'js/[name].[chunkhash:8].js',
        //chunkFilename: 'js/[name].[chunkhash:8].js',//异步加载的模块
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test:/\.scss|sass|css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '..'
                        }

                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',//通过自定义的插件和工具生态体系来重新定义css以兼容浏览器版本
                        options: {
                            sourceMap: true//使用前面sass-loader的sourceMap,编译效率更高
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new ugJS(),  //js压缩插件
        new MiniCssExtractPlugin({ //css压缩
            filename: 'css/[name].[chunkhash:8].css'
            /*filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order*/
        }),
    ]
});
