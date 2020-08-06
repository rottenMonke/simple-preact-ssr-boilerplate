const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge (common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3042,
        historyApiFallback: true,
        overlay: true,
        open: true,
        stats: 'errors-only'
    },
    module: {
        rules: [

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
        
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../public', 'index.html'),
        })
    ],
});