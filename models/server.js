const express = require('express');
const cors = require('cors');
const {connection} = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            users:      '/api/users',
            search:      '/api/search',
        }

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

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.search, require('../routes/search'))

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

    }

}

module.exports = Server