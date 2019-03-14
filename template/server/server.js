
const fs = require('fs');
const express = require('express');
const serveIndex = require('serve-index');

const apiHello = require('./api-hello')

const app = express();
app.get('/api/hello', apiHello);

let port = 8081
let home = ( fs.existsSync('../public') ) ? '../public' : '.'

app.use(express.static(home));     // serve up static content
app.use(serveIndex(home));         // serve a directory view

const server = app.listen(port)
console.log("NodeJS/Express serving " + home + " on http://localhost:" + port)
