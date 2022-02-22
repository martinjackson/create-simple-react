
const fs = require('fs')
const os = require('os')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dot = require('dotenv')
dot.config({ path: './.env' })

// Take the constants from the .env file and make them available as process.env.NAME

const HOSTNAME = process.env.HOSTNAME
const HOT_PORT = process.env.HOT_PORT
const API_PORT = process.env.API_PORT

let info = {
  entry: {pre: './src/initEnv.js',
          main: './src/index.js'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'dist'),  // where webpack bundles are built
    clean: true,
    publicPath: '/dist/'
  },

  mode: 'development',
  devtool: 'source-map',
  stats: 'minimal',     // 'errors-only', default 'normal'

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [ /node_modules/ ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
            ],
            plugins: [
                       '@babel/plugin-proposal-object-rest-spread',
                       '@babel/plugin-proposal-optional-chaining',
                       ["@babel/plugin-proposal-class-properties", {"loose": true} ],
                       ["@babel/plugin-proposal-private-methods", { "loose": true }],
                       ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
          }
        }
      },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      }
    ],
  },

  plugins: [
      new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',     // requires npm install process --save-dev
    }),

    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),

  ],

  resolve: {
    alias: {
        react: path.resolve('./node_modules/react'),
    },

      fallback: {
          "stream": require.resolve("stream-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "assert": require.resolve("assert/")
        }
  },

  devServer: {
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(`/opt/Certs/${HOSTNAME}.key`),       
        cert: fs.readFileSync(`/opt/Certs/${HOSTNAME}.cer`),
        // ca: fs.readFileSync(`/opt/Certs/${HOSTNAME}.ca`),  
      },
    },
    historyApiFallback: true,
    liveReload: true,
    hot: true,

    static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
        watch: true
    },

    port: HOT_PORT,
    allowedHosts: 'all',

    proxy: {  '/api/*': `https://localhost:${API_PORT}`,  }   // <- backend
  }
};

async function configInfo() {
    console.log('');
    console.log('*****************************************');
    console.log('* if running   npm start   use           ');
    console.log(`*      https://localhost:${HOT_PORT}          (VSCode port forwarding)`);
    console.log(`*      https://${HOSTNAME}:${HOT_PORT}   `);
    console.log('*  expect API services on                ');
    console.log(`*      https://localhost:${API_PORT}          (VSCode port forwarding)`);
    console.log(`*      https://${HOSTNAME}:${API_PORT}   `);
    console.log('*****************************************');
    console.log('')

  return info
}

module.exports = configInfo()
