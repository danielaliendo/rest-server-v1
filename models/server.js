const express = require('express');
const cors = require('cors');
const router = require('../routes/users');
const {connection} = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // connect database
        this.connectDB();

        // middlewares
        this.middlewares();

        // app routes
        this.routes();

    }

    async connectDB() {
        await connection();
    }

    middlewares() {

        this.app.use(cors())  // CORS
        this.app.use(express.json()) // Read and parse body
        this.app.use(express.static('public')) // Public folder

    }

    routes() {

        this.app.use(this.usersPath, router)

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

    }

}

module.exports = Server