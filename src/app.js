const express = require('express')
const path = require('path')

const routes = require('./routes')



class App {


    constructor () {
        this.app = express()

        this.middlewares()
        this.routes()
    }


    middlewares () {

        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(__dirname, './app/views/'))

        this.app.use(express.json())
        this.app.use((request, respose, next) => {

            request.header('Access-Controll-Allow-Origin', '*')
            request.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE')
            request.header('Access-Controll-Allow-Headers', 'Access, Content-type, Authorozation, Acept, Origin, X-Requested-With')

            next()
        })
    }


    routes () {
        this.app.use(routes(this.app))
    }


    run (port = 8080) {
        this.app.listen(port, () => {
            console.log(`Listening on port : ${ port }`)
        })
    }
}



module.exports = new App()
