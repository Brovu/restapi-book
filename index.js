const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const port = 8000;
const db = require("./config/db");
const authorRouter = require("./router/authorRouter");
const bookRouter = require("./router/bookRouter");
db.connect();
app.use(bodyParser.json({ limit: "50mb" }), cors(), morgan("common"));

//Routes
app.use("/t/author", authorRouter);
app.use("/t/book", bookRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
