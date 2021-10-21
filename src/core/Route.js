const { Router } = require('express')



class Route {


    constructor (express) {
        this.app = express
        this.router = new Router()
    }


    middlewares (middlewares) {
        const app = this.app

        middlewares.forEach(middleware => {
            app.use(middleware)
        })
        
        return this
    }


    post (prefix, action) {
        this.router.post(prefix, (request, response) => {
            action(request, response)
        })
        return this
    }


    get (prefix, action) {
        this.router.get(prefix, (request, response) => {
            action(request, response)
        })
        return this
    }


    routes () {
        return this.router
    }
}



module.exports = Route
