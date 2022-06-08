const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Omkarbaacha25:R12rr6VoiyHryNDD@cluster0.gnlxf.mongodb.net/omkar25",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
const port = process.env.PORT || 3000

app.listen(port || 3000, function () {
  console.log(`Express app running on port ${port}...`);
});
