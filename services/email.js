const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');

const emailConfig = require.main.require('./config/email');
const ErrorHandler = require.main.require('./utils/error-handler');

class EmailService {
  static async send(from, to, subject, html, text) {
    // port: 465 secure: true
    // port: 587 secure: false
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.userName,
        pass: emailConfig.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const options = {
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    try {
      return await transporter.sendMail(options);
    } catch (err) {
      throw new ErrorHandler(ErrorHandler.TYPE_GENERAL, 'There was a problem to send email');
    }
  }

  static async loadTemplate(name, context = {}) {
    const template = new EmailTemplate({
      views: {
        options: {
          extension: emailConfig.templatesExtension
        }
      }
    });

    return await template.renderAll(`./../${emailConfig.templates}/${name}`, context);
  }
}

module.exports = EmailService;
