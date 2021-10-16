const { Router } = require('express')



const AppController = require('./app/controllers/AppController')
const LoginController = require('./app/controllers/auth/LoginController')
const RegisterController = require('./app/controllers/auth/RegisterController')



const routes = new Router()


routes.post('/subscription/check', AppController.hasActiveSubscription)
routes.post('/session/check', AppController.hasActiveSession)

routes.post('/auth/store', RegisterController.store)

routes.post('/auth/login', LoginController.login)
routes.post('/auth/logout', LoginController.unauth)



module.exports = routes
