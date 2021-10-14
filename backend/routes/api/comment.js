const path = require('path');
const moment = require('moment');
console.log(__dirname);
var tools = require('./myfunction');
const { writeFile } = require('fs');

const commentRoutes = (app, fs) => {
    const dataPath = '../../data/post.json';
    const userPath = '../../data/users.json';
    var postdata = require(dataPath);
    var userdata = require(userPath);

    // read comment
    app.get("/comments/:postid/:userid", (req, res) => {
        const postid = req.params.postid;
        const userid = req.params.userid;
        for (var key in postdata.data) {
            if (postdata.data[key].id == postid) {
                if (tools.isValidUser(userid, userdata)) postdata.data[key].status = tools.findPostStatus(postdata.data[key], userid);
                else {
                    console.log("non-login user");
                    postdata.data[key].status = 99;
                }

                res.status(213).send(postdata.data[key]);
                return;
            }
        }
        res.status(421).send('Wrong postid');
        return;
    });

    //add comment
    app.post("/comments/:postid/:userid", (req, res) => {
        const postid = req.params.postid;
        const userid = req.params.userid;

        const commentBody = req.body.body;
        const commentDate = moment();

        const validUser = tools.isValidUser(userid, userdata);
        if (!validUser) {
            res.status(408).send("permission required");
            return;
        }
        var foundPost = false;
        for (var key in postdata.data) {
            if (postdata.data[key].id == postid) {
                var lastid = postdata.data[key].lastcommentid;
                var commentBox = tools.createCommentBox(commentBody, commentDate, userid, lastid);
                postdata.data[key].comment.push(commentBox);
                foundPost = true; break;
            }
        }

        if (foundPost) {
            writeFile(JSON.stringify(postdata, null, '\t'), (error) => {
                if (error) {
                  res.status(423).send('error when writing');
                  return;
                }
                res.status(201).send(`Success`);
                return;
            });
        }

        res.status(412).send("wrong postid");
        return;
    });
};

module.exports = commentRoutes;