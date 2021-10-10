const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const { request } = require("http");
const { type } = require("os");

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, x-Request-With, Content-Type,Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/api/routes.js")(app, fs);

const server = app.listen(PORT, () => {
  console.log("listening on port %s...", server.address().port);
});
