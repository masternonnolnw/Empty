const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/api/routes.js")(app, fs);

const server = app.listen(8000, () => {
  console.log("listening on port %s...", server.address().port);
});
