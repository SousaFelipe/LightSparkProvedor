const { Router } = require('express')



const AppController = require('./app/controllers/AppController')
const LoginController = require('./app/controllers/auth/LoginController')
const RegisterController = require('./app/controllers/auth/RegisterController')



const routes = new Router()


routes.get('/subscription/check', AppController.subscriptionCheck)
routes.get('/session/check', AppController.sessionCheck)

routes.post('/auth/register', RegisterController.register)
routes.post('/auth/remove', RegisterController.remove)

routes.post('/login', LoginController.login)
routes.post('/logout', LoginController.logout)



module.exports = routes
