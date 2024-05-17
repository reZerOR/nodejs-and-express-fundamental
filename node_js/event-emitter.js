const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');