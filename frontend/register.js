const hyperHTML = require('hyperhtml/cjs').default;
let Register = require('./screens/Register');

// let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';
let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';

fetch('/api/authors/available' + api, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new Register(res)}`;
}).catch(e => console.log(e));
