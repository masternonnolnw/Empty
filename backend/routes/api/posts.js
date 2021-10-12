path = require("path");

moment = require('moment') //date&time
var tools = require('./myfunction.js');

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

  function getpost(req, res, post) {
    // รับ userid, viewtype มา แล้วลิสต์ post ทุกอันที่จะเห็นตามลำดับ return เป็น json array
    // ฟังก์ชั่นนี้ทำการเช็ค permission แล้ว (userid, viewtype) + sort แล้ว + add status แล้ว

    // algorithm begin here
    const userid = req.params.userid;
      
    // 1. check if user_id is correct
    const userdata = require('../../data/users.json');
    const userExists = userdata.hasOwnProperty(userid) && userid != "0";
/*    if (!userExists) {
      res.status(402).send("You don't have permission");
      return;
    } */

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
      if (!userExists) {
        thisStatus = 99;
      }
      post_list[key]["status"] = thisStatus;
    }
    // !just for testing
/*       var cnt = 0;
      for (key in post_list) {
        if(cnt == 0) post_list[key]["status"] = 1;
        else if(cnt == 2) post_list[key]["status"] = -1;
        else post_list[key]["status"] = 0;
        cnt++;
      } */
    //end

    // printing for checking
    /*for(key in post_list) {
      console.log(post_list[key]);
    } */

    // respond
    //res.send(post_list);
    return post_list;
  }
  //end of getpost function


  // READ
  app.get("/posts/:userid/:viewtype", (req, res) => {
    /* ต้องการ user_id และ viewtype (hot/top/new) โดยส่งมาเป็น params */
    
    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        throw err;
      }
      // getpost
      lastuserID = JSON.parse(post).lastId;
      post_list = getpost(req, res, post);
      
      var post_real = {};
      post_real['lastId'] = lastuserID;
      post_real['data'] = post_list;

      fs.writeFile('./data/post.json', JSON.stringify(post_real, null, '\t'), (error) => {
        if (error) {
          throw(error); return;
        }
      });

      res.send(post_list);
    });
  });

  // like & dislike method
  app.put("/posts/:userid/:postid/:cur", (req,res) => {
    // past กับ cur คือสเตตัสของ user ว่า like(1) / dislike(-1) / none(0)
    // ลบ past ออกไปแล้ว
    // จะไปอัพเดทไฟล์ post.json

    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        throw err; return;
      }
      // algorithm begin here
  
      const userid = req.params.userid;
      const postid = req.params.postid;
      const cur = req.params.cur;
      
      if (cur != "1" && cur != "-1" && cur != "0") {
        res.status(410).send("Wrong Liketype (cur)");
        return;
      }

      postjson = JSON.parse(post);
      //console.log(postjson);
      //console.log(typeof postjson);
      
      for(var key in postjson.data) {
        if (postjson.data[key].id == postid) {
          if (cur == "1") tools.justUpLike(postjson.data[key], userid);
          else if (cur == "-1") tools.justDownLike(postjson.data[key], userid);
          else tools.justNoLike(postjson.data[key], userid);
        }
      }

     // console.log(postjson);

      fs.writeFile('./data/post.json', JSON.stringify(postjson, null, '\t'), (error) => {
        if (error) {
          throw(error); return;
        }
      });

      //console.log(postjson);
      for (var key in postjson.data) {
        if (postjson.data[key].likelist.includes(userid)) postjson.data[key]['status'] = "1";
        else if(postjson.data[key].dislikelist.includes(userid)) postjson.data[key]['status'] = "-1";
        else postjson.data[key]['status'] = 0;
      }

      res.status(201).send(postjson.data);
      //res.status(201).send("Success");
    });
  })

  // CREATE
  app.post("/posts/:userid", (req, res) => {
    const userid = req.params.userid;
    const userPath = '../../data/users.json'
    var userData = require(userPath);
    if (!userData.hasOwnProperty(userid)) {
      res.status(405).send("Permission required");
      return;
    }
    readFile((post) => {
      const nextId = post.lastId + 1;
      post.data.push({
        id: nextId,
        like: 0,
        dislike: 0,
        totallike : 0,
        date : moment().format(),
        likelist : [],
        dislikelist : [],
        ...req.body,
      });

      var temp = post.data[nextId - 1];
      for (var i = nextId - 1; i > 0; i--) {
        post.data[i] = post.data[i-1];
      }
      post.data[0] = temp;

      post.lastId = nextId;
      writeFile(JSON.stringify(post, null, '\t'), () => {
        res.status(201).send(`Success`);
      });
    }, true);
  });
};

module.exports = postRoutes;
