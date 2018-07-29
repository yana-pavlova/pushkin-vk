const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class RegisterPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.register = this.register.bind(this);
        this.selectedAuthor = '';
        this.state = state;
    }

    register(event) {
        event.preventDefault();
        let form = event.target;

        let name_first = form.querySelector('#name_first').value;
        let name_last = form.querySelector('#name_last').value;
        let email = form.querySelector('#email').value;
        let password = form.querySelector('#password').value;
        let authorsList = form.querySelector('#authors').querySelectorAll('option');
        
        let author= ''
        for (let i in authorsList) {
            if (authorsList[i].selected) {
                author = authorsList[i].id;
                break;
            }
        }

        let queryArray = [];
        if (name_first != '') queryArray.push(`name_first=${name_first}`);
        if (name_last != '') queryArray.push(`name_last=${name_last}`);
        if (email != '') queryArray.push(`email=${email}`);
        if (password != '') queryArray.push(`password=${password}`);
        if (author != '') queryArray.push(`author=${author}`);
        if (queryArray.length === 0) return;
        
        let query = queryArray.map((q) => q).join('&');
        query = `/api/user/create?${query}`;

        const xhr = new XMLHttpRequest();
        
        let that = this;
        xhr.open('GET', query, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) window.location = '/login';
                else {
                    let e = JSON.parse(this.responseText);
                    // console.log(e);
                    
                }
            }
        }
        
        
        
        return false;
    }

    render() {
        let firstPart = hyperHTML.wire()`
            <form class='form-horizontal form-box' onsubmit=${this.register}>
                <div class='form-group'>
                    <label for='name_first' class='col-sm-2 control-label'>Фамилия</label>
                    <div class='col-sm-10'>
                        <input type='text' class='form-control' id='name_first' placeholder='Фамилия' autocomplete='family-name'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='name_last' class='col-sm-2 control-label'>Имя</label>
                    <div class='col-sm-10'>
                        <input type='text' class='form-control' id='name_last' placeholder='Имя' autocomplete='given-name'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='email' class='col-sm-2 control-label'>Email</label>
                    <div class='col-sm-10'>
                        <input type='email' class='form-control' id='email' placeholder='Email'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='password' class='col-sm-2 control-label'>Пароль</label>
                    <div class='col-sm-10'>
                        <input type='password' class='form-control' id='password' placeholder='Password'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='authors' class='col-sm-2 control-label'>Автор</label>
                    <div class='col-sm-10'>
                        <select class='form-control' id='authors'>
                            ${this.state.availableAuthors.map((author) => {
                                return hyperHTML.wire()`
                                    <option id=${author._id}>${author.name.first} ${author.name.last} ${author.patronymic}</option>
                                `
                            })}
                        </select>
                    </div>
                </div>
                <div class='form-group'>
                    <div class='col-sm-offset-2 col-sm-10'>
                        <button class='btn btn-primary'>Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        `

        return this.html`
            ${new NavBar (this.state)}

            <div class='register' id='login-page'>
                <div class='container'>
                    <div class='row'>
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-lg-offset-3'>
                        
                        ${firstPart}    

                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}