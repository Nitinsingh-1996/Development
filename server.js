const express = require("express");
require("./db/conn");
const bodyParser = require("body-parser");
const router = require("./routers/user.router");
// const morgan = require("morgan");

const port = process.env.PORT || 4001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
// app.use(morgan('tiny'));

app.listen(port, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log(`Server is running at ${port}`);
  }
});
