const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const app = express();
require('dotenv').config();
const  cors = require('cors')
const connectDB = require('./db/connect')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.use(cors())
app.use("/", route);
const port = process.env.PORT || 3000


  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(express.json());
  app.use(helmet());
  app.use(xss());
  app.set('trust proxy', 1);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
  );

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port || 3000, function () {
      console.log(`Express app running on port ${port}...`);
    });
  } catch (error) {
    console.log(error)
  }
}

start()
