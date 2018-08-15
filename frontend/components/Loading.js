const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class Loading extends hyperHTML.Component {
    constructor(state = {}) {
        super();
        this.state = state;
        this.state.className = state.className || '';
        this.state.visible = state.visible || false;
    }

    show() {
        this.el.style.display = 'block';
    }

    hide() {
        this.el.style.display = 'none';
    }

    onconnected(e){       
        this.el = e.target;
    }

    render() {
        let style = this.state.visible ? 'display: block' : 'display: none';
        return this.html`
            <div class=${this.state.className} style=${style} onconnected=${this}>
                <div class="lds-heart">
                    <div></div>
                </div>
            </div>`
    }
}