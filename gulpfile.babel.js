/**
 * Created by jialao on 2016/9/15.
 */
import path from 'path'
import gulp from 'gulp'
import gutil from 'gulp-util'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import open from 'open'
import env from 'gulp-env'
import gulpSequence from 'gulp-sequence'

const DEV_PORT =3000,PROD_PORT =9400;
gulp.task('serve',function(){
    let webpackConfig = require('./webpack.config');
    let myConfig = Object.create(webpackConfig);
    myConfig.entry.unshift('webpack/hot/only-dev-server')
    myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT)
    new WebpackDevServer(webpack(myConfig),{
        noInfo: false,
        hot: true,
        inline: true,
        historyApiFallback: true,
        publicPath: myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(DEV_PORT,'localhost',err=>{
        if(err) throw new gutil.PluginError("webpack-dev-server", err)
        gutil.log("[webpack-dev-server]", "==> 🌎  http://localhost:" + DEV_PORT)
        // open('http://localhost:' + DEV_PORT)
    })
});

gulp.task('set-env-prod',() => {
    env({
        vars:{
            'NODE_ENV':'production'
        }
    })
})

gulp.task('webpack',cb => {
    let webpackConfig = require('./webpack.config');
    let myConfig = Object.create(webpackConfig);
    webpack(myConfig,function(err,status){
        cb()
    })
})

gulp.task('build',gulpSequence('set-env-prod','webpack'))