module.exports = {
    upLikePost
    ,downLikePost
    ,pastAndCurLike
    ,justDownLike
    ,justNoLike
    ,justUpLike
    ,findPostStatus
    ,isValidUser
    ,createCommentBox
};

function removeItem(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            return;
        }
    }
}

function indexItem(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
    }
    return -1;
}

function upLikePost(post, userid) {
    console.log(typeof userid);
    const isLiked = post['likelist'].includes(userid);
    const isDisLiked = post.dislikelist.includes(userid);
    console.log(isLiked);
    if (isLiked) {
        // unlike
        post.like -= 1;
        post.totallike -= 1;
        removeItem(post.likelist, userid);
        //post.status = 0;
    }
    else if (isDisLiked) {
        // stop dislike and like
        post.dislike -= 1;
        post.like += 1;
        post.totallike += 2;
        removeItem(post.dislikelist, userid);
        post.likelist.push(userid);
        //post.status = 1;
    }
    else {
        // just like
        post.like += 1; post.totallike += 1;
        post.likelist.push(userid);
        //post.status = 1;
    }
}

function downLikePost(post, userid) {
    const isLiked = post.likelist.includes(userid);
    const isDisLiked = post.dislikelist.includes(userid);
    if (isDisLiked) {
        // undisliked
        post.dislike -= 1;
        post.totallike += 1;
        removeItem(post.dislikelist, userid);
        //post.status = 0;
    }
    else if (isLiked) {
        // change like to dislike
        post.like -= 1; post.dislike += 1;
        post.totallike -= 2;
        removeItem(post.likelist, userid); post.dislikelist.push(userid);
        //post.status = -1;
    }
    else {
        // just dislike
        post.dislike += 1; post.totallike -= 1;
        post.dislikelist.push(userid);
        //post.status = -1;
    }    
}

function pastAndCurLike(post, userid, past, cur, res) {

    //console.log(past);
    //console.log(typeof past);
    var idx = 0;
    if (past == "1") idx = indexItem(post.likelist, userid);
    else if (past == "-1") idx = indexItem(post.dislikelist, userid);
    else {
        if (indexItem(post.likelist, userid) != -1
            || indexItem(post.dislikelist, userid) != -1) {
            
            return -1;
        }
        console.log(idx);
    }

    if (idx == "-1") {
        //res.status(222).send("past status doesn't match post.json");
        return -1;
    }

    if (past == "1") {
        removeItem(post.likelist, userid);
        post.like--;
    }
    else if (past == "-1") {
        removeItem(post.dislikelist, userid);
        post.dislike--;
    }

    if (cur == "1") {
        post.likelist.push(userid);
        post.like++;
    }
    else if (cur == "-1") {
        post.dislikelist.push(userid);
        post.dislike++;
    }
    post.totallike = post.like - post.dislike;
    return 1;
}

function justUpLike(post, userid) {
    if (post.likelist.includes(userid)) return;
    if (post.dislikelist.includes(userid)) {
        removeItem(post.dislikelist, userid);
        post.dislike--;
    }

    post.likelist.push(userid); 
    post.like += 1;
    post.totallike = post.like - post.dislike;
}

function justDownLike(post, userid) {
    if (post.dislikelist.includes(userid)) return;
    if (post.likelist.includes(userid)) {
        removeItem(post.likelist, userid);
        post.like--;
    }
    post.dislikelist.push(userid);
    post.dislike += 1;
    post.totallike = post.like - post.dislike;
}

function justNoLike(post, userid) {
    if (post.likelist.includes(userid)) {
        removeItem(post.likelist, userid);
        post.like--;
    }
    if (post.dislikelist.includes(userid)) {
        removeItem(post.dislikelist, userid);
        post.dislike--;
    }
    post.totallike = post.like - post.dislike;
}

function findPostStatus(postdata, userid) {
    if (postdata.dislikelist.includes(userid)) return -1;
    if (postdata.likelist.includes(userid)) return 1;
    return 0;
}

function isValidUser(userid, userdata) {
    for (var key in userdata) {
        if (key == userid) return true;
    }
    return false;
}

function createCommentBox(commentBody, commentDate, userid, lastid) {
    var commentBox = {};
    commentBox['body'] = commentBody;
    commentBox['date'] = commentDate;
    commentBox['userid'] = userid;
    commentBox['id'] = lastid;
    lastid = lastid + 1;
    return commentBox;
}