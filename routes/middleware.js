/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');

let { API_KEY } = require('./auth');

/**
    Initialises the standard view locals

    The included layout depends on the navLinks array to generate
    the navigation in the header, you may wish to change this array
    or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
    res.locals.navLinks = [
        { label: 'О проекте', key: 'home', href: '/' },
        { label: 'Стена', key: 'wall', href: '/wall' },
        { label: 'login', key: 'login', href: '/login' },
        // { label: 'Gallery', key: 'gallery', href: '/gallery' }, // TODO kill me 
        // { label: 'Contact', key: 'contact', href: '/contact' }, // TODO kill me or use me
    ];
    let user = req.user;
    
    res.locals.user = user;
    

    let data = {
        registered: false,
        apiKey: API_KEY,
        navLinks: res.locals.navLinks,
    }

    if (user) {
        data.user = {
            authorName: user.authorName,
            authorPatronymic: user.authorPatronymic,
            name: user.name,
            _id: user.id,
        }
        data.registered = true;
    }

    res.locals.data = JSON.stringify(data);
    
    next();
};


/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};
