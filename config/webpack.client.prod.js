const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === 'true';
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, "../src", "index.js"),
    },
    output: {
        filename: 'bundle.[hash].js',
        chunkFilename: 'chunk[id].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: false,
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
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
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new ManifestPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: enableBundleAnalyzer === true ? 'static' : 'disabled',
            openAnalyzer: true,
        }),
    ],
};