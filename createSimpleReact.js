/* eslint strict: ["error", "global"] */

'use strict';

const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const chalk = require('chalk');
const fse = require('fs-extra');
const args = require('minimist')(process.argv.slice(2), { boolean: true });

const { copyFiles } = require("./copyFiles");
const { checkAppName } = require("./checkDep.js");

const pJson = require('./package.json');
const tpj = require('./template/package.json');


function doIt(name, verbose, skip) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName, tpj.dependencies, tpj.devDependencies);

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
  copyFiles(root, 'test', verbose)
  copyFiles(root, 'server', verbose)

  // TODO load default package.json

  tpj.name = appName
  tpj.author = os.userInfo().username
  fse.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(tpj, null, 2) + os.EOL,
  );

  process.chdir(root);
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
  console.log('We suggest that you begin with your new project by typing:');
  console.log(`   cd ${newDir}`);
  console.log('   npm start  --or--  yarn start   ');
  console.log(`      (then browse to ${chalk.green('http://localhost:8080')}) `);
}
