let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let Author = keystone.list('Author');
let Post = keystone.list('Post');
const nodemailer = require('nodemailer');

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

exports.getAll = function(req, res) {
    Author.model.find()
        .exec((err, authors)  => {
            if (err) return res.apiError('database error', err);
            
            res.apiResponse({
                authors: authors,
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


exports.newAuthorRequest = function(req, res) {    
    let data = (req.method == 'POST') ? req.body : req.query;
    console.log('new author request', data);

    if (!data) return res.apiError('error', 'no data');
    if (!data.email) return res.apiError('error', 'email required');
    if (!data.newAuthor) return res.apiError('error', 'newAuthor required')

    // EMAIL

    nodemailer.createTestAccount((err, account) => {

        let mailForUser = `От кого: ${data.email} Какого автора предлагают: ${data.newAuthor}`;
        let emailAdmin = "yana.filfak@gmail.com"

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // port: 587,
            port: 465,
            // secure: false, // true for 465, false for other ports
            secure: true,
            auth: {
                user: "pushkinvk@gmail.com", // generated ethereal user
                pass: "slavyanka20" // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Пушкин в VK" <pushkinvk@gmail.com>', // sender address
            to: emailAdmin, // list of receivers
            subject: 'Кто-то хочет добавить нового автора на сайт pushkinvk.ru', // Subject line
            html: mailForUser, // plain text body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.apiError(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return res.apiResponse({
                success: true
            });
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

}
