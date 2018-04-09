const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/<db-name>');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(fileUpload());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

module.exports = app;
