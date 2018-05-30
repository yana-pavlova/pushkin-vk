class AuthorSidebar extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {

        return this.html`
            <div class="sidebar-nav">
                <a href="personal-profile.html" title="Profile">
                    <img src="/images/avatar-default.png" alt="User name" class="img-circle user-picture">
                </a>
                <h2 class="text-center hidden-xs"><a href="personal-profile.html" title="Profile">My User</a></h2>
                <p class="text-center user-description hidden-xs">
                    <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</i>
                </p>
            </div>
            `
    }
}

class AuthorsPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        return this.html`
            ${new NavBar (this.state)}
            <div class='profile'>
                ${new AuthorSidebar(this.state)}

                <div class='content-posts profile-content'>
                    <div class="banner-profile"></div>
                    
                    ${new Posts(this.state)}
                </div>

            </div>
        `
    }
}