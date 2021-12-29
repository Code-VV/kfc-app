// const path = require('path')
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     */
    productionSourceMap: false,
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 从 Vue CLI 3.3 起baseUrl已弃用，请使用publicPath
    // 输出文件目录
    outputDir: 'dist',
    // assetsDir: 'static',
    lintOnSave: false,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8089,
        https: false,
        hotOnly: false,
        proxy: {
            // 设置代理
            '/api': {
                //target: 'https://api.sytog.me/', //线上SYTOG',
                target: 'http://192.168.1.115:8765', //本地测试',
                //target: 'http://192.168.1.115:8760', //本地测试',
                ws: true,
                changeOrigin: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/assets/scss/common.scss";`
            },
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5,
                        minPixelValue: 1
                    })
                ]
            }
        }
    },

    pluginOptions: {

    },

}