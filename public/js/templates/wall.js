class Wall extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        return this.html`
            ${new NavBar (this.state)}
            <div class='wall'>
                <div class='content-posts active'>
                    <div class='primary-content'>
                        ${new Posts(this.state)}
                    </div>
                    <div class="sidebar-right hidden-xs hidden-sm">
                        ${new Related(this.state)}
                    </div>
                </div>
            </div>
        `;
    }
}