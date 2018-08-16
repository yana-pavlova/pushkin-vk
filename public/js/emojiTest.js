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

var thirdQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
         Снова <img class =emojiIcon src=images/emodji/tropical_drink.png> здесь, дерутся и плачут
     </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>Под гармоники желтую <img class =emojiIcon src=images/emodji/disappointed.png>.</td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td><img class =emojiIcon src=images/emodji/angry.png> свои неудачи,</td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>Вспоминают московскую Русь.</td>
        <td>
        </td>
     </tr>
     <tr>
        <td>И я сам, опустясь головою,</td>
        <td>
        </td>
     </tr>
     <tr>
             <td>Заливаю <img class =emojiIcon src=images/emodji/eyes.png> вином,</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Чтоб не видеть в лицо роковое,</td>
             <td>
             </td>
          </tr>
     <tr>
        <td>Чтоб подумать хоть миг об ином.</td>
        <td>
        </td>
     </tr>
     <tr>
        <td>Что-то всеми навек утрачено.</td>
        <td>
        </td>
     </tr>
     <tr>
         <td>Май мой синий! Июнь голубой!</td>
         <td>
         </td>
      </tr>
      <tr>
             <td>Не с того ль так <img class =emojiIcon src=images/emodji/nose.png> мертвячиной</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Над пропащею этой гульбой.</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Ах, сегодня так весело россам,</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Самогонного <img class =emojiIcon src=images/emodji/tropical_drink.png> — река.</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Гармонист с провалившимся <img class =emojiIcon src=images/emodji/nose.png></td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Им про Волгу <img class =emojiIcon src=images/emodji/microphone.png> и про Чека.</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Что-то злое во <img class =emojiIcon src=images/emodji/eyes.png> безумных</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Непокорное в громких <img class =emojiIcon src=images/emodji/microphone.png>.</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Жалко им тех дурашливых, юных,</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Что сгубили свою жизнь сгоряча.</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Жалко им, что октябрь суровый</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Обманул их в своей пурге.</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>И уж удалью точится новой</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Крепко спрятанный нож в <img class =emojiIcon src=images/emodji/boot.png></td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Где ж вы те, что ушли далече?</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Ярко ль светят вам наши <img class =emojiIcon src=images/emodji/sunny.png>?</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Гармонист спиртом сифилис <img class =emojiIcon src=images/emodji/hospital.png>,</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Что в киргизских степях получил.</td>
             <td>
             </td>
          </tr>
          <tr>
             <td><img class =emojiIcon src=images/emodji/negative_squared_cross_mark.png>! таких не подмять, не рассеять!</td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Бесшабашность им гнилью дана.</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Ты, Рассея моя… Рас…сея…</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Азиатская сторона!</td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, thirdQuiz, quiz3)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `пьют, грусть, проклинают, глаза, смердит, спирта, носом, поёт, взорах, речах, сапоге, лучи, лечит, нет`
}

var forthQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Вместо <img class=emojiIcon src=images/emodji/love_letter.png><br>
     </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td><img class=emojiIcon src=images/emodji/smoke.png> табачный воздух выел.</td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>Комната —<br>
             глава в кручёныховском аде.</td>
        <td>
         </td>
     </tr>
     <tr>
        <td>Вспомни —<br>
             за этим окном<br>
             впервые</td>
        <td>
        </td>
     </tr>
     <tr>
        <td><img class=emojiIcon src=images/emodji/open_hands.png> твои, исступленный, гладил.</td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
             <td>Сегодня сидишь вот,
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td><img class=emojiIcon src=images/emodji/blue_heart.png> в железе.
             </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>День еще —<br>
             выгонишь,<br>
             может быть, изругав.<br>
             В мутной передней долго не влезет</td>
        <td>
        </td>
     </tr>
     <tr>
        <td>сломанная дрожью <img class=emojiIcon src=images/emodji/hand.png> в рукав.
        </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
         <td><img class=emojiIcon src=images/emodji/runner.png>,
         </td>
         <td>
             <input>
         </td>
      </tr>
      <tr>
             <td>тело в улицу брошу я.
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td><img class=emojiIcon src=images/emodji/deciduous_tree.png>,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>обезумлюсь,<br>
                     отчаяньем иссечась.<br>
                     Не надо этого,<br>
                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td><img class=emojiIcon src=images/emodji/girl.png>,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>хорошая,
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>дай <img class=emojiIcon src=images/emodji/raised_hand.png> сейчас.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Все равно
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td><img class=emojiIcon src=images/emodji/heart.png> моя —
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>тяжкая гиря ведь —<br>
                     висит на тебе,<br>
                     куда ни бежала б.<br>
                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Дай в последнем крике <img class=emojiIcon src=images/emodji/crycauseoflove.png>
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>горечь обиженных жалоб.
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Если <img class=emojiIcon src=images/emodji/cow.png> трудом умо́рят —
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>он уйдет,
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>разляжется в холодных <img class=emojiIcon src=images/emodji/sea.png>.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Кроме <img class=emojiIcon src=images/emodji/heart.png> твоей,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>мне
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>нету <img class=emojiIcon src=images/emodji/sea.png>,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>а у <img class=emojiIcon src=images/emodji/heart.png> твоей и плачем не вымолишь отдых.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Захочет покоя уставший <img class=emojiIcon src=images/emodji/elephant.png> —
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>царственный ляжет в опожаренном <img class=emojiIcon src=images/emodji/beach.png>.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Кроме <img class=emojiIcon src=images/emodji/heart.png> твоей,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>мне
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>нету <img class=emojiIcon src=images/emodji/high_brightness.png>,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>а я и не знаю, где ты и с кем.<br>
                     Если б так поэта измучила,<br>
                     он<br>
                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>любимую на <img class=emojiIcon src=images/emodji/euro.png> б и славу выменял,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>а мне<br>
                     ни один не радостен звон,<br>
                     кроме звона твоего любимого<br> имени.<br>
                     И в пролёт не брошусь,<br>
                     и не выпью яда,<br>
                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>и <img class=emojiIcon src=images/emodji/gun.png> не смогу над виском нажать.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Надо мною,
 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>кроме твоего <img class=emojiIcon src=images/emodji/eyes.png>,
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>не властно лезвие ни одного <img class=emojiIcon src=images/emodji/knife.png>.
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Завтра забудешь,
 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>что тебя <img class=emojiIcon src=images/emodji/crown.png>,
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>что душу <img class=emojiIcon src=images/emodji/bouquet.png> любовью выжег,
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>и суетных дней взметенный <img class=emojiIcon src=images/emodji/dancer.png>
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>растреплет страницы моих <img class=emojiIcon src=images/emodji/book.png>…
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Слов моих сухие <img class=emojiIcon src=images/emodji/fallen_leaf.png> ли
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>заставят остановиться,<br>
                     жадно дыша?<br>
                     Дай хоть<br>
                     последней нежностью выстелить<br>
                     
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>твой уходящий <img class=emojiIcon src=images/emodji/boot.png>.
 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, forthQuiz, quiz4)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
 a: `письма, дым, руки, сердце, рука, выбегу, дикий, дорогая, простимся, любовь, выреветь, быка, водах, любви, моря, любви, слон, песке, любви, солнца, деньги, курок, взгляда, ножа, короновал, цветущую, карнавал, книжек, листья, шаг`
}

var fifthQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             ...В Нечерноземье, – согласно <img class=emojiIcon src=images/emodji/cyclone.png>, 
     </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>     – </td>
        <td>
         </td>
    </tr>
    <tr>
        <td>резко уменьшится <img class=emojiIcon src=images/emodji/snowflake.png> покров... </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>Днём над столицей 
         </td>
        <td>
        </td>
     </tr>
     <tr>
        <td>              местами – <img class=emojiIcon src=images/emodji/thunderstorm.png>. 
        </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
             <td>А на асфальте 
 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>местами – 
 
             </td>
             <td>
             </td>
          </tr>
     <tr>
        <td><img class=emojiIcon src=images/emodji/blood.jpg>.
        </td>
        <td>
            <input>
        </td>
     </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, fifthQuiz, quiz5)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `циклону, снежный, грозы, кровь`
}

var sexthQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             <img class=emojiIcon src=images/emodji/heart.png> - но мука еще жива. 
     </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>Найди <img class=emojiIcon src=images/emodji/sleeping.png> слова:
        </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td><img class=emojiIcon src=images/emodji/sweat_drops.png> , - расточившие все
        </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>Сам выдумай, чтобы в их <img class=emojiIcon src=images/emodji/leaves.png>
  
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td><img class=emojiIcon src=images/emodji/umbrella-with-rain.png> слышался: то не цеп о сноп:
 
        </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
             <td><img class=emojiIcon src=images/emodji/umbrella-with-rain.png> в крышу бьет: чтобы мне на лоб,
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>На <img class=emojiIcon src=images/emodji/coffin.png> стекал, чтобы лоб - светал,
             </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>Озноб - стихал, чтобы кто-то <img class=emojiIcon src=images/emodji/sleeping.png>
        </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>И спал...<br>
             Сквозь скважины, говорят,
      </td>
        <td>
        </td>
     </tr>
     <tr>
         <td><img class=emojiIcon src=images/emodji/droplet.png> просачивается. В ряд
         </td>
         <td>
             <input>
         </td>
      </tr>
      <tr>
             <td>Лежат, не жалуются, а <img class=emojiIcon src=images/emodji/clock3.png>
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Незнаемого. (Меня - сожгут).<br>
                     Баюкай же - но прошу, будь друг:
                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>Не буквами, а каютой <img class=emojiIcon src=images/emodji/open_hands.png>:
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>Уютами…
                     <td>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, sexthQuiz, quiz6)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `люблю, баюкающие, дождливые, листве, дождь, дождь, гроб, спал, вода, ждут, рук`
}

var seventhQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
         В огромном городе моём - <img class=emojiIcon src='images/emodji/bridge_at_night.png'>. 
     </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             Из <img class=emojiIcon src='images/emodji/house.png'> сонного иду - прочь 
         </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>
             И люди думают: <img class=emojiIcon src='images/emodji/bride_with_veil.png'>, дочь,- 
         </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>
             А я запомнила одно: <img class=emojiIcon src='images/emodji/bridge_at_night.png'>. 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
        </td>
        <td>
        </td>
     </tr>
     <tr>
             <td>
                     Июльский ветер мне метет - путь, 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     И где-то <img class=emojiIcon src='images/emodji/musical_note.png'> в окне - чуть. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>
             Ах, нынче ветру до <img class=emojiIcon src='images/emodji/sunrise.png'> - дуть 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Сквозь стенки тонкие груди - в грудь. 
         </td>
        <td>
        </td>
     </tr>
     <tr>
         <td>
         </td>
         <td>
         </td>
      </tr>
      <tr>
             <td>
                     Есть черный <img class=emojiIcon src='images/emodji/deciduous_tree.png'>, и в окне - свет, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     И звон на башне, и в руке - <img class=emojiIcon src='images/emodji/sunflower.png'>, 
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     И шаг вот этот - никому - вслед, 
             </td>
          </tr>
          <tr>
             <td>
                     И тень вот эта, а меня - нет. 
             </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                 Огни - как нити золотых бус, 
             </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                 Ночного <img class=emojiIcon src='images/emodji/maple_leaf.png'> во рту - вкус. 
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Освободите от дневных уз, 
             </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Друзья, поймите, что я вам - <img class=emojiIcon src='images/emodji/sleeping.png'>.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, seventhQuiz, quiz7)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `ночь, дома, жена, ночь, музыка, зари, тополь, цвет, листика, снюсь`
}

var eigthQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Имя твое — <img class=emojiIcon src='images/emodji/bird.png'> в руке, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             Имя твое — льдинка на <img class=emojiIcon src='images/emodji/stuck_out_tongue.png'>. 
         </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>
             Одно-единственное движенье <img class=emojiIcon src='images/emodji/lips.png'>. 
         </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>
             Имя твое — пять букв. 
         </td>
        <td>
        </td>
     </tr>
     <tr>
        <td>
             <img class=emojiIcon src='images/emodji/baseball.png'>, пойманный на лету, 
        </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
             <td>
                     Серебряный бубенец во <img class=emojiIcon src='images/emodji/open_mouth.png'>. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
             </td>
             <td>
             </td>
          </tr>
     <tr>
        <td>
             <img class=emojiIcon src='images/emodji/rock.png'>, кинутый в тихий пруд, 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Всхлипнет так, как тебя зовут. 
         </td>
        <td>
        </td>
     </tr>
     <tr>
         <td>
                 В легком щелканье ночных <img class=emojiIcon src='images/emodji/racehorse.png'> 
         </td>
         <td>
             <input>
         </td>
      </tr>
      <tr>
             <td>
                     Громкое имя твое гремит. 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     И назовет его нам в висок 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Звонко щелкающий <img class=emojiIcon src='images/emodji/gun.png'>. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Имя твое — ах, нельзя! — 
                 </td>
          </tr>
          <tr>
             <td>
                     Имя твое — <img class=emojiIcon src='images/emodji/kiss.png'> в глаза, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     В нежную стужу недвижных век. 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Имя твое — поцелуй в <img class=emojiIcon src='images/emodji/snowflake.png'>. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Ключевой, ледяной, голубой глоток… 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     С именем твоим — <img class=emojiIcon src='images/emodji/sleeping.png'> глубок.            </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, eigthQuiz, quiz8)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `птица, языке, губ, мячик, рту, камень, копыт, курок, поцелуй, снег, сон`
}

var ninethQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             <img  class="emojiIcon" src=images/emodji/girl.png> пела в церковном хоре 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             О всех усталых в чужом краю, 
         </td>
        <td>
         </td>
    </tr>
    <tr>
        <td>
             О всех кораблях, ушедших в <img class="emojiIcon" src=images/emodji/sea.png>, 
         </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>
             О всех, забывших <img class="emojiIcon" src=images/emodji/smile.png> свою. 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
        </td>
        <td>
        </td>
     </tr>
     <tr>
             <td>
                     Так <img  class="emojiIcon" src=images/emodji/microphone.png> ее голос, летящий в купол, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     И луч сиял на белом плече, 
             </td>
             <td>
             </td>
          </tr>
     <tr>
        <td>
             И каждый из <img  class="emojiIcon" src=images/emodji/black_square.png> смотрел и слушал, 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Как белое <img class="emojiIcon" src=images/emodji/dress.png> пело в луче. 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
         <td>
         </td>
         <td>
         </td>
      </tr>
      <tr>
             <td>
                     И всем казалось, что <img  class="emojiIcon" src=images/emodji/smile.png> будет, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Что в тихой заводи все <img  class="emojiIcon" src=images/emodji/ship.png>, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Что на чужбине <img  class="emojiIcon" src=images/emodji/tired_face.png> люди 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Светлую жизнь себе обрели. 
                 </td>
          </tr>
          <tr>
             <td>
                     И голос был сладок, и луч был тонок, 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     И только высоко, у Царских <img class="emojiIcon" src=images/emodji/door.png>, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Причастный Тайнам,- плакал <img class="emojiIcon" src=images/emodji/baby.png> 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     О том, что никто не придет назад.                </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, ninethQuiz, quiz9)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `девушка, море, радость, пел, мрака, платье, радость, корабли, усталые, врат, ребёнок`
}

var tenthQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Мне нравится, что вы <img class="emojiIcon" src=images/emodji/hospital.png> не мной, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             Мне нравится, что я <img class="emojiIcon" src=images/emodji/hospital.png> не Вами, 
         </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>
             Что никогда тяжелый <img class="emojiIcon" src=images/emodji/earth_asia.png> земной 
         </td>
        <td>
            <input>
         </td>
     </tr>
     <tr>
        <td>
             Не <img class="emojiIcon" src=images/emodji/wavy_dash.png> под нашими ногами. 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
        </td>
        <td>
        </td>
     </tr>
     <tr>
             <td>
                     Мне нравится, что можно быть <img class="emojiIcon" src=images/emodji/laughing.png>, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Распущенной - и не играть словами, 
                 </td>
             <td>
             </td>
          </tr>
     <tr>
        <td>
             И не краснеть удушливой <img class="emojiIcon" src=images/emodji/wavy_dash.png>, 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Слегка соприкоснувшись рукавами. 
         </td>
        <td>
        </td>
     </tr>
     <tr>
         <td>
         </td>
         <td>
         </td>
      </tr>
      <tr>
             <td>
                     Мне нравится еще, что Вы при мне 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Спокойно обнимаете <img class="emojiIcon" src=images/emodji/girl.png>, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Не прочите мне в адовом <img class="emojiIcon" src=images/emodji/fire.png> 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Гореть за то, что я не Вас <img class="emojiIcon" src=images/emodji/kiss.png>. 
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Что имя нежное мое, мой нежный, не 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Упоминаете ни днем, ни <img class="emojiIcon" src=images/emodji/bridge_at_night.png> - всуе... 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Что никогда в <img class="emojiIcon" src=images/emodji/church.png> тишине 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Не пропоют над нами: аллилуйя! 
             </td>
             <td>
 
             </td>
          </tr>
          <tr>
             <td>
                     Спасибо Вам и <img class="emojiIcon" src=images/emodji/blue_heart.png> и рукой 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
                 <td>
                         За то, что Вы меня, не зная сами! 
                     </td>
                 <td>
                     
                 </td>
              </tr>
          <tr>
             <td>
                     Так любите: за мой ночной покой, 
                 </td>
             <td>
                 
             </td>
          </tr>
          <tr>
             <td>
                     За редкость встреч <img class="emojiIcon" src=images/emodji/sunrise.png> часами. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
 
             </td>
             <td>
                 
             </td>
          </tr>
          <tr>
                 <td>
                         За наши не-гулянья под <img class="emojiIcon" src=images/emodji/moon.png>, 
                     </td>
                 <td>
                     <input>
                 </td>
              </tr>
          <tr>
             <td>
                     За <img class="emojiIcon" src=images/emodji/sunny.png>, не у нас над головами, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     За то, что Вы больны - увы! - не мной, 
                 </td>
             <td>
                 
             </td>
          </tr>
          <tr>
             <td>
                     Не пропоют над нами: аллилуйя! 
             </td>
             <td>
                 
             </td>
          </tr>
          <tr>
             <td>
                     За то, что я больна - увы! - не Вами!
             </td>
             <td>
                 
             </td>
          </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, tenthQuiz, quiz10)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `больны, больна, шар, уплывёт, смешной, волной, другую, огне, целую, ночью, церковной, сердцем, закатными, луной, солнце`
}

var eleventhQuiz = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             <img class="emojiIcon" src=images/emodji/bridge_at_night.png>, улица, фонарь, аптека, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             Бессмысленный и тусклый <img class="emojiIcon" src=images/emodji/flashlight.png>. 
         </td>
        <td>
            <input>
         </td>
    </tr>
     <tr>
        <td>
             Живи еще хоть четверть века - 
         </td>
        <td>
        </td>
     </tr>
     <tr>
        <td>
             Все будет так. Исхода нет.
        </td>
        <td>
        </td>
     </tr>
     <tr>
             <td>
             </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     <img class="emojiIcon" src=images/emodji/coffin.png> - начнешь опять сначала 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>
             И повторится все, как <img class="emojiIcon" src=images/emodji/older_woman.png>: 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             <img class="emojiIcon" src=images/emodji/bridge_at_night.png>, ледяная рябь канала, 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
         <td>
                 Аптека, улица, фонарь.
         </td>
         <td>
         </td>
      </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, eleventhQuiz, quiz11)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `ночь, свет, умрёшь, встарь, ночь`
}

var Quiz12 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Мело, мело по всей <img class="emojiIcon" src=images/emodji/earth_americas.png> 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Во все пределы. 
         </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
    <tr>
     <td>
             <img class="emojiIcon" src=images/emodji/candle.png> горела на столе, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             <img class="emojiIcon" src=images/emodji/candle.png> горела. 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Как летом роем мошкара 
         </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Летит на <img class="emojiIcon" src=images/emodji/fire.png>, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Слетались хлопья со двора <br>
             К оконной раме. 
                                 </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             <img class="emojiIcon" src=images/emodji/cloud-with-snow.png> лепила на стекле 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Кружки и <img class="emojiIcon" src=images/emodji/arrow.png>. 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Свеча горела на столе,<br>
             Свеча горела.
         </td>
     <td>
     </td>
    </tr>
    <tr>
     <td>
             На озаренный потолок 
             Ложились тени, <br>
                     </td>
     <td>
     </td>
    </tr>
    <tr>
        <td>
             Скрещенья <img class="emojiIcon" src=images/emodji/open_hands.png>, скрещенья ног, 
         </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>
             Судьбы скрещенья. 
         </td>
        <td>
 
         </td>
     </tr>
     <tr>
        <td>
             И падали два <img class="emojiIcon" src=images/emodji/boot.png> 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Со стуком на пол. 
         </td>
        <td>
        </td>
     </tr>
     <tr>
             <td>
                     И воск <img class="emojiIcon" src=images/emodji/droplet.png> с ночника 
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     На <img class="emojiIcon" src=images/emodji/dress.png> капал. 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>
             И все терялось в <img class="emojiIcon" src=images/emodji/snowflake.png> мгле 
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
        <td>
             Седой и белой. <br>
             Свеча горела на столе,<br> 
             Свеча горела. <br>
         </td>
        <td>
 
         </td>
     </tr>
     <tr>
         <td>
                 На <img class="emojiIcon" src=images/emodji/candle.png> дуло из угла, 
             </td>
         <td>
             <input>
         </td>
      </tr>
      <tr>
             <td>
                     И жар соблазна 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     Вздымал, как <img class="emojiIcon" src=images/emodji/angel.png>, два крыла 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Крестообразно. 
                 </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     <img class="emojiIcon" src=images/emodji/cloud-with-snow.png> весь месяц в феврале, 
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     И то и дело <br>
                     Свеча горела на столе,<br> 
                     Свеча горела.                </td>
             <td>
             </td>
          </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz12, quiz12)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `земле, свеча, свеча, пламя, метель, стрелы, рук, башмачка, слезами, платье, снежной, свечку, ангел, мело`
}

var Quiz13 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Ниоткуда с <img class="emojiIcon" src=images/emodji/heart.png>, надцатого мартобря,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             дорогой, уважаемый, милая, но не важно
         </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             даже кто, ибо черт <img class="emojiIcon" src=images/emodji/neutral_face.png>, говоря
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             откровенно, не вспомнить уже, не ваш, но
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             и ничей верный <img class="emojiIcon" src=images/emodji/older_man.png> вас приветствует с одного
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             из пяти континентов, держащегося на ковбоях.
         </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Я любил тебя больше, чем <img class="emojiIcon" src=images/emodji/angel.png> и самого,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             и поэтому дальше теперь<br>
             от тебя, чем от них обоих.
                                             </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Далеко, поздно <img class="emojiIcon" src=images/emodji/night-with-stars.png>, в долине, на самом дне,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             в городке, занесенном <img class="emojiIcon" src=images/emodji/snowflake.png> по ручку двери,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             извиваясь <img class="emojiIcon" src=images/emodji/night-with-stars.png> на простыне,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
     <td>
             как не сказано ниже, по крайней мере,<br>
             я взбиваю подушку мычащим "ты",
                                 </td>
     <td>
     </td>
    </tr>
    <tr>
        <td>
             за <img class="emojiIcon" src=images/emodji/mountain.png>, которым конца и края,
         </td>
        <td>
            <input>
         </td>
    </tr>
    <tr>
        <td>
             в темноте всем телом твои черты
             как безумное зеркало повторяя.        </td>
        <td>
 
         </td>
     </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz13, quiz13)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `любовью, лица, друг, ангелов, ночью, снегом, ночью, горами`
}

var Quiz14 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             А ты думал - я тоже такая, <br>
             Что можно забыть меня, 
                     </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             И что брошусь, моля и <img class="emojiIcon" src=images/emodji/crycauseoflove.png>, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Под копыта гнедого <img class="emojiIcon" src=images/emodji/horse.png>. 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Или стану просить у знахарок 
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             В наговорной <img class="emojiIcon" src=images/emodji/sea.png> корешок 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             И пришлю тебе странный <img class="emojiIcon" src=images/emodji/gift.png> - 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Мой заветный душистый платок. 
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Будь же проклят. Ни стоном, ни <img class="emojiIcon" src=images/emodji/eyes.png> 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Окаянной души не коснусь, 
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Но клянусь тебе <img class="emojiIcon" src=images/emodji/angel.png> садом, 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Чудотворной иконой клянусь, 
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
     <td>
             И <img class="emojiIcon" src=images/emodji/night-with-stars.png> наших пламенным чадом - 
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td>
             Я к тебе никогда не вернусь.        </td>
        <td>
 
     </td>
    </tr>
              <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz14, quiz14)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `рыдая, коня, воде, подарок, взглядом, ангельским, ночей`
}

var Quiz15 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             - Как больно, милая, как странно,
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Сроднясь в <img class="emojiIcon" src=images/emodji/earth_asia.png>, сплетясь ветвями -
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Как больно, милая, как странно<br>
             Раздваиваться под пилой.
                     </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Не зарастет на <img class="emojiIcon" src=images/emodji/heart.png> рана,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Прольется чистыми <img class="emojiIcon" src=images/emodji/droplet.png>,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Не зарастет на сердце рана -<br>
             Прольется пламенной смолой.<br><br>
             - Пока жива, с тобой я буду -
                     </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Душа и <img class="emojiIcon" src=images/emodji/blood.jpg> нераздвоимы, -
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Пока жива, с тобой я буду -
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Любовь и <img class="emojiIcon" src=images/emodji/death.jpeg> всегда вдвоем.
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Ты понесешь с собой, любимый,<br>
             Ты понесешь с собой повсюду,<br>
             Ты понесешь с собой повсюду<br>
                     </td>
     <td>
 
     </td>
    </tr>
    <tr>
     <td>
             Родную землю, милый <img class="emojiIcon" src=images/emodji/house.png>.
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
        <td><br>
             - Но если мне укрыться нечем<br>
 От жалости неисцелимой,<br>
 Но если мне укрыться нечем
 </td>
        <td>
 
     </td>
    </tr>
    <tr>
        <td>
             От холода и <img class="emojiIcon" src=images/emodji/black_circle.png> ?
         </td>
        <td>
         <input>
         </td>
     </tr>
     <tr>
        <td>
             <br>- За расставаньем будет встреча,<br>
             Не забывай меня, любимый,<br>
             За расставаньем будет встреча,<br>
             Вернемся оба - я и ты.<br><br>
             - Но если я безвестно кану -
                     </td>
        <td>
 
     </td>
     </tr>
     <tr>
        <td>
             Короткий <img class="emojiIcon" src=images/emodji/light.png> луча дневного, -
         </td>
        <td>
            <input>
        </td>
     </tr>
     <tr>
             <td>
                     Но если я безвестно кану
                 </td>
             <td>
 
             </td>
          </tr>
          <tr>
             <td>
                     За звездный пояс, млечный <img class="emojiIcon" src=images/emodji/smoke.png>?
                 </td>
             <td>
                 <input>
             </td>
          </tr>
     <tr>
        <td>
             <br>- Я за тебя молиться стану,<br>
             Чтоб не забыл пути земного,<br>
             Я за тебя молиться стану,<br>
             Чтоб ты вернулся невредим.<br><br>
                     </td>
        <td>
 
     </td>
     </tr>
     <tr>
        <td>
             Трясясь в прокуренном <img class="emojiIcon" src=images/emodji/train.png>,
         </td>
        <td>
         <input>
         </td>
     </tr>
     <tr>
         <td>
                 Он стал бездомным и смиренным,<br>
                 Трясясь в прокуренном вагоне,
                             </td>
         <td>
 
         </td>
      </tr>
      <tr>
             <td>
                     Он полуплакал, <img class="emojiIcon" src=images/emodji/sleeping.png>,
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Когда состав на скользком склоне,<br>
                     Вдруг изогнулся страшным креном,<br>
                     Когда состав на скользком склоне
                                     </td>
             <td>
 
             </td>
          </tr>
          <tr>
             <td>
                     От рельс <img class="emojiIcon" src=images/emodji/ferris_wheel.png> оторвал.
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     Нечеловеческая сила <br>
                     В одной давильне всех калеча,<br>
                     Нечеловеческая сила 
                                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                 Земное сбросила с <img class="emojiIcon" src=images/emodji/earth_asia.png>.
             </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td>
                     <br>...И никого не защитила<br>
                     Вдали обещанная встреча,<br>
                     И никого не защитила
                                     </td>
             <td>
             </td>
          </tr>
          <tr>
             <td>
                     <img class="emojiIcon" src=images/emodji/hand.png>, зовущая вдали...
                 </td>
             <td>
                 <input>
             </td>
          </tr>
          <tr>
             <td><br>
                     С любимыми не расставайтесь,<br>
                     С любимыми не расставайтесь,<br>
                     С любимыми не расставайтесь,<br>
                     Всей кровью прорастайте в них, -<br>
                     И каждый раз навек прощайтесь,<br>
                     И каждый раз навек прощайтесь,<br>
                     И каждый раз навек прощайтесь,<br>
                                 </td>
             <td>
 
             </td>
          </tr>
          <tr>
             <td>
                     Когда уходите на <img class="emojiIcon" src=images/emodji/alarm_clock.png>!                </td>
             <td>
                 <input>
             </td>
          </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz15, quiz15)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `земле, сердце, слезами, кровь, смерть, дом, темноты, свет, дым, вагоне, полуспал, колёса, земли, рука, миг`
}

var Quiz16 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             <img class="emojiIcon" src=images/emodji/elephant.png> бились бивнями так,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Что казались белым <img class="emojiIcon" src=images/emodji/rock.png>
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Под рукой художника.
         </td>
     <td>
 
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Олени заплетались <img class="emojiIcon" src=images/emodji/imp.png> так,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Что казалось, их соединял старинный <img class="emojiIcon" src=images/emodji/ring.png>
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             С взаимными увлечениями и взаимной неверностью.
         </td>
     <td>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Реки вливались в <img class="emojiIcon" src=images/emodji/sea.png так,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Что казалось: <img class="emojiIcon" src=images/emodji/hand.png> одного душит шею другого.        </td>
     <td>
         <input>
     </td>
    </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz16, quiz16)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `слоны, камнем, рогами, брак, море, рука`
}

var Quiz17 = {
    q: `<table border="0">
    <tr>
     <th>Наши вопросы</th>
     <th>Ваши ответы</th>
    </tr>
    <tr>
     <td>
             Когда умирают <img class="emojiIcon" src=images/emodji/horse.png> — дышат,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Когда умирают <img class="emojiIcon" src=images/emodji/grass.jpg> — сохнут,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Когда умирают <img class="emojiIcon" src=images/emodji/sunny.png> — они гаснут,
         </td>
     <td>
         <input>
     </td>
    </tr>
    <tr>
    <tr>
     <td>
             Когда умирают люди — <img class="emojiIcon" src=images/emodji/microphone.png> песни.        </td>
     <td>
         <input>
     </td>
    </tr>
                  <tr>
             <td>
                 <button class="btn-end"><a href="/emodji">Сбросить тест</a></button>
             </td>
             <td>
                 <button class="btn-show-results" onclick="showResults(event, Quiz17, quiz17)">
                     <a href="/emodji">Узнать результаты</a>
                 </button>
             </td>
         </tr>
 </table>`,
    a: `кони, травы, солнца, поют`
}

function showResults(event, quizNumber, quiz) {
    event.preventDefault();
    let userAnswers = [];
    let answer = "";
    let length = $('input').length;
    for(let i = 0; i < length; i++) {
        answer = $('input')[i].value;
        answer = answer.trim();
        userAnswers.push(answer);
    }
    countAnswers(userAnswers, quizNumber, quiz);
}

function countAnswers(userAnswers, quizNumber, quiz) {    
    userAnswers = userAnswers.join(', ');
    userAnswers = userAnswers.toLowerCase();
    renderAnswers(userAnswers, quizNumber, quiz)
}

function renderAnswers(userAnswers, quizNumber, quiz) {
    userAnswers = userAnswers.split(',');
    let rigthAnswers = quizNumber.a.trim();
    rigthAnswers = rigthAnswers.split(',');
    let array = [];
    let rightUserAnswers = [];
    for(let i = 0; i<userAnswers.length; i++) {
        if(rigthAnswers[i].localeCompare(userAnswers[i]) == 0) {
            userAnswers[i] = '<td class="right">' + userAnswers[i] + '</td>';
            array.push(userAnswers[i]);
            rightUserAnswers.push(userAnswers[i])
        } else {
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
    // console.log(newContent);
    // console.log("!!!!!!!!!!!!", quiz);

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
var quiz5 = $("#quiz5");
quiz5.hide();
var quiz6 = $("#quiz6");
quiz6.hide();
var quiz7 = $("#quiz7");
quiz7.hide();
var quiz8 = $("#quiz8");
quiz8.hide();
var quiz9 = $("#quiz9");
quiz9.hide();
var quiz10 = $("#quiz10");
quiz10.hide();
var quiz11 = $("#quiz11");
quiz11.hide();
var quiz11 = $("#quiz11");
quiz11.hide();
var quiz12 = $("#quiz12");
quiz12.hide();
var quiz13 = $("#quiz13");
quiz13.hide();
var quiz14 = $("#quiz14");
quiz14.hide();
var quiz15 = $("#quiz15");
quiz15.hide();
var quiz16 = $("#quiz16");
quiz16.hide();
var quiz17 = $("#quiz17");
quiz17.hide();

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
            quiz3.append(thirdQuiz.q);
            quiz3.show();
            break;
        case 'quiz4':
            quizHeader.text('Угадай слово по эмодзи');
            quiz4.append(forthQuiz.q);
            quiz4.show();
            break;
        case 'quiz5':
            quizHeader.text('Угадай слово по эмодзи');
            quiz5.append(fifthQuiz.q);
            quiz5.show();
            break;
        case 'quiz6':
            quizHeader.text('Угадай слово по эмодзи');
            quiz6.append(sexthQuiz.q);
            quiz6.show();
            break;
        case 'quiz7':
            quizHeader.text('Угадай слово по эмодзи');
            quiz7.append(seventhQuiz.q);
            quiz7.show();
            break;
        case 'quiz8':
            quizHeader.text('Угадай слово по эмодзи');
            quiz8.append(eigthQuiz.q);
            quiz8.show();
            break;
        case 'quiz9':
            quizHeader.text('Угадай слово по эмодзи');
            quiz9.append(ninethQuiz.q);
            quiz9.show();
            break;
        case 'quiz10':
            quizHeader.text('Угадай слово по эмодзи');
            quiz10.append(tenthQuiz.q);
            quiz10.show();
            break;
        case 'quiz11':
            quizHeader.text('Угадай слово по эмодзи');
            quiz11.append(eleventhQuiz.q);
            quiz11.show();
            break;
        case 'quiz12':
            quizHeader.text('Угадай слово по эмодзи');
            quiz12.append(Quiz12.q);
            quiz12.show();
            break;
        case 'quiz13':
            quizHeader.text('Угадай слово по эмодзи');
            quiz13.append(Quiz13.q);
            quiz13.show();
            break;
        case 'quiz14':
            quizHeader.text('Угадай слово по эмодзи');
            quiz14.append(Quiz14.q);
            quiz14.show();
            break;
        case 'quiz15':
            quizHeader.text('Угадай слово по эмодзи');
            quiz15.append(Quiz15.q);
            quiz15.show();
            break;
        case 'quiz16':
            quizHeader.text('Угадай слово по эмодзи');
            quiz16.append(Quiz16.q);
            quiz16.show();
            break;
        case 'quiz17':
            quizHeader.text('Угадай слово по эмодзи');
            quiz17.append(Quiz17.q);
            quiz17.show();
            break;
        }
}