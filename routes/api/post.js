let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Post = keystone.list('Post');
let PostComment = keystone.list('PostComment');
let User = keystone.list('User');
let Author = keystone.list('Author');

const POST_PER_PAGE = 100;

// list all posts and get popular authors
exports.listAndGetPopAuthors = function(req, res) {
        Post.paginate({
                page: 1,
                perPage: POST_PER_PAGE,
                // maxPages: 10
            })
            // Post.model.find()
            .where({state: 'published'})
            .sort('-publishedDate')
            .populate({path: 'author', select: 'slug photo name'})
            .populate({path: 'comments', options: { sort: { publishedDate: -1 } } })
            .populate({path: 'likes'})
            .exec(function(err, posts) {
                if (err) return res.apiError('database error', err);
                
                postAuthorCount = {};
                posts.results.forEach((p) => {
                    if (!postAuthorCount.hasOwnProperty(p.author._id)) postAuthorCount[p.author._id] = 0;
                    postAuthorCount[p.author._id] ++;
                })
                
                let sortable = [];
                for (let id in postAuthorCount) {
                    sortable.push([id, postAuthorCount[id]]);
                }

                sortable.sort((a, b) => a[1] - b[1]);
                
                let maxAuthors = 5;
                maxAuthors = (maxAuthors > sortable.length) ? sortable.length : maxAuthors;
                
                let popularAuthorsId = [];
                for (let i = 0; i < maxAuthors; i++) {
                    popularAuthorsId.push(sortable[i][0])
                }
                
                Author.model.find().where('_id').in(popularAuthorsId).exec((err, popularAuthors) => {
                    res.apiResponse({
                        posts: posts,
                        popularAuthors: popularAuthors,
                    });
                })
            });
}

// List Posts
exports.list = function(req, res) {
    // requireAdmin(req, res, () => {

        Post.paginate({
                page: 1,
                perPage: POST_PER_PAGE,
                // maxPages: 10
            })
            // Post.model.find()
            .where({state: 'published'})
            .sort('-publishedDate')
            .populate({path: 'author', select: 'slug photo name'})
            .populate({path: 'comments', options: { sort: { publishedDate: -1 } } })
            .populate({path: 'likes'})
            .exec(function(err, results) {
                if (err) return res.apiError('database error', err);
                res.apiResponse({posts: results});
            });

    // })
}

// List Posts by Author
exports.listByAuthor = function(req, res) {
        let data = req.params;
        if (!data) return res.apiError('error', 'no data');
        if (!data.author) return res.apiError('error', 'no data');
        
        let authorSlug = data.author
        console.log('post list by author', authorSlug);
        
        Author.model.find().where({'slug': authorSlug}).exec(function(err, author) {
            if (err) return res.apiError('database error', err);
            
            let authorId = author[0]._id;
            
            Post.paginate({
                    page: 1,
                    perPage: POST_PER_PAGE,
                    // maxPages: 10
                })
                // Post.model.find()
                .where({
                    'author': authorId,
                    'state': 'published'
                })
                .sort('-publishedDate')
                .populate({path: 'comments', options: { sort: { publishedDate: -1 } }})
                .populate({path: 'likes'})
                .populate({path: 'author'})
                // .populate({path: 'author', select: 'slug authorPhoto authorName'})
                .exec(function(err, items) {
                    if (err) return res.apiError('database error', err);
                    res.apiResponse({
                        posts: items,
                        author: author[0],
                    });
                });
        })        
}


// Create a Post
exports.create = function(req, res) {    
    requireUser(req, res, () => {
        
        let data = (req.method == 'POST') ? req.body : req.query;
        if (!data) return res.apiError('error', 'no data');
        if (!data.content && !data.image) return res.apiError('error', 'no data');
        if (!data.author) return res.apiError('error', 'no data');
        
        let item = new Post.model();

        //check authors user
        Author.model.findById(data.author).exec((err, author) => {
            if (err) return res.apiError('database error', err);
            if (author.user.toString() !== req.user.id) return res.apiError('user error');

            data.state = 'published';
            data.publishedDate = new Date();
            data.image = (data.image) ? {filename: data.image} : null;

            item.getUpdateHandler(req).process(data, function(err) {
                if (err) return res.apiError('error', err);
                let i = item;
                i.author = author;

                res.apiResponse({
                    post: i,
                });
                
            });

        })
    })
}

// Update Post by ID
exports.update = function(req, res) {
    requireUser(req, res, () => {
        Post.model.findById(req.params.id).exec(function(err, item) {
            
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');
            
            // check if this post belongs to author curated by user
            Author.model.findById(item.author).exec((err, author) => {

                if (err) return res.apiError('database error', err);
                if (author.user.toString() !== req.user.id) return res.apiError('user error');

                let data = (req.method == 'POST') ? req.body : req.query;
                data.publishedDate = new Date();

                if (data.image) data.image = {filename: data.image}

                item.getUpdateHandler(data)
                    .process(data, 
                        {   
                            fields: ['content', 'image', 'publishedDate'],
                            flashErrors: true,
                        },
                        function(err) {
                            if (err) return res.apiError('create error', err);
                            res.apiResponse({
                                post: item
                            });
                        }
                    );
            })
        });
    });
}

// Delete Post by ID
exports.remove = function(req, res) {
    requireUser(req, res, () => {
        Post.model.findById(req.params.id).exec(function (err, item) {
            if (err) return res.apiError('database error', err);
            if (!item) return res.apiError('not found');

            // check authors user
            Author.model.findById(item.author).exec((err, author) => {

                if (err) return res.apiError('database error', err);
                if (author.user.toString() !== req.user.id) return res.apiError('user error');
                
                item.remove(function (err) {
                    if (err) return res.apiError('database error', err);
                    
                    return res.apiResponse({
                        success: true
                    });
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