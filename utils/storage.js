var keystone = require('keystone');

exports.storage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.get('uploadsPath'),
        publicPath: '/public/uploads/',
	}
});