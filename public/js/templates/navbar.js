class NavBar extends hyperHTML.Component {
    constructor() {
        super();
        this.activeSection = '';
        if (_LOCALS) this.activeSection = _LOCALS.section;
    }

    render() {
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
                    <div id='#navigation' class='collapse navbar-collapse'>
                        <ul class='nav navbar-nav navbar-left'>
                            ${_LOCALS.navLinks.map(l => hyperHTML.wire()`
                                    <li class='${(l.key == this.activeSection) ? 'active' : ''}'>
                                        <a class='${(l.style) ? l.style : 'btn-simple'}' href='${l.href}'>${l.label}</a>
                                    </li>
                            `)}
                        </ul>
                        <ul class='nav navbar-nav navbar-right'>
                            <li><a>access??settings??</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}