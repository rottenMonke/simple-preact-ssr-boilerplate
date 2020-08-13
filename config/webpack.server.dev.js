const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  target: "node",
  watch: true,
  externals: [nodeExternals({modulesFromFile: true})],
  entry: {
    main: path.resolve(__dirname, "../src", "server.js"),
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['ignore-loader'],
    },
    ],
  },
  plugins: [new NodemonPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
