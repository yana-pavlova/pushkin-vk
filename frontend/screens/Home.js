const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class Home extends hyperHTML.Component {
    constructor(){
        super();
        // this.state = state;
    }

    render(){
        return this.html`
            <div class="navForMainPage">
            ${new NavBar}
            </div>
            <container>
                <div id="mainDiv" class="mainP">
                    <!-- <img class="img-responsive center-block" id="pushkinCirc" src="pushkinCirc.png"> -->
                    <h1>"Пушкин в VK"</h1>
                        <p>Социальная сеть писателей и поэтов минувших эпох</p>
                        <br>
                      <div class="mainMain">
                       <div class="miniFlex">
                        <p>Хотите личный кабинет и возможность постить тексты от лица любимого автора?</p>
                        <button><a style='color:white' href='/register'>Присоединиться!</a></button></p>
                      </div>
                      <div class="miniFlex">
                        <p>Хотите ознакомиться с нашим контентом и освежить знания по литературе?</p>
                        <button><a style='color:white' href='/wall'>Смотреть контент!</a></button></p>
                      </div>

                    <!-- <p>Чтобы увидеть контент сайта, пройдите на <a style='color:white;text-decoration:underline' href="/wall">стену<a>, где размещены все посты авторов, живущих здесь. Также вы можете посетить раздел <a style='color:white;text-decoration:underline' href="/tests/testIndex.html">тесты</a> и освежить свои знания некоторых художественных текстов.</p>
                    <p>А если вы хотите выбрать автора, получить личный кабинет и постить тексты от его имени, нажмите на кнопку ниже.</p>
                    <button><a style='color:white' href='/register'>Присоединиться!</a></button> -->
                </div>

            </container>
        `
    }
}