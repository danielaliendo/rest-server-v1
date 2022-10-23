const express = require('express');

class Server {

    constructor() {

        this.app = express()
        this.port = process.env.PORT

        // middlewares
        this.middlewares()

        // app routes
        this.routes()

    }

    middlewares() {
        this.app.use(express.static('public')) // Public folder
    }

    routes() {

        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

    }

}

module.exports = Server