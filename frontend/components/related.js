const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class Related extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        return this.html`
            <!-- ABOUT -->
            <div class="card-post">
                <div class="row">
                    <div class="col-sm-12">
                        <h3><a href="#" title="Company">О проекте</a></h3>
                        <img src="/images/login.jpg" alt="Suggested post">
                    </div>
                </div>
            </div>
            
            <!-- AUTHORS -->
            <div class="card-post">
                <div class="row">
                    <div class="col-sm-12">
                        <h3>Популярные авторы</h3>
                    </div>
                    ${this.state.popularAuthors.map(a => {
                        let photo = a.photo ? a.photo.filename : "/images/avatar-default.png";
                        return hyperHTML.wire()`
                            <div class="col-xs-4 popular-img">
                                <a href='${`/author/ + ${a.slug}`}'>
                                    <div class='img-circle img-user' style=${`background-image:URL(${photo});`} alt='${name}'></div>
                                </a>
                            </div>
                        `
                    })}
                    
                </div>
            </div>
        `;
    }

    /*
    <!-- PHOTOS -->
            <div class="card-post">
                <div class="row">
                    <div class="col-sm-12">
                        <h3>Популярные фотографии</h3>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                    <div class="col-xs-4 popular-img">
                        <a href="#">
                            <img src="/images/login.jpg" alt="User name">
                        </a>
                    </div>
                </div>
            <div/>
        */
}
