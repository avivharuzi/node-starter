const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');

const appConfig = require('./config/app');
const dbConfig = require('./config/db');
const routes = require('./routes');
const middlewares = require('./middlewares');

mongoose.Promise = bluebird;
mongoose.connect(`mongodb://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}:${dbConfig.port}/${dbConfig.database}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

const app = express();

app.use(compression({
  threshold: 0
}));
app.use(helmet());
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressFileUpload());

if (appConfig.isDevelopment) {
  app.use(morgan('dev'));
}

app.use(appConfig.publicPath, serveStatic(path.join(__dirname, appConfig.publicPath)));

middlewares(app);
routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `${appConfig.publicPath}/index.html`));
});

module.exports = app;
