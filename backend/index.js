const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const { request } = require("http");
const { type } = require("os");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/api/routes.js")(app, fs);

const server = app.listen(PORT, () => {
  console.log("listening on port %s...", server.address().port);
});
