const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
// load config
dotenv.config(getDotEnvConfigOptions());

const connectDB = require('./config/db');

const app = express();

// set public folder to server public
app.use(express.static(path.join(__dirname, 'public')));
// use bodyParser to parse req.body
const jsonParser = bodyParser.json();

// set routes
app.use('/', jsonParser, require('./routes/index'));

function getDotEnvConfigOptions() {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  let dotEnvConfigOptions = {};
  if (isEnvDevelopment) {
    dotEnvConfigOptions = {
      path: './config/config-local.env'
    };
  } else {
    dotEnvConfigOptions = {
      path: './config/config-prod.env'
    };
  }
  return dotEnvConfigOptions;
}
const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });
  connectDB();
} catch (error) {
  console.log(error);
}
