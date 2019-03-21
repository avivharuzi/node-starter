const api = require('./api');

const routes = (app) => {
  app.use('/api', api);
};

module.exports = routes;
