const Joi = require('joi');

const ErrorHandler = require.main.require('./utils/error-handler');
const joiConfig = require.main.require('./config/joi');

class JoiService {
  static async validate(value, schema) {
    try {
      const result = Joi.validate(value, schema, joiConfig);

      if (result.error) {
        throw result.error;
      }
      return result.value;
    } catch (err) {
      throw new ErrorHandler(ErrorHandler.TYPE_VALIDATION, 'The values you entered are invalid', err);
    }
  }
}

module.exports = JoiService;
