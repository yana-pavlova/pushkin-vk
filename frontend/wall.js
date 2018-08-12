const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./screens/Wall');

let Loading = require('./screens/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';

fetch('/api/post/list-and-pop-authors' + api, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new Wall(res)}`;
}).catch(e => console.log(e));