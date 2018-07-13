const keystone = require('keystone');
const Types = keystone.Field.Types;
const { storage } = require('../utils/storage');

var Author = new keystone.List('Author',{
    label: 'Авторы',
    map: { name: 'name' },
    autokey: { path: 'slug', from: 'slugLink', unique: true, label: 'slug' },
});

Author.add(
    {
        name: { type: Types.Name, required: true,  initial: true, index: true, label: 'Фамилия и Имя Автора', },
        patronymic: { type: Types.Text, required: false, initial: true, label: 'Отчество Автора', },
        birthDay: { type: Types.Date, required: false, initial: true, label: 'Дата рождения Автора', },
        deathDay: { type: Types.Date, required: false, initial: true, label: 'Дата рождения Автора', },
        birthCountry: { type: Types.Text, required: false, initial: true, label: 'Страна рождения Автора', },
        birthCity: { type: Types.Text, required: false, initial: true, label: 'Город рождения Автора', }, 
        wikipediaLink: {type: Types.Url, required: false, initial: true, label: 'Ссылка на страницу в Wikipedia Автора', },
        honors: { type: Types.Text, required: false, initial: true, label: 'Награды Автора', },
        additionalLinks: { type: Types.Text, required: false, initial: true, label: 'Ссылки на дополнительную информацию об Авторе', },
        photo: { type: Types.File, storage: storage, required: false, initial: true, label: 'Фото Автора', },
        children: { type: Types.Text, required: false, initial: true, label: 'Дети Автора', },
        parents: { type: Types.Text, required: false, initial: true, label: 'Родители Автора', },

        user: { type: Types.Relationship, ref: 'User', index: true, label: 'User' },
    }
);

Author.schema.virtual('slugLink').get(function () {
    let wholeName = `${this.name.full}-${this.patronymic}`;
    return wholeName;
});

Author.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
Author.relationship({ ref: 'PostComment', path: 'postcomments', refPath: 'author' });
Author.relationship({ ref: 'User', path: 'user', refPath: 'author' });


Author.defaultColumns = 'name, patronymic';
Author.register();
