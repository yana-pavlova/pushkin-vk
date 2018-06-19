const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./components/wall');

// let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';
let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';

fetch('/api/post/list' + api, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new Wall(res)}`;
}).catch(e => console.log(e));

