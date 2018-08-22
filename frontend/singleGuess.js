const hyperHTML = require('hyperhtml/cjs').default;
let SingleGuess = require('./screens/SingleGuess');

hyperHTML(document.querySelector('#content'))`${new SingleGuess()}`;