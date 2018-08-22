const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class Emodji extends hyperHTML.Component {
    constructor(){
        super();
    }

    render(){
        return this.html`
                ${new NavBar}

                    <h1 id="quizHeader">Проверьте свои знания!</h1>
                    <div class="emodji" id="quiz-chooser">

                                <div onclick="showQuiz('quiz28')" class="quiz-choose-card emodjiTest">
                                    <h2>"Бессонница, Гомер, тугие паруса..." О.Э. Мандельштама</h2>
                                </div>

                                <div onclick="showQuiz('quiz27')" class="quiz-choose-card emodjiTest">
                                    <h2>"Я вас любил" А.С. Пушкина</h2>
                                </div>
                    
                                <div onclick="showQuiz('quiz26')" class="quiz-choose-card emodjiTest">
                                    <h2>"Холмы" И.А. Бродского</h2>
                                </div>
                    
                                <div onclick="showQuiz('quiz25')" class="quiz-choose-card emodjiTest">
                                    <h2>"Не отрекаются любя" В.М. Тушновой</h2>
                                </div>

                                <div onclick="showQuiz('quiz24')" class="quiz-choose-card emodjiTest">
                                    <h2>"Мы любовь свою схоронили" Ю.В Друниной</h2>
                                </div>

                                <div onclick="showQuiz('quiz23')" class="quiz-choose-card emodjiTest">
                                    <h2>"Когда умирает любовь" Ю.В Друниной</h2>
                                </div>

                                <div onclick="showQuiz('quiz22')" class="quiz-choose-card emodjiTest">
                                    <h2>"Вчера ещё в глаза глядел" М.И. Цветаевой</h2>
                                </div>
                                
                                <div onclick="showQuiz('quiz21')" class="quiz-choose-card emodjiTest">
                                    <h2>"Незнакомка" А.А. Блока</h2>
                                </div>

                                <div onclick="showQuiz('quiz20')" class="quiz-choose-card emodjiTest">
                                    <h2>"Никого не будет в доме" Б.Л. Пастернака</h2>
                                </div>

                                <div onclick="showQuiz('quiz18')" class="quiz-choose-card emodjiTest">
                                    <h2>"Письма римскому другу" И.А. Бродского (часть 1)</h2>
                                </div>

                                <div onclick="showQuiz('quiz19')" class="quiz-choose-card emodjiTest">
                                    <h2>"Письма римскому другу" И.А. Бродского (часть 2)</h2>
                                </div>

                                <div onclick="showQuiz('quiz1')" class="quiz-choose-card emodjiTest">
                                    <h2>"Я вас любил" И.А. Бродского</h2>
                                </div>
                                <div onclick="showQuiz('quiz2')" class="quiz-choose-card emodjiTest">
                                    <h2>"Зимнее утро" А.С. Пушкина</h2>
                                </div>

                                <div onclick="showQuiz('quiz3')" class="quiz-choose-card emodjiTest">
                                    <h2>"Снова пьют здесь, дерутся и плачут" С.А. Есенина</h2>
                                </div>

                                <div onclick="showQuiz('quiz4')" class="quiz-choose-card emodjiTest">
                                    <h2>"Лиличка" В.В. Маяковского</h2>
                                </div>

                                <div onclick="showQuiz('quiz5')" class="quiz-choose-card emodjiTest">
                                    <h2>"Прогноз погоды" Р.И. Рождественского</h2>
                                </div>

                                <div onclick="showQuiz('quiz6')" class="quiz-choose-card emodjiTest">
                                    <h2>"Люблю - но мука ещё жива" М.И. Цветаевой</h2>
                                </div>

                                <div onclick="showQuiz('quiz7')" class="quiz-choose-card emodjiTest">
                                    <h2>"В огромном городе моём - ночь" М.И. Цветаевой</h2>
                                </div>

                                <div onclick="showQuiz('quiz8')" class="quiz-choose-card emodjiTest">
                                    <h2>"Имя твоё - птица в руке" М.И. Цветаевой</h2>
                                </div>

                                <div onclick="showQuiz('quiz9')" class="quiz-choose-card emodjiTest">
                                    <h2>"Девушка пела в церковном хоре" А.А. Блока</h2>
                                </div>

                                <div onclick="showQuiz('quiz10')" class="quiz-choose-card emodjiTest">
                                    <h2>"Мне нравится, что вы больны не мной" М.И. Цветаевой</h2>
                                </div>

                                <div onclick="showQuiz('quiz11')" class="quiz-choose-card emodjiTest">
                                    <h2>"Ночь, улица, фонарь, аптека" А.А. Блока</h2>
                                </div>

                                <div onclick="showQuiz('quiz12')" class="quiz-choose-card emodjiTest">
                                    <h2>"Зимняя ночь" Б.Л. Пастернака</h2>
                                </div>

                                <div onclick="showQuiz('quiz13')" class="quiz-choose-card emodjiTest">
                                    <h2>"Ниоткуда с любовью" И.А. Бродского</h2>
                                </div>
                    
                                <div onclick="showQuiz('quiz14')" class="quiz-choose-card emodjiTest">
                                    <h2>"А ты думал - я тоже такая" А.А. Ахматовой</h2>
                                </div>

                                <div onclick="showQuiz('quiz15')" class="quiz-choose-card emodjiTest">
                                    <h2>"С любимыми не расставайтесь" А.С. Кочеткова</h2>
                                </div>
                    
                                <div onclick="showQuiz('quiz16')" class="quiz-choose-card emodjiTest">
                                    <h2>"Слоны бились бивнями так..." В.В. Хлебникова</h2>
                                </div>
                    
                                <div onclick="showQuiz('quiz17')" class="quiz-choose-card emodjiTest">
                                    <h2>"Когда умирают кони - дышат" В.В. Хлебникова</h2>
                                </div>
                    </div>

                    <div id="quiz-container">
                        <div id="quiz1" class="quiz"></div>
                        <div id="quiz2" class="quiz"></div>
                        <div id="quiz3" class="quiz"></div>
                        <div id="quiz4" class="quiz"></div>
                        <div id="quiz5" class="quiz"></div>
                        <div id="quiz6" class="quiz"></div>
                        <div id="quiz7" class="quiz"></div>
                        <div id="quiz8" class="quiz"></div>
                        <div id="quiz9" class="quiz"></div>
                        <div id="quiz10" class="quiz"></div>
                        <div id="quiz11" class="quiz"></div>
                        <div id="quiz12" class="quiz"></div>
                        <div id="quiz13" class="quiz"></div>
                        <div id="quiz14" class="quiz"></div>
                        <div id="quiz15" class="quiz"></div>
                        <div id="quiz16" class="quiz"></div>
                        <div id="quiz17" class="quiz"></div>
                        <div id="quiz18" class="quiz"></div>
                        <div id="quiz19" class="quiz"></div>
                        <div id="quiz20" class="quiz"></div>
                        <div id="quiz21" class="quiz"></div>
                        <div id="quiz22" class="quiz"></div>
                        <div id="quiz23" class="quiz"></div>
                        <div id="quiz24" class="quiz"></div>
                        <div id="quiz25" class="quiz"></div>
                        <div id="quiz26" class="quiz"></div>
                        <div id="quiz27" class="quiz"></div>
                        <div id="quiz28" class="quiz"></div>

                    </div>
                `
    }
}