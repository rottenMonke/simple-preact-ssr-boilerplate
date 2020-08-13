const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: 'production',
  target: "node",
  externals: [nodeExternals()],
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
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
