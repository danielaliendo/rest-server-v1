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

        this.app.get('/api', (req, res) => {
            res.status(403).json({
                msg: 'get API'
            })
        })

        this.app.put('/api', (req, res) => {

            // status code 400 means that the request cannot be fulfilled due to bad syntax by a client error.
            res.status(400).json({
                msg: 'put API'
            })

        })

        this.app.delete('/api', (req, res) => {

            // status code 500 given when no more specific message is suitable.
            res.status(500).json({
                msg: 'delete API'
            })

        })

        this.app.post('/api', (req, res) => {

            // status code 201 means that the request has been fulfilled and resulted in a new resource being created
            res.status(201).json({
                msg: 'post API'
            })

        })

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

    }

}

module.exports = Server