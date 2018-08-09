const hyperHTML = require('hyperhtml/cjs').default;
// import LoginDropdown from './LoginDropdown';

module.exports = class Test extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        // console.log(this.state);
        let link = `/tests/${this.state.name}`;
        let link2 = `../images/${this.state.name}Story/${this.state.name}.jpg`;
        return this.html`
            <div class="thumbnail flex_block">
                    <img src="${link2}" alt="Карамора. Автор неизвестен">
                    <div class="caption">
                        <h3 class="testH3">${this.state.title}</h3>
                        <p class="testP">${this.state.paragraph}</p>
                        <p class="testP">Участвуй в жизни героя: выбирай, что бы он сделал в той или иной ситуации. А мы расскажем, как оно было на самом
                            деле!</p>
                        <a href="${link}" role="button">Поехали!</a>
                    </div>
            </div>
        `
    }
}