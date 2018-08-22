const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class SingleGuess extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.state.guessData = [1,2,3,4,5,6,7,8,9,10,11,12];
    }
    
    render() {
        return this.html`
            ${new NavBar (this.state)}
            <div class="guestList">
                ${this.state.guessData.map(t =>  `
                    <div class="oneGuess">
                        <a href="/guess/text-${t}">
                            <h4>
                                Угадай текст!
                            </h4>
                            <img src="/images/forGuess.jpeg">
                            <p>
                                Я - номер ${t}.
                            </p>
                        </a>
                </div>
                `) }
            </div>
        `;
    }
}