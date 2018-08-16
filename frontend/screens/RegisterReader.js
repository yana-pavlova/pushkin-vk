const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class RegisterReader extends hyperHTML.Component {
    constructor(){
        super();
        this.register = this.register.bind(this);
    }

    register(event) {
        event.preventDefault();
        let form = event.target;

        let name_first = form.querySelector('#name_first').value;
        let name_last = form.querySelector('#name_last').value;
        let email = form.querySelector('#email').value;
        let password = form.querySelector('#password').value;

        let queryArray = [];
        if (name_first != '') queryArray.push(`name_first=${name_first}`);
        if (name_last != '') queryArray.push(`name_last=${name_last}`);
        if (email != '') queryArray.push(`email=${email}`);
        if (password != '') queryArray.push(`password=${password}`);
        if (queryArray.length === 0) return;

        let query = queryArray.map((q) => q).join('&');
        query = `/api/user/create-reader?${query}`;

        const xhr = new XMLHttpRequest();

        let that = this;
        xhr.open('GET', query, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) window.location = '/login';
                else {
                    let e = JSON.parse(this.responseText);
                }
            }
        }

        return false;
    }

    render() {
        return this.html`
            <div class='register' id='login-page'>
                <div class="navForMainPage">
                    ${new NavBar (this.state)}
                </div>
                <div class='container'>
                    <div class='row'>
                        <div class='myRegister'>

                            <form class='form-horizontal form-box' onsubmit=${this.register}>
                                <p>Внимание! Регистрируясь на сайте, Вы безоговорочно и полностью принимаете <a target="_blank" href="/conditions.pdf">пользовательское соглашение</a>.</p>
                                <p>Внимание! Читатель не имеет личного кабинета и не может делать посты от имени автора. Читатель может ставить лайки и писать комментарии к постам. Если вы хотите делать посты, <a href='register'>зарегистрируйтесь</a> как автор.</p>
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
                                    <div class='col-sm-9'>
                                        <button class='btn btn-primary myButtonRegister'>Зарегистрироваться</button>
                                    </div>
                                </div>
                            </form>    

                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}