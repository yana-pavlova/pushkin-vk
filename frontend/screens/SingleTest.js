const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
let testsData = require('../testsData/testsData.json');

let story = window.location.toString();
story = story.split('/');
story = story[story.length - 1];

let currentStory;

if (story in testsData) {
    currentStory = hyperHTML.wire()`${{html: testsData[story]["story"]}}`;
}

module.exports = class SingleTest extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }
    
    render() {
        return this.html`
            <div id="${story}">
                <div class="navForMainPage navbarTest">
                        ${new NavBar (this.state)}
                </div>
                        ${currentStory}
            </div>
        `;
    }
}