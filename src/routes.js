const Route = require('./core/Route')

const Auth = require('./app/middlewares/Auth')
const Subscription = require('./app/middlewares/Subscription')

const LoginController = require('./app/controllers/auth/LoginController')
const RegisterController = require('./app/controllers/auth/RegisterController')



module.exports = function routes (express) {
    const route = new Route(express)



    route.middlewares([ Subscription ]).post('/login', LoginController.login)
    route.middlewares([ Subscription, Auth ]).post('/logout', LoginController.logout)



    return route.routes()
} 
