var quizHeader = $('#quizHeader');
$('#quiz-container').hide();

// var random = Math.floor(Math.random() * 2) + 1;

var firstQuiz = {
    //maxQuestions: 10,
    questions: [
        {
            q:` Я вас <img class="emojiIcon" src=./emojis/broken_heart.png . <img class="emojiIcon" src=emojis/sparkling_heart.png> еще возможно `,
            a:`любил, любовь`,
            options:[`любил, любовь`, `желал, любовь`, `убил, и кровь`, `хотел, и кровь`]
        },
        {
            q:` что просто <img class="emojiIcon" src=./emojis/cry.png> ) сверлит мои мозги`,
            a:`боль`,
            options:[`боль`, `кровь`, `любовь`, `страсть`]
        },
        {
            q:` Всё разлетелось к <img class="emojiIcon" src=./emojis/smiling_imp.png> , на <img class="emojiIcon" src=./emojis/cake.png`,
            a: `чёрту`,
            options:[`чёрту, куски`, `богу, куски`, `радости, шишки`, `чёрту, слезинки`]
        },
        {
            q:` Я <img class="emojiIcon" src=./emojis/gun.png> пробовал, но сложно `,
            a: `застрелиться`,
            options:[`застрелиться`,`утопиться`,`удавиться`,`разлюбить вас`],
        },
        {
            q:` с <img class="emojiIcon" src=./emojis/gun.png> . И далее, виски`,
            a: `оружием`,
            options:[`оружием`,`удавкою`,`пистолетами`,`чувствами`]
        },
        {
            q:` в который вдарить? Портила не дрожь, но </br>
                задумчивость. <img class="emojiIcon" src=./emojis/smiling_imp.png> ! все не по-людски! `,
            a: `чёрт`,
            options:[`чёрт`,`боже`,`дьявол`,`зараза`]
        },
        {
            q:` Я Вас <img class="emojiIcon" src=./emojis/broken_heart.png> так сильно, безнадежно`,
            a: `любил`,
            options:[`любил`,`хотел`,`желал`,`душил`]
        },
        {
            q:` как дай Вам <img class="emojiIcon" src=./emojis/innocent.png> другими, но не даст!`,
            a:`бог`,
            options:[`бог`,`божечка`,`дьяволы`,`сволочи`]
        },
        {
            q:`  <img class="emojiIcon" src=./emojis/innocent.png> , будучи на многое горазд`,
            a:`он`,
            options:[`он`,`бог`,`чёрт`,`дьявол`]
        },
        {
            q:` не сотворит - по Пармениду - дважды  ,</br>
             сей <img class="emojiIcon" src=./emojis/fire.png> в груди, <img class="emojiIcon" src=./emojis/meat_on_bone.png> хруст`,
            a:`жар, ширококостный`,
            options:[`жар, ширококостный`,`страх, ширококостный`,`жар, невыносимый`,`страх, невыносимый`]
        },
        {
            q:` чтоб пломбы в <img class="emojiIcon" src=./emojis/open_mouth.png> плавились от жажды `,
            a:`пасти`,
            options:[`пасти`,`чреве`,`аде`,`страсти`]
        },
        {
            q:` коснуться - "бюст" зачеркиваю - <img class="emojiIcon" src=./emojis/lips.png> ! `,
            a:`уст`,
            options:[`уст`,`губ`,`рта`,`вас`]
        },
    ]
}

var secondQuiz = {
    questions: [
        {
            q:` <img class= emojiIcon  src=./emojis/snowflake.png> и <img class= emojiIcon  src=./emojis/sunrise.png>! день чудесный!`,
            a:`мороз, солнце`,
            options:[`мороз, солнце`, `зима, солнце`, `мороз, иней`, `вечор, солнце`]
        },
        {
            q:` Еще ты <img class= emojiIcon  src=./emojis/zzz.png>, друг прелестный`,
            a:`дремлешь`,
            options:[`дремлешь`, `любишь`, `стонешь`, `ищешь`]
        },
        {
            q:` Пора, <img class= emojiIcon  src=./emojis/woman.png>, проснись`,
            a: `красавица`,
            options:[`красавица`, `прелестница`, `старушечка`, `чудовище`]
        },
        {
            q:` Открой сомкнуты негой <img class= emojiIcon  src=./emojis/eyes.png></br>
            Навстречу северной Авроры `,
            a: `взоры`,
            options:[`взоры`,`очи`,`глазки`,`лица`],
        },
        {
            q:` <img class= emojiIcon  src=./emojis/star.png> севера явись! `,
            a: `звездою`,
            options:[`звездою`,`любовью`,`страною`,`и чувством`]
        },
        {
            q:` Вечор, ты помнишь,
           <img class= emojiIcon  src=./emojis/snowflake.png> злилась,</br>
           На мутном небе мгла носилась</br>
           <img class= emojiIcon  src=./emojis/moon.png>, как бледное пятно `,
            a: `вьюга, луна`,
            options:[`вьюга, луна`,`бабка, и ты`,`девка, луна`,`вьюга, и ты`]
        },
        {
            q:`Сквозь <img class= emojiIcon  src=./emojis/cloud.png> мрачные желтела,</br>
            И ты печальная сидела</br>
            А нынче... погляди в окно`,
            a:`тучи`,
            options:[`тучи`,`платья`,`слёзы`,`окна`]
        },
        {
            q:`Под голубыми небесами</br>
            Великолепными коврами,</br>
            Блестя на <img class= emojiIcon  src=./emojis/sunrise.png>, <img class= emojiIcon  src=./emojis/snowflake.png> лежит`,
            a:`солнце, снег`,
            options:[`солнце, снег`,`солнце, лёд`,`речке, снег`,`речке, лёд`]
        },
        {
            q:`Прозрачный <img class= emojiIcon  src=./emojis/deciduous_tree.png>  один чернеет`,
            a:`лес`,
            options:[`лес`,`дух`,`стан`,`лёд`]
        },
        {
            q:`И <img class= emojiIcon  src=./emojis/christmas_tree.png>  сквозь <img class= emojiIcon  src=./emojis/snowflake.png>  зеленеет</br>
            И речка подо льдом блестит`,
            a:`ель, иней`,
            options:[`ель, иней`,`ель, речку`,`стан, платье`,`глаз, иней`]
        },
        {
            q:`Вся комната янтарным блеском</br>
            Озарена. Веселым треском</br>
            Трещит затопленная <img class= emojiIcon  src=./emojis/fire.png>`,
            a:`печь`,
            options:[`печь`,`боль`,`кровля`,`речь`]
        },
        {
            q:`Приятно думать у <img class= emojiIcon  src=./emojis/sleeping.png></br>
            Но знаешь: не велеть ли в санки`,
            a:`лежанки`,
            options:[`лежанки`,`постельки`,`красотки`,`тахты`]
        },
        {
            q:`<img class= emojiIcon  src=./emojis/horse.png>  бурую запречь?</br>
            Скользя по утреннему <img class= emojiIcon  src=./emojis/snowflake.png>`,
            a:`кобылку`,
            options:[`кобылку`,`лошадку`,`девчонку`,`рабыню`]
        },
        {
            q:`Друг милый, предадимся  <img class= emojiIcon  src=./emojis/running.png> </br>
            Нетерпеливого <img class= emojiIcon  src=./emojis/horse_racing.png>`,
            a:`бегу, коня`,
            options:[`бегу, коня`,`бегу, ручья`,`чувству, коня`,`чувству, ручья`]
        },
        {
            q:`И навестим поля пустые</br>
           <img class= emojiIcon  src=./emojis/deciduous_tree.png> , недавно столь густые</br>
            И остров, милый для меня.`,
            a:`леса`,
            options:[`леса`,`глаза`,`стада`,`града`]
        }
        ]
}

var thirdQuiz = {
    questions: [
        {
            q:` Снова <img class =emojiIcon src=./emojis/tropical_drink.png> здесь, <img class =emojiIcon src=./emojis/facepunch.png> и <img class =emojiIcon src=./emojis/droplet.png>`,
            a:`пьют, дерутся, плачут`,
            options:[`пьют, дерутся, плачут`, `спят, дерутся, плачут`, `пьют, стенают, воют`, `пьют, кусают, лают`]
        },
        {
            q:` Под гармоники желтую <img class =emojiIcon src=./emojis/disappointed.png>.`,
            a:`грусть`,
            options:[`грусть`, `песнь`, `лиру`, `ткань`]
        },
        {
            q:` <img class =emojiIcon src=./emojis/angry.png> свои неудачи,</br>
            Вспоминают московскую Русь.`,
            a: `проклинают`,
            options:[`проклинают`, `ненавидят`, `вспоминают`, `обсуждают`]
        },
        {
            q:` И я сам, опустясь головою,</br>
            Заливаю <img class =emojiIcon src=./emojis/eyes.png> <img class =emojiIcon src=./emojis/wine_glass.png>,</br>
            Чтоб не видеть в лицо роковое,</br>
            Чтоб подумать хоть миг об ином.`,
            a: `глаза вином`,
            options:[`глаза вином`,`лицо вином`,`себя вином`,`её вином`],
        },
        {
            q:` Что-то всеми навек утрачено.</br>
            Май мой синий! Июнь голубой!</br>
            Не с того ль так <img class =emojiIcon src=./emojis/nose.png> мертвячиной</br>
            Над пропащею этой гульбой. `,
            a: `смердит`,
            options:[`смердит`,`несёт`,`воняет`,`прёт`]
        },
        {
            q:` Ах, сегодня так весело россам,</br>
            Самогонного <img class =emojiIcon src=./emojis/tropical_drink.png> — река. `,
            a: `спирта`,
            options:[`спирта`,`рома`,`моря`,`пойла`]
        },
        {
            q:`Гармонист с провалившимся <img class =emojiIcon src=./emojis/nose.png></br>
            Им про Волгу <img class =emojiIcon src=./emojis/microphone.png> и про Чека.`,
            a:`носом, поёт`,
            options:[`носом, поёт`, `носом, врёт`,`взглядом, всё льёт`,`взглядом, поёт`]
        },
        {
            q:`Что-то злое во <img class =emojiIcon src=./emojis/eyes.png> безумных,</br>
            Непокорное в громких <img class =emojiIcon src=./emojis/microphone.png>.</br>
            Жалко им тех дурашливых, юных,</br>
            Что сгубили свою жизнь сгоряча.`,
            a:`взорах, речах`,
            options:[`взорах, речах`,`взглядах, речах`,`взорах, стихах`,`взглядах, стихах`]
        },
        {
            q:`Жалко им, что октябрь суровый</br>
            Обманул их в своей пурге.</br>
            И уж удалью точится новой</br>
            Крепко спрятанный <img class =emojiIcon src=./emojis/fork_and_knife.png> в <img class =emojiIcon src=./emojis/boot.png>.`,
            a:`нож, сапоге`,
            options:[`нож, сапоге`,`нож, рукаве`,`шиш, рукаве`,`рубль, сапоге`]
        },
        {
            q:`Где ж вы те, что ушли далече?</br>
            Ярко ль светят вам наши <img class =emojiIcon src=./emojis/sunny.png>?`,
            a:`лучи`,
            options:[`лучи`,`сердца`,`глаза`,`стихи`]
        },
        {
            q:`<img class =emojiIcon src=./emojis/musical_note.png> <img class =emojiIcon src=./emojis/tropical_drink.png> сифилис <img class =emojiIcon src=./emojis/hospital.png>,</br>
            Что в киргизских степях получил.`,
            a:`гармонист, спиртом, лечит`,
            options:[`гармонист, спиртом, лечит`,`тракторист, спиртом, лечит`,`гармонист, водкой, лечит`,`тракторист, водкой, лечит`]
        },
        {
            q:`<img class =emojiIcon src=./emojis/negative_squared_cross_mark.png>! таких не подмять, не рассеять!</br>
            Бесшабашность им гнилью дана.</br>
            Ты, Рассея моя… Рас…сея…</br>
            Азиатская сторона!`,
            a:`нет`,
            options:[`нет`,`бл.`,`вот`,`ну`]
        }
    ]
}

var fourthQuiz = {
    questions: [
        {
            q:`<img class =emojiIcon src=./emojis/dancer.png> <img class =emojiIcon src=./emojis/boot.png><img class =emojiIcon src=./emojis/bird.png><img class =emojiIcon src=./emojis/wine_glass.png><img class =emojiIcon src=./emojis/ring.png><img class =emojiIcon src=./emojis/microphone.png><img class =emojiIcon src=./emojis/moon.png><img class =emojiIcon src=./emojis/droplet.png><img class =emojiIcon src=./emojis/woman.png><img class =emojiIcon src=./emojis/man.png></br><img class =emojiIcon src=./emojis/bride_with_veil.png><img class =emojiIcon src=./emojis/house_with_garden.png><img class =emojiIcon src=./emojis/horse.png><img class =emojiIcon src=./emojis/moon.png><img class =emojiIcon src=./emojis/snowflake.png><img class =emojiIcon src=./emojis/airplane.png><img class =emojiIcon src=./emojis/bride_with_veil.png><img class =emojiIcon src=./emojis/fearful.png><img class =emojiIcon src=./emojis/house.png><img class =emojiIcon src=./emojis/alien.png></br><img class =emojiIcon src=./emojis/fire.png><img class =emojiIcon src=./emojis/pray.png><img class =emojiIcon src=./emojis/bird.png><img class =emojiIcon src=./emojis/ghost.png><img class =emojiIcon src=./emojis/alarm_clock.png><img class =emojiIcon src=./emojis/astonished.png><img class =emojiIcon src=./emojis/bride_with_veil.png><img class =emojiIcon src=./emojis/horse.png><img class =emojiIcon src=./emojis/man.png><img class =emojiIcon src=./emojis/wedding.png>`,
            a:`"Светлана", В. Жуковский`,
            options:[`"Светлана", В. Жуковский`, `"Василий Тёркин", А. Твардовский`, `"Руслан и Людмила", А. Пушкин`, `"Капитанская дочка", А. Пушкин`]
        },
        {
            q: `<img class =emojiIcon src=./emojis/dancers.png>,<img class =emojiIcon src=./emojis/man.png>,<img class =emojiIcon src=./emojis/microphone.png>,<img class =emojiIcon src=./emojis/woman.png>,<img class =emojiIcon src=./emojis/facepunch.png>,<img class =emojiIcon src=./emojis/man.png>,<img class =emojiIcon src=./emojis/microphone.png>,<img class =emojiIcon src=./emojis/ghost.png>,<img class =emojiIcon src=./emojis/dancer.png>,<img class =emojiIcon src=./emojis/paperclip.png>,<img class =emojiIcon src=./emojis/alarm_clock.png>,<img class =emojiIcon src=./emojis/man.png>,<img class =emojiIcon src=./emojis/astonished.png>,<img class =emojiIcon src=./emojis/wedding.png>`,
            a: `"Майская ночь, или Утопленница", Н. Гоголь`,
            options:[`"Майская ночь, или Утопленница", Н. Гоголь`,`"Светлана", В. Жуковский`,`"Капитанская дочка", А. Пушкин`,`"Братья карамазовы", Ф. Достоевский`]
        },
        {
            q: `<img class =emojiIcon src=./emojis/dog2.png>,<img class =emojiIcon src=./emojis/older_man.png>,<img class =emojiIcon src=./emojis/house_with_garden.png>,<img class =emojiIcon src=./emojis/meat_on_bone.png>,<img class =emojiIcon src=./emojis/dog.png>,<img class =emojiIcon src=./emojis/hurtrealbad.png>,<img class =emojiIcon src=./emojis/doctor.png>,<img class =emojiIcon src=./emojis/operation.png>,<img class =emojiIcon src=./emojis/superthumb.jpg>,<img class =emojiIcon src=./emojis/gang.jpeg>,<img class =emojiIcon src=./emojis/hatecat.jpg>,<img class =emojiIcon src=./emojis/drunk.jpg>,<img class =emojiIcon src=./emojis/brokenblackheart.png>,<img class =emojiIcon src=./emojis/operation.png>,<img class =emojiIcon src=./emojis/patient.png>,<img class =emojiIcon src=./emojis/policeman.png>,<img class =emojiIcon src=./emojis/dog3.jpg>`,
            a: `"Собачье сердце", М. Булгаков`,
            options:[`"Собачье сердце", М. Булгаков`,`"Баня", Вл. Маяковский`,`"Капитанская дочка", А. Пушкин`,`"Бесы", Ф. Достоевский`]
        },
        {
            q: `<img class =emojiIcon src=./emojis/death.jpeg>,<img class =emojiIcon src=./emojis/woman.png>,<img class =emojiIcon src=./emojis/cryoflove.jpg>,<img class =emojiIcon src=./emojis/man.png>,<img class =emojiIcon src=./emojis/two_hearts.png>,<img class =emojiIcon src=./emojis/sayno.png>,<img class =emojiIcon src=./emojis/ok_hand.png>,<img class =emojiIcon src=./emojis/revolving_hearts.png>,<img class =emojiIcon src=./emojis/cryoflove.jpg>,<img class =emojiIcon src=./emojis/wedding.png>,<img class =emojiIcon src=./emojis/zombie2.jpg>,<img class =emojiIcon src=./emojis/suicid.png>,<img class =emojiIcon src=./emojis/blood.jpg>,<img class =emojiIcon src=./emojis/cryoflove.jpg>,<img class =emojiIcon src=./emojis/broken_heart.png>,<img class =emojiIcon src=./emojis/train.png>`,
            a: `"Сиерра-Морена", Н. Карамзин`,
            options:[`"Сиерра-Морена", Н. Карамзин`,`"Руслан и Людмила", А. Пушкин`,`"Капитанская дочка", А. Пушкин`,`"Евгений Онегин", А. Пушкин`]
        }
    ]
}

