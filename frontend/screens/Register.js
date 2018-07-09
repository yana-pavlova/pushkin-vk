const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class RegisterPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let firstPart = hyperHTML.wire()`
            <form class='form-horizontal form-box'>
                <div class='form-group'>
                    <label for='inputEmail3' class='col-sm-2 control-label'>Email</label>
                    <div class='col-sm-10'>
                    <input type='email' class='form-control' id='inputEmail3' placeholder='Email'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='inputPassword3' class='col-sm-2 control-label'>Пароль</label>
                    <div class='col-sm-10'>
                    <input type='password' class='form-control' id='inputPassword3' placeholder='Password'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='inputPassword3' class='col-sm-2 control-label'>Автор</label>
                    <div class='col-sm-10'>
                        <select class='form-control'>
                            ${this.state.availableAuthors.map((author) => {
                                return hyperHTML.wire()`
                                    <option>${author.name.first} ${author.name.last} ${author.patronymic}</option>
                                `
                            })}
                        </select>
                    </div>
                </div>
                <div class='form-group'>
                    <div class='col-sm-offset-2 col-sm-10'>
                        <button class='btn btn-social'>Зарегистрироваться</button>
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