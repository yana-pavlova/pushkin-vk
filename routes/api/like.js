let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Post = keystone.list('Post');
let PostLike = keystone.list('PostLike');

const E = require('./ERRORS');

exports.likePost = function(req, res) {
    requireUser(req, res, () => {
        console.log('like by Author');
        
        let data = (req.method == 'POST') ? req.body : req.query;
        
        if (!data) return res.apiError(E.INNER_ERROR, 'no data');
        if (!data.postId) return res.apiError('Не указан пост.', 'no postId');
        if (!data.author) return res.apiError('не указан автор.', 'no author');

        Post.model.findById(data.postId)
            .populate({path: 'likes'})
            .exec(function(err, post) {
                if (err) return res.apiError(E.INNER_ERROR, err);
                if (!post) return res.apiError(E.NOT_FOUND);

                if (post.author == data.author) return res.apiError('Нельзя ставить лайк свей записи.');
                
                let likeIdToDelete;
                let likesCount = post.likes.length;
                
                for (let i = 0; i < likesCount; i++) {
                    let like = post.likes[i];
                    if (like.author) {
                        if (like.author.id == data.author) {
                            likeIdToDelete = like.id;
                            break;
                        }
                    }
                }
                
                if(likeIdToDelete == undefined) {
                    let like = new PostLike.model();
                    let likeData = {
                        author: data.author,
                        post: post,
                        publishedDate: new Date(),
                    }

                    like.getUpdateHandler(req).process(likeData, function(err) {
                        if (err) return res.apiError(E.INNER_ERROR, err);
                        likesCount++;

                        res.apiResponse({
                            likesCount: likesCount,
                        })

                    });
                    
                } else {
                    console.log('delete like');
                    PostLike.model.findById(likeIdToDelete).exec(function (err, item) {
                        if (err) return res.apiError(E.INNER_ERROR, err);
                        if (!item) return res.apiError(E.NOT_FOUND);
                        item.remove(function (err) {
                            if (err) return res.apiError(E.NOT_FOUND, err);
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

exports.likePostByReader = function(req, res) {
    requireUser(req, res, () => {
        console.log('like by User');
        
        let data = (req.method == 'POST') ? req.body : req.query;
        if (!data) return res.apiError(E.INNER_ERROR, 'no data');
        if (!data.postId) return res.apiError(E.INNER_ERROR, 'no postId');

        Post.model.findById(data.postId)
            .populate({path: 'likes'})
            .exec(function(err, post) {
                if (err) return res.apiError(E.INNER_ERROR, err);
                if (!post) return res.apiError(E.NOT_FOUND);
                
                let likeIdToDelete;
                let likesCount = post.likes.length;
                
                for (let i = 0; i < likesCount; i++) {
                    let like = post.likes[i];
                    if (like.user) {
                        if (like.user.id == req.user._id) {
                            likeIdToDelete = like.id;
                            break;
                        }
                    }
                }
                
                if(likeIdToDelete == undefined) {
                    let like = new PostLike.model();
                    let likeData = {
                        user: req.user,
                        post: post,
                        publishedDate: new Date(),
                    }

                    like.getUpdateHandler(req).process(likeData, function(err) {
                        if (err) return res.apiError(E.INNER_ERROR, err);
                        likesCount++;

                        res.apiResponse({
                            likesCount: likesCount,
                        })

                    });
                    
                } else {
                    console.log('delete like');
                    PostLike.model.findById(likeIdToDelete).exec(function (err, item) {
                        if (err) return res.apiError(E.INNER_ERROR, err);
                        if (!item) return res.apiError(E.NOT_FOUND);
                        item.remove(function (err) {
                            if (err) return res.apiError(E.INNER_ERROR, err);
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