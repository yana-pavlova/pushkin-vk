let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let PostComment = keystone.list('PostComment');

// List
exports.list = function(req, res) {
    requireAdmin(req, res, () => {
        PostComment.model.find(function(err, items) {
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
        data.author = req.user.id;
        data.publishedDate = new Date();
        
        let item = new PostComment.model();
        item.getUpdateHandler(req)
            .process(data, function(err, result) {
                if (err) return res.apiError('error', err);
                let id = item._id;
                PostComment.model.findById(id)
                    .populate({path: 'author', select: 'slug authorPhoto authorName'})
                    .exec(function (err, newComment) {
                        res.apiResponse({comment: newComment});
                    })
            });
    })
}



// Update by ID
exports.update = function(req, res) {
    requireUser(req, res, () => {
        PostComment.model.findById(req.params.id).exec(function(err, item) {
            if (item.author.toString() != req.user.id) return res.apiError('user error');
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');
            
            var data = (req.method == 'POST') ? req.body : req.query;
            console.log('--data--', data);
            console.log('req', req.body);
            console.log('req', req.query);
            
            item.getUpdateHandler(req).process(data, 
                {   fields: 'content',
                    flashErrors: true,
                },
                function(err) {
                    if (err) return res.apiError('create error', err);
                    res.apiResponse({
                        comment: item
                    });
            });
            
        });
    });
}

// Delete by ID
exports.remove = function(req, res) {
    requireUser(req, res, () => {
        PostComment.model.findById(req.params.id).exec(function (err, item) {
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