const hyperHTML = require('hyperhtml/cjs').default;
let ReaderRegister = require('./screens/ReaderRegister');

hyperHTML(document.querySelector('#content'))`${new ReaderRegister()}`;