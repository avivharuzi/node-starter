module.exports = {
  host: process.env.EMAIL_HOSTNAME,
  port: parseInt(process.env.EMAIL_PORT),
  userName: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,
  templates: process.env.EMAIL_TEMPLATES,
  templatesExtension: process.env.EMAIL_TEMPLATES_EXTENSION
};
