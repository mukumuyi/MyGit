const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../TL_WEB_RUN/dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css?$/,
        loader: 'css-loader'
      }
    ]
  },
  resolve: {
    extensions: [".ts",".tsx",".js",".jsx"]
  }
};