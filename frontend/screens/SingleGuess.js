const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
// let prompts = require('../guessData/guessText.json');

module.exports = class Guess extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;

        // console.log(Object.keys(testsData).length);
    }

    render() {
        return this.html`
            ${new NavBar (this.state)}
            <div id="guessText">

                <!-- <div class="alert alert-success" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>
                    Это игра "Угадай текст". Ваша задача: догадаться, о каком тексте идёт речь, и вписать его название (без кавычек!) в поле для ответа.</p>
                    <p>Админ будет открывать вам по одному утверждению о тексте, который загадан. Получить новое можно по кнопке "ещё утверждение". Всего подсказок не более 15.</p>
                    <p>Желаем успехов!</p>
                </p>
                </div> -->
    <div id="guessContent">
        <div class="guessPrompt">
            <div class="guessImg">
                <img class="guessPhoto" src="/images/avatar-default.png">
            </div>
            <div class="guessAnswer">
                <p>Чтобы начать, нажмите "Подсказка".</p>
            </div>
        </div>
    </div>
    <div class="userContent">
            <p>
                <hr>
                <button class="btn btn-primary disabledAfter" onclick="showPrompt()">
                    Подсказка
                </button>
                <button class="btn btn-danger disabledAfter" onclick="showTrueAnswer()">
                    Я сдаюсь!
                </button>
                <button class="btn btn-primary">
                    <a href="/guess">
                        Вернуться к тестам
                    </a>
                </button>
            </p>
            <p>
                Внимание! Не ставьте кавычки и знаки пунктуации!
            </p>
            <p>
                <button class="btn btn-success disabledAfter" onclick="verifyAnswer()">
                    Вот мой ответ!
                </button>
                <input type="text">
            </p>
    </div>
</div>
        `;
    }
}