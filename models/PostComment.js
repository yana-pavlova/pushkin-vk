var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Comment Model
 * ==========
 */

var PostComment = new keystone.List('PostComment', {
    label: 'Комментарии',
    map: { name: 'content' },
    defaultSort: '-publishedDate',

});

PostComment.add({
    post: { type: Types.Relationship, ref: 'Post', index: true, label: 'Пост' },
    publishedDate: { type: Types.Date, default: new Date(), label: 'Дата создания' },
    content: { type: Types.Textarea, wysiwyg: true, height: 400, index: true, label: 'Текст' },
    
    user: { type: Types.Relationship, ref: 'User', index: true, label: 'Пользователь написавший комментарий'},
    author: { type: Types.Relationship, ref: 'Author', index: true, label: 'Автор написавший комментарий' },
});

PostComment.schema.pre('save', (next) => {
    this.publishedDate = 'new Date()'; // TODO auto update date
    next();
});

PostComment.schema.pre('find', function() {
    this.populate({path: 'author', select: 'slug photo name'});
    this.populate({path: 'user', select: 'name'});
});

// PostComment.track = true;
PostComment.defaultColumns = 'content|20%, post|20%, author, user, publishedDate';
PostComment.register();
