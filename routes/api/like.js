let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Post = keystone.list('Post');
let PostLike = keystone.list('PostLike');

exports.likePost = function(req, res) {
    requireUser(req, res, () => {
        Post.model.findById(req.params.id)
            .populate({path: 'likes'})
            .exec(function(err, post) {
                if (err) return res.apiError('database error', err);
                if (!post) return res.apiError('not found');
                if (post.author == req.user.id) return res.apiError('cant like your own post');
                
                let likeIdToDelete;
                let likesCount = post.likes.length;
                for (let i = 0; i < likesCount; i++) {
                    let like = post.likes[i];
                    if (like.author.id == req.user.id) {
                        likeIdToDelete = like.id;
                        break;
                    }
                }
                
                if(likeIdToDelete == undefined) {
                    let like = new PostLike.model();
                    let data = {
                        author: req.user,
                        post: post,
                        publishedDate: new Date(),
                    }
                    like.getUpdateHandler(req).process(data, function(err) {
                        if (err) return res.apiError('error', err);
                        likesCount++;
                        res.apiResponse({
                            likesCount: likesCount,
                        })
                    });
                    
                } else {
                    console.log('delete like');
                    PostLike.model.findById(likeIdToDelete).exec(function (err, item) {
                        if (err) return res.apiError('database error', err);
                        if (!item) return res.apiError('not found');
                        item.remove(function (err) {
                            if (err) return res.apiError('database error', err);
                            likesCount--;
                            
                            res.apiResponse({
                                likesCount: likesCount,
                            })
                        });
                    });
                }
            });
    });
}