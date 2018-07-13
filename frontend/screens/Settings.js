const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

module.exports = class RegisterPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.currentAuthor = _LOCALS.user.currentAuthor;
        this.currentAuthorName = `${this.currentAuthor.name.first} ${this.currentAuthor.name.last} ${this.currentAuthor.patronymic}`
        this.myAuthors = [];
        _LOCALS.user.authors.forEach((a) => {
            if (a._id !== this.currentAuthor._id) this.myAuthors.push(a);
        })
        this.state = state;

        this.changeCurrentAuthor = this.changeCurrentAuthor.bind(this);
        console.log(this);
        
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
                    console.log(e);
                    
                }
            }
        }
        
        
        
        return false;
    }

    changeCurrentAuthor(event) {
        let authorId = event.target.id;
        let query = `/api/user/change-current-author?author=${authorId}`;
        const xhr = new XMLHttpRequest();
        
        let that = this;
        xhr.open('GET', query, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) window.location = '/wall';
            }
        }
    }

    render() {
        let myAuthors;
        if (this.myAuthors.length) {
            myAuthors = hyperHTML.wire()`
                <hr>
                <div>
                    <b>Другие ваши авторы:</b>
                <div>
                <div class='row'>
                    <div class='container'>
                        ${this.myAuthors.map(a => {
                            let photo = a.photo ? a.photo.filename : "/images/avatar-default.png";
                            return hyperHTML.wire()`
                            <div class='row authors-list'>
                                <div class="col-xs-1 popular-img">
                                    <div class='img-circle img-user img-user-mini' style=${`background-image:URL(${photo});`} alt='${name}'></div>
                                </div>
                                <div class='col-xs-7'>
                                    ${a.name.first} ${a.name.last} ${a.patronymic}
                                </div>
                                <div class='col-xs-4'>
                                    <button id=${a._id} class='btn btn-link' onclick=${this.changeCurrentAuthor}>Сменить</button>
                                </div>
                            <div>
                        `})}
                    </div>
                </div>
            `
        }
        return this.html`
            ${new NavBar (this.state)}

            <div class='register' id='login-page'>
                <div class='container'>
                    <div class='row'>
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-lg-offset-3'>
                            <div class='form-box modal-dialog'>
                                <div>
                                    Сейчас вы  <b>${this.currentAuthorName}</b>
                                </div>
                                    ${myAuthors}
                                
                                <div>
                                    <button class='btn btn-social'>Зарегистрироваться</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}