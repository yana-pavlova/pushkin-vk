const hyperHTML = require('hyperhtml/cjs').default;
let SingleTest = require('./screens/SingleTest');

hyperHTML(document.querySelector('#content'))`${new SingleTest()}`;