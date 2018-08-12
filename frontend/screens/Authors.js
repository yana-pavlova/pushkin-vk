const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');

const AUTHOR_DATE_OPTS = {
    // era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
    timezone: 'UTC',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
};

module.exports = class Authors extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.messageSentSuccess = hyperHTML.wire()`<div></div>`;
    }

    sendMessage(event) {
        // $('#modalMoreAuthors').modal('hide');
        // this.messageSentSuccess = hyperHTML.wire()`<div class="alert alert-success" role="alert">Ваше сообщение отправлено!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
        // <span aria-hidden="true">&times;</span>
        // </button></div>`
        // this.render()

        event.preventDefault();
        let form = event.target;

        let email = form.querySelector('#email').value;
        let newAuthor = form.querySelector('#newAuthor').value;

        let queryArray = [];
        if (email != '') queryArray.push(`email=${email}`);
        if (newAuthor != '') queryArray.push(`newAuthor=${newAuthor}`)
        if (queryArray.length === 0) return;
        
        let query = queryArray.map((q) => q).join('&');
        query = `/api/authors/request-new?${query}`;

        const xhr = new XMLHttpRequest();

        let that = this;
        xhr.open('GET', query, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    $('#modalMoreAuthors').modal('hide');
                    that.messageSentSuccess = hyperHTML.wire()`<div class="alert alert-success" role="alert">Ваше сообщение отправлено!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button></div>`
                    that.render()
                } else {
                    $('#modalMoreAuthors').modal('hide');
                    that.messageSentSuccess = hyperHTML.wire()`<div class="alert alert-danger" role="alert">Ваше сообщение не отправлено! Обновите страницу и попробуйте снова!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button></div>`
                    that.render()                    
                }
            }
        }

        return false;
    }

    render() {
        return this.html`
                ${new NavBar (this.state)}
                <a href="#top"><button class="linkUp">Вверх!</button></a>
                <a  data-toggle="modal" data-target="#modalMoreAuthors"><button class="linkUp2">Больше авторов!</button></a>
                <div class='container' id="authorsContainer">
                    ${this.messageSentSuccess}
                    <div id="modalMoreAuthors" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4>Ваше мнение важно для нас</h4>
                                </div>
                                <div class="modal-body">
                                    <p>У вас есть предложения? Хотите добавить к списку авторов ещё одного? Сообщите нам об этом!</p>
                                    <form onsubmit=${this.sendMessage.bind(this)}>
                                        <div class="form-group">
                                            <label for="email">Ваш email</label>
                                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ваш email">
                                        </div>
                                        <div class="form-group">
                                            <label for="newAuthor">Какого автора вы хотите добавить?</label>
                                            <input type="text" class="form-control" id="newAuthor" aria-describedby="emailHelp" placeholder="ФИО автора">
                                        </div>
                                        <button id= "myButtonSend" type="submit" class="btn">Отправить</button>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-dismiss="modal">Закрыть</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${this.state.authors.map((author) => {
                        // console.log(author.photo);

                        let linkAuthor = "/author/" + author.slug;
                        let linkImg = "/" + author.photo.filename;
                        let birthDay = new Date(author.birthDay);
                        birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
                        let deathDay = new Date(author.deathDay);
                        deathDay = deathDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
                        let userness = "";
                        if(author.user) {
                            userness = "<p class='busy'>Автор занят!</p>"
                        } else {
                            userness = "<a href='/register'><p class='available'>Автор свободен!</p></a>"
                        }
                        return hyperHTML.wire()`
                            <div class="authorsBlock">
                                <img src="${linkImg}">
                                <div>
                                    <a href=${linkAuthor}><h2>${author.name.first} ${author.name.last} ${author.patronymic}</h2></a>
                                    <p>${birthDay} - ${deathDay}</p>
                                    <p>${author.birthCity}, ${author.birthCountry}</p>
                                    <p class="">${{html: userness}}</p>                        
                                </div>
                            </div>

                        `
                    })}
                </div>
                `;
    }
}