const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "index.js"),
    },
    // For some reason client code doesn't get attached/doesn't work with development mode on
    mode: 'production',
    devtool: 'eval-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "babel-loader" }]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
        
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: 'chunk[id].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: false,
        minimize: false,
    },
    plugins: [
        new ManifestPlugin({ isInitial: true, isModuleAsset: true, writeToFileEmit: true }),
        new MiniCssExtractPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
