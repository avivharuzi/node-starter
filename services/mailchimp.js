const axios = require('axios');

const ErrorHandler = require.main.require('./utils/error-handler');
const mailchimpConfig = require.main.require('./config/mailchimp');

class MailchimpService {
  static async add(email) {
    try {
      const response = await axios.post(mailchimpConfig.membersUrl, {
        email_address: email,
        status: 'subscribed'
      }, {
        headers: {
          'Authorization': mailchimpConfig.auth
        }
      });

      if (response.data.status === 400 || response.data.status !== 'subscribed') {
        throw new Error();
      } else {
        return response.data;
      }
    } catch (err) {
      throw new ErrorHandler(ErrorHandler.TYPE_GENERAL, 'This email is already in the subscribers list');
    }
  }
}

module.exports = MailchimpService;
