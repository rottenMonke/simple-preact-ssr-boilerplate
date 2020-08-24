const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  target: "node",
  watch: true,
  externals: [nodeExternals({modulesFromFile: true})],
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
    new NodemonPlugin({ ext: 'js'}),
    new webpack.DefinePlugin({ "NODE_ENV": JSON.stringify("development") }),
  ],
    resolve: {
      extensions: ['.ts', '.tsx']
    },
};
