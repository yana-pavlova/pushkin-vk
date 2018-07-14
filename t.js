// const sendmail = require('sendmail')({
//     logger: {
//       debug: console.log,
//       info: console.info,
//       warn: console.warn,
//       error: console.error
//     },
//     silent: false,
//     dkim: { // Default: False
//       privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
//       keySelector: 'mydomainkey'
//     },
//     devPort: 1025, // Default: False
//     devHost: 'localhost', // Default: localhost
//     smtpPort: 2525, // Default: 25
//     smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
//   })

const sendmail = require('sendmail')();
 
sendmail({
    from: 'ck-main@pushkinvk.ru',
    to: 'ck-mobiler@ya.ru',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});