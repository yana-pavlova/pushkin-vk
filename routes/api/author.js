let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Author = keystone.list('Author');
let Post = keystone.list('Post');

exports.available = function(req, res) {
    Author.model.find()
        .populate('user')
        .exec((err, authors)  => {
            if (err) return res.apiError('database error', err);
            
            let available = []
            authors.forEach((a) => {
                if (!a.user) available.push(a);
            })
            
            res.apiResponse({
                availableAuthors: available,
            });
        })
}

exports.popular = function(req, res) {
    Post.model.find().populate('authors').exec((err, posts) => {
        if (err) return res.apiError('database error', err);

        postAuthorCount = {};

        posts.forEach((p) => {
            if (!postAuthorCount.hasOwnProperty(p.author._id)) postAuthorCount[p.author._id] = 0;
            postAuthorCount[p.author._id] ++;
        })

        let sortable = [];
        for (let id in postAuthorCount) {
            sortable.push([id, postAuthorCount[id]]);
        }

        sortable.sort((a, b) => a[1] - b[1]);

        let maxAuthors = 5;
        maxAuthors = (maxAuthors > authors.length) ? authors.length : maxAuthors;
        let popularAuthorsId = [];
        for (let i = 0; i < maxAuthors; i++) {
            popularAuthorsId.push(sortable[i][0])
        }

        Author.find().where('id').in(popularAuthorsId).exec((err, popularAuthors) => {
            res.apiResponse({
                popularAuthors: popularAuthors,
            });
        })

    })
}