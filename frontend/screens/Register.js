const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
require('../components/Error');
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
                let res = JSON.parse(this.responseText);
                if (res.error) {
                    window.errorWindow.showError(res.error);
                    console.log(res);
                }
                else window.location = '/login';
            }
        }

        return false;
    }

    render() {
        let firstPart = hyperHTML.wire()`
            <form class='form-horizontal form-box' onsubmit=${this.register}>
                <p>Внимание! Регистрируясь на сайте, Вы безоговорочно и полностью принимаете <a target="_blank" href="/conditions.pdf">пользовательское соглашение</a>.</p>
                <p>Внимание! Регистрируясь как автор, вы должны будете публиковать посты на стене от имени того писателя, которого выберете в окошке ниже. Если вы не уверены, что хотите этого, <a href="register-reader">зарегистрируйтесь</a> как читатель и сможете оставлять комментарии к записям и ставить лайки.</p>                
                <p>Внимание! Администрация сайта автоматически изменит ваш статус на "читатель", если на страничке автора не будет активности в течение месяца.</p>
                <p>После совершения регистрации Вы будете перенаправлены на страницу входа, а на указанную Вами почту придёт сообщением с Вашим логином и паролем.</p>
                <div class='form-group'>
                    <label for='name_first' class='col-sm-3 control-label myFormLabelsName'>Фамилия</label>
                    <div class='col-sm-9'>
                        <input type='text' class='form-control' id='name_first' placeholder='Фамилия' autocomplete='family-name'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='name_last' class='col-sm-3 control-label myFormLabelsName'>Имя</label>
                    <div class='col-sm-9'>
                        <input type='text' class='form-control' id='name_last' placeholder='Имя' autocomplete='given-name'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='email' class='col-sm-3 control-label myFormLabelsName'>Email</label>
                    <div class='col-sm-9'>
                        <input type='email' class='form-control' id='email' placeholder='Email'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='password' class='col-sm-3 control-label myFormLabelsName'>Пароль</label>
                    <div class='col-sm-9'>
                        <input type='password' class='form-control' id='password' placeholder='Password'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='authors' class='col-sm-3 control-label myFormLabelsName'>Автор</label>
                    <div class='col-sm-9'>
                        <select class='form-control myFormControl' id='authors'>
                            ${this.state.availableAuthors.map((author) => {
                                return hyperHTML.wire()`
                                    <option id=${author._id}>${author.name.first} ${author.name.last} ${author.patronymic}</option>
                                `
                            })}
                        </select>
                    </div>
                </div>
                <div class='form-group'>
                    <div class='col-sm-9'>
                        <button class='btn btn-primary myButtonRegister'>Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        `

        return this.html`
            <div class='register' id='login-page'>
                <div class="navForMainPage">
                    ${new NavBar (this.state)}
                </div>
                <div class='container'>
                    <div class='row'>
                        <div class='myRegister'>
                        
                        ${firstPart}    

                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}