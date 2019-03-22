/* eslint strict: ["error", "global"] */

'use strict';

const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const chalk = require('chalk');
const fs = require('fs-extra');
const validProjectName = require('validate-npm-package-name');

const args = require('minimist')(process.argv.slice(2), { boolean: true });

const pjson = require('./package.json');
const packageJson = require('./template/package.json');

function checkAgainstDependancies(appName, depList) {
  if (depList.indexOf(appName) >= 0) {
    const msg = `
We cannot create a project called ${chalk.green(appName)} because a dependency with the same name exists.
Due to the way npm works, the following names are not allowed:\n\n`
    console.error(chalk.red(msg)
            + chalk.cyan(depList.map(depName => `  ${depName}`).join('\n'))
            + chalk.red('\n\nPlease choose a different project name.'));
    process.exit(1);
  }
}

function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach((error) => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

function checkAppName(appName) {
  const validationResult = validProjectName(appName);
  if (!validationResult.validForNewPackages) {
    const err = `Could not create a project called ${chalk.red(appName)} because of npm naming restrictions:`
    console.error(err);
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  const dependencies = Object.keys(packageJson.dependencies);
  const devDependencies = Object.keys(packageJson.devDependencies);
  checkAgainstDependancies(appName, dependencies);
  checkAgainstDependancies(appName, devDependencies);
}

function padLeft(s, len, p = ' ') {
  return String(p.repeat(len) + s).slice(-len)
}

function copyFiles(root, toSubDir, verbose) {
  let fromDir = (toSubDir) ? path.join(__dirname, 'template', toSubDir) : path.join(__dirname, 'template');
  let toDir = (toSubDir) ? path.join(root, toSubDir) : path.join(root);

  const files = fs.readdirSync(fromDir);
  files.forEach((file) => {
    // workaround .gitignore filtered out of npm commit
    let dest = file
    if (file === 'gitignore')
      dest = '.gitignore'

    if (file === 'eslintrc.js')
      dest = '.eslintrc.js'

    const from = path.join(fromDir, file)
    const to = path.join(toDir, dest)
    if (verbose) {
      const name = padLeft(dest, 18)
      console.log(`${name} => ${toDir}`)
    }
    fs.copySync(from, to)
  });
}

function doIt(name, verbose, skip) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);

  // create directory if not there
  fs.ensureDirSync(name);

  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  console.log();

  fs.ensureDirSync(`${root}/src`);
  fs.ensureDirSync(`${root}/public`);
  fs.ensureDirSync(`${root}/test`);
  fs.ensureDirSync(`${root}/server`);

  copyFiles(root, null, verbose)
  copyFiles(root, 'src', verbose)
  copyFiles(root, 'test', verbose)
  copyFiles(root, 'server', verbose)

  // TODO load default package.json

  packageJson.name = appName
  packageJson.author = os.userInfo().username
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  process.chdir(root);
  if (!fs.existsSync(path.join(root, 'package-lock.json'))) {
    console.log(`${chalk.green('npm install')} in ${root}.`);
    childProcess.execSync('npm install', { stdio: 'inherit' });
  }

  if (!fs.existsSync(path.join(root, '.git'))) {
    console.log(`${chalk.green('Initializing Git repo')} for ${root}.`);
    childProcess.execSync('git init', { stdio: 'inherit' });
  }

}

console.log(`create-simple-react ${pjson.version}`)

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
