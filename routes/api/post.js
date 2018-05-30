let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Post = keystone.list('Post');
let PostComment = keystone.list('PostComment');
let User = keystone.list('User');

// List Posts
exports.list = function(req, res) {
    // requireAdmin(req, res, () => {

        Post.model.find()
            .where({state: 'published'})
            .populate({path: 'author', select: 'slug authorPhoto authorName'})
            .populate({path: 'comments'})
            .populate({path: 'likes'})
            .exec(function(err, items) {
                if (err) return res.apiError('database error', err);
                res.apiResponse({posts: items});
            });

    // })
}

// List Posts by User
exports.listByUser = function(req, res) {
        let data = req.params;
        if (!data) return res.apiError('error', 'no data');
        if (!data.user) return res.apiError('error', 'no data');
        let userId = data.user
        console.log('list by user', userId);
        
        User.model.find().where({'slug': userId}).exec(function(err, item) {
            if (err) return res.apiError('database error', err);
            
            let id = item[0]._id;
            
            Post.model.find()
                .where({
                    'author': id,
                    'state': 'published'
                })
                .populate({path: 'comments'})
                .populate({path: 'likes'})
                .populate({path: 'author', select: 'slug authorPhoto authorName'})
                .exec(function(err, items) {
                    if (err) return res.apiError('database error', err);
                    res.apiResponse({posts: items});
                });
        })

        
}


// Create a Post
exports.create = function(req, res) {
    requireUser(req, res, () => {
        let item = new Post.model();
        let data = (req.method == 'POST') ? req.body : req.query;
        if (!data) return res.apiError('error', 'no data');
        if (!data.content) return res.apiError('error', 'no data');
        data.state = 'published';
        data.author = req.user;
        data.publishedDate = new Date();

        item.getUpdateHandler(req).process(data, function(err) {
            if (err) return res.apiError('error', err);
            res.apiResponse({
                post: item
            });
            
        });
    })
}

// Update Post by ID
exports.update = function(req, res) {
    requireUser(req, res, () => {
        Post.model.findById(req.params.id).exec(function(err, item) {
            if (item.author.toString() != req.user.id) return res.apiError('user error');
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');
            
            var data = (req.method == 'POST') ? req.body : req.query;
            data.publishedDate = new Date();

            item.getUpdateHandler(req).process(data, 
                {   
                    fields: ['content', 'publishedDate'],
                    flashErrors: true,
                },
                function(err) {
                    if (err) return res.apiError('create error', err);
                    res.apiResponse({
                        post: item
                    });
            });
        });
    });
}

// Delete Post by ID
exports.remove = function(req, res) {
    requireUser(req, res, () => {
        Post.model.findById(req.params.id).exec(function (err, item) {
            if (item.author.toString() != req.user.id) return res.apiError('user error');
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');
            
            item.remove(function (err) {
                if (err) return res.apiError('database error', err);
                
                return res.apiResponse({
                    success: true
                });
            });
            
        });
    });
}

// Get Post by ID
exports.get = function(req, res) {
    console.log('get by id');
    
    requireAdmin(req, res, () => {
        Post.model.findById(req.params.id)
            .populate({path: 'author', select: 'slug authorPhoto authorName'})
            .populate({path: 'comments'})
            .populate({path: 'likes'})
            .exec(function(err, item) {
                if (err) return res.apiError('database error', err);
                if (!item) return res.apiError('not found');
                
                res.apiResponse({
                    post: item
                });
            });
    });
}