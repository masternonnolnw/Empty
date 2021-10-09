const express = require("express");
const app = express();

const data = require("./data.json");

app.get("/", (req, res) => {
  res.send(data);
});

app.listen(3500, () => {
  console.log("Start server at port 3500.");
});
