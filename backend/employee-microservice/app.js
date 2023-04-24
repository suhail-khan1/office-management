const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
require('./config');
app.use('/api/employee', routes(router));

const port = 3001;

app.listen(port, () => {
  console.log(`Employee microservice listening on port ${port}`);
});
