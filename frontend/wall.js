const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./screens/Wall');

let Loading = require('./components/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

fetch('/api/post/list-and-pop-authors', {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    hyperHTML(document.querySelector('#content'))`${new Wall(res)}`;
}).catch(e => console.log(e));