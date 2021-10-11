var path = require("path");
var fs = require("fs");

var json_dir = './post.json';
var jsondata = require(json_dir);

//console.log(jsondata);


jsonobj = fs.readFileSync(json_dir);
jsonobj2 = JSON.parse(jsonobj);
console.log(jsonobj2);


fs.writeFile(json_dir, JSON.stringify(jsonobj2, null, '\t'), (error) => {
    if (error) throw error;
  });