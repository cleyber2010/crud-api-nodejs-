import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then((data) => this.#database = JSON.parse(data))
            .catch(() => this.#persist());
    }

    select(table) {
        return this.#database[table] ?? [];
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
    }

    update(table, id, data) {
        const index = this.#database[table].findIndex(row => row.id === id);
        console.log(index);
        if (index > -1) {
            this.#database[table][index] = {id, ...data};
            this.#persist();
        }
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(row => row.id === id);

        if (index > -1) {
            this.#database[table].splice(index, 1);
            this.#persist();
        }
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
}