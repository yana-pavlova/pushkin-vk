var quizHeader = $('#quizHeader');
$('#quiz-container').hide();

var firstQuiz = {
    q: `<table border="0">
    <tr>
     <th class="ourQuestions">Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr><td>Я вас <img class="emojiIcon" src=images/emodji/broken_heart.png>. Любовь ещё (возможно,</td>
     <td><input></td></tr>
    <tr><td>Что просто <img class="emojiIcon" src=images/emodji/cry.png>) сверлит мои мозги,</td><td><input></td></tr>
    <tr><td>Всё разлетелось к <img class="emojiIcon" src=images/emodji/smiling_imp.png> , на куски.</td><td><input></td></tr>
    <tr><td>Я <img class="emojiIcon" src=images/emodji/gun.png> пробовал, но сложно</td><td><input></td></tr>
    <tr><td>С <img class="emojiIcon" src=images/emodji/gun.png> . И далее, виски:</td><td><input></td></tr>
    <tr><td>В который вдарить? Портила не дрожь, но</td><td></td></tr>
    <tr><td>Задумчивость. <img class="emojiIcon" src=images/emodji/smiling_imp.png>! все не по-людски!</td><td><input></td></tr>
    <tr><td>Я Вас <img class="emojiIcon" src=images/emodji/broken_heart.png> так сильно, безнадежно</td><td><input></td></tr>
    <tr><td>Как дай Вам <img class="emojiIcon" src=images/emodji/innocent.png> другими, но не даст!</td><td><input></td></tr>
    <tr><td><img class="emojiIcon" src=images/emodji/innocent.png> , будучи на многое горазд</td><td><input></td></tr>
    <tr><td>не сотворит - по Пармениду - дважды</td><td></td></tr>
    <tr><td>Сей <img class="emojiIcon" src=images/emodji/fire.png> в груди, ширококостный хруст</td><td><input></td></tr>
    <tr><td>Чтоб пломбы в <img class="emojiIcon" src=images/emodji/open_mouth.png> плавились от жажды</td><td><input></td></tr>
    <tr><td>коснуться - "бюст" зачеркиваю - <img class="emojiIcon" src=images/emodji/lips.png>.</td><td><input></td></tr>
    <tr><td><button class="btn-end"><a href="/emodji">Сбросить тест</a></button></td><td><button class="btn-show-results" onclick="showResults(event, firstQuiz, quiz1)"><a href="/emodji">Узнать результаты</a></button></td></tr>
   </table>`,
    a: `любил, боль, чёрту, застрелиться, оружием, чёрт, любил, бог, он, жар, пасти, уст`
    // a: `её, боль`
}

var secondQuiz = {
    q: `<table border="0">
    <tr>
     <th class="ourQuestions">Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr><td><img class= emojiIcon  src=images/emodji/snowflake.png> и солнце! день чудесный!</td>
     <td><input></td></tr>
    <tr><td>Еще ты <img class= emojiIcon  src=images/emodji/zzz.png>, друг прелестный</td><td><input></td></tr>
    <tr><td>Пора, <img class= emojiIcon  src=images/emodji/woman.png>, проснись</td><td><input></td></tr>
    <tr><td>Открой сомкнуты негой <img class= emojiIcon  src=images/emodji/eyes.png></td><td><input></td></tr>
    <tr><td>Навстречу северной Авроры</td><td></td></tr>
    <tr><td><img class= emojiIcon  src=images/emodji/star.png> севера явись!</td><td><input></td></tr>
    <tr><td>Вечор, ты помнишь,<img class= emojiIcon  src=images/emodji/snowflake.png> злилась,</td><td><input></td></tr>
    <tr><td>На мутном небе мгла носилась</td><td></td></tr>
    <tr><td><img class= emojiIcon  src=images/emodji/moon.png>, как бледное пятно</td><td><input></td></tr>
    <tr><td>Сквозь <img class= emojiIcon  src=images/emodji/cloud.png> мрачные желтела,</td><td><input></td></tr>
    <tr><td>И ты печальная сидела</td><td></td></tr>
    <tr><td>А нынче... погляди в окно</td><td></td></tr>
    <tr><td>Под голубыми небесами</td><td></td></tr>
    <tr><td>Великолепными коврами,</td><td></td></tr>
    <tr><td>Блестя на <img class= emojiIcon  src=images/emodji/sunrise.png>, снег лежит</td><td><input></td></tr>
    <tr><td>Прозрачный <img class= emojiIcon  src=images/emodji/deciduous_tree.png>  один чернеет</td><td><input></td></tr>
    <tr><td>И <img class= emojiIcon  src=images/emodji/christmas_tree.png>  сквозь иней  зеленеет</td><td><input></td></tr>
    <tr><td>И речка подо льдом блестит</td><td></td></tr>
    <tr><td>Вся комната янтарным блеском</td><td></td></tr>
    <tr><td>Озарена. Веселым треском</td><td></td></tr>
    <tr><td>Трещит затопленная <img class= emojiIcon  src=images/emodji/fire.png></td><td><input></td></tr>
    <tr><td>Приятно думать у <img class= emojiIcon  src=images/emodji/sleeping.png></td><td><input></td></tr>
    <tr><td>Но знаешь: не велеть ли в санки</td><td></td></tr>
    <tr><td><img class= emojiIcon  src=images/emodji/horse.png>  бурую запречь?</td><td><input></td></tr>
    <tr><td>Скользя по утреннему <img class= emojiIcon  src=images/emodji/snowflake.png></td><td><input></td></tr>
    <tr><td>Друг милый, предадимся  <img class= emojiIcon  src=images/emodji/running.png></td><td><input></td></tr>
    <tr><td>Нетерпеливого <img class= emojiIcon  src=images/emodji/horse_racing.png></td><td><input></td></tr>
    <tr><td>И навестим поля пустые</td><td></td></tr>
    <tr><td><img class= emojiIcon  src=images/emodji/deciduous_tree.png> , недавно столь густые</td><td><input></td></tr>
    <tr><td>И остров, милый для меня.</td><td></td></tr><tr><td><button class="btn-end"><a href="/emodji">Сбросить тест</a></button></td><td><button class="btn-show-results" onclick="showResults(event, secondQuiz, quiz2)"><a href="/emodji">Узнать результаты</a></button></td></tr>
    </table>`,
    a: `мороз, дремлешь, красавица, взоры, звездою, вьюга, луна, тучи, солнце, лес, ель, печь, лежанки, кобылку, снегу, бегу, коня, леса`
}

function showResults(event, quizNumber, quiz) {
    event.preventDefault();
    let userAnswers = [];
    let answer = "";
    let length = $('input').length;
    for(let i = 0; i < length; i++) {
        answer = $('input')[i].value;
        userAnswers.push(answer);
    }
    countAnswers(userAnswers, quizNumber, quiz);
}

function countAnswers(userAnswers, quizNumber, quiz) {
    userAnswers = userAnswers.join(', ');
    userAnswers = userAnswers.toLowerCase();
    //если равны вернёт ноль
    if(userAnswers.localeCompare(quizNumber.a) == 0) {
        renderSuccess(quiz)
    } else {
        renderFail(userAnswers, quizNumber, quiz)
    }
}

function renderSuccess(quiz) {
    let newContent = "<p>Потрясающе! Все ответы верны! Хотите сыграть ещё?</p><button class='btn-return-tests'><a href='/emodji'>Вернуться к тестам</a></button>";
    renderPage(newContent);
}

function renderFail(userAnswers, quizNumber, quiz) {
    // console.log("FAIl");
    userAnswers = userAnswers.replace(' ', '');
    userAnswers = userAnswers.split(',');
    let rigthAnswers = quizNumber.a.replace(' ', '');
    rigthAnswers = rigthAnswers.split(',');
    
    // console.log(userAnswers, rigthAnswers);
    let array = [];
    let rightUserAnswers = [];
    // console.log(rigthAnswers.length);
    
    for(let i = 0; i<userAnswers.length; i++) {
        // console.log("i'm in");
        if(rigthAnswers[i].localeCompare(userAnswers[i]) == 0) {
            // console.log(i, " верен");
            userAnswers[i] = '<td class="right">' + userAnswers[i] + '</td>';
            array.push(userAnswers[i]);
            rightUserAnswers.push(userAnswers[i])
        } else {
            // console.log(i, " неверен");
            userAnswers[i] = '<td class="wrong">' + userAnswers[i] + '</td>';
            array.push(userAnswers[i])
        }
    }
    let newContent = '<p>Правильных ответов:' + rightUserAnswers.length + '</p><table><tr><th>Верные ответы</th><th>Ваши ответы</th></tr>';
    for(let i = 0; i<rigthAnswers.length; i++) {
        newContent = newContent + '<tr><td class="initialAnswer">' + rigthAnswers[i] + '</td>';
        if(userAnswers[i]) {
            newContent = newContent + array[i] + '</tr>';
        }
    }
    newContent = newContent + '<tr><th></th><th><button class="btn-return-tests"><a href="/emodji">Вернуться к тестам</a></button></th></tr></table>'
    renderPage(newContent, quiz);
}

function renderPage(newContent, quiz) {
    // console.log(newContent);
    let table = $('table');
    table.hide();
    quiz.append(newContent);
}

var quiz1 = $("#quiz1");
quiz1.hide();
var quiz2 = $("#quiz2");
quiz2.hide();
var quiz3 = $("#quiz3");
quiz3.hide();
var quiz4 = $("#quiz4");
quiz4.hide();

function showQuiz(type, that) {
    $('#quiz-chooser').hide();
    $('#quiz-container').show();
    switch (type) {
        case 'quiz1':
            quizHeader.text('Угадай слово по эмодзи');
            // quiz1.show();
            quiz1.append(firstQuiz.q);
            quiz1.show();
            break;
        case 'quiz2':
            quizHeader.text('Угадай слово по эмодзи');
            // quiz2.show();
            quiz2.append(secondQuiz.q);
            quiz2.show();
            break;
        case 'quiz3':
            quizHeader.text('Угадай слово по эмодзи');
            quiz3.show();
            quiz3.show();
            break;
        case 'quiz4':
            quizHeader.text('Угадай сюжет по эмодзи');
            quiz4.show();
            quiz4.show();
            break;
    }
}