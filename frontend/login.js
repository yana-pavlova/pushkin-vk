const hyperHTML = require('hyperhtml/cjs').default;
let Login = require('./screens/Login');


hyperHTML(document.querySelector('#content'))`${new Login()}`;