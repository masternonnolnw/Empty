path = require("path");
dir = path.join("../..", "/data/post.json");
const json_data = require(dir);

const postRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/post.json";

  // helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get("/posts", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(post).data);
    });
  });

  // CREATE
  app.post("/posts", (req, res) => {
    readFile((post) => {
      const nextId = post.lastId + 1;
      post.data.push({
        id: nextId,
        ...req.body,
      });
      post.lastId = nextId;
      writeFile(JSON.stringify(post, null, 2), () => {
        res.status(201).send(`Success`);
      });
    }, true);
  });
};

module.exports = postRoutes;
