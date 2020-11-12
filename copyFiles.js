
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const chalk = require('chalk');

function logRed(msg) {
  console.log(`${chalk.red(msg)}`);
}
function logGreen(msg) {
  console.log(`${chalk.green(msg)}`);
}

function padLeft(s, len, p = ' ') {
  return String(p.repeat(len) + s).slice(-len);
}

function isDir(dirPath) {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()
}

function filePrep(verbose, file, dest, fromDir, toDir) {

  const fromFile = path.join(fromDir, file);
  const toFile = path.join(toDir, dest);
  let shouldCopy = !isDir(fromFile)
  if (shouldCopy) {
    if (fse.pathExistsSync(toFile)) {
      logRed(`${toFile} already exists, skipping default file creation.`)
      shouldCopy = false
    }
    if (verbose && shouldCopy) {
      const name = padLeft(dest, 22)
      logGreen(`${name} => ${toDir}`)
    }
  }
  return [fromFile, toFile, shouldCopy];  // not a dir and does not exist
}

function copyFiles(root, toSubDir, verbose) {
  let fromDir = (toSubDir) ? path.join(__dirname, 'template', toSubDir) : path.join(__dirname, 'template');
  let toDir = (toSubDir) ? path.join(root, toSubDir) : path.join(root);
  const files = fse.readdirSync(fromDir);
  files.forEach((file) => {
    // workaround .gitignore filtered out of npm commit
    let dest = file;
    if (file === 'gitignore')
      dest = '.gitignore';
    if (file === 'eslintrc.js')
      dest = '.eslintrc.js';

    const [fromFile, toFile, shouldCopy] = filePrep(verbose, file, dest, fromDir, toDir);

    // default  , { overwrite:true } )
    if (shouldCopy)
       fse.copySync(fromFile, toFile);
  });
}

exports.copyFiles = copyFiles;
