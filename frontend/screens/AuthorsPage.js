const hyperHTML = require('hyperhtml/cjs').default;
const NavBar = require('../components/navbar/Navbar');
const Posts = require('../components/Posts');
const PostEditor = require('../components/PostEditor');

import Uppy from 'uppy/lib/core';
import Dashboard from 'uppy/lib/plugins/Dashboard';
import XHRUpload from 'uppy/lib/plugins/XHRUpload';
import Webcam from 'uppy/lib/plugins/Webcam';

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

class AuthorSidebar extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let photo = this.state.photo;
        let name = `${this.state.name.first} ${this.state.name.last} ${this.state.patronymic}`;
        let birthDay = new Date(this.state.birthDay);
        birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        
        return this.html`
            <div class='sidebar-nav'>
                <img class='img-circle user-picture' src='${(photo) ? `/${photo.filename}` : '/images/avatar-default.png'}' alt='${name}'>
                <h2 class='text-center'>${name}</h2>
                <hr>
                <p class='text-center user-description hidden-xs'>
                    <i>${birthDay}</i>
                    <br>
                    <i>${this.state.birthCity}, ${this.state.birthCountry}</i>
                </p>
            </div>
            `
    }
}

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
        let deathDay = new Date(this.state.birthDay);
        deathDay = deathDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
        
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
                        <a href="${this.state.wikipediaLink}">Вики</a>
                    </div>
                </div>            
                <div class="flexBoxAuthorInformation">
                    <div class="divDataName">
                        Куратор страницы:
                    </div>
                    <div class="divData">
                        ${this.state.name.first} ${this.state.name.last}
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
                let newPost = JSON.parse(this.responseText);
                that.state.posts.results.unshift(newPost.post);
                that.state.uploadedFiles = [];
                that.render();
            }
        }
    }

    render() {
        console.log(this);
        
        return this.html`
            <div  >
                ${new NavBar (this.state)}
                <div class='profile'>
                    ${new AuthorSidebar(this.state.author)}
                    <div class='content-posts profile-content'>
                        <div class='banner-profile' style='background-image: url("/images/bookshelf.jpg");'></div>
                        <div class='container-fluid container-posts'>

                            ${(_LOCALS.isSignedIn && _LOCALS.user.currentAuthor._id == this.state.author._id)
                                ? hyperHTML.wire()`
                                    <div class='card-post'>
                                        <div>Новая публикация</div>
                                        ${new PostEditor({that: this, autoFocus: false, post: '', class: '', buttons: [{title: 'Опубликовать', class: 'btn btn-primary', onClick: this.addNewPost}], actions: {getUploadedFiles: this.getUploadedFiles}})}
                                    </div>
                                `
                                : ''
                            }
                            ${new AuthorInfo(this.state.author)}
                        </div>
                        ${new Posts(this.state)}
                    </div>
                </div>
            </div>
        `
    }
}