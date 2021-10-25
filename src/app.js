const express = require('express')
const cookie = require('cookie-parser')
const http = require('http')
const path = require('path')



class App {


    constructor () {
        this.app = express()
        this.server = http.createServer(this.app)
    }


    middlewares () {

        this.app.set('view engine', 'ejs')
        this.app.set('views', path.join(__dirname, './app/views/'))

        this.app.use(express.json())
        this.app.use(cookie())
        this.app.use(express.static(path.join(__dirname, './public')))
        this.app.use((request, respose, next) => {

            request.header('Access-Controll-Allow-Origin', '*')
            request.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE')
            request.header('Access-Controll-Allow-Headers', 'Access, Content-type, Authorozation, Acept, Origin, X-Requested-With')
            
            next()
        })
    }


    routes (routes) {
        this.app.use(routes)
    }


    run (port = 80) {
        this.server.listen(port, '127.0.0.1', () => {
            console.log(`Servidor ativo na porta : ${ port }`);
        })
    }
}



module.exports = new App()
