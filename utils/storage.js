var keystone = require('keystone');

exports.storage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: 'data/uploads',
        publicPath: '/public/uploads/',
	}
});