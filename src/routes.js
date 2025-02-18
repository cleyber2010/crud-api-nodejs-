import {Database} from "./database.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            return res.setHeader('Content-Type', 'application/json')
                .end(JSON.stringify(database.select("users")));
        }
    },
    {
        method: 'POST',
        path: '/users',
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
        path: '/users/:id',
        handler: (req, res) => {

        }
    },
    {
        method: 'DELETE',
        path: '/users/:id',
        handler: (req, res) => {

        }
    }
];