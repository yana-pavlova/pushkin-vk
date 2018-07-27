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
        return this.html`
            ${new NavBar (this.state)}
            <div class='wall'>
                <div class='content-posts active'>
                    <div class='primary-content'>
                        ${new Posts(this.state)}
                    </div>
                    <div class="sidebar-right">
                        ${new Related(this.state)}
                    </div>
                </div>
            </div>
        `;
    }
}