const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const serveStatic = require('serve-static');

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

const app = express();

app.use(compression({ threshold: 0 }));
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.use('/images', serveStatic(path.join(__dirname, process.env.IMAGES_PATH)));

module.exports = app;
