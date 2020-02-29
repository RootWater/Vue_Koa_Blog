const { sync } = require('./model.js');
const start = require('./init-data');

sync();

setTimeout((() => {
    start();
}), 5000);

console.log('init db ok.');
