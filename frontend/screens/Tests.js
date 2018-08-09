const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
const Test = require('../components/Test');
let testsData = require('../testsData/testsData.json');

module.exports = class Tests extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.state.mytests = [];

        // console.log(Object.keys(testsData).length);
        
        for(let key in testsData) {
            this.state.mytests.push(
                {
                    name: testsData[key]["name"],
                    alt: testsData[key]["alt"],
                    title: testsData[key]["title"],
                    paragraph: testsData[key]["paragraph"]
                }
            )
        }
    }

    render() {
        return this.html`
            <div class="navForMainPage">
                ${new NavBar (this.state)}
            </div>
            <container class="container-fluid">
                <div class="flex_container_tests">
                    ${ this.state.mytests.map( t => new Test(t) ) }
                </div>
            </container>
        `;
    }
}