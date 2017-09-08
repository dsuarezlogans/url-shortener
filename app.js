"use strict";

const express = require("express");

const Ctrl = require("./controllers/short-url");

const app = express();

app.get("/new/*", Ctrl.shortURL);

app.get("/:code", Ctrl.getURL);

module.exports = app;
