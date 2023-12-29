import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = 27000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ message: 'Hello, World!' }));
});

server.listen(PORT, HOST, () => console.log(`Server running on port`, PORT));
