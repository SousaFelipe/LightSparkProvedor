const Route = require('./core/Route')

const Auth = require('./app/middlewares/Auth')
const Subscription = require('./app/middlewares/Subscription')

const AppController = require('./app/controllers/AppController')
const LoginController = require('./app/controllers/auth/LoginController')



module.exports = function (express) {
    const route = new Route(express)


    route.get('/login', AppController.login)

    route.middlewares([ Subscription ]).post('/auth/login', LoginController.login)
    route.middlewares([ Subscription ]).post('/auth/logout', LoginController.logout)



    return route.routes()
} 
