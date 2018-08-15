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

    user: { type: Types.Relationship, ref: 'User', index: true, label: 'Пользователь поставивший лайк'},
    author: { type: Types.Relationship, ref: 'Author', index: true, label: 'Автор лайка' },
});

PostLike.schema.pre('save', (next) => {
    this.publishedDate = new Date();
    next();
})

PostLike.schema.pre('find', function() {
    this.populate({path: 'author', select: 'slug photo name'});
    this.populate({path: 'user', select: 'name'});
});

PostLike.defaultColumns = 'post|20%, author, user, publishedDate';
PostLike.register();
