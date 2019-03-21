module.exports = {
  hostname: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}
