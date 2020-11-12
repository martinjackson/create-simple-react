#!/bin/zsh

  cd bob
  rm -Rf public server src test
  rm .eslintrc.js webpack.config.js
  rm babel.config.js
  ls -la
  cd ..
  node index.js bob --verbose

  echo '-------------------------------------------------------'
  cd bob
  rm -Rf public server src test
  rm .eslintrc.js webpack.config.js
  rm babel.config.js
  ls -la
  cd ..
  node index.js bob

