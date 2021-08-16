const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');

const styleConfig =  {
  entry: './src/views/styles/styles.scss',
  mode: 'production',
  target: 'node',
  plugins: [
    new MiniCssExtractPlugin({
      filename : "styles.css"
    }),
    new RemovePlugin({
      after: {
        root: './build/public/css',
        include: [
            'main.js'
        ],
        trash: true
      }
  })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader : 'ts-loader',
          options: 
          {
            transpileOnly: true,  // Increase compilation speed but no type checking
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.scss','.css' ],
  },
  output: {
    path: path.resolve(__dirname, 'build/public/css'),
  }
};

const appConfig = {
  entry: './src/App.ts',
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
  plugins : [
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/views", to: "views"}
      ]
    })
  ],
  resolve: {
    extensions: [ '.ts','.js', '.ejs' ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js',
  }
};

module.exports = [
  appConfig, styleConfig  
] 

