const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connect');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('../swagger.yaml');

app.use(cors());
app.use('/', route);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hii');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port || 3000, function () {
      console.log(`Express app running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
