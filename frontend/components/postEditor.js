const hyperHTML = require('hyperhtml/cjs').default;

let editorInstanceCounter = 0;
module.exports = class PostEditor extends hyperHTML.Component {
    
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
        console.log(params);

        editorInstanceCounter++;
        let that = params.that;
        this.autoFocus = params.autoFocus || false;
        this.textAreaId = `editor-${editorInstanceCounter}`;
        this.post = params.post;
        this.class = `editor ${params.class || ''}`;
        this.buttons = params.buttons;
        this.buttons.forEach((b) => {
            b.onClick = b.onClick.bind(that, this);
            b.class = b.class || 'btn';
        })
        this.state.images = this.post.image;
        this.state.uploadedFiles = [{preview: '/uploads/jam.png'}];
    }

    onconnected() {
        if (this.autoFocus) document.getElementById(this.textAreaId).focus();
    }

    render() {
        return this.html`
            <div class='${this.class}' onconnected=${this} >
                <textarea class='form-control' id='${this.textAreaId}' value=${this.post.content}></textarea>
                ${this.buttons.map((b) => {
                    return hyperHTML.wire()`
                        <button class='${b.class}' onclick=${b.onClick}>${b.title}</button>
                    `
                })}
                <hr>
                <div>
                    <button class='btn btn-link' id='UppyModalOpenerBtn'>Добавить изображение</button>
                    <div class="DashboardContainer"></div>
                    ${(this.state.uploadedFiles.length)
                        ? hyperHTML.wire()`
                            <div class='image-preview'>
                                Добавлено 1 изображение:
                                <br>
                                <div class='thumbnail'>
                                    <img src='${this.post.image.filename}'>
                                    <a>X</a>
                                </div>
                            </div>
                            `
                        : ''
                    }
                </div>
                
            </div>
        `
    }
}