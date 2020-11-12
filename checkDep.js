
const chalk = require('chalk');
const validProjectName = require('validate-npm-package-name');

function checkAgainstDependencies(appName, depList) {
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

function checkAppName(appName, dependencies, devDependencies) {
  const validationResult = validProjectName(appName);
  if (!validationResult.validForNewPackages) {
    const err = `Could not create a project called ${chalk.red(appName)} because of npm naming restrictions:`
    console.error(err);
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  const dep = Object.keys(dependencies);
  const devDep = Object.keys(devDependencies);
  checkAgainstDependencies(appName, dep);
  checkAgainstDependencies(appName, devDep);
}

exports.checkAppName = checkAppName;