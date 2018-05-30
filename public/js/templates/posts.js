class Posts extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        return this.html`
        <div class='container-fluid container-posts'>
            ${ this.state.posts.map( post => new Post(post) ) }
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

        return this.html`
            <div class='card-post'>
                ${new ContentHeader(author, post.publishedDate)}
                <div class='row'>
                    <div class='col-sm-8 col-sm-offset-2'>
                        ${new PostContent(post)}
                        ${new CommentBlock(comments, post.id)}
                    </div>
                </div>
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
    }
    
    deletePost() {
        console.log('deletePost', this.post.content);
        this.post.content = '123';
        this.render();
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
        content = content.render().querySelector('textarea').value;
        let postId = this.post.id;
        let that = this;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/post/' + postId + '/update?content=' + content, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                that.post.content = content;
                that.showAll = true;
                that.isEdited = false;
                that.render();
                console.log(that);
                
            }
        }
    }

    showMore() {
        this.showAll = true;
        this.render();
    }

    render(){
        let content;
        if (this.isEdited) {
            content = hyperHTML.wire()`
                ${ new Editor(this.post.content, this.cancelEdition, this.saveEdition, this) }
            `
        }
        else {
            let text;
            if (this.post.content.length > 100 && this.showAll == false) {
                text = hyperHTML.wire()`
                    <div class='card-post-text post-extendable' data-call=showMore onclick=${this}>
                        ${this.post.content.substr(0, 100)}...
                        <br>
                        <a>Показать полностью</a>
                    </div>
                `
            }
            else {
                text = hyperHTML.wire()`<div class='card-post-text'>${this.post.content}</div>`
            }
            content = hyperHTML.wire()`
                ${text}
                ${(_LOCALS.registered && this.post.author._id == _LOCALS.user._id)
                    ? new Dropdown([
                        {text: 'редактировать', clickHandler: this.editContent, that: this}, 
                        {text: 'удалить', clickHandler: this.deletePost, that: this}
                    ])
                    : ''
                }
            `
        }
        return this.html`
            <div class='card-post-content'>${content}</div>
            <div class='reaction'>
                ${new Like(this.post)}
            </div>
        `
    }
}

class Like extends hyperHTML.Component {
    constructor(post) {
        super();
        this.state.postId = post.id;
        this.state.postAuthor = post.author._id;
        this.state.likesCount = post.likes.length;
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        e.preventDefault();
        if (!_LOCALS.registered) return;
        if (_LOCALS.user._id == this.state.postAuthor) return;
        let q = `/api/like/post/${this.state.postId}`;
        let xhr = new XMLHttpRequest();
        let that = this;
        
        xhr.open('GET', q, true);
        xhr.send();
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
        let clName = 'disabled';
        if (_LOCALS.registered) {
            if (_LOCALS.user._id != this.state.postAuthor) clName = 'enabled';
        }
        return this.html`
            <a onclick='${this.clickHandler}' class='${clName}'>
                <img draggable='false' class='emoji' alt=${imageAlt} src=${image}><span class='emoji-count'>${this.state.likesCount}</span>
            </a>
        `
    }
}

class Editor extends hyperHTML.Component {
    constructor(content, onCancel, onSave, that) {
        super();
        this.content = content;
        this.onCancel = onCancel.bind(that);
        this.onSave = onSave.bind(that, this);
    }

    render() {
        return this.html`
            <div class='card-post-editor'>
                <textarea class='form-control' value=${this.content}></textarea>
                <button class='btn btn-default' onclick=${this.onCancel}>Отменить</button>
                <button class='btn btn-primary' onclick=${this.onSave}>Сохранить</button>
            </div>
        `
    }
}

class CommentBlock extends hyperHTML.Component {
    constructor(comments, postId) {
        super();
        this.comments = comments;
        this.postId = postId;
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();
        let content = e.target.querySelector('textarea').value;
        let q = '/api/comment/create?';
            q += 'content=' + content;
            q += '&post=' + this.postId;
        
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.open('GET', q, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    let newComment = JSON.parse(this.responseText);
                    that.comments.push(newComment.comment);
                    that.render();
                }
            }
    }

    render() {
        return this.html`
            <div class='comments'>
                <!-- <div class="more-comments">View more comments</div> -->
                <!-- <div class='col-sm-8 col-sm-offset-2'> -->
                    <ul>
                        ${this.comments.map(comment => hyperHTML.wire(comment)`
                            <li>
                                ${new ContentHeader(comment.author, comment.publishedDate)}
                                <div class='comment-content col-xs-offset-3 col-sm-offset-2'>
                                    ${comment.content}
                                </div>
                            </li>
                        `)}
                    </ul>
                    ${(_LOCALS.registered)
                        ? hyperHTML.wire()`
                            <div class='add-new-comment'>
                                <div class='comment-editor'>
                                    <form onsubmit='${this.addComment}'>
                                        <textarea class='form=control'></textarea>
                                        <button class='btn ' type='submit'>Комментировать</button>
                                    </form>
                                </div>
                            </div>
                        `
                        : ''
                    }
                <!-- </div> -->
            </div>
        `
    }
}

class ContentHeader extends hyperHTML.Component {
    constructor(author, pubDate) {
        super();
        this.author = author;
        
        let pubDateOpts = {
            // era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric'
          };
        
        this.pubDate = '';
        if (pubDate != undefined) {
            this.pubDate = new Date(pubDate);
            this.pubDate = this.pubDate.toLocaleString('ru', pubDateOpts);
        }
    }

    render() {
        let author = this.author;
        let authorsPage = '/author/' + this.author.slug;
        let authorPhoto = this.author.authorPhoto;
        
        return this.html`
            <div class='row'>
                    <div class='col-xs-3 col-sm-2'>
                        <!--author's photo -->
                        <a href='${authorsPage}'>
                            <img class='img-circle img-user' src='${(authorPhoto) ? `/${authorPhoto.filename}` : '/images/avatar-default.png'}' alt='${author.authorName.full}'>
                        </a>
                        <!--author's name -->
                    </div>
                    <div class='col-xs-9 col-sm-10 info-user'>
                        <div>
                            <a href='${authorsPage}'>${author.authorName.last} ${author.authorName.first}</a>
                        </div>
                        <p>
                            <i>${this.pubDate}</i>
                        </p>
                    </div>
                </div>
        `
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
                <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true', aria-expanded='false'>...</button>
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
