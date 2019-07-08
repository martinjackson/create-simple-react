const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

//   entry: ['@babel/polyfill', './src/index.js'],
// instead of @babel/polyfill
require("core-js/stable");
require("regenerator-runtime/runtime");

module.exports = {
  entry: ['./src/index.js'],
  output: {
        path: resolve('./public/'),
        filename: 'bundle.js'
    },
  devtool: 'source-map',
  resolve:{
    modules: [
    resolve('src'),
    "node_modules" ]
    },
  devServer: {
     historyApiFallback: true,
     host: '0.0.0.0',     // allow more than localhost
     port: 8080,
     contentBase: './src/',
     proxy: {  '/api/*': 'http://localhost:8081/' }   // <- backend
  },
  module: {
    rules: [
          {
            test: /^(?!.*\.{test,min}\.js$).*\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              configFile: './babel.config.js'
            }
          },

          {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
          },

          // "file" loader for svg
          {
             test: /\.svg|\.png|\.gif|\.jpg$/,
             loader: 'file-loader',
             query: {
               name: 'static/media/[name].[hash:8].[ext]'
             }
          },

          {
            test: /\.html$/,
            loader: 'raw-loader'
          }
    ]
  }
}
