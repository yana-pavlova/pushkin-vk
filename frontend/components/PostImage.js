const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class PostImage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.image = new Image();
        this.image.onload = this.onLoad.bind(this);
        this.image.onerror = this.onLoadError.bind(this);
        this.image.draggable = false;
        this.image.tabIndex = 1;
        this.image.alt='Изображение';
        this.image.className = 'img-post thumbnail';
        this.image.style.display = 'none';
        this.image.src = '/' + this.state.filename;
        this.image.onclick = this.showModal.bind(this);
        this.placeHolder = hyperHTML.wire()`<div class='image-placeholder'>
                                                <div class="lds-heart">
                                                    <div></div>
                                                </div>
                                            </div>`
    }

    onLoad(){
        this.image.style.display = 'unset';
        this.placeHolder = '';
        this.render();
    }

    onLoadError(){
        console.log('error!');
    }

    showModal(e) {
        e.preventDefault();
        let src = this.image.currentSrc;
        $('#image-modal .modal-body img').attr('src', src);
        $("#image-modal").modal('show');
    }

    render() {
        return this.html`
            ${this.placeHolder}
            <a>
                ${this.image}
            </a>
        `
    }
}