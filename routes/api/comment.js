let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let PostComment = keystone.list('PostComment');
let Author = keystone.list('Author');
let User = keystone.list('User');
const E = require('./ERRORS');

// List
exports.list = function(req, res) {
    requireAdmin(req, res, () => {
        PostComment.model.find()
            .sort('-publishedDate')
            .exec((err, items) => {
                if (err) return res.apiError(E.INNER_ERROR, err);
                res.apiResponse({
                    comments: items
                });
        });
    })
}

// Create 
exports.create = function(req, res) {
    requireUser(req, res, () => {
        let data = (req.method == 'POST') ? req.body : req.query;
        
        if (!data) return res.apiError(E.INNER_ERROR, 'no data');
        if (!data.content || !data.post) return res.apiError(E.INNER_ERROR, 'no data');
        if (!data.author) return res.apiError(E.INNER_ERROR, 'no data');
        
        let item = new PostComment.model();
        
        Author.model.findById(data.author).exec((err, author) => {
            if (err) return res.apiError(E.INNER_ERROR, err);
            if (author.user.toString() !== req.user.id) return res.apiError(E.USER_ERROR);
            
            data.publishedDate = new Date();
            data.user = req.user;

            item.getUpdateHandler(req)
                .process(data, function(err, result) {
                    if (err) return res.apiError('error', err);
                    
                    let id = item._id;

                    PostComment.model.findById(id)
                        .populate({path: 'author', select: 'slug authorPhoto authorName'})
                        .exec(function (err, newComment) {
                            let c = newComment;
                            c.author = author;
                            c.user = req.user;
                            res.apiResponse({comment: c});
                        })
                });

        })
        
    })
}

// Update by ID
exports.update = function(req, res) {
    requireUser(req, res, () => {
        PostComment.model.findById(req.params.id).exec(function(err, item) {
            if (err) return res.apiError(E.INNER_ERROR, err);
            if (!item) return res.apiError(E.INNER_ERROR);

            // check if this item belongs to author curated by user
            User.model.findById(item.user).exec((err, user) => {
                if (err) return res.apiError(E.INNER_ERROR, err);
                if (user._id != req.user.id) return res.apiError(E.USER_ERROR);
                
                var data = (req.method == 'POST') ? req.body : req.query;

                item.getUpdateHandler(req).process(data,
                    {   fields: 'content',
                        flashErrors: true,
                    },
                    function(err) {
                        if (err) return res.apiError(E.INNER_ERROR, err);
                        let i = item;
                        i.user = user;

                        res.apiResponse({ comment: i });
                });

            })
        });
    });
}

// create comment from reader
exports.createByReader = function (req, res) {
    requireUser(req, res, () => {
        let data = (req.method == 'POST') ? req.body : req.query;
        
        if (!data) return res.apiError(E.INNER_ERROR, 'no data');
        if (!data.content || !data.post) return res.apiError(E.INNER_ERROR, 'no data content');
        
        let item = new PostComment.model();
        
        User.model.findById(req.user.id).exec((err, user) => {
            if (err) return res.apiError(E.INNER_ERROR, err);
            
            data.publishedDate = new Date();
            data.user = req.user;

            item.getUpdateHandler(req)
                .process(data, function(err, result) {
                    if (err) return res.apiError(E.INNER_ERROR, err);
                    
                    let id = item._id;

                    PostComment.model.findById(id)
                        // .populate({path: 'user', select: 'name'})
                        .exec(function (err, newComment) {
                            let c = newComment;
                            c.user = req.user;

                            res.apiResponse({comment: c});
                        })
                });

        })
        
    })
}

// Delete by ID
exports.remove = function(req, res) {
    console.log(req.params);
    
    requireUser(req, res, () => {
        PostComment.model.findById(req.params.id).exec(function (err, item) {
            if (err) return res.apiError(E.INNER_ERROR, err);
            if (!item) return res.apiError(E.NOT_FOUND);

            // check if this post belongs to author curated by user
            User.model.findById(item.user).exec((err, user) => {
                if (err) return res.apiError(E.INNER_ERROR, err);
                if (user._id != req.user.id) return res.apiError(E.USER_ERROR);
                
                item.remove(function (err) {
                    if (err) return res.apiError(E.INNER_ERROR, err);
                    
                    return res.apiResponse({
                        success: true
                    });
                });

            })
            
        });
    });
}


// Get by ID
exports.get = function(req, res) {
    console.log('get by id', req.params);
    
    requireAdmin(req, res, () => {
        PostComment.model.findById(req.params.id)
            .populate({path: 'author', select: 'slug authorPhoto authorName'})
            .exec(function(err, item) {
                if (err) return res.apiError(E.INNER_ERROR, err);
                if (!item) return res.apiError(E.NOT_FOUND);
                
                res.apiResponse({
                    comment: item
                });
            });
    });
}