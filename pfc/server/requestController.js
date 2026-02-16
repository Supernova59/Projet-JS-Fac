import * as fs from 'fs/promises';
import { getContentTypeFrom } from '../scripts/contentType.js';

export default class RequestController {
    #request;
    #response;
    #url;

    constructor(request, response) {
        this.#request = request;
        this.#response = response;
        this.#url = new URL(request.url, `http://${request.headers.host}`);
    }

    async handleRequest() {
        let filePath;
        const path = this.#url.pathname;
        if (path === '/') {
            filePath = './public/accueil.html';
        } else if (path === '/pfc') {
            filePath = './public/index.html';
        } else if (path === '/about') {
            filePath = './public/about.html';
        } else {
            filePath = `.${path}`;
        }

        try {
            const data = await fs.readFile(filePath);
            const contentType = getContentTypeFrom(filePath);
            this.#response.writeHead(200, { 'Content-Type': contentType });
            this.#response.end(data);
        } catch (err) {
            if (path !== '/favicon.ico') console.error(`Erreur ${path} :`, err.message);
            this.#response.writeHead(404, { 'Content-Type': 'text/plain' });
            this.#response.end('404 Not Found');
        }
    }
}

