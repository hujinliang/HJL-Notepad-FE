/**
 * Created by jialao on 2016/9/15.
 */
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./webpack.config.prod')
}else{
    module.exports = require('./webpack.config.dev')
}