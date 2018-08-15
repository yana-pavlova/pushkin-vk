const hyperHTML = require('hyperhtml/cjs').default;
let Emodji = require('./screens/Emodji');

hyperHTML(document.querySelector('#content'))`${new Emodji()}`;