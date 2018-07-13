let keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    
    // Init locals
    locals.section = 'settings';

    // Render the view
    view.render('settings');
};
