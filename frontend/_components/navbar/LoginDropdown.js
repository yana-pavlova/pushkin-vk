const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class LoginDropdown extends hyperHTML.Component {
    constructor() {
        super();
        this.activeSection = '';
        this.isDropDownShown = false;
        this.isSignedIn = _LOCALS.isSignedIn;
        this.showDropDown = this.showDropDown.bind(this);
        this.hideDropDown = this.hideDropDown.bind(this);
        this.logout = this.logout.bind(this);
    }

    showDropDown() {
        this.isDropDownShown = true;
        this.render();
    }

    hideDropDown() {
        this.isDropDownShown = false;
        this.render();
    }

    logout() {
        let q = '/auth/signout';
        let xhr = new XMLHttpRequest();
        let that = this;
        
        xhr.open('GET', q, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                window.location = '/wall';
            }
        }
    }

    render() {
        console.log('nav', this);
        
        let dropdownContent;
        if (this.isSignedIn) {
            dropdownContent = hyperHTML.wire()`
                <li> <a href='/settings' >Сменить автора</a> </li>
                ${_LOCALS.user.isAdmin 
                    ? hyperHTML.wire()`
                        <li><a href='/keystone/signin'>Секретный раздел</a></li>
                        `
                    : ''
                }
                <li role='separator' class='divider'></li>
                <li><a onclick=${this.logout} >Выйти</a></li>
            `
        }
        else {
            dropdownContent = hyperHTML.wire()`
                <li><a href='/login' class='btn btn-link'>Войти</a></li>
            `
        }

        return this.html`
            <li class='dropdown'>
                <a class='dropdown-toggle' onclick=${this.isDropDownShown ? this.hideDropDown : this.showDropDown}> <img src='/images/login-button.png'> <span class='caret'></span></a>
                <ul class='dropdown-menu' style='${this.isDropDownShown ? "display: block;" : "display: none;"}'>
                    ${dropdownContent}
                </ul>
            </li>
        `;
    }
}