const Route = require('./core/Route')
const Auth = require('./app/middlewares/Auth')
const Subscription = require('./app/middlewares/Subscription')
const AppController = require('./app/controllers/AppController')
const LoginController = require('./app/controllers/auth/LoginController')



Route.get('/login', AppController.login)

Route.post(`/api/v1/login`, LoginController.login)
Route.post(`/api/v1/logout`, LoginController.logout)



module.exports = Route
