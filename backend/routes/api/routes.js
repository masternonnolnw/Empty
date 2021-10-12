// import other routes

const path = require("path");

const { json } = require("body-parser");
const userRoutes = require("./users");
const postRoutes = require("./posts");

dir = path.join("../..", "/data/users.json");
const json_data = require(dir);

//console.log(json_data)

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  app.post("/login", (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    var login_success = false;

    for (var key in json_data) {
      /* console.log(json_data[key].username) */
      if (
        json_data[key].username == username &&
        json_data[key].password == password
      ) {
        res.status(201).send(key);
        login_success = true;
        break;
      }
    }
 
    if (!login_success) res.status(401).send("Wrong username or passsword");
  });

  // // other routes
  userRoutes(app, fs);
  postRoutes(app, fs);
};

module.exports = appRouter;
