/**
 * Created by jialao on 2016/9/15.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        vendor:['vue','vuex','vue-router'],
        bundle:'./src/index'
    },
    output:{
        path:path.join(__dirname,'public'),
        filename:'[hash:8].[name].js',
        publicPath:'/'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{warnings:false}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vender',
            minChunks:Infinity
        }),
        new HtmlWebpackPlugin({
            favicon:path.join(__dirname,'public/favicon.jpg'),
            title:"Ez Note",
            template:path.join(__dirname,'src/index.html'),
            inject:'body',
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ],
    module:{
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
            js:'babel!eslint'
        }
    },
    resolve:{
        root:path.resolve(__dirname,'node_modules'),
        extensions:['','.js','.vue','.less']
    }
}