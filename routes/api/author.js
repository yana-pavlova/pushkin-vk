let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Author = keystone.list('Author');

exports.available = function(req, res) {
    Author.model.find()
        .where({ available: true })
        .exec((err, authors)  => {
            if (err) return res.apiError('database error', err);
            
            res.apiResponse({
                availableAuthors: authors,
            });
        })
}