const hyperHTML = require('hyperhtml/cjs').default;
let Guess = require('./screens/Guess');


hyperHTML(document.querySelector('#content'))`${new Guess()}`;