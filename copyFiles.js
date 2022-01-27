
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

// const chalk = require('chalk');      ESM only
const asci = require('ansi-colors');
 

function logRed(msg) {
  console.log(`${asci.red(msg)}`);
}
function logGreen(msg) {
  console.log(`${asci.green(msg)}`);
}
function logYellow(msg) {
  console.log(`${asci.yellow(msg)}`);
}

function logErrorAndStop(msg, err) {
  logRed(msg);
  console.error(err)
  console.log();
  process.exit(-1)
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
    else {
      if (verbose) {
        const name = padLeft(dest, 22)
        logYellow(`skipping ${name} => ${toDir}`)
      }
  
    }
  }
  return [fromFile, toFile, shouldCopy];  // not a dir and does not exist
}

function mkdir(name) {
  try {
      // create directory if not there
      fse.ensureDirSync(name);

      } catch (err) {
        logErrorAndStop(`Error creating directoy ${name}.`, err);
      }
}

function copyFiles(root, toSubDir, verbose) {
  let fromDir = (toSubDir) ? path.join(__dirname, 'template', toSubDir) : path.join(__dirname, 'template');
  let toDir = (toSubDir) ? path.join(root, toSubDir) : path.join(root);
  const files = fse.readdirSync(fromDir);

  logYellow(`from Dir:   ${fromDir}`)
  logYellow(`to Dir:     ${toDir}  `)
  logYellow(`files:  ${files}`)

  files.forEach((file) => {
    // workaround .gitignore filtered out of npm commit
    let dest = file;
    if (file === 'env')
      dest = '.env';
    if (file === 'gitignore')
      dest = '.gitignore';
    if (file === 'eslintrc.js')
      dest = '.eslintrc.js';

    const [fromFile, toFile, shouldCopy] = filePrep(verbose, file, dest, fromDir, toDir);

    // default  , { overwrite:true } )
    if (shouldCopy) {
      try {
        fse.copySync(fromFile, toFile);
      } catch (err) {
        logErrorAndStop(`Error copying file ${toFile}.`, err);
      }
    }

  });
}

exports.mkdir = mkdir;
exports.copyFiles = copyFiles;
exports.logErrorAndStop = logErrorAndStop;
exports.logRed = logRed;
exports.logGreen = logGreen;