const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const notesRouter = require('./routes/notes');

const app = express();

const i18n = require('./i18n');
const cookieParser = require('cookie-parser');

// set template render engine
app.set('view engine', 'ejs');

// set views folders
app.set('views', path.join(__dirname, 'views'));

// set cookie parser for language swiching
app.use(cookieParser());
app.use(i18n.init);

// set forms parser engine
app.use(bodyParser.urlencoded({ extended: true }));

// set path to static folders
app.use('/static', express.static(path.join(__dirname, '..', 'node_modules', 'primeflex')));

// set routes
app.use('/', notesRouter);

module.exports = app;

