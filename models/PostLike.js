var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Likes Model
 * ==========
 */

var PostLike = new keystone.List('PostLike', {
    label: 'Лайки',
    // map: { name: 'count' },
    defaultSort: '-post',

});

PostLike.add({
    post: { type: Types.Relationship, ref: 'Post', index: true, label: 'Пост' },
    publishedDate: { type: Types.Date, default: new Date(), label: 'Дата создания' },

    author: { type: Types.Relationship, ref: 'Author', index: true, label: 'Автор комментария' },
});

PostLike.schema.pre('save', (next) => {
    this.publishedDate = new Date();
    next();
})

PostLike.schema.pre('find', function() {
    this.populate({path: 'author', select: 'slug photo name'});
});

PostLike.defaultColumns = 'post|20%, author, publishedDate';
PostLike.register();
