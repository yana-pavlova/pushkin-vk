const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
require('../components/Error');

module.exports = class Login extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    login(e) {
        e.preventDefault();
        let form = e.target;
        let username = 'username=' + form.querySelector('#email').value;
        let password = 'password=' + form.querySelector('#password').value;
        let q = 'auth/signin?' + username + '&' + password;
        let xhr = new XMLHttpRequest();
        let that = this;
        
        xhr.open('GET', q, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                let res = JSON.parse(this.responseText);
                if (res.success) window.location = '/wall';
                else {
                    window.errorWindow.showError(res.message);
                    console.log(res);
                }
            }
        }
    }

    render() {
        return this.html`
            <div class="navForMainPage">
                ${new NavBar (this.state)}
            </div>

            <form-box>
                <form-logo>
                <p class="text-center">
                    <img src='./images/logo.png', alt='logo'>            
                </p>
                <form onsubmit=${this.login.bind(this)} id="loginForm">
                    <input id="email" class="form-control" type='text' placeholder='E-mail' autocomplete='email'>
                    <input id="password" class="form-control" type='password', placeholder='Пароль', autocomplete='current-password'>
                    <input class="btn btn-primary" type='submit', value='ВОЙТИ'>
                    <hr>
                    <a class="btn" data-toggle="modal", data-target="#forgotPasswordModal", href='#', title='Forgot password', style='color: white'>
                        Забыли пароль?
                    </a>
                    <a class="btn" href='register' title='Sign in', style='color: white'>
                        Новый пользователь?
                    </a>
                    <a class="btn" href='register-reader' title='Sign in', style='color: white'>
                        Новый читатель?
                    </a>
                    <hr>
                    <a class="btn" href="/">
                        На главную
                    </a>            
                </form>
                    <div id="forgotPasswordModal" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4>
                                        Если вы забыли пароль
                                    </h4>
                                </div>
                                <div class="modal-body">
                                        <p>
                                            Во-первых, нам очень жаль, потому что мгновенного способа восстановить пароль на сайте не существует.
                                        </p>
                                        <p>
                                            Во-вторых, напишите нам письмо с темой "Я забыл пароль" на адрес pushkinvk@gmail.com и ждите ответа в течение дня
                                        </p>
                                        <p>
                                            А пока у вас нет доступа к личному кабинету, пройдите вот 
                                            <a href="/emodji" style="color:blue">сюда</a> или <a href="tests/testsIndex.html" style="color:blue">сюда</a>
                                            Приятного времяпрепровождения!
                                        </p>                            
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default forgotPasswordButton" data-dismiss="modal">Всё понял!</button>                
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form-logo>        
            </form-box>
        `
    }
}