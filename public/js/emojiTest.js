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
    // console.log("!!!", quiz);
    
    //если равны вернёт ноль
    renderAnswers(userAnswers, quizNumber, quiz)
}

function renderAnswers(userAnswers, quizNumber, quiz) {
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
            quizHeader.text('Угадай сюжет по эмодзи');
            quiz4.append(forthQuiz.q);
            quiz4.show();
            break;
        case 'quiz5':
            quizHeader.text('Угадай сюжет по эмодзи');
            quiz5.append(fifthQuiz.q);
            quiz5.show();
            break;
        case 'quiz6':
            quizHeader.text('Угадай сюжет по эмодзи');
            quiz6.append(sexthQuiz.q);
            quiz6.show();
            break;
    }
}