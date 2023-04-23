/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const router = require('./routes');
const { serverError, clientError } = require('./controllers');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);
app.use(serverError);
app.use(clientError);
module.exports = { app };