// var quizData; 
// switch (random) {
//     case 1:
//         quizData = firstQuiz;    
//         break;
//     case 2:
//         quizData = firstQuiz;    
//         break;
//     default:
//         break;
// }

// пропущенное слово
var quiz1 = $("#quiz1").dlxQuiz({
    quizData: firstQuiz
});
quiz1.hide();

var quiz2 = $("#quiz2").dlxQuiz({
    quizData: secondQuiz
});
quiz2.hide();

var quiz3 = $("#quiz3").dlxQuiz({
    quizData: thirdQuiz
});
quiz3.hide();

var quiz4 = $("#quiz4").dlxQuiz({
    quizData: fourthQuiz
});
quiz4.hide();

function showQuiz(type, that) {
    $('#quiz-chooser').hide();
    $('#quiz-container').show();
    switch (type) {
        case 'quiz1':
            quizHeader.text('Угадай слово по эмодзи');
            quiz1.show();
            break;
        case 'quiz2':
            quizHeader.text('Угадай слово по эмодзи');
            quiz2.show();
            break;
        case 'quiz3':
            quizHeader.text('Угадай слово по эмодзи');
            quiz3.show();
            break;
        case 'quiz4':
            quizHeader.text('Угадай сюжет по эмодзи');
            quiz4.show();
            break;
    }
}