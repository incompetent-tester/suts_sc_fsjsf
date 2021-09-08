const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './app.ts',
  mode: 'production',
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
    
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  resolve: {
    extensions: [ '.ts','.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js',
  }
};