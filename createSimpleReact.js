'use strict';

const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const chalk = require('chalk');
const fs = require('fs-extra');
const validProjectName = require('validate-npm-package-name');

var pjson = require('./package.json');

const [,, ...args] = process.argv

const dependencies = [
    'react',
    'react-dom',
    'react-spring'
    ].sort();

const devDependencies = [
    'webpack-dev-server',
    'webpack webpack-cli',
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/preset-env',
    '@babel/preset-react',
    'babel-loader',
    'css-loader',
    'style-loader',
    'opn-cli',
    'eslint',
    'eslint-config-airbnb',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-import@latest',
    ].sort();

const packageJson = {
    "name": "appName",
    "version": '0.1.0',
    "private": true,
    "description": "A Simple React Application",
    "main": "index.js",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {},
    "devDependencies": {},
    "scripts": {
        "test": "jest",
        "lint": "eslint src/**/*.js",
        "start": "webpack-dev-server --mode development --hot",
        "build": "cp src/index.html public/ && webpack --mode production",
        "demo": "cd public && opn index.html"
    }
};

function checkAgainstDependancies(appName, depList) {
    if (depList.indexOf(appName) >= 0) {
        console.error(
          chalk.red(
            `We cannot create a project called ${chalk.green(
              appName
            )} because a dependency with the same name exists.\n` +
              `Due to the way npm works, the following names are not allowed:\n\n`
          ) +
            chalk.cyan(depList.map(depName => `  ${depName}`).join('\n')) +
            chalk.red('\n\nPlease choose a different project name.')
        );
        process.exit(1);
      }
}

function printValidationResults(results) {
    if (typeof results !== 'undefined') {
      results.forEach(error => {
        console.error(chalk.red(`  *  ${error}`));
      });
    }
}

function checkAppName(appName) {
    const validationResult = validProjectName(appName);
    if (!validationResult.validForNewPackages) {
      console.error(
        `Could not create a project called ${chalk.red(appName)} because of npm naming restrictions:`
      );
      printValidationResults(validationResult.errors);
      printValidationResults(validationResult.warnings);
      process.exit(1);
    }

    checkAgainstDependancies(appName, dependencies);
    checkAgainstDependancies(appName, devDependencies);
}

function copyFiles(fromDir, toDir) {
    let  files = fs.readdirSync(fromDir);
    for (var i in files) {
        const from = path.join(fromDir, files[i])
        const to = path.join(toDir, files[i])
        fs.copySync(from, to)
    }
}

function npmInstall(save, depList) {
    const command = [ 'npm',
                'install',
                save,
        ].concat(depList).join(' ');

    childProcess.execSync(command, {stdio: 'inherit'} );
}

function doIt( name ) {
    const root = path.resolve(name);
    const appName = path.basename(root);

    checkAppName(appName);

    fs.ensureDirSync(name);    // create directory if not there

    console.log(`Creating a new React app in ${chalk.green(root)}.`);
    console.log();

    fs.ensureDirSync(root+'/src');
    fs.ensureDirSync(root+'/public');
    fs.ensureDirSync(root+'/test');

    packageJson.name = appName
    packageJson.author = os.userInfo().username
    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );

    let fromDir = path.join(__dirname, 'template')
    let toDir = path.join(root)
    copyFiles(fromDir, toDir)

    fromDir = path.join(__dirname, 'template', 'src')
    toDir = path.join(root, 'src')
    copyFiles(fromDir, toDir)

    process.chdir(root);
    npmInstall('--save', dependencies);
    npmInstall('--save-dev', devDependencies);

    if (!fs.existsSync(path.join(root, '.git'))) {
        console.log(`${chalk.green('Initializing Git repo for this driectory.')}.`);
        childProcess.execSync('git init', {stdio: 'inherit'} );
    }

}

if (args[0] && !args[0].startsWith('-')) {
    doIt(args[0]);
  }
  else {
    if (!args[0])
       console.log(chalk.red('No directory specified.'));

    console.log(`create-simple-react ${pjson.version}`);
    console.log(`${chalk.blue('How to use:')} npm init simple-react [your new directory]`);
  }

