const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: "public", to: "./"}
      ]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
  },
  output: {
    path: path.resolve(__dirname, "../build/client/"),
    filename: "Client.js",
  },
  devServer: {
    port : 8080,
    contentBase: path.resolve(__dirname, "../build/client/"),
    historyApiFallback: true
  },
}

module.exports = config
