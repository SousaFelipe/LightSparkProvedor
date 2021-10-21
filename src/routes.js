const Route = require('./core/Route')
const Auth = require('./app/middlewares/Auth')



const LoginController = require('./app/controllers/auth/LoginController')
const RegisterController = require('./app/controllers/auth/RegisterController')


/*

routes.post('/auth/register', RegisterController.register)
routes.post('/auth/remove', RegisterController.remove)

*/



module.exports = function (express) {
    const route = new Route(express)



    route.middlewares([ Auth.subscription ]).post('/login', LoginController.login)
    route.middlewares([ Auth.subscription, Auth.session ]).post('/logout', LoginController.logout)



    return route.routes()
} 
