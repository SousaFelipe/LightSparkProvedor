const { Router } = require('express')



class Route {


    constructor () {
        this.router = new Router()
    }


    application (app) {
        this.app = app
        return this
    }


    middlewares (middlewares) {
        const app = this.app

        middlewares.forEach(middleware => {
            app.express().use(middleware)
        })
        
        return this
    }


    post (prefix, action) {
        this.router.post(prefix, (request, response) => {
            action(request, response)
        })
    }


    get (prefix, action) {
        this.router.get(prefix, (request, response) => {
            action(request, response)
        })
    }


    routes () {
        return this.router
    }
}



module.exports = new Route()
