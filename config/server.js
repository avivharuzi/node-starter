module.exports = {
  hostname: process.env.SERVER_HOSTNAME || '127.0.0.1',
  port: parseInt(process.env.SERVER_PORT) || 3000
};
