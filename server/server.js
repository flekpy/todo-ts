const app = require('./app');
require('dotenv').config();
const { connectToDB } = require('./db');

const PORT = process.env.PORT ?? 5555;

function connectServer() {
  app.listen(PORT, () => console.log(`Connected to Server PORT = ${PORT}`));
}

connectToDB()
  .then(connectServer)
  .catch(process.exit);
