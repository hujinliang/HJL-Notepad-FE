/**
 * Created by jialao on 2016/9/15.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    debug:true,
    entry:[
        './src/index'
    ],
    output:{
        path:path.join(__dirname,'public'),
        publicPath:'/',
        filename:'bundle.js'
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon:path.join(__dirname,'public/favicon.jpg'),
            title:"Ez Note",
            template:path.join(__dirname,'src/index.html'),
            inject:true
        })
    ],
    module:{
        // preLoaders:[{test:/\.js$/,loader:'eslint-loader',exclude:/node_modules/}],
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue'
            },
            {
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                loader:'style!css!less'
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                loader:'url?limit=10000'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
        ]
    },
    vue:{
        loaders:{
            js:'babel'
        }
    },
    eslint: {
        configFile: './.eslintrc.json'
    },
    resolve:{
        extensions:['','.js','.vue','.less']
    }
}