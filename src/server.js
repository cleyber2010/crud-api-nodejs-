import http from 'node:http'
import {routes} from "./routes.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const buffers = [];

    for await (let chunck of req) {
        buffers.push(chunck);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    const route = routes.filter(item => item.method === method && item.path === url)[0];

    if (route) {
        return route.handler(req, res);
    }

    res.writeHead(200).end();
});

server.listen(3333);