const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./screens/Wall');

// let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';
let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';

fetch('/api/post/list-and-pop-authors' + api, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    // console.log(res);
    
    hyperHTML(document.querySelector('#content'))`${new Wall(res)}`;
}).catch(e => console.log(e));

