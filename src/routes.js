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