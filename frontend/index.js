const hyperHTML = require('hyperhtml/cjs').default;
let Home = require('./screens/Home');

hyperHTML(document.querySelector('#content'))`${new Home()}`;