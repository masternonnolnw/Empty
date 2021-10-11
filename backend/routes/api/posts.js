path = require("path");


moment = require('moment') //date&time


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

  function sortPost(post_list, keywordtype) {
    if (keywordtype == "top") {
      console.log("Viewing by Top");
      post_list.sort((x,y) => parseInt(y.totallike) - parseInt(x.totallike));
    }
    else if (keywordtype == "new") {
      console.log("Viewing by New");
      post_list.sort((x,y) => (moment(y.date).diff(moment(x.date), 'seconds')));
    }
    else if (keywordtype == "hot") {
      console.log("Viewing by Hot");

      post_list.sort((x,y) => {
        x_time = moment().diff(moment(x.date), 'seconds');
        avgLike_x = parseInt(x.totallike) / x_time;

        y_time = moment().diff(moment(y.date), 'seconds');
        avgLike_y = parseInt(y.totallike) / y_time;

        return avgLike_y - avgLike_x;
      });
    }
    else {
      console.log("Wrong viewtype");
      return -1;
    }
  }

  // READ
  app.get("/posts/:userid/:viewtype", (req, res) => {
    /* ต้องการ user_id และ viewtype (hot/top/new) โดยส่งมาเป็น params */
    
    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        throw err;
      }
      // algorithm begin here
      const userid = req.params.userid;
      
      // 1. check if user_id is correct
      const userdata = require('../../data/users.json');
      const userExists = userdata.hasOwnProperty(userid);
      if (!userExists) {
        res.status(402).send("You don't have permission");
        return;
      }

      // create json file of posts
      post_list = JSON.parse(post).data;
      if (sortPost(post_list, req.params.viewtype) == -1) {
        res.status(401).send("Wrong viewtype");
        return;
      }

      // add status for each post (like/dislike/unlike by userid)
      for(key in post_list) {
        var thisStatus = 0
        const isLiked = post_list[key].likelist.includes(userid);
        const isDisliked = post_list[key].dislikelist.includes(userid);
        if (isLiked) {
          thisStatus = 1
        }
        if (isDisliked) {
          thisStatus = -1
        }
        post_list[key]["status"] = thisStatus;
      }

      // printing for checking
      /*for(key in post_list) {
        console.log(post_list[key]);
      } */

      // respond
      res.send(post_list);
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
