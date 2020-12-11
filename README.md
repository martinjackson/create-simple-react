# create-simple-react

An alternative to create-react-app, no eject, opinionated for a shop standard.

_Would you like a feature comparision between this project and React's create-react-app?_

There is no ejecting !!  for those you want to tinker, the config files
are in the root directory with the package.json file.  If you mess them up, you have two choices:
- use git to revert back
- remove the messed up files and  run create-simple-react on the same directory again. It will restore
the original config files.
_Note: create-simple-react will not replace existing files_

This project was ruled by these concepts:

1. K.I.S.S. -- Keep It Sublimely Simple
2. D.R.Y. -- Don't Repeat Yourself
3. Everything in plain sight
4. React Frontend, NodeJS backend example
5. Project structure near ready for Production (just change webpack config from development to production, add minifiy)

__Please send ideas on improvements__

Version 0.6.1    Example code for both React Class and React Hooks (Jest test examples too!)
Version 0.9.0    Upgraded to Webpack 5
Version 0.10.0   Tested with older version of NodeJS

## Minimum requirements

NodeJS  10.x -> 14.15.1

- send email to martin.a.jackson@gmail.com on earlier or later versions mention  your platform
  - Ubuntu 18.04, 20.04, RaspberryPi 3/4, Mac OS, Win10 1803/1909
  - we will put the list here



## How to use

```bash
npm init simple-react [New Project Directory] {--verbose} {--help}
```

### Example

```bash
cd ~/projects
npm init simple-react lab-status
```

   3 minutes later...

```bash
cd lab-status
npm start
```

   open a browser to [http://localhost:8080](http://localhost:8080)

------------------------------------------------------

### What you get out of the box

## Project Scripts

### npm run start

    runs the application is Live Reload where as you save code code in src/,
    you will see the changes on the web page http://localhost:8080

### npm run build

    creates a bundle.js in the public/ ready to test before publishing on a production server.

### npm run demo

    tests the production files public/ on last time before publishing.

### npm run test

    run the Jest Unit tests in the test directory

### npm run lint

    runs ESLint against all your source code -- catch syntax errors early

#### Your project directory

|                    |                                                                       |
| -----------------  | ----------------------------------------------------------------------|
| package.json       | The file where NPM keeps all the details to build or run your project |
| .eslintrc.js       | default configuration for ESLint |
| .gitignore         | which files not to include in version tracking |
| babel.config.js    | configuration file for Babel to support React and JSX |
| webpack.config.js  | configuration file for Webpack to support Babel, React, and JSX |
|   node_modules     | directory where NPM puts modules your project uses |
|   public           | directory where production bundle of your code will go |
|   src              | directoy of your modules source code in JSX and ES2018 |
|   src/index.html   | web page to launch your React Application |
|   src/index.js     | Top App Module |
|   src/Example.js   | An example React Component used by index.js |
|   test             | directory for your Jest unit tests |
|   server           | an example NodeJS server as a backend for your React frontEnd |

## Further Study

Where is all started [ReactJS](https://reactjs.org/)

Wes Bos' [React for Beginner](https://reactforbeginners.com/)

Elija Manor's Article on [npm initializers](https://elijahmanor.com/npm-init-initializer/)
<-- great article!!

Other npm init examples

- create-deck - Create mdx-deck presentations

   ```bash
   npm init deck your-app-name
   ```

- create-component-app - Tool to generate different types of React components from the terminal. 💻

   ```bash
   npm init component-app
   ```

- create-hintrc - 💡 A hinting engine for the web [https://webhint.io/](https://webhint.io/)

   ```bash
   npm init hintrc
   ```

- create-esm - Create esm enabled packages

   ```bash
   npm init esm
   ```
