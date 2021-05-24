const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const config = require('./config');

const router = express.Router();

const routes = require('./routes');

routes(router);

app.use(bodyParser());
app.use('/', router);


app.listen(config.server.port, function () {
  console.log('Crawler rodando!');
});