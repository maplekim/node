var Redis = require('redis');
var IORedis = require('ioredis');
var Redlock = require('redlock');

var client = Redis.createClient(6379, '192.168.0.99');
var redlock = new Redlock([new IORedis(6379, '192.168.0.99')]);

redlock.on('clientError', function(err) {
	console.error('A redis error has occurred:', err);
});

client.on('error', err => {
    console.log('Error :' + err);
});

async function main() {
    const lock = await redlock.lock(['locks'], 1000);

    Array.from({length: 20}, (x, i) => {
        client.INCR('resource1', Redis.print);;
        client.GET('resource1', (err, value) => {
            console.log(`locking! ${value}`);
        });
    });
    await lock.unlock();
}

setInterval(() => {
    main().then(console.log, console.error);
}, 100);
