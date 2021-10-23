const Route = require('./core/Route')

const AppControllerWEB = require('./app/controllers/web/AppController')

const AppControllerAPI = require('./app/controllers/api/v1/AppController')
const LoginControllerAPI = require('./app/controllers/api/v1/auth/LoginController')





Route.get('/login', AppControllerWEB.login)

Route.post('/api/v1/auth', AppControllerAPI.auth)
Route.post(`/api/v1/login`, LoginControllerAPI.login)
Route.post(`/api/v1/logout`, LoginControllerAPI.logout)





module.exports = Route
