const hyperHTML = require('hyperhtml/cjs').default;
const AuthorsPage = require('./screens/AuthorsPage');

let Loading = require('./components/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

let author = document.location.pathname.replace('/author', '');

fetch('/api/post/list' + author, {method: 'GET'}).then((res) => {
        return res.json();
    }).then((res) => {
        hyperHTML(document.querySelector('#content'))`${new AuthorsPage(res)}`;
    }).catch(e => console.log(e));
