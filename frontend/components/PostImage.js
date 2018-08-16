const hyperHTML = require('hyperhtml/cjs').default;
const Loading = require('./Loading');

let loadedImages = new Set();

module.exports = class PostImage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
        this.src = '/' + this.state.filename;
        this.imageClassName = 'img-post thumbnail';
        this.imageAlt = 'Изображение';
        // this.isExisted = true;
        // this.existingImage();
        this.isExisted = loadedImages.has(this.src);
        if(this.isExisted) this.existingImage()
        else this.createNewImage();
    }

    existingImage(){
        this.image = hyperHTML.wire()`<img src=${this.src} class=${this.imageClassName} alt=${this.imageAlt} tabindex=1 draggable='false' onclick=${this.showModal.bind(this)}/>`
    }

    createNewImage(){
        this.image = new Image();
        this.image.draggable = false;
        this.image.tabIndex = 1;
        this.image.alt = this.imageAlt;
        this.image.className = this.imageClassName;
        this.image.style.display = 'none';
        this.image.src = this.src;
        this.image.onload = this.onLoad.bind(this);
        this.image.onerror = this.onLoadError.bind(this);
        this.image.onclick = this.showModal.bind(this);
        this.placeHolder = new Loading({className: 'image-placeholder', visible: true});
        loadedImages.add(this.src);
    }

    onLoad(){
        this.image.style.display = 'unset';
        this.placeHolder.hide();
    }

    onLoadError(){
        // console.log('error!');
    }

    showModal(e) {
        e.preventDefault();
        let src = this.image.currentSrc;
        $('#image-modal .modal-body img').attr('src', src);
        $("#image-modal").modal('show');
    }

    render() {
        if (this.isExisted) {
            return this.html`${this.image}`
        }
        else {
            // let complete = this.image.complete;
            return this.html`
                ${this.placeHolder}
                <a>
                    ${this.image}
                </a>
            `
        }
    }
}