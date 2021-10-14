const path = require('path');
const moment = require('moment');
console.log(__dirname);
var tools = require('./myfunction');

const commentRoutes = (app, fs) => {
    const dataPath = '../../data/post.json';
    const userPath = '../../data/users.json';
    var postdata = require(dataPath);
    var userdata = require(userPath);

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
};

module.exports = commentRoutes;