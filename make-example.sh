#!/bin/bash

echo 'Building your new project, takes about 3 minutes.'

mkdir $1
cd $1

npm init -y

npm i --save react react-dom react-spring
npm i -D webpack-dev-server webpack webpack-cli \
@babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react \
babel-loader css-loader style-loader opn-cli \
eslint eslint-config-airbnb \
eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import@latest

# update package.json with run-scripts

mv package.json p.json
sed '$d' p.json | sed '$d' >package.json
rm p.json

cat <<EOFS >>package.json
  },
  "scripts": {
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "start": "webpack-dev-server --mode development --hot",
    "build": "cp src/index.html public/ && webpack --mode production",
    "demo": "cd public && opn index.html"
  }
}
EOFS

## ---------------------------------------------------------------------

cat <<EOFS >babel.config.js
module.exports = function (api) {
    api.cache(true);

    const plugins = [
        "@babel/plugin-proposal-object-rest-spread",
        [ "@babel/plugin-proposal-class-properties", { "loose": true } ]
      ];

    const presets = [ "@babel/env", "@babel/react" ];

    return { presets, plugins };
}
EOFS

## ---------------------------------------------------------------------

cat <<EOFS >.eslintrc.js
module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "rules": {
        "semi": "off",
        "no-console": "off",
        "react/jsx-filename-extension": "off",
        "react/prefer-stateless-function": "warn"
    },
    "extends": ["eslint:recommended", "airbnb"]
};
EOFS

## ---------------------------------------------------------------------

mkdir src
mkdir public

cat <<EOF >src/index.html
<html>
<head>
  <meta charset="UTF-8">
  <meta name="google" value="notranslate">
  <title>Example Test</title>
</head>

<body>
    <div id="app"></div>

<script src="bundle.js"></script>
</body>
</html>
EOF

cat <<EOF2 >src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example'

ReactDOM.render(<Example />, document.getElementById('app'));
EOF2

cat <<EOF3 >src/Example.js
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Example extends React.Component {
  render() {
    const st = {
      width: '100%',
      height: '100%',
      color: 'white',
      background: '#253237',
    }

    return (
      <div style={st}>Hello</div>
    );
  }
}
EOF3

cat <<EOF4 >webpack.config.js
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
        path: resolve('./public/'),
        filename: 'bundle.js'
    },
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
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react']
                   },
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
EOF4

