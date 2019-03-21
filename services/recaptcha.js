const axios = require('axios');

const ErrorHandler = require.main.require('./utils/error-handler');
const recaptchaConfig = require.main.require('./config/recaptcha');

class MailchimpService {
  static async verify(recaptcha, remoteip) {
    try {
      const url = `${recaptchaConfig.url}?secret=${recaptchaConfig.secret}&response=${recaptcha}&remoteip=${remoteip}`;

      const response = await axios.post(url);

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new ErrorHandler(ErrorHandler.TYPE_GENERAL, 'There was a problem to verify the recaptcha');
    }
  }
}

module.exports = MailchimpService;
