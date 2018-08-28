const hyperHTML = require('hyperhtml/cjs').default;


class Error extends hyperHTML.Component {
    constructor(){
        super()
        this.isVisible = false;
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    showError(message) {
        this.element.hidden = false;
        this.messageContainer.innerText = message;
        setTimeout(this.hideError, 2000)
    }

    hideError(){
        this.messageContainer.innerText = '';
        this.element.hidden = true;
    }

    onconnected(e) {
        this.element = e.target;
        this.messageContainer = this.element.querySelector('span');
    }

    render(){
        return this.html`
            <div class="alert alert-info" role="alert" onconnected=${this} hidden='true'><span></span></div>
        `
    }
}

const body = document.querySelector('body');
let errorContainer = document.createElement('div');
body.prepend(errorContainer);
window.errorWindow = new Error();
hyperHTML(errorContainer)`${window.errorWindow}`;