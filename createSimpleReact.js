/* eslint strict: ["error", "global"] */

'use strict';

const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const chalk = require('chalk');
const fse = require('fs-extra');
const args = require('minimist')(process.argv.slice(2), { boolean: true });

const { copyFiles } = require("./copyFiles");

const pJson = require('./package.json');

function createPackageJson(where, cmds, info) {
  console.log(`working in ${chalk.yellow(where)}`);
  process.chdir(where);

  const newProjectJson = path.join(where, 'package.json')
  if ( !fse.existsSync(newProjectJson) ) {

    cmds.map( cmd => {
      cmd = cmd.replace(/(\r\n|\n|\r)/gm, '');
      cmd = cmd.replace(/  +/g, ' ');  // renive redundant spaces

      console.log(`${chalk.green(cmd)}`);
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

  // create directory if not there
  fse.ensureDirSync(name);

  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  console.log();

  fse.ensureDirSync(`${root}/src`);
  fse.ensureDirSync(`${root}/public`);
  fse.ensureDirSync(`${root}/test`);
  fse.ensureDirSync(`${root}/server`);

  copyFiles(root, null, verbose)
  copyFiles(root, 'src', verbose)
  copyFiles(root, 'public', verbose)
  copyFiles(root, 'test', verbose)
  copyFiles(root, 'server', verbose)

  const createPackageJsonCMDs = [
    'npm init -y',
    `npm install --save-dev
    @babel/core
    @babel/plugin-proposal-class-properties
    @babel/plugin-proposal-object-rest-spread
    @babel/preset-env
    @babel/preset-react
    babel-loader
    core-js
    css-loader
    regenerator-runtime
    sass
    sass-loader
    style-loader
    webpack
    webpack-bundle-analyzer
    webpack-cli
    webpack-dev-server`,

    'npm install --save react react-dom dotenv'
  ]

  const projectScripts = {
    main: "index.js",
    scripts: {
      "start": "webpack serve",
      "watch": "webpack --watch",
      "build": "webpack"
    }
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
    console.log(`${chalk.green('npm install')} in ${root}.`);
    childProcess.execSync('npm install', { stdio: 'inherit' });
  }

  if (!fse.existsSync(path.join(root, '.git'))) {
    console.log(`${chalk.green('Initializing local Git info')} for ${root}.`);
    childProcess.execSync('git init', { stdio: 'inherit' });
  }

}

console.log(`create-simple-react ${pJson.version}`)

const newDir = args._[0] // first non-switch argument
if (newDir) {
  doIt(newDir, args.verbose, args.skip);
} else {
  console.log(chalk.red('No directory specified.'));
}

if (!newDir || args.help) {
  console.log(`${chalk.blue('How to use:')} npm init simple-react [your new directory] {options}`)
  console.log(`    ${chalk.green('--verbose')}  show as files copied into new project. `)
  console.log(`    ${chalk.green('--help')}     display how to use`)
}

if (newDir) {
  console.log('');
  console.log('You can now begin working with your new project by typing:');
  console.log(`   cd ${newDir}`);
  console.log('   npm start  --or--  yarn start   ');
  console.log(`      (then browse to ${chalk.green('http://localhost:8080')}) `);
}
