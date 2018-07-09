let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let PostComment = keystone.list('PostComment');
let Author = keystone.list('Author');

// List
exports.list = function(req, res) {
    requireAdmin(req, res, () => {
        PostComment.model.find()
            .sort('-publishedDate')
            .exec((err, items) => {
                if (err) return res.apiError('database error', err);
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
        
        if (!data) return res.apiError('error', 'no data');
        if (!data.content || !data.post) return res.apiError('error', 'no data');
        if (!data.author) return res.apiError('error', 'no data');
        
        let item = new PostComment.model();
        
        Author.model.findById(data.author).exec((err, author) => {
            if (err) return res.apiError('database error', err);
            if (author.user.toString() !== req.user.id) return res.apiError('user error');
            
            data.publishedDate = new Date();

            item.getUpdateHandler(req)
                .process(data, function(err, result) {
                    if (err) return res.apiError('error', err);
                    
                    let id = item._id;

                    PostComment.model.findById(id)
                        .populate({path: 'author', select: 'slug authorPhoto authorName'})
                        .exec(function (err, newComment) {
                            let c = newComment;
                            c.author = author;

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
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');

            // check if this item belongs to author curated by user
            Author.model.findById(item.author).exec((err, author) => {
                if (err) return res.apiError('database error', err);
                if (author.user.toString() != req.user.id) return res.apiError('user error');
                
                var data = (req.method == 'POST') ? req.body : req.query;

                item.getUpdateHandler(req).process(data, 
                    {   fields: 'content',
                        flashErrors: true,
                    },
                    function(err) {
                        if (err) return res.apiError('create error', err);
                        let i = item;
                        i.author = author;

                        res.apiResponse({ comment: i });
                });

            })
        });
    });
}

// Delete by ID
exports.remove = function(req, res) {
    requireUser(req, res, () => {
        PostComment.model.findById(req.params.id).exec(function (err, item) {
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');

            // check if this post belongs to author curated by user
            Author.model.findById(item.author).exec((err, author) => {
                if (err) return res.apiError('database error', err);
                if (author.user.toString() != req.user.id) return res.apiError('user error');
                
                item.remove(function (err) {
                    if (err) return res.apiError('database error', err);
                    
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
                if (err) return res.apiError('database error', err);
                if (!item) return res.apiError('not found');
                
                res.apiResponse({
                    comment: item
                });
            });
    });
}