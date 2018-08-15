const hyperHTML = require('hyperhtml/cjs').default;
let Register = require('./screens/Register');

let Loading = require('./components/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

fetch('/api/authors/available', {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new Register(res)}`;
}).catch(e => console.log(e));
