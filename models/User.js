const keystone = require('keystone');
const Types = keystone.Field.Types;
const { storage } = require('../utils/storage');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
    label: 'Авторы',
    map: { name: 'authorName' },
    autokey: { path: 'slug', from: 'slugLink', unique: true, label: 'slug' },
});

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    authorName: { type: Types.Name, required: true,  initial: true, index: true, label: 'Фамилия и Имя Автора', },
    authorPatronymic: { type: Types.Text, required: false, initial: true, label: 'Отчество Автора', },
    birthDay: { type: Types.Date, required: true, initial: true, label: 'Дата рождения Автора', },
    deathDay: { type: Types.Date, required: true, initial: true, label: 'Дата рождения Автора', },
    birthCountry: { type: Types.Text, required: true, initial: true, label: 'Страна рождения Автора', },
    birthCity: { type: Types.Text, required: true, initial: true, label: 'Город рождения Автора', }, 
    wikipediaLink: {type: Types.Url, required: true, initial: true, label: 'Ссылка на страницу в Wikipedia Автора', },
    honors: { type: Types.Text, required: false, initial: true, label: 'Награды Автора', },
    additionalLinks: { type: Types.Text, required: false, initial: true, label: 'Ссылки на дополнительную информацию об Авторе', },
    authorPhoto: { type: Types.File, storage: storage, required: true, initial: true, label: 'Фото Автора', },
    children: { type: Types.Text, required: false, initial: true, label: 'Дети Автора', },
    parents: { type: Types.Text, required: false, initial: true, label: 'Родители Автора', },

}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

User.schema.virtual('slugLink').get(function () {
    return this.authorName.full;
});

User.schema.methods.wasActive = function () {
    this.lastActiveOn = new Date();
    return this;
};

User.schema.set('toJSON', {
    // virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._;
        // delete ret._id;
        delete ret.email;
        delete ret.isAdmin;
        // delete ret.name;
        delete ret.password;
        return ret;
    }
    
})

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'PostComment', path: 'postcomments', refPath: 'author' });

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin, authorName, authorPatronymic';
User.register();
