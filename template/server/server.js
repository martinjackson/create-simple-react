
const fs = require('fs');
const express = require('express');
const serveIndex = require('serve-index');

const apiHello = require('./api-hello')

require('dotenv').config({path:'../.env'})
const HOT_PORT = process.env.HOT_PORT || 8080
const API_PORT = process.env.API_PORT || 9000

const app = express();
app.get('/api/hello', apiHello);

let port = API_PORT
let home = ( fs.existsSync('../public') ) ? '../public' : '.'

app.use(express.static(home));     // serve up static content
app.use(serveIndex(home));         // serve a directory view

const server = app.listen(port)
console.log("NodeJS/Express serving " + home + " on http://localhost:" + port)
