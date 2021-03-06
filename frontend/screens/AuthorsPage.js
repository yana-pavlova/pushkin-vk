const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
const Posts = require('../components/Posts');
const PostEditor = require('../components/PostEditor');
require('../components/Error');

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

// class AuthorSidebar extends hyperHTML.Component {
//     constructor(state) {
//         super();
//         this.state = state;
//     }

//     render() {
//         let photo = this.state.photo;
//         let name = `${this.state.name.first} ${this.state.name.last} ${this.state.patronymic}`;
//         let birthDay = new Date(this.state.birthDay);
//         birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        
//         return this.html`
//             <div class='sidebar-nav'>
//               <div class="flexContainerForSidebar">
//                 <img class='img-circle user-picture' src='${(photo) ? `/${photo.filename}` : '/images/avatar-default.png'}' alt='${name}'>
//                 <h2 class='text-center'>${name}</h2>
//                 <hr>
//               </div>
//             </div>
//             `
//     }
// }

class AuthorInfo extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let authorPhoto = this.state.photo;
        let name = `${this.state.name.first} ${this.state.name.last} ${this.state.patronymic}`;
        let birthDay = new Date(this.state.birthDay);
        birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        let deathDay = new Date(this.state.deathDay);
        deathDay = deathDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        let user = this.state.user;
        
        return this.html`
            <div class='flexContainerAuthorInformation'>
                <h3>${name}</h3>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Дата рождения:
                    </div>
                    <div class="divData">
                        ${birthDay}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Дата смерти:
                    </div>
                    <div class="divData">
                        ${deathDay}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Место рождения:
                    </div>
                    <div class="divData">
                        ${this.state.birthCity}, ${this.state.birthCountry}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Родители:
                    </div>
                    <div class="divData">
                        ${this.state.parents}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Дети:
                    </div>
                    <div class="divData">
                        ${this.state.children}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Награды:
                    </div>
                    <div class="divData">
                        ${this.state.honors}
                    </div>
                </div>
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Ссылки:
                    </div>
                    <div class="divData">
                        <a target="_blank" href="${this.state.wikipediaLink}">Вики</a>
                    </div>
                </div>            
            </div>
        `
    }
}

module.exports = class AuthorsPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.state.uploadedFiles = [];
        this.getUploadedFiles = this.getUploadedFiles.bind(this);
        this.queryPrefix = `/api/post/list/${this.state.author.slug}`
    }

    getUploadedFiles(file) {
        let uploadedFile = [];
        
        let nextState = { ...this.state };
        
        nextState.uploadedFiles.push({
            preview: file.preview,
            path: file.response.body.fullPath,
            filename: file.response.body.fileName,
        });

        this.state = { ...nextState };
        
    }

    addNewPost(e) {
        let contentValue = e.render().querySelector('textarea').value;
        contentValue = contentValue.split("\n").join("<br>");
        if (contentValue.length > 2000) {
            window.errorWindow.showError('Не больше 2000 символов.');
            return;
        }
        
        let queryArray = [];
        if (contentValue !== '') queryArray.push(`content=${contentValue}`);
        if (this.state.uploadedFiles.length !== 0) queryArray.push(`image=${this.state.uploadedFiles[0].filename}`);
        queryArray.push(`author=${_LOCALS.user.currentAuthor._id}`);

        if (queryArray.length === 0) return;

        let query = queryArray.map((q) => q).join('&');
        query = `/api/post/create/?${query}`;

        const xhr = new XMLHttpRequest();
        
        let that = this;
        xhr.open('GET', query, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                let res = JSON.parse(this.responseText);
                console.log(res);
                if (res.error) {
                    window.errorWindow.showError(res.error);
                    console.log(res);
                }
                else {
                    that.state.posts.results.unshift(res.post);
                    that.state.uploadedFiles = [];
                    that.render();
                }
            }
        }
    }

    render() {
        // console.log(this);
        let newPub = '';
        if (_LOCALS.isSignedIn) {
            if (_LOCALS.user.role == 'author' && _LOCALS.user.currentAuthor._id == this.state.author._id) {
                newPub = hyperHTML.wire()`
                    <div class='card-post newPublication'>
                        <p>Новая публикация</p>
                        ${new PostEditor({that: this, autoFocus: false, post: '', class: '', buttons: [{title: 'Опубликовать', class: 'btn btn-primary', onClick: this.addNewPost}], actions: {getUploadedFiles: this.getUploadedFiles}})}
                    </div>`
            }
        }
        return this.html`
          <a href="#top"><button class="linkUp">Вверх!</button></a>
            <div  >
                ${new NavBar (this.state)}
                <div class='profile flexContainerForAll'>
                    <div class='content-posts profile-content'><div class='container-posts'>
                            ${newPub}
                            ${new AuthorInfo(this.state.author)}
                        ${new Posts(this.state, this.queryPrefix)}
                    </div>
                </div>
            </div>
        `
    }
}