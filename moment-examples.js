var moment = require('moment');
var now = moment();

console.log(now.format());
// console.log(now.format('YYYY MM DD'));

now.subtract(1, 'year');
console.log(now.format());

console.log(now.format('h:mm a'));
console.log(now.format('MMM Do YYYY, h:mm a'));

// timestamp
// # of seconds since Jan 1, 1970

console.log('Formats');

console.log(now.format('X'));
// JS adds 3 spaces for ms
console.log(now.format('x'));

console.log(now.valueOf());  // gives a number

var timestamp = 1440707852799;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.format());

console.log(timestampMoment.local().format('h:mm a'));
