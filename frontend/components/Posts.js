const hyperHTML = require('hyperhtml/cjs').default;
const PostEditor = require('./PostEditor');
const PostImage = require('./PostImage');
let Loading = require('./Loading');

module.exports = class Posts extends hyperHTML.Component {
    constructor(state, queryPrefix, isSinglePost=false) {
        super();
        this.queryPrefix = queryPrefix || '/api/post/list'
        this.currentPage = 1;
        this.state = state;
        if (isSinglePost) this.hasMore = !isSinglePost;
        else this.hasMore = !(this.state.posts.totalPages == this.currentPage);
        this.loading = new Loading({visible: false});
        this.showMoreButtonId = 'buttonDown';
        this.showMoreButton = hyperHTML.wire()`<button id=${this.showMoreButtonId} onclick=${this.getNextPage.bind(this)}>Показать ещё</button>`
    }

    getNextPage(e){
        e.preventDefault();
        let showMoreButtonEl = document.querySelector(`#${this.showMoreButtonId}`);
        this.currentPage += 1;
        let query = `${this.queryPrefix}?page=${this.currentPage}`;
        let postCount = this.state.posts.results.length;
        this.loading.show();
        showMoreButtonEl.hidden = true;

        let that = this;
        fetch(query, {method: 'GET'}, true).then((res) => {
            return res.json();
        }).then((res) => {
            if (!res.posts.results.length) {
                showMoreButtonEl.hidden = true;
                this.loading.hide();
            }
            else {
                that.loading.hide();
                showMoreButtonEl.hidden = false;
                let newState = {...that.state}
                newState.posts.results = that.state.posts.results.concat(res.posts.results);
                that.setState(newState)

                let index = postCount;
                window.location = `${window.location.pathname}#${this.state.posts.results[index].id}`;
            }
        }).catch(e => console.log(e));
    }

    render() {
        return this.html`
            <div class='container-posts'>
                ${this.state.posts.results.map(post => new Post(post))}
                ${this.showMoreButton}
                ${this.loading}
            </div>

            <div class="modal fade" id="image-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close myButtonClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <div class="modal-title my-image-modal-title">Просмотр изображения</div>
                        </div>
                        <div class="modal-body">
                            <img class="img-responsive center-block" src="" alt="">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

class Post extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        let post = this.state;
        let author = this.state.author;
        let comments = this.state.comments;
        let id = this.state.id;
        
        return this.html`
        <div class="card-post">
            <a name="${id}">
                ${new ContentHeader(author, post.publishedDate, 'author')}
                <div class='flex_containerPost'>
                        ${new PostContent(post)}
                        ${new CommentBlock(comments, post.id)}
                </div>
            </a>
        </div>
            `
    }
}

class PostContent extends hyperHTML.Component {
    constructor(post) {
        super();
        this.post = post;
        this.showAll = false;
        this.isEdited = false;
        this.visible = true;
        this.state.uploadedFiles = [];
        this.getUploadedFiles = this.getUploadedFiles.bind(this);
    }
    
    deletePost() {
        let postId = this.post.id;
        let that = this;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/post/' + postId + '/remove', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                location.reload();
            }
        }
    }

    editContent() {
        this.isEdited = true;
        this.render();
    }

    cancelEdition() {
        this.isEdited = false;
        this.render();
    }

    saveEdition(content) {
        let contentValue = content.render().querySelector('textarea').value;
        let postId = this.post.id;

        let queryArray = [];
        if (contentValue !== '') queryArray.push(`content=${contentValue}`);
        let newImage = this.post.image;
        
        if (this.state.uploadedFiles.length !== 0) {
            newImage = this.state.uploadedFiles[0];
            
            queryArray.push(`image=${newImage.filename}`);
            
        }

        if (queryArray.length === 0) return;

        let conditions = queryArray.map((q) => q).join('&');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/post/' + postId + '/update?' + conditions, true);
        xhr.send();

        let that = this;
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                
                that.post.content = contentValue;
                that.post.image = newImage;
                
                that.showAll = true;
                that.isEdited = false;
                that.render();
            }
        }
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

    showMore() {
        this.showAll = true;
        this.render();
    }

    onconnected(element){
        let title = this.post.author.name.last + ' ' + this.post.author.name.first + ' в проекте "Пушкин в VK". Узнай, о чём пишут классики!'
        let link = window.location.origin + "/wall/post/" + this.post.id;
        
        this.element = event.srcElement;
        let share = Ya.share2(`${this.shareElementId}`, {
            content: {
                url: link,
                title: title,
                description: 'Сообщество мёртвых писателей. Качественный контент. Присоединяйся!'          
            }
        });
        
    }

    render(){
        let content;
        let image = '';
        if (this.post.image.filename){
            image = new PostImage(this.post.image);
        }
        if (this.isEdited) {
            content = hyperHTML.wire()`
                ${new PostEditor({
                        that: this,
                        autoFocus: true, 
                        post: this.post, 
                        class: '', 
                        buttons: [
                            {title: 'Сохранить', class: 'btn btn-primary', onClick: this.saveEdition}, 
                            {title: 'Отменить', class: 'btn btnCancel', onClick: this.cancelEdition},
                        ],
                        actions: {getUploadedFiles: this.getUploadedFiles}
                    })
                }
            `
        }
        else {
            let text;
            if (this.post.content.length > 300 && !this.showAll) {
                text = hyperHTML.wire()`
                    <div class='card-post-text content-extendable' data-call=showMore onclick=${this}>
                        ${{html: this.post.content.substr(0, 300)}}...
                        <br>
                        <a>Разверни меня полностью</a>
                    </div>
                `
            }
            else {
                text = hyperHTML.wire()`<div class='card-post-text'>
                    ${{html: this.post.content}}</div>`
            }
            content = hyperHTML.wire()`
                ${text}
                ${image}
                ${(_LOCALS.isSignedIn && _LOCALS.user.role == 'author' && this.post.author._id == _LOCALS.user.currentAuthor._id)
                    ? new Dropdown([
                        {text: 'редактировать', clickHandler: this.editContent, that: this}, 
                        {text: 'удалить', clickHandler: this.deletePost, that: this}
                    ])
                    : ''
                }
            `
        }
        this.shareElementId = `share_${this.post.id}`
        return this.html`
            <div class='card-post-content flexBoxPost' onconnected=${this}>${content}</div>
            <div class='reaction flexBoxLike'>
                ${new Like(this.post)}
                <div id='${this.shareElementId}' class="ya-share2" data-services="vkontakte,facebook,twitter,odnoklassniki,moimir,linkedin,lj,viber,whatsapp,skype,telegram" counter="true" data-limit="3"></div>
            </div>
        `
    }
}

class Like extends hyperHTML.Component {
    constructor(post) {
        super();
        this.state.postId = post.id;
        this.state.postAuthor = post.author._id;
        this.state.likesCount = (post.likes) ? post.likes.length : 0;
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        e.preventDefault();
        if (!_LOCALS.isSignedIn) return;
        if (_LOCALS.user._id == this.state.postAuthor) return;
        
        let queryArray = [];
        let role = _LOCALS.user.role;

        queryArray.push(`postId=${this.state.postId}`);
        
        if (role == 'author') queryArray.push(`author=${_LOCALS.user.currentAuthor._id}`);
        if (queryArray.length === 0) return;

        let query = queryArray.map((q) => q).join('&');
        if (role == 'author') query = `/api/like/post/?${query}`;
        if (role == 'reader') query = `/api/like/post-by-reader/?${query}`;
        // let q = `/api/like/post/?postId=${this.state.postId}&author=${_LOCALS.user.currentAuthor._id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', query, true);
        xhr.send();
        let that = this;
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                let res = JSON.parse(this.responseText);
                if (res.error) return;
                that.state.likesCount = res.likesCount;
                that.render();
            }
        }
    }

    render() {
        let image = (this.state.likesCount == 0) ? 'https://twemoji.maxcdn.com/2/72x72/1f49b.png' : 'https://twemoji.maxcdn.com/16x16/2764.png';
        let imageAlt = (this.state.likesCount == 0) ? '♡' : '❤';
        let className = 'disabled';
        if (_LOCALS.isSignedIn) {
            if (_LOCALS.user._id != this.state.postAuthor) className = 'enabled';
        }
        return this.html`
            <a onclick='${this.clickHandler}' class='${className}'>
                <img draggable='false' class='emoji' alt=${imageAlt} src=${image}><span class='emoji-count'>${this.state.likesCount}</span>
            </a>
        `
    }
}

class CommentBlock extends hyperHTML.Component {
    constructor(comments, postId) {
        super();
        this.commentsMaxLength = 3;
        this.showAll = false;
        this.comments = comments || [];
        this.postId = postId;
        this.addComment = this.addComment.bind(this);
    }

    addComment(event) {
        let contentValue = event.render().querySelector('textarea').value;
        let queryArray = [];
        let role = _LOCALS.user.role;

        if (contentValue !== '') queryArray.push(`content=${contentValue}`);
        queryArray.push(`post=${this.postId}`);
        
        if (role == 'author') queryArray.push(`author=${_LOCALS.user.currentAuthor._id}`);

        if (queryArray.length === 0) return;

        let query = queryArray.map((q) => q).join('&');
        
        if (role == 'author') query = `/api/comment/create/?${query}`;
        if (role == 'reader') query = `/api/comment/create-by-reader/?${query}`;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', query, true);
        xhr.send();
        
        let that = this;
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                let newComment = JSON.parse(this.responseText);
                console.log(newComment);
                
                that.comments.unshift(newComment.comment);
                that.render();
            }
        }
    }

    showMore(e) {
        e.preventDefault()
        this.showAll = true;
        this.render();
    }

    render() {
        if (!this.comments.length && !_LOCALS.isSignedIn) return this.html`<div></div>`;
        let role;
        if (_LOCALS.isSignedIn) role = _LOCALS.user.role;
        let comments;
        if (this.comments.length > this.commentsMaxLength && !this.showAll) {
            comments = hyperHTML.wire()`
                <ul>
                    ${this.comments.map((comment, i) => {
                        if (i < this.commentsMaxLength) {
                            let header = ''
                            if (comment.hasOwnProperty('author')) header = new ContentHeader(comment.author, comment.publishedDate, 'author');
                            else header = new ContentHeader(comment.user, comment.publishedDate, 'reader')
                            return hyperHTML.wire()`
                            <hr>
                                <li>
                                    ${header}
                                    <div class='comment-content'>
                                        ${comment.content}
                                    </div>
                                </li>
                            `
                        }
                        else return hyperHTML.wire()`<div></div>`
                    })}
                </ul>
                <div>
                    <button type="button" class="btn btn-primary btn-link" data-call=showMore onclick=${this}>Показать все комментарии</button>
                </div>
            `
        }
        else {
            comments = hyperHTML.wire()`
                <ul>
                    ${this.comments.map(comment => {
                        let header = ''
                        if (comment.hasOwnProperty('author')) header = new ContentHeader(comment.author, comment.publishedDate, 'author');
                        else header = new ContentHeader(comment.user, comment.publishedDate, 'reader')
                        return hyperHTML.wire(comment)`
                            <hr>
                            <li>
                                ${header}
                                <div class='comment-content'>
                                    ${comment.content}
                                    
                                </div>
                            </li>
                        `})}
                </ul>
            `
        }
        return this.html`
            <div class='comments'>
                ${comments}

                ${(_LOCALS.isSignedIn)
                    ? hyperHTML.wire()`
                        <div class='add-new-comment'>
                            ${new CommentEditor({
                                    that: this,
                                    autoFocus: false,
                                    content: '', 
                                    class: '',
                                    buttons: [
                                        {title: 'Комментировать', class: 'btn btn-primary', onClick: this.addComment}, 
                                    ],
                                })
                            }
                        </div>
                    `
                    : ''
                }
            </div>
        `
    }
}

const PUB_DATE_OPTS = {
    // era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric'
}

class ContentHeader extends hyperHTML.Component {
    constructor(author, pubDate, role='reader') {
        super();
        this.author = author;
        this.role = role;
        this.pubDate = '';
        if (pubDate != undefined) {
            this.pubDate = new Date(pubDate);
            this.pubDate = this.pubDate.toLocaleString('ru', PUB_DATE_OPTS);
        }
    }

    render() {

        if (this.role == 'author') {
            let authorsPage = '/author/' + this.author.slug;
            let photo = this.author.photo ? `/${this.author.photo.filename}` : '/images/avatar-default.png';
            let name = `${this.author.name.last} ${this.author.name.first}`;
            
            return this.html`
                <div class='flexContainerHeaderPost'>
                    <div class='flexBoxHeaderPost'>
                        <!--author's photo -->
                        <a href='${authorsPage}'>
                            <div class='img-circle img-user' style=${`background-image:URL(${photo});`} alt='${name}'></div>
                        </a>
                        <!--author's name -->
                    </div> <!-- end 1 flexBox -->
                    <div class='flexBoxHeaderPost info-user'>
                            <a href='${authorsPage}'>${name}</a>
                        <p>
                            <i>${this.pubDate}</i>
                        </p>
                    </div>
                    <!-- end 2flexBox -->
                </div> <!-- end flexContainer -->
            `
        }
        else {
            let photo = this.author.photo ? `/${this.author.photo.filename}` : '/images/reader-default.png';
            let name = `${this.author.name.last} ${this.author.name.first}`;
            
            return this.html`
                <div class='flexContainerHeaderPost'>
                    <div class='flexBoxHeaderPost'>
                        <!--author's photo -->
                        <div class='img-circle img-user' style=${`background-image:URL(${photo});`} alt='${name}'></div>
                        <!--author's name -->
                    </div> <!-- end 1 flexBox -->
                    <div class='flexBoxHeaderPost info-user'>
                        ${name}
                        <p>
                            <i>${this.pubDate}</i>
                        </p>
                    </div>
                    <!-- end 2flexBox -->
                </div> <!-- end flexContainer -->
            `
        }
    }
}
class Dropdown extends hyperHTML.Component {
    constructor(params) {
        super();
        this.params = params;
    }

    render() {
        return this.html`
            <div class='post-tool-bar dropdown'>
                <button class='btn btn-success dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true', aria-expanded='false'>Изменить пост</button>
                <span class='caret'></span>
                <ul class='dropdown-menu'>
                    ${ this.params.map( p => new DropdownButton(p.text, p.clickHandler, p.that) ) }
                </ul>
            </div>
        `
    }
}

class DropdownButton extends hyperHTML.Component {
    constructor(text, clickHandler, that) {
        super();
        this.text = text;
        this.clickHandler = clickHandler.bind(that);
    }

    render() {
        return this.html`
            <li><a onclick='${this.clickHandler}'>${this.text}</a></li>
        `
    }
}

let editorInstanceCounter = 0;
class CommentEditor extends hyperHTML.Component {
    
    /**
     * @param  {} params
     * @param.that {} 
     * @param.autoFocus bool focus on textarea after render
     * @param.content string
     * @param.class string
     * @param.buttons [] 
     * @param.buttons[i] {}
     * @param.buttons[i].title string
     * @param.buttons[i].class string
     * @param.buttons[i].onClick function
     */
    constructor(params) {
        super();
        editorInstanceCounter++;
        let that = params.that;
        this.autoFocus = params.autoFocus || false;
        this.textAreaId = `editor-${editorInstanceCounter}`;
        this.content = params.content || '';
        this.class = `editor ${params.class || ''}`;
        this.buttons = params.buttons;
        this.buttons.forEach((b) => {
            b.onClick = b.onClick.bind(that, this);
            b.class = b.class || 'btn';
        })
    }

    onconnected() {
        if (this.autoFocus) document.getElementById(this.textAreaId).focus();
    }

    render() {
        return this.html`
            <div class='${this.class}' onconnected=${this} >
                <textarea class='form-control' id='${this.textAreaId}' value=${this.content}></textarea>
                ${this.buttons.map((b) => {
                    return hyperHTML.wire()`
                        <button class='${b.class}' onclick=${b.onClick}>${b.title}</button>
                    `
                })}
            </div>
        `
    }
}