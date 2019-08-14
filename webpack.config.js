const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './client/src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/src/public/index.html'
    })
  ]
};
