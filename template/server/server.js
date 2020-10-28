
const fs = require('fs');
const express = require('express');
const serveIndex = require('serve-index');

const CONSTANTS = require('../constants');
const apiHello = require('./api-hello')

require('dotenv').config()
const HOT_PORT = process.env.HOT_PORT || CONSTANTS.DEF_HOT_PORT
const API_PORT = process.env.API_PORT || CONSTANTS.DEF_API_PORT

const app = express();
app.get('/api/hello', apiHello);

let port = API_PORT
let home = ( fs.existsSync('../public') ) ? '../public' : '.'

app.use(express.static(home));     // serve up static content
app.use(serveIndex(home));         // serve a directory view

const server = app.listen(port)
console.log("NodeJS/Express serving " + home + " on http://localhost:" + port)
