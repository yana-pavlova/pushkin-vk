const hyperHTML = require('hyperhtml/cjs').default;
let Settings = require('./screens/Settings');

if (!_LOCALS.isSignedIn) window.location = '/login';
else {
    hyperHTML(document.querySelector('#content'))`${new Settings()}`;
}