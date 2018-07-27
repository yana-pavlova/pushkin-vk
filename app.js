// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

var rootPath = process.cwd();

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
let uploadsPath = (process.env.NODE_ENV == 'production') ? '/data/uploads/' : `${rootPath}/data/uploads/`
keystone.set('uploadsPath', uploadsPath);
console.log('-------', uploadsPath);

keystone.init({
    'name': 'pushkinvk.ru',
    'brand': 'pushkinvk.ru',

    'less': 'public',
    'static': [
        rootPath + '/public',
        uploadsPath,
        rootPath + '/node_modules',
    ],

    'views': 'templates/views',
    'view engine': 'pug',

    'emails': 'templates/emails',

    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',

    'cookie secret': Math.random().toString(36).substr(2),
    'signin redirect': function (user, req, res) {
        let url = (user.isAdmin) ? '/keystone' : '/wall';
        res.redirect(url);
    },
    
    'compress': true,

    'port': process.env.PORT || 3006,


});

let isSSL = process.env.SSL == 'TRUE';
if (isSSL) {
    params['ssl'] = true;
    params['ssl port'] = process.env.SSL_PORT || 3443;
    
    params['ssl key'] = '/data/cert/rusredbook.key';
    params['ssl cert'] = '/data/cert/rusredbook.crt';
    
    // params['ssl key'] = './data/cert/localhost.key';
    // params['ssl cert'] = './data/cert/localhost.crt';
}

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    posts: ['posts', 'post-comments'],
    // galleries: 'galleries', // TODO kill me or use me
    // enquiries: 'enquiries', // TODO kill me or use me
    users: 'users',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.log('----------------------------------------'
    + '\nWARNING: MISSING MAILGUN CREDENTIALS'
    + '\n----------------------------------------'
    + '\nYou have opted into email sending but have not provided'
    + '\nmailgun credentials. Attempts to send will fail.'
    + '\n\nCreate a mailgun account and add the credentials to the .env file to'
    + '\nset up your mailgun integration');
}

let startParams = '';
if (isSSL) startParams = {
    onHttpsServerCreated: function(){
        console.log('HTTPS!!!!');
    }
};

keystone.start(startParams);
