exports.create = {
    User: [
        { 
            'name.first': 'Admin',
            'name.last': 'Kot',
            'email': 'admin@pushkin.vk',
            'password': 'admin', 
            'isAdmin': true,
            'authors': ['pushkin', 'dostoevsky'],
            __ref: 'admin',
        },
        { 
            'name.first': 'Jam',
            'name.last': 'Kot',
            'email': 'jam@pushkin.vk',
            'password': 'jam',
            'isAdmin': false,
            __ref: 'jam',
        },
    ],


    Author: [
        {  
            'name.first': 'Пушкин',
            'name.last': 'Александр',
            'patronymic': 'Сергеевич',
            'birthDay': new Date(),
            'deathDay': new Date(),
            'birthCountry': 'Россия',
            'birthCity': 'Йошкар-Ола',
            'wikipediaLink': 'http://google.com',
            'honors': 'Первая премия, Вторая премия',
            'additionalLinks': 'http://google.com, http://kloud.one',
            'photo': '????',
            'children': 'Вася, Маша',
            'parents': 'Сережа Наташа',
            'user': 'admin',
            __ref: 'pushkin',
        },
        {
            'name.first': 'Достоевский',
            'name.last': 'Федор',
            'patronymic': 'Михайлович',
            'birthDay': new Date(),
            'deathDay': new Date(),
            'birthCountry': 'Россия',
            'birthCity': 'Йошкар-Ола',
            'wikipediaLink': 'http://google.com',
            'honors': 'Первая премия, Вторая премия',
            'additionalLinks': 'http://google.com, http://kloud.one',
            'photo': {filename: 'jam.png'},
            'children': 'Вася, Маша',
            'parents': 'Вася Катя',
            'user': 'admin',
            // 'user': 'jam',
            __ref: 'dostoevsky',
        },

        // 
        {
            "name.first": "Авенариус",
            "name.last": "Вильгельм",
            "patronymic": "Петрович"
          },
          {
            "name.first": "Аверченко",
            "name.last": "Аркадий",
            "patronymic": "Тимофеевич"
          },
          {
            "name.first": "Агнивцев",
            "name.last": "Николай",
            "patronymic": "Яковлевич"
          },
          {
            "name.first": "Аксаков",
            "name.last": "Сергей",
            "patronymic": "Тимофеевич"
          },
          {
            "name.first": "Анненская",
            "name.last": "Александра",
            "patronymic": "Никитична"
          },
          {
            "name.first": "Анненский",
            "name.last": "Иннокентий",
            "patronymic": "Фёдорович"
          },
          {
            "name.first": "Андреев",
            "name.last": "Леонид",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Апухтин",
            "name.last": "Алексей",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Арсеньев",
            "name.last": "Владимир",
            "patronymic": "Клавдиевич"
          },
          {
            "name.first": "Арцыбашев",
            "name.last": "Михаил",
            "patronymic": "Петрович"
          },
          {
            "name.first": "Бальмонт",
            "name.last": "Константин",
            "patronymic": "Дмитриевич"
          },
          {
            "name.first": "Баратынский",
            "name.last": "Евгений",
            "patronymic": "Абрамович"
          },
          {
            "name.first": "Барков",
            "name.last": "Иван",
            "patronymic": "Семенович"
          },
          {
            "name.first": "Батюшков",
            "name.last": "Константин",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Белинский",
            "name.last": "Виссарион",
            "patronymic": "Григорьевич"
          },
          {
            "name.first": "Белый",
            "name.last": "Андрей",
            "patronymic": ""
          },
          {
            "name.first": "Беспощадный",
            "name.last": "Павел",
            "patronymic": "Григорьевич"
          },
          {
            "name.first": "Бестужев",
            "name.last": "Александр",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Билль-Белоцерковский",
            "name.last": "Владимир",
            "patronymic": "Наумович"
          },
          {
            "name.first": "Блок",
            "name.last": "Александр",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Богданович",
            "name.last": "Ипполит",
            "patronymic": "Фёдорович"
          },
          {
            "name.first": "Брюсов",
            "name.last": "Валерий",
            "patronymic": "Яковлевич"
          },
          {
            "name.first": "Булгаков",
            "name.last": "Михаил",
            "patronymic": "Афанасьевич"
          },
          {
            "name.first": "Булгарин",
            "name.last": "Фаддей",
            "patronymic": "Венедиктович"
          },
          {
            "name.first": "Бунин",
            "name.last": "Иван",
            "patronymic": "Алексеевич"
          },
          {
            "name.first": "Бурлюк",
            "name.last": "Давид",
            "patronymic": "Давидович"
          },
          {
            "name.first": "Веневитинов",
            "name.last": "Дмитрий",
            "patronymic": "Владимирович"
          },
          {
            "name.first": "Волошин",
            "name.last": "Максимилиан",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Вяземский",
            "name.last": "Петр",
            "patronymic": "Андреевич"
          },
          {
            "name.first": "Гарин-Михайловский",
            "name.last": "Николай",
            "patronymic": "Георгиевич"
          },
          {
            "name.first": "Гаршин",
            "name.last": "Всеволод",
            "patronymic": "Михайлович"
          },
          {
            "name.first": "Герцен",
            "name.last": "Александр",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Гиппиус",
            "name.last": "Зинаида",
            "patronymic": "Николаевна"
          },
          {
            "name.first": "Гнедич",
            "name.last": "Николай",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Гнедов",
            "name.last": "Василиск",
            "patronymic": ""
          },
          {
            "name.first": "Городецкий",
            "name.last": "Сергей",
            "patronymic": "Митрофанович"
          },
          {
            "name.first": "Гончаров",
            "name.last": "Иван",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Грибоедов",
            "name.last": "Александр",
            "patronymic": "Сергеевич"
          },
          {
            "name.first": "Григорович",
            "name.last": "Дмитрий",
            "patronymic": "Васильевич"
          },
          {
            "name.first": "Григорьев",
            "name.last": "Аполлон",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Грин",
            "name.last": "Александр",
            "patronymic": "Степанович"
          },
          {
            "name.first": "Гумилёв",
            "name.last": "Николай",
            "patronymic": "Степанович"
          },
          {
            "name.first": "Давыдов",
            "name.last": "Денис",
            "patronymic": "Васильевич"
          },
          {
            "name.first": "Державин",
            "name.last": "Гавриил",
            "patronymic": "Романович"
          },
          {
            "name.first": "Дмитриев",
            "name.last": "Иван",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Достоевский",
            "name.last": "Фёдор",
            "patronymic": "Михайлович"
          },
          {
            "name.first": "Зенкевич",
            "name.last": "Михаил",
            "patronymic": "Александрович"
          },
          {
            "name.first": "Зощенко",
            "name.last": "Михаил",
            "patronymic": "Михайлович"
          },
          {
            "name.first": "Клюев",
            "name.last": "Николай",
            "patronymic": "Алексеевич"
          },
          {
            "name.first": "Кольцов",
            "name.last": "Алексей",
            "patronymic": "Васильевич"
          },
          {
            "name.first": "Короленко",
            "name.last": "Владимир",
            "patronymic": "Галактионович"
          },
          {
            "name.first": "Кручёных",
            "name.last": "Алексей",
            "patronymic": "Елисеевич"
          },
          {
            "name.first": "Крылов",
            "name.last": "Иван",
            "patronymic": "Андреевич"
          },
          {
            "name.first": "Крюков",
            "name.last": "Фёдор",
            "patronymic": "Дмитриевич"
          },
          {
            "name.first": "Кузмин",
            "name.last": "Михаил",
            "patronymic": "Алексеевич"
          },
          {
            "name.first": "Куприн",
            "name.last": "Александр",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Романов",
            "name.last": "Константин",
            "patronymic": "Константинович"
          },
          {
            "name.first": "Лермонтов",
            "name.last": "Михаил",
            "patronymic": "Юрьевич"
          },
          {
            "name.first": "Леонов",
            "name.last": "Леонид",
            "patronymic": "Максимович"
          },
          {
            "name.first": "Лесков",
            "name.last": "Николай",
            "patronymic": "Семёнович"
          },
          {
            "name.first": "Ломоносов",
            "name.last": "Михаил",
            "patronymic": "Васильевич"
          },
          {
            "name.first": "Лохвицкая",
            "name.last": "Мирра",
            "patronymic": "Александровна"
          },
          {
            "name.first": "Мандельштам",
            "name.last": "Осип",
            "patronymic": "Эмильевич"
          },
          {
            "name.first": "Мариенгоф",
            "name.last": "Анатолий",
            "patronymic": "Борисович"
          },
          {
            "name.first": "Маяковский",
            "name.last": "Владимир",
            "patronymic": "Владимирович"
          },
          {
            "name.first": "Мережковский",
            "name.last": "Дмитрий",
            "patronymic": "Сергеевич"
          },
          {
            "name.first": "Меркурьева",
            "name.last": "Вера",
            "patronymic": "Александровна"
          },
          {
            "name.first": "Набоков",
            "name.last": "Владимир",
            "patronymic": "Владимирович"
          },
          {
            "name.first": "Некрасов",
            "name.last": "Николай",
            "patronymic": "Алексеевич"
          },
          {
            "name.first": "Новицкая",
            "name.last": "Вера",
            "patronymic": "Сергеева"
          },
          {
            "name.first": "Одоевский",
            "name.last": "Александр",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Одоевский",
            "name.last": "Владимир",
            "patronymic": "Фёдорович"
          },
          {
            "name.first": "Островский",
            "name.last": "Александр",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Парнок",
            "name.last": "София",
            "patronymic": "Яковлевна"
          },
          {
            "name.first": "Пастернак",
            "name.last": "Борис",
            "patronymic": "Леонидовоч"
          },
          {
            "name.first": "Платонов",
            "name.last": "Андрей",
            "patronymic": ""
          },
          {
            "name.first": "Помяловский",
            "name.last": "Николай",
            "patronymic": "Герасимович"
          },
          {
            "name.first": "Прутков",
            "name.last": "Козьма",
            "patronymic": "Петрович"
          },
          {
            "name.first": "Радищев",
            "name.last": "Александр",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Рылеев",
            "name.last": "Кондратий",
            "patronymic": "Фёдорович"
          },
          {
            "name.first": "Салтыков-Щедрин",
            "name.last": "Михаил",
            "patronymic ": "Евграфович"
          }, {
            "name.first": "Северянин",
            "name.last": "Игорь",
            "patronymic": ""
          },
          {
            "name.first": "Случевский",
            "name.last": "Константин",
            "patronymic": "Константинович"
          },
          {
            "name.first": "Сологуб",
            "name.last": "Фёдор",
            "patronymic": "Кузьмич"
          },
          {
            "name.first": "Станюкович",
            "name.last": "Константин",
            "patronymic": "Михайлович"
          },
          {
            "name.first": "Сумароков",
            "name.last": "Александр",
            "patronymic": "Петрович"
          },
          {
            "name.first": "Толстой",
            "name.last": "Алексей",
            "patronymic": "Константинович"
          },
          {
            "name.first": "Толстой",
            "name.last": "Лев",
            "patronymic": "Николаевич"
          },
          {
            "name.first": "Тредиаковский",
            "name.last": "Василий",
            "patronymic": "Кириллович"
          },
          {
            "name.first": "Тургенев",
            "name.last": "Иван",
            "patronymic": "Сергеевич"
          },
          {
            "name.first": "Тютчев",
            "name.last": "Фёдор",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Успенский",
            "name.last": "Глеб",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Фет",
            "name.last": "Афанасий",
            "patronymic": "Афанасьевич"
          },
          {
            "name.first": "Херасков",
            "name.last": "Михаил",
            "patronymic": "Матвеевич"
          },
          {
            "name.first": "Ходасевич",
            "name.last": "Владислав",
            "patronymic": "Фелицианович"
          },
          {
            "name.first": "Цветаева",
            "name.last": "Марина",
            "patronymic": "Ивановна"
          },
          {
            "name.first": "Чарская",
            "name.last": "Лидия",
            "patronymic": "Алексеевна"
          },
          {
            "name.first": "Чернышевский",
            "name.last": "Николай",
            "patronymic": "Гаврилович"
          },
          {
            "name.first": "Чуковский",
            "name.last": "Корней",
            "patronymic": "Иванович"
          },
          {
            "name.first": "Чёрный",
            "name.last": "Саша",
            "patronymic": ""
          },   
    ],


    Post: [
        {
            state: 'published',
            author: 'pushkin',
            publishedDate: new Date(),
            image: '',
            content: '1 lorem ipsum 2 lorem ipsum 3 lorem ipsum 4 lorem ipsum 5 lorem ipsum 6 lorem ipsum 7 lorem ipsum 8 lorem ipsum 9 lorem ipsum 10 lorem ipsum',
            __ref: 'post1',
            'likes': 0,
        },
        {
            state: 'published',
            author: 'pushkin',
            publishedDate: new Date(),
            image: '',
            content: 'белеет парус...',
            __ref: 'post2',
            'likes': 2,
        },
        {
            state: 'published',
            author: 'dostoevsky',
            publishedDate: new Date(),
            image: {filename: 'login.jpg'},
            content: 'мяу мяу мяу',
            __ref: 'post3',
            'likes': 3,
        },
        {
            state: 'published',
            author: 'dostoevsky',
            publishedDate: new Date(),
            image: '',
            content: '111',
            __ref: 'post3',
            'likes': 3,
        },
    ],


    PostComment: [
        {
            author: 'pushkin',
            post: 'post3',
            publishedDate: new Date(),
            content: 'отличный стиль!',
        },
        {
            author: 'dostoevsky',
            post: 'post1',
            publishedDate: new Date(),
            content: 'мяу',
        },
        {
            author: 'dostoevsky',
            post: 'post1',
            publishedDate: new Date(),
            content: 'мур',
        },
    ],


    PostLike: [
        {
            author: 'pushkin',
            post: 'post3',
            publishedDate: new Date(),
        },
    ],
};