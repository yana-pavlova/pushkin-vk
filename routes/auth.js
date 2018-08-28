let keystone = require('keystone');

exports.signin = function (req, res) {
    let data = (req.method == 'POST') ? req.body : req.query;
    console.log(data);
  
    if (!data.username || !data.password) return res.json({ success: false });
    
    keystone.list('User').model.findOne({ email: data.username }).exec(function(err, user) {
      
      if (err || !user) {
        return res.json({
          success: false,
          session: false,
          message: (err && err.message ? err.message : false) || 'Похоже, что-то пошло не так. Попробуйте еще раз.'
        });
      }
      
      keystone.session.signin({ email: user.email, password: data.password }, req, res, function(user) {

        return res.json({
          success: true,
          session: true,
          date: new Date().getTime(),
          userId: user.id,
        })

      }, function(err) {
        return res.json({
          success: false,
          session: false,
          message: (err && err.message ? err.message : false) || 'Похоже, что-то пошло не так. Попробуйте еще раз.'
        });
      });
      
    });
}

exports.signout = function (req, res) {
  keystone.session.signout(req, res, function() {
      res.json({ 'signedout': true });
  });
}


exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Пожалуйста авторизуйтесь.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};


exports.requireAdmin = function (req, res, next) {
    if (req.user) {
        if (req.user.canAccessKeystone) next();
        else {
            req.flash('error', 'Эта глава еще не написана.');
            res.redirect('/');
        }
    }
    else {
        req.flash('error', 'Эта глава еще не написана.');
        res.redirect('/');
    }
};


const API_KEY = '123';
exports.API_KEY = API_KEY;

exports.checkAPIKey = function(req, res, next) {
    let data = (req.method == 'POST') ? req.body : req.query;
    console.log(data);
    
    if (data.apiKey === API_KEY) return next();
    return res.status(403).json({ 'error': 'no access' });
}