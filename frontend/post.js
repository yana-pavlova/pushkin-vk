const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./screens/Wall');

let postId = document.location.pathname.split('/');
postId = postId[postId.length - 1];

let Loading = require('./components/Loading');
hyperHTML(document.querySelector('#content'))`${new Loading()}`;

fetch('/api/post/' + postId, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    let data = {posts:{results:[res.post]}}
    // posts.results
    hyperHTML(document.querySelector('#content'))`${new Wall(data, true)}`;
}).catch(e => console.log(e));