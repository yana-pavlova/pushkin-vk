const hyperHTML = require('hyperhtml/cjs').default;
let Register = require('./screens/ReaderRegister');

// let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';
let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';

fetch('/api/authors/available' + api, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new ReaderRegister(res)}`;
}).catch(e => console.log(e));
