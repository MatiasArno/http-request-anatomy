import EventEmitter from 'node:events';

const emitter = new EventEmitter();

emitter.on('event', (a, b) =>
	process.nextTick(() => {
		console.log('ASYNC EVENT --> ', a, b);
	})
);

emitter.emit('event', 15, 20);
