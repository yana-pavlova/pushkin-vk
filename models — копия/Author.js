const keystone = require('keystone');
const Types = keystone.Field.Types;

var Author = new keystone.List('Author',{
    label: 'Все авторы',
    map: { name: 'authorName' },
});

Author.add(
    {
        available: {type: Types.Boolean, required: true, label: 'Доступен'},
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
    }
);

// Author.schema.pre('save', (next) => {
//     keystone.List('User').model.find().exec((err, users) => {
//         users.forEach((u) => {
//             if (this.authorName.first === u.authorName.first && this.authorName.last === u.authorName.last && this.authorPatronymic === u.authorPatronymic) {
//                 this.available = false;
//             }
//             else {
//                 this.available = true;
//             }
//         })
//     });
//     next();
// })

Author.schema.virtual('slugLink').get(function () {
    return this.authorName.full;
});


Author.defaultColumns = 'authorName, authorPatronymic';
Author.register();
