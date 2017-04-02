/**
 * webpack开发阶段配置文件
 */
var path = require('path');
var webpack = require('webpack');

// 自动打开浏览器插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    devtool: 'eval',
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            // 处理js和jsx语法到es5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        // options:{
                        //     presets: ['es2015', 'react']
                        // }
                    }
                ]

            },
            // 处理在js中引用css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // 处理图片操作  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=25000'
            }
        ]
    },
    // resolve: {
    //     // 帮我们处理文件的扩展文件名，这个属性和热重载是冲突的
    //     extensions: ['', '.js', '.json', '.scss', 'jsx']
    // },
    devServer: {
        contentBase: __dirname + '/src',
        hot: true,
        inline:true, // 默认是true
        port:8080,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        // stats: 'minimal',
        // publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
    ]

}
