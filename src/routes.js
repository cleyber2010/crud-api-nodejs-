import {Database} from "./database.js";
import {buildRoutes} from "./helpers/build-routes.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutes('/users'),
        handler: (req, res) => {
            return res.setHeader('Content-Type', 'application/json')
                .end(JSON.stringify(database.select("users")));
        }
    },
    {
        method: 'POST',
        path: buildRoutes('/users'),
        handler: (req, res) => {
            const { name, email, password } = req.body;
            const data = {
                id: 10,
                name,
                email,
                password
            }
            database.insert("users", data);
            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutes('/users/:id'),
        handler: (req, res) => {
            return res.setHeader('Content-Type', 'application/json').writeHead(200).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutes('/users/:id'),
        handler: (req, res) => {

        }
    }
];