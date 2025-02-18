import http from 'node:http'
import {routes} from "./routes.js";
import {extractQueryParams} from "./helpers/route-query-builder.js";

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

    const route = routes.filter(item => item.method === method && item.path.test(url))[0];

    if (route) {
        const path = url.match(route.path);
        const {query, ...params} = path.groups;
        req.query = query ? extractQueryParams(query) : null;
        req.params = params;
        return route.handler(req, res);
    }

    res.writeHead(200).end();
});

server.listen(3333);