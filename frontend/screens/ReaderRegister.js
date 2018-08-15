const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class ReaderRegister extends hyperHTML.Component {
    constructor(){
        super();
        // this.state = state;
    }

    render(){
        return this.html`
                ${new NavBar}
                <p>OLOLO I'M AN READERREGISTER</p>
        `
    }
}