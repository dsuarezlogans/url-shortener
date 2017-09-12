'use strict';

const express = require('express');

const Ctrl = require('./controllers/short-url');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/new/*', Ctrl.shortURL);

app.get('/:code', Ctrl.getURL);

module.exports = app;
