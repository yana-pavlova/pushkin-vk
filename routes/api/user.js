let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let User = keystone.list('User');
let Author = keystone.list('Author');

// Create a User
exports.create = function(req, res) {    
        let data = (req.method == 'POST') ? req.body : req.query;
        console.log('create user', data);
        
        if (!data) return res.apiError('error', 'no data');
        if (!data.name_first) return res.apiError('error', 'name required');
        if (!data.name_last) return res.apiError('error', 'name required');
        if (!data.email) return res.apiError('error', 'username required');
        if (!data.password) return res.apiError('error', 'password required');
        if (!data.author) return res.apiError('error', 'author required');
        
        let newUser = new User.model();

        Author.model.findById(data.author).exec((err, author) => {
            if (err) return res.apiError('database error', err);
            if (!author) return res.apiError('error', 'no author');
            if (author.hasOwnProperty('user')) return res.apiError('error', 'author is already chosen by another user');
            
            let content = {
                authors: [author],
                name: {
                    first: data.name_first,
                    last: data.name_last,
                },
                password: data.password,
                email: data.email,
                currentAuthor: author,
            }

            newUser.getUpdateHandler(req).process(content, function(err) {
                if (err) return res.apiError('error', err);
                
                author.getUpdateHandler(req).process({user: newUser}, function(err){
                    if (err) return res.apiError('error', err);
                    
                    res.apiResponse('ok')
                })  
            });

        })
}

// change current author to work with
exports.changeCurrentAuthor = function(req, res) {
    requireUser(req, res, () => {

        let data = (req.method == 'POST') ? req.body : req.query;
        console.log('change current author', data);

        if (!data) return res.apiError('error', 'no data');
        if (!data.author) return res.apiError('error', 'author required');
        
        User.model.findById(req.user.id).exec((err, user) => {
            if (err) return res.apiError('database error', err);
            if (user.currentAuthor == data.author) return res.apiError('error', 'nothing to change, he is your current author');

            Author.model.findById(data.author).exec((err, author) => {
                if (err) return res.apiError('database error', err);
                
                user.currentAuthor = author;
                
                user.save();
                res.apiResponse('ok')

            })

        })
        
    })
}