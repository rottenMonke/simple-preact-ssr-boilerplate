const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  target: "node",
  externals: [nodeExternals()],
  entry: {
    main: path.resolve(__dirname, "../src", "server.ts"),
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: "ts-loader" }]
    },
      {
        test: /\.css$/,
        use: ['ignore-loader'],
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ "NODE_ENV": JSON.stringify("production") }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx']
},
};
