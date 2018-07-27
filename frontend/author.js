const hyperHTML = require('hyperhtml/cjs').default;
const AuthorsPage = require('./screens/AuthorsPage');

// let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';
let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';


let author = document.location.pathname.replace('/author', '');

fetch('/api/post/list' + author + api, {method: 'GET'}).then((res) => {
        return res.json();
    }).then((res) => {
        console.log(res)
        
        hyperHTML(document.querySelector('#content'))`${new AuthorsPage(res)}`;
    }).catch(e => console.log(e));
