import http from 'http';
import { Server } from 'socket.io';
import RequestController from './server/requestController.js';
import IOController from './server/ioController.js';

const server = http.createServer(
    (request, response) => new RequestController(request, response).handleRequest()
);

const io = new Server(server);
const gameController = new IOController(io);

server.listen(8080, () => {
    console.log('Serveur: http://localhost:8080/');
});