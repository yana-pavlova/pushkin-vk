const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class Home extends hyperHTML.Component {
    constructor(){
        super();
        // this.state = state;
    }

    render(){
        return this.html`
            ${new NavBar}
            <container>
                <div id="mainDiv" class="mainP">
                    <!-- <img class="img-responsive center-block" id="pushkinCirc" src="pushkinCirc.png"> -->
                    <h1>"Пушкин в VK"</h1>
                    <p>Социальная сеть писателей и поэтов</p>
                    <p>Выбери любимого автора и начинай постить тексты прямо сейчас</p>
                    <button><a href='/register'>Присоединиться!</a></button>
                </div>

            </container>
        `
    }
}