var keystone = require('keystone');
var Types = keystone.Field.Types;
var express = require('express');
var a = require('eslint')

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
    label: 'Посты',
    map: { name: 'content' },
    defaultSort: '-publishedDate',
})

Post.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label: 'Статус' },
    author: { type: Types.Relationship, ref: 'User', index: true, label: 'Автор' },
    publishedDate: { type: Types.Date, default: new Date(), index: true, dependsOn: { state: 'published' }, label: 'Дата публикации' },
    // image: { type: Types.CloudinaryImage, label: 'Картинка???' },
    content: { type: Types.Textarea, wysiwyg: true, height: 400, label: 'Содержание' },
})

Post.schema.virtual('comments', {
    ref: 'PostComment',
    localField: '_id',
    foreignField: 'post',
})

Post.schema.virtual('likes', {
    ref: 'PostLike',
    localField: '_id',
    foreignField: 'post',
})

Post.schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._;
        delete ret.list;
        delete ret.authorRefList;
        delete ret.stateOptionsMap;
        delete ret.stateOptions;
        delete ret.stateLabel;
        delete ret.stateData;
        delete ret._id;
        return ret;
    }
    
})

// Relationships
Post.relationship({ ref: 'PostComment', refPath: 'post' });
Post.relationship({ ref: 'PostLike', refPath: 'post' });

Post.defaultColumns = 'content|20%, state, author, publishedDate';
Post.register();
