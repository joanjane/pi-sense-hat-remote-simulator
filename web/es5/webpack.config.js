const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  entry: ['./web/index.js'],
  entry: {
    index: './web/index.js',
    pixelDrawer: './web/pixel-drawer/index.js'
  },
  devtool: argv.mode === 'production' ? 'none' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: './web/index.html',
      filename: 'index.html',
      excludeChunks: ['pixelDrawer']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: './web/pixel-drawer/index.html',
      filename: 'pixel-drawer/index.html',
      excludeChunks: ['index']
    })
  ],
  output: {
    path: path.resolve(__dirname, '../../wwwroot'),
    filename: 'js/[name].bundle.js'
  },
});