const path = require('path');

module.exports =  {
  entry: './src/App.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
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
    ],
  },
  resolve: {
    extensions: [ '.ts','.js' ],
  },
  output: {
    path: path.resolve(__dirname, '../build/backend'),
    filename: 'App.js',
  },
};
