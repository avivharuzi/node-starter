require('dotenv').config();

const app = require('./app');
const serverConfig = require('./config/server');

app.listen(serverConfig.port, serverConfig.hostname, () => {
  console.log(`Server running at http://${serverConfig.hostname}:${serverConfig.port}`);
});
