module.exports = {
    upLikePost
    ,downLikePost
};

function removeItem(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            return;
        }
    }
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
        post.status = 0;
    }
    else if (isDisLiked) {
        // stop dislike and like
        post.dislike -= 1;
        post.like += 1;
        post.totallike += 2;
        removeItem(post.dislikelist, userid);
        post.likelist.push(userid);
        post.status = 1;
    }
    else {
        // just like
        post.like += 1; post.totallike += 1;
        post.likelist.push(userid);
        post.status = 1;
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
        post.status = 0;
    }
    else if (isLiked) {
        // change like to dislike
        post.like -= 1; post.dislike += 1;
        post.totallike -= 2;
        removeItem(post.likelist, userid); post.dislikelist.push(userid);
        post.status = -1;
    }
    else {
        // just dislike
        post.dislike += 1; post.totallike -= 1;
        post.dislikelist.push(userid);
        post.status = -1;
    }    
}