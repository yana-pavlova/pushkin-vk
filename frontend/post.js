const hyperHTML = require('hyperhtml/cjs').default;
let Wall = require('./screens/Wall');

let postId = document.location.pathname.split('/');
postId = postId[postId.length - 1];
console.log(postId);


fetch('/api/post/' + postId, {method: 'GET'}).then((res) => {
    return res.json();
}).then((res) => {
    console.log(res);
    let data = {posts:{results:[res.post]}}
    // posts.results
    hyperHTML(document.querySelector('#content'))`${new Wall(data, true)}`;
}).catch(e => console.log(e));