const hyperHTML = require('hyperhtml/cjs').default;
import LoginDropdown from './LoginDropdown';

module.exports = class NavBar extends hyperHTML.Component {
    constructor() {
        super();
        this.activeSection = '';
        if (_LOCALS) this.activeSection = _LOCALS.section;
    }

    render() {
        let currentAuthor = '';
        if (_LOCALS.isSignedIn) {
            let a = _LOCALS.user.currentAuthor;
            if (a) {
                currentAuthor = hyperHTML.wire()`
                            <li>
                                <a href=${`/author/${a.slug}`}>${a.name.first} ${a.name.last}</a>
                            </li>
                        `
            }
        }
        return this.html`
            <div class="navbar">
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
                            ${_LOCALS.navLinks.map(l => hyperHTML.wire()`
                                    <li class='${(l.key == this.activeSection) ? 'active' : ''}'>
                                        <a class='${(l.style) ? l.style : 'btn-simple'}' href='${l.href}'>${l.label}</a>
                                    </li>
                            `)}
                        </ul>
                        <ul class='nav navbar-nav navbar-right'>
                            ${currentAuthor}
                            ${new LoginDropdown()}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}



// .navbar(role='navigation-demo')
//     .container
//         .navbar-header
//             button.navbar-toggle(type='button', data-toggle='collapse', data-target='#navigation')
//                 span.sr-only Toggle navigation
//                 span.icon-bar
//                 span.icon-bar
//                 span.icon-bar
//             a.navbar-brand(href='/')
//                 img(alt='ККРЯ' src='/images/logo.png')
        
//         #navigation.collapse.navbar-collapse
//             ul.nav.navbar-nav.navbar-left
//                 each link in navLinks
//                     li(class=(section == link.key ? 'active' : null)): a.btn(href=link.href class=(link.style ? link.style : 'btn-simple'))= link.label
//             ul.nav.navbar-nav.navbar-right
//                     if user
//                         if user.canAccessKeystone
//                             li: a(href='/keystone') Open Keystone
//                         li: a(href='/keystone/signout') Sign Out
//                     else
//                         li: a(href='/keystone/signin') Sign In
                    