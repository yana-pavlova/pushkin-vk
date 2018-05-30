class Related extends hyperHTML.Component {
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
                        <p><i>Интересное</i></p>
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
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                    <div class="col-xs-3 popular-img">
                        <a href="#">
                        <img src="/images/avatar-default.png" alt="User name" class="img-circle">
                        </a>
                    </div>
                </div>
            </div>
        
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
        `;
    }
}
