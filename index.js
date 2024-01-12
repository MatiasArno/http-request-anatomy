import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = 27000;

const server = http.createServer((req, res) => {
	const { method, url, headers } = req;

	console.log('Method --> ', method);
	console.log('URL --> ', url);

	if (method === 'POST') {
		let body = [];

		req.on('error', (err) => {
			// If you don't have a listener for the error event, the error will be thrown, which could crash your Node.js program.
			// This prints the error message and stack trace to `stderr`.
			console.error(err.stack);
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'Testing error event' }));
		})
			.on('data', (chunk) => {
				body.push(chunk);
			})
			.on('end', () => {
				const content = JSON.parse(
					Buffer.concat(body).toString('utf8')
				);
				body = { url, method, headers, ...content };
				// at this point, `body` has the entire request body stored in it as a string
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(body));
			});
	}

	if (method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ Request: 'Success!' }));
	}
});

server.listen(PORT, HOST, () => console.log(`Server running on port`, PORT));
