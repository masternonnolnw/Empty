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
        const commentDate = moment().format();

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
                postdata.data[key].lastcommentid += 1;
                postdata.data[key].comment.push(commentBox);
                foundPost = true; break;
            }
        }
        //console.log(postdata);
        if (foundPost) {
            fs.writeFile('./data/post.json', JSON.stringify(postdata, null, '\t'), (err) => {
                if (err) {
                    res.status(442).send("error when writing");
                    return;
                }
            }); 
            res.status(215).send('comment success');
            return;
        }

        res.status(412).send("wrong postid");
        return;
    });

    //like&dislike comment
    app.put("/comments/:postid/:userid/:commentid/:cur", (req, res) => {
        // cur : {-1,0,1} = {dislike, none, like}
        const postid = req.params.postid;
        const userid = req.params.userid;
        const commentid = req.params.commentid;
        const cur = req.params.cur;

        const validUser = tools.isValidUser(userid, userdata);
        if (!validUser) {
            res.status(408).send("permission required");
            return;
        }
        var idx_post = 0, idx_comment = 0;
        for (var key in postdata.data) {
            if (postdata.data[key].id == postid) {
                idx_post = key;
                for (var i in postdata.data[key].comment) {
                    if (postdata.data[key].comment[i].id == commentid) {
                        if (cur == "1") tools.justUpLike(postdata.data[key].comment[i], userid);
                        else if (cur == "-1") tools.justDownLike(postdata.data[key].comment[i], userid);
                        else if (cur == "0") tools.justNoLike(postdata.data[key].comment[i], userid);
                        idx_comment = i;  
                        // get status
                        var isFirst = true;
                        if (isFirst) {
                            tools.getStatus(postdata.data[key], userid, userdata);
                            isFirst = false;
                        }
                        tools.getStatus(postdata.data[key].comment[i], userid, userdata);
                        break;
                    }
                }
                break;
            }
        }
        
        fs.writeFile('./data/post.json', JSON.stringify(postdata, null, '\t'), (err) => {
            if (err) {
                res.status(442).send("error when writing");
                return;
            }
        }); 

        res.status(214).send(postdata.data[idx_post]);
    });
};

module.exports = commentRoutes;