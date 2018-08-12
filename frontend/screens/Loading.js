const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class Loading extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        return this.html`
            <div>
                <div class="lds-heart">
                    <div></div>
                </div>
            </div>`
    }
}