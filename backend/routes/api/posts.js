var path = require("path");

var moment = require('moment') //date&time
const { strictEqual } = require("assert");
const { stringify } = require("querystring");
var tools = require('./myfunction.js');

var lenoftime = {
  day : 1,
  week : 7,
  month : 30,
  year : 365,
  alltime : 10000000000
};

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
        res.status(432).send('errror from reading (function)');
        return;
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
        res.status(432).send('errror from writing (function)');
        return;
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
        var x_time = moment().diff(moment(x.date), 'seconds');
        var avgLike_x = parseInt(x.totallike) / x_time;

        var y_time = moment().diff(moment(y.date), 'seconds');
        var avgLike_y = parseInt(y.totallike) / y_time;

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
    var post_list = JSON.parse(post).data;


    //console.log(post_list_new);

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

    //res.send(post_list);
    return post_list;
  }
  //end of getpost function


  // READ
  app.get("/posts/:userid/:viewtype", (req, res) => {
    /* ต้องการ user_id และ viewtype (hot/top/new) โดยส่งมาเป็น params */
    
    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        res.status(412).send('error when reading');
        return;
      }
      // getpost
      var lastuserID = JSON.parse(post).lastId;
      var post_list = getpost(req, res, post);
      
      var post_list_new = [];

      if (req.params.viewtype == "top") {
  
        const timeframe = req.query.timeframe;
  
        for (var key in post_list) {
          var diff = moment().diff(moment(post_list[key].date), 'days');
          var timeLimit = lenoftime[timeframe];
          //console.log(timeLimit);
          const isOk = diff <= timeLimit;
          if (isOk) post_list_new.push(post_list[key]);
        }
      }
      else post_list_new = post_list;

      var post_real = {};
      post_real['lastId'] = lastuserID;
      post_real['data'] = post_list;

      fs.writeFile('./data/post.json', JSON.stringify(post_real, null, '\t'), (error) => {
        if (error) {
          res.status(456).send('error when writing');
          return;
        }
      });

      res.send(post_list_new);
    });
  });

  // like & dislike method
  app.put("/posts/:userid/:postid/:cur", (req,res) => {
    // past กับ cur คือสเตตัสของ user ว่า like(1) / dislike(-1) / none(0)
    // ลบ past ออกไปแล้ว
    // จะไปอัพเดทไฟล์ post.json

    fs.readFile(dataPath, "utf8", (err, post) => {
      if (err) {
        res.status(433).send('errror from reading');
        return;
      }
      // algorithm begin here
  
      const userid = req.params.userid;
      const postid = req.params.postid;
      const cur = req.params.cur;
      
      if (cur != "1" && cur != "-1" && cur != "0") {
        res.status(410).send("Wrong Liketype (cur)");
        return;
      }

      var postjson = JSON.parse(post);
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
          res.status(429).send('error when writing');
          return;
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
    // ใส่ title กับ body มา
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
        lastcommentid : 0,
        comment : [],
        ...req.body,
      });

      var temp = post.data[nextId - 1];
      for (var i = nextId - 1; i > 0; i--) {
        post.data[i] = post.data[i-1];
      }
      post.data[0] = temp;
      post.lastId = nextId;

      for (var key in post.data) {
        if (post.data[key].likelist.includes(userid)) post.data[key]['status'] = "1";
        else if(post.data[key].dislikelist.includes(userid)) post.data[key]['status'] = "-1";
        else post.data[key]['status'] = 0;
      }

      writeFile(JSON.stringify(post, null, '\t'), (error) => {
        if (error) {
          res.status(423).send('error when writing');
          return;
        }
        res.status(201).send(`Success`);
      });

      res.status(206).send(post.data);
    }, true);
  });
};

module.exports = postRoutes;
