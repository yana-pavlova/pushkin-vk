const hyperHTML = require('hyperhtml/cjs').default;
let RegisterReader = require('./screens/RegisterReader');

hyperHTML(document.querySelector('#content'))`${new RegisterReader()}`;