const ErrorHandler = require.main.require('./utils/error-handler');
const methods = require.main.require('./constants/methods');
const statusCodes = require.main.require('./constants/status-codes');

module.exports = () => {
  return (req, res, next) => {
    res.locals.success = (data = [], message = '') => {
      let statusCode;

      switch (req.method) {
        case methods.DELETE:
          statusCode = statusCodes.NO_CONTENT;
          break;
        case methods.GET:
        case methods.PATCH:
        case methods.PUT:
          statusCode = statusCodes.OK;
          break;
        case methods.POST:
          statusCode = statusCodes.CREATED;
          break;
        default:
          statusCode = statusCodes.OK;
          break;
      }

      res.status(statusCode);

      res.send({
        data: data,
        message: message,
        success: true
      });
    };

    res.locals.error = (err) => {
      let errors = [];
      let statusCode = statusCodes.INTERNAL_SERVER_ERROR;

      if (err.constructor.name === ErrorHandler.name) {
        errors = err;
        statusCode = statusCodes.BAD_REQUEST;
      } else {
        statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      }

      res.status(statusCode);

      res.send({
        errors: errors,
        success: false
      });
    };

    next();
  }
};
