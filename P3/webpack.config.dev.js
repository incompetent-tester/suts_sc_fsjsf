const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/App.ts',
  mode: 'development',
  devtool: 'eval-source-map',
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
  resolve: {
    extensions: [ '.ts','.js' ],
  },
  plugins : [
    new BundleAnalyzerPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js'
  }
};