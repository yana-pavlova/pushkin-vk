const hyperHTML = require('hyperhtml/cjs').default;

module.exports = class AuthorsPage extends hyperHTML.Component {
    constructor(state) {
        super();
        this.state = state;
    }

    
    render() {
        console.log(this);
        
        return this.html`
            <div>
                <select multiple class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
        `
    }
}