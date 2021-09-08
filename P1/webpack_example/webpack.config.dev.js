const path = require('path');

module.exports = {
  entry: './app.ts',
  mode: 'development',
  devtool: 'source-map',
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
  ],
  output: {
    path: path.resolve(__dirname, 'build_dev'),
    filename: 'App.js'
  }
};