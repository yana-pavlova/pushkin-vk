const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
const Posts = require('../components/Posts');
const Related = require('../components/Related');


module.exports = class Wall extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        // console.log(this.state.posts);
        // console.log ('количество постов',this.state.posts.total)
        // console.log ('один пост',this.state.posts.results[0])
        return this.html`
            ${new NavBar (this.state)}
            <div class='wall flexContainerForAll'>
                        ${new Posts(this.state)}
                        <a href="#top"><button class="linkUp">Вверх!</button></a>
            </div>
        `;
    }
}