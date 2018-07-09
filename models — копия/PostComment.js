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
    author: { type: Types.Relationship, ref: 'User', index: true, label: 'Автор комментария' },
    post: { type: Types.Relationship, ref: 'Post', index: true, label: 'Пост' },
    publishedDate: { type: Types.Date, default: new Date(), label: 'Дата создания' },
    content: { type: Types.Textarea, wysiwyg: true, height: 400, index: true, label: 'Текст' },
});

PostComment.schema.pre('save', (next) => {
    this.publishedDate = 'new Date()'; // TODO auto update date
    next();
})

// PostComment.schema.pre('save', function (next) {
//     // this.wasNew = this.isNew;
//     // if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
//     //     this.publishedOn = new Date();
//     // }
//     
//     next();
// });

// PostComment.schema.post('save', function () {
    
//     // if (!this.wasNew) return;
//     // if (this.author) {
//     //     keystone.list('User').model.findById(this.author).exec(function (err, user) {
//     //         if (typeof user !== "undefined" && user) {
//     //             user.wasActive().save();
//     //         }
//     //     });
//     // }
// });

PostComment.schema.pre('find', function() {
    this.populate({path: 'author', select: 'slug authorPhoto authorName'});
});

// PostComment.track = true;
PostComment.defaultColumns = 'content|20%, post|20%, author, publishedDate';
PostComment.register();
