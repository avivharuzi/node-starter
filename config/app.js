module.exports = {
  publicPath: process.env.PATH_PUBLIC,
  env: process.env.NODE_ENV,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};
