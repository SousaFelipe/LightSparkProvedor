const { Router } = require('express')



class Route {


    constructor () {
        this.router = new Router()
    }


    get (prefix, action) {
        this.router.get(prefix, (request, response) => {
            action(request, response)
        })
        return this
    }


    post (prefix, action) {
        this.router.post(prefix, (request, response) => {
            action(request, response)
        })
        return this
    }


    routes () {
        return this.router
    }
}



module.exports = new Route()
