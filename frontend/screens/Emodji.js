const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class Emodji extends hyperHTML.Component {
    constructor(){
        super();
        // this.state = state;
    }

    render(){
        return this.html`
                ${new NavBar}

                    <h1 id="quizHeader">Проверьте свои знания!</h1>
                    <div class="emodji" id="quiz-chooser">
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

                                <!-- <div onclick="showQuiz('quiz4')" class="quiz-choose-card emodjiTest">
                                    <h2>Угадай сюжеты по эмодзи!</h2>
                                </div> -->
                    </div>

                    <div id="quiz-container">
                        <div id="quiz1" class="quiz">
                                <!-- <button class="btn-end"><a href="/emodji">Завершить тест</a></button> -->
                        </div>
                        <div id="quiz2" class="quiz"></div>
                        <div id="quiz3" class="quiz"></div>
                        <div id="quiz4" class="quiz"></div>
                        <div id="quiz5" class="quiz"></div>
                        <div id="quiz6" class="quiz"></div>

                    </div>
                `
    }
}