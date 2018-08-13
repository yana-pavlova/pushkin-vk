let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');

let User = keystone.list('User');
let Author = keystone.list('Author');

const nodemailer = require('nodemailer');
console.log(nodemailer);

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

        // EMAIL

        nodemailer.createTestAccount((err, account) => {

            let mailForUser = `<h2>Социальная сеть "Пушкин в VK" приветствует Вас, ${data.name_last}!</h2> <p>Поздравляем с успешной регистрацией на сайте pushkinvk.ru.</p><p>Ваш пароль: ${data.password}</p><p>Ваш логин: ${data.email} </p><p>Желаем приятного времяпрепровождения! </p>`;

            let emailUser = data.email;

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
                to: emailUser, // list of receivers
                subject: 'Вы зарегистрировались на сайте pushkinvk.ru', // Subject line
                html: mailForUser, // plain text body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });

        // EMAIL

        
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

exports.createReader = function(req, res) {    
    let data = (req.method == 'POST') ? req.body : req.query;
    console.log('create user', data);
    
    if (!data) return res.apiError('error', 'no data');
    if (!data.name_first) return res.apiError('error', 'name required');
    if (!data.name_last) return res.apiError('error', 'name required');
    if (!data.email) return res.apiError('error', 'username required');
    if (!data.password) return res.apiError('error', 'password required');
    if (!data.author) return res.apiError('error', 'author required');

    // EMAIL

    nodemailer.createTestAccount((err, account) => {

        let mailForUser = `<h2>Социальная сеть "Пушкин в VK" приветствует Вас, ${data.name_last}!</h2> <p>Поздравляем с успешной регистрацией на сайте pushkinvk.ru.</p><p>Ваш пароль: ${data.password}</p><p>Ваш логин: ${data.email} </p><p>Желаем приятного времяпрепровождения! </p>`;

        let emailUser = data.email;

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
            to: emailUser, // list of receivers
            subject: 'Вы зарегистрировались на сайте pushkinvk.ru', // Subject line
            html: mailForUser, // plain text body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    // EMAIL

    
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
