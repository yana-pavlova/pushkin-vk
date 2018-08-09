const hyperHTML = require('hyperhtml/cjs').default;
let Tests = require('./screens/Tests');


hyperHTML(document.querySelector('#content'))`${new Tests()}`;