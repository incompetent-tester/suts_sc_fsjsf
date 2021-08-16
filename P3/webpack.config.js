const path = require('path');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/App.ts',
  mode: 'production',
  devtool: false,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ],
  },
  plugins : [
    //new DuplicatePackageCheckerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/views", to: "views"}
      ]
    })
  ],
  resolve: {
    extensions: [ '.ts','.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js',
  }
};