/*eslint-env es6*/

const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
require('dotenv').config();

let privateKey = fs.readFileSync('../key.pem').toString();
let certificate = fs.readFileSync('../cert.pem').toString();
let opts = {
  key: privateKey,
  cert: certificate,
};

const app = express();
const port = process.env.PORT || 3080;

mongoose.connect(process.env.DB, { useNewUrlParser: true})
  .then(() => console.log("Database connected successfuly"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

/*app.use('/', (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(`{"message": "this is json"}`);
});*/

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

let server = https.createServer(opts, app);
server.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});
