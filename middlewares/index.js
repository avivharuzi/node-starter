const response = require('./response');

const middlwares = (app) => {
  app.use(response());
};

module.exports = middlwares;
