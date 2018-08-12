const hyperHTML = require('hyperhtml/cjs').default;
const Authors = require('./screens/Authors');

let Loading = require('./screens/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

fetch('/api/authors/all', {method: 'GET'}).then((res) => {
        return res.json();
    }).then((res) => {
        hyperHTML(document.querySelector('#content'))`${new Authors(res)}`;
    }).catch(e => console.log(e));
