'use strict';

const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 3000;
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose
  .connect(config.MONGODB_URI, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  })
  .then(result => {
    console.log('Mongo Db Connected successfully.');
  })
  .catch(error => console.error(error));

app.listen(PORT, () => console.log('Web server listen in port:', PORT));
