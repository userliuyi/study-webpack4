const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        main: './src/main.js', //webpack4打包默认会去src下找index.js src/index.js  在执行webpack命令时
        main2: './src/main2.js'
    },
    output: {
        filename: '[name].[hash:8].js',
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|vue|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre',  //预执行eslint-loader  npm install eslint-loader -D
                options: {
                    formatter: require('eslint-friendly-formatter'),  //npm install eslint-friendly-formatter -S
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader?cacheDirectory', // 缓存loader执行结果 发现打包速度已经明显提升了
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory', // 缓存loader执行结果 发现打包速度已经明显提升了
                exclude: /node_modules/,
                include: resolve('src'), // 精确指定要处理的目录
                /*options: {  //因为在.babelrc文件里面配置了presets，所以这里不用配置了
                    presets: [
                        '@babel/preset-env'
                    ]
                }*/
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)/,
                use: [
                    {
                        loader: 'file-loader',//url-loader包括file-loader，可以设置1024以下大小的图片打包成base64，减少请求
                        options: {
                            limit: 1024,
                            name: 'fonts/[name].[hash:8].[ext]'//ext即图片扩展名
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit: 1024, //是把小于500B的文件打成Base64的格式，写入JS、
                        name: 'img/[path][name].[hash:8].[ext]'//ext即图片扩展名
                    }
                }]
            }
        ]
    },
    plugins: [
        new vueLoaderPlugin(),
        //根据模板在dist下生成html文件
        new htmlWebpackPlugin({
            hash: true, //为了开发中js有缓存效果，所以加入hash,这样做可以有效避免缓存js
            filename: path.resolve(__dirname, '../', 'dist/index.html'),
            template: path.join(__dirname, '..', 'index.html'),
            //template: './src/index.html',  //是要打包的html模版路径和文件名称。
            //下面的感觉没有生效，需要研究一下
            minify: true, //是对html文件进行压缩的
            removeAttributeQuotes: true, //去掉属性的双引号
        }),
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV
            }
        })*/
    ],
    //
    resolve: {  //resolve配置webpack如何寻找模块对应的文件
        extensions: ['.js', '.vue', '.json'],  //resolve.extensions用于配置在尝试过程中用到的后缀列表
        alias: { //resolve.alias配置项通过别名来把原来导入路径映射成一个新的导入路径
            'vue': resolve('node_modules/vue/dist/vue.esm.js'),
            'css': resolve('src/css'),
            'mixins': resolve('src/mixins'),
            'components': resolve('src/components'),
            '@': resolve('src'),
        },
        modules: [//resolve.modules配置webpack去哪些目录下寻找第三方模块
            resolve('src'),
            'node_modules'
        ],
        //enforceExtension: true//resolve.enforceExtension如果配置为true，所有导入语句都必须带文件后缀
    }
};
