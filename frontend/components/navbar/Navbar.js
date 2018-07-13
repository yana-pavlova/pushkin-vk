const hyperHTML = require('hyperhtml/cjs').default;
import LoginDropdown from './LoginDropdown';

module.exports = class NavBar extends hyperHTML.Component {
    constructor() {
        super();
        this.activeSection = '';
        if (_LOCALS) this.activeSection = _LOCALS.section;
        this.createModals();
    }

    createModals(){
        let modalsHtml = `
                <div id="myModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4>Ваше мнение важно для нас</h4>
                            </div>
                            <div class="modal-body">
                            <p>Ваше мнение очень важно для нас. Сайт функционирует в тестовом режиме. Если вы обнаружили баги, опечатки или что-то другое не менее неприятное, пожалуйста, сообщите об этом!</p>
                            <p>По любым интересующим вас вопросам обращайтесь по адресу ХХХ@mail.ru или в личку к администратору групп <a href="" style="color:black">вконтакте</a> и <a href="" style="color:black">фейсбука</a></p>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Всё понял!</button>
                            </div>
                    </div>
                    </div>
                </div>

                <div id="myModal2" class="modal fade">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4>Кто? Что? Зачем?</h4>
                        </div>
                        <div class="modal-body">
                        <p>"Пушкин в VK" - это социальная сеть русских писателей. Главная цель проекта - вернуть обществу нежные чувства к русской словесности. К сожалению, проблема отсутствия интереса к чтению стоит в нашем мире слишком остро, чтобы её можно было игнорировать.</p>
                        <p>Алгоритм приобщения к прекрасному очень прост: регистрируетесь, выбираете из списка авторов того, который вам нравится, заполняете маленькую формочку о нём (годы жизни, награды, всякое такое) и получаете доступ в личный кабинет.</p>
                        <p>На странице вы можете постить тексты (цитаты, отрывки из произведений), любые картинки (фотки, инфографику - созданную вами или не вами). Также вы можете просматривать страницы других писателей, оставлять комментарии к их постам и, конечно же, ставить лайки.</p>
                        <p>Всё, что вы постите на странице, попадает в раздел <a href="" style="color:black">"стена"</a>, на который, кстати, вы можете заглянуть и без регистрации.</p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Всё понял!</button>
                        </div>
                    </div>
                    </div>
                </div>
            `
        
        let modals = document.createElement('div')
        modals.innerHTML = modalsHtml;
        document.querySelector('body').appendChild(modals)
        
    }

    render() {
        let currentAuthor = '';
        if (_LOCALS.isSignedIn) {
            let a = _LOCALS.user.currentAuthor;
            if (a) {
                currentAuthor = hyperHTML.wire()`
                            <li>
                                <a href=${`/author/${a.slug}`}>
                                    ${a.name.first} ${a.name.last}
                                </a>
                            </li>
                        `
            }
        }
        return this.html`
            <nav class="navbar nav-pills nav-justified">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#navigation" class="navbar-toggle">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span><span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a href="/" class="navbar-brand"><img alt="ККРЯ" src="/images/logo.png"/></a>
                    </div>
                    <div id='#navigation' class='collepse navbar-collapse'>
                        <ul class='nav navbar-nav navbar-left'>
                            <li><a class="aliveA" href="/">Главная</a></li>
                            <li><a class="aliveA" href="#" data-toggle="modal" data-target="#myModal2">О<span style="opacity: 0;">о</span>проекте</a></li>
                            <li><a class="aliveA" href="#" data-toggle="modal" data-target="#myModal">Контакты</a></li>
                            <!-- <li><a class="aliveA" href="#">Политика</a></li> -->
                            <li><a class="aliveA" href="/wall">Стена</a></li>                
                            <li><a class="aliveA" href="/tests/testsIndex.html">Тесты</a></li>    
                        </ul>
                        <ul class='nav navbar-nav navbar-right'>
                            ${currentAuthor}
                            ${new LoginDropdown()}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}