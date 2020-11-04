// The following turns off minification and name mangling
// the default behaviors with  a normal 'react-scripts build'

const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

// turn off minification, turn on sourcemap generation
config.mode='development'

config.optimization.minimize = false;

// Consolidate chunk files instead
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
// Move runtime into bundle instead of separate file
config.optimization.runtimeChunk = false;

// JS
config.output.filename = '[name].js';

config.plugins[2].replacements.NODE_ENV='development'
config.plugins[4].definitions["process.env"].NODE_ENV="'development'"

// CSS. "5" is MiniCssPlugin
config.plugins[5].options.filename = '[name].css';
config.plugins[5].options.publicPath = '../';

/*
console.log('--------------------------------------------');
console.log('react-scripts build config:');
console.log(JSON.stringify(config, null, 2))
console.log('--------------------------------------------');
*/