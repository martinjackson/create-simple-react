/* eslint strict: ["error", "global"] */

'use strict';

const os = require('os');
const path = require('path');
const childProcess = require('child_process');

// const chalk = require('chalk');      ESM only
const asci = require('ansi-colors');
 
const fse = require('fs-extra');
const args = require('minimist')(process.argv.slice(2), { boolean: true });

const { copyFiles, mkdir, logRed, logGreen, logErrorAndStop } = require("./copyFiles");

const pJson = require('./package.json');

function createPackageJson(where, cmds, info) {
  console.log(`working in ${asci.yellow(where)}`);
  process.chdir(where);

  const newProjectJson = path.join(where, 'package.json')
  if ( !fse.existsSync(newProjectJson) ) {

    cmds.map( cmd => {
      cmd = cmd.replace(/(\r\n|\n|\r)/gm, '');
      cmd = cmd.replace(/  +/g, ' ');  // renive redundant spaces

      console.log(`${asci.green(cmd)}`);
      const stdout = childProcess.execSync(cmd+' 2>&1');   // TODO: redirect stderr to a string
    })
    console.log('');

    const pj = require(newProjectJson);
    const modPJson = {
      ...pj,
      ...info
    }
    fse.writeFileSync( newProjectJson, JSON.stringify(modPJson, null, 2) + os.EOL );
  }
}


function doIt(name, verbose, skip) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  console.log(`Creating a new React app in ${asci.green(root)}.`);
  console.log();

  mkdir(`${root}/`)
  mkdir(`${root}/src`);
  mkdir(`${root}/public`);
  mkdir(`${root}/test`);
  mkdir(`${root}/server`);

  copyFiles(root, null, verbose)
  copyFiles(root, 'src', verbose)
  copyFiles(root, 'public', verbose)
  copyFiles(root, 'test', verbose)
  copyFiles(root, 'server', verbose)

  const createPackageJsonCMDs = [
    'npm init -y',
    `npm install --save-dev
    @babel/plugin-proposal-class-properties
    @babel/plugin-proposal-object-rest-spread
    @babel/plugin-proposal-optional-chaining
    @babel/plugin-proposal-private-methods
    @babel/plugin-proposal-private-property-in-object
    @babel/preset-env
    @babel/preset-react
    assert
    autoprefixer
    babel-loader
    browserify-zlib
    css-loader    
    mini-css-extract-plugin
    postcss
    postcss-loader
    process
    stream-browserify
    tailwindcss
    webpack
    webpack-cli
    webpack-dev-middleware
    webpack-dev-server`,

    'npm install --save react react-dom dotenv'
  ]

  const projectScripts = {
    main: "index.js",
    "scripts": {
      "test": "jest",
      "lint": "eslint src/**/*.js",
      "prep": "node watch-env.js",
      "start": "sudo npm run back && sudo npm run front",
      "front": "node watch-env.js --watch & HOSTNAME=$(hostname --fqdn) webpack serve",
      "back": "cd server && ./start.sh",
      "build": "node watch-env.js && HOSTNAME=$(hostname --fqdn) webpack"
    },
  }

  const createServerPackageJsonCMDs = [
    'npm init -y',
    'npm install --save express serve-index dotenv'
  ]

  const serverScripts = {
    main: "server.js",
    scripts: {
      "start": "node server.js",
    }
  }

  const serverPath = path.join(root, 'server')
  createPackageJson(root, createPackageJsonCMDs, projectScripts)
  createPackageJson(serverPath, createServerPackageJsonCMDs, serverScripts)

  if (!fse.existsSync(path.join(root, 'package-lock.json'))) {
    console.log(`${asci.green('npm install')} in ${root}.`);
    childProcess.execSync('npm install', { stdio: 'inherit' });
  }

  if (!fse.existsSync(path.join(root, '.git'))) {
    console.log(`${asci.green('Initializing local Git info')} for ${root}.`);
    childProcess.execSync('git init', { stdio: 'inherit' });
  }

}


// Main script

console.log(`create-simple-react ${pJson.version}, NodeJS ${process.versions.node}`)

const NODE_MAJOR_VERSION = process.versions.node.split('.')[0];
if (NODE_MAJOR_VERSION < 10) {
  logRed('Requires Node 10.x (or higher)');
  logGreen('Better performance with Node 14.x, npm 7.x');
  process.exit(-1);
}

const newDir = args._[0] // first non-switch argument
if (!newDir) {
  if (args.help) {
    console.log(`${asci.blue('How to use:')} npm init simple-react [your new directory] {options}`)
    console.log(`    ${asci.green('--verbose')}  show as files copied into new project. `)
    console.log(`    ${asci.green('--help')}     display how to use`)
    process.exit(0)
  } else {
    console.log(asci.red('No directory specified.'));
    process.exit(-1)
  }
} else {
  doIt(newDir, args.verbose, args.skip);
  console.log('');
  console.log('You can now begin working with your new project by typing:');
  console.log(`   cd ${newDir}`);
  console.log('   npm start  --or--  yarn start   ');
  console.log(`      (then browse to ${asci.green('http://localhost:8080')}) `);
}


