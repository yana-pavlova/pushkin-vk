const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/frontend',

	entry: {
		index: './index',
		wall: './wall',
		post: './post',
		author: './author',
		register: './register',
		registerReader: './registerReader',
		settings: './settings',
		tests: './tests',
		singleTest: './singleTest',
		singleGuess: './singleGuess',
		authors: './authors',
		emodji: './emodji',
		login: './login',
		guess: './guess'
	},

	output: {
		path: __dirname + '/public/js/build',
		filename: "[name].js",
		library: "[name]"
	},

    watch: NODE_ENV == 'development',
    
    mode: NODE_ENV,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: (NODE_ENV == 'development') ? "cheap-inline-module-source-map" : false,

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify('ru')
		})
	],

	optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
            	commons: {
            		name: 'commons',
            		chunks: 'initial',
            		minChunks: 2
            	}
            }
        },
	},

	// resolve: {
	// 	modulesDirectories: ['node_modules'],
	// 	extensions: ['.js']
	// },

	// resolveLoader: {
	// 	modulesDirectories: ['node_modules'],
	// 	moduleTemplates: [
	// 		'*-loader', '*'
	// 	],
	// 	extensions: ['', '.js']
	// },

	module: {
		rules: [
            {
            	test: /\.js$/,
            	exclude: /(node_modules|bower_components)/,
            	use: {
					loader: 'babel-loader',
					// exclude: /node_modules/,
            		options: {
            			presets: ['@babel/preset-env']
					}
					
					// options: {
					// 	presets: [
					// 	  ['env', {
					// 		targets: {
					// 		  browsers: "> 3%" // можно и указать конкретные браузеры
					// 		}
					// 	  }]
					// 	]
					// }
            	}
            }
        ]
	}
};

// if (NODE_ENV == 'production') {
// 	module
// 		.exports
// 		.plugins
// 		.push(new webpack.optimize.UglifyJsPlugin({
// 			compress: {
// 				// don't show unreachable variables etc
// 				warnings: false,
// 				drop_console: true,
// 				unsafe: true
// 			}
// 		}));
// }