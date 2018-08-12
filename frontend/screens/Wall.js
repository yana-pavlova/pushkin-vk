const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
const Posts = require('../components/Posts');
const Related = require('../components/Related');


module.exports = class Wall extends hyperHTML.Component {
    constructor(state, isSinglePost=false) {
        super();
        this.state = state;
        this.isSinglePost = isSinglePost;
    }

    render() {
        // console.log(this.state.posts);
        // console.log ('количество постов',this.state.posts.total)
        // console.log ('один пост',this.state.posts.results[0])
        return this.html`
            ${new NavBar (this.state)}
            <div class='wall flexContainerForAll'>
                        ${new Posts(this.state, false, this.isSinglePost)}
                        <a href="#top"><button class="linkUp">Вверх!</button></a>
            </div>
        `;
    }
}