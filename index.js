#!/usr/bin/env node

'use strict';

var nodeVer = process.versions.node;
var major = nodeVer.split('.')[0];

if (major < 8) {
  console.error(
      'You are running Node ' +
        nodeVersion +
        '.\n' +
        'need Node 8 or higher. \n' +
        'Please update your version of Node.'
  );
  process.exit(1);
}

require('./createSimpleReact');

