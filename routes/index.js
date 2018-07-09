let keystone = require('keystone');
let middleware = require('./middleware');
let auth = require('./auth');
let importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
let routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api'),
};

keystone.set('404', function (req, res, next) {
    res.status(404).render('errors/404');
});

keystone.set('500', function (req, res, next) {
    res.status(500).render('errors/500');
});

// Setup Route Bindings
exports = module.exports = function (app) {
    // Views
    app.get('/', routes.views.index);
    app.get('/wall', routes.views.wall);

    app.get('/test', routes.views.test); // TODO kill me
    app.get('/test2', routes.views.test2); // TODO kill me
    
    // app.get('/wall/:category?', routes.views.blog); // TODO kill me
    // app.get('/wall/post/:post', routes.views.post); // TODO kill me
    app.get('/author/:author', routes.views.author);
    app.get('/login', routes.views.login);
    app.get('/register', routes.views.register);


    //auth
    app.get('/auth/signin', keystone.middleware.api, auth.signin);
    app.get('/auth/signout', keystone.middleware.api, auth.signout);


    // api
    // app.all('/api*', auth.checkAPIKey); // TODO use me

    // app.get('/whoami', keystone.middleware.api, routes.api.session); // TODO kill me

    // authors
    app.get('/api/authors/available', keystone.middleware.api, routes.api.author.available);
    
    // post
    app.get('/api/post/list', keystone.middleware.api, routes.api.post.list);
    app.get('/api/post/list/:author', keystone.middleware.api, routes.api.post.listByAuthor);
    app.all('/api/post/create', keystone.middleware.api, routes.api.post.create);
    app.get('/api/post/:id', keystone.middleware.api, routes.api.post.get);
    app.all('/api/post/:id/update', keystone.middleware.api, routes.api.post.update);
    app.get('/api/post/:id/remove', keystone.middleware.api, routes.api.post.remove);

    // file
    app.all('/api/file/uploadImage', keystone.middleware.api, routes.api.file.uploadImage);
    
    // likes
    app.get('/api/like/post', keystone.middleware.api, routes.api.like.likePost);
    
    // comment
    app.get('/api/comment/list', keystone.middleware.api, routes.api.comment.list);
    app.all('/api/comment/create', keystone.middleware.api, routes.api.comment.create);
    app.get('/api/comment/:id', keystone.middleware.api, routes.api.comment.get);
    app.all('/api/comment/:id/update', keystone.middleware.api, routes.api.comment.update);
    app.get('/api/comment/:id/remove', keystone.middleware.api, routes.api.comment.remove);
    
    // app.get('/gallery', routes.views.gallery); // TODO kill me
    // app.all('/contact', routes.views.contact); // TODO kill me or use me

    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
