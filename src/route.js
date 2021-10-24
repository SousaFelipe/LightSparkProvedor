const Route = require('./core/Route')

const AppControllerWEB = require('./app/controllers/web/AppController')
const LoginControllerWEB = require('./app/controllers/web/auth/LoginController')

const AppControllerAPI = require('./app/controllers/api/AppController')
const LoginControllerAPI = require('./app/controllers/api/auth/LoginController')





Route.get('/login', AppControllerWEB.login)
Route.post('/auth', LoginControllerWEB.auth)

Route.post('/api/v1/auth', AppControllerAPI.auth)
Route.post(`/api/v1/login`, LoginControllerAPI.login)
Route.post(`/api/v1/logout`, LoginControllerAPI.logout)



Route.post('/utils/encrypt', AppControllerAPI.encrypt)
Route.post('/utils/decrypt', AppControllerAPI.decrypt)
Route.post('/utils/hash', AppControllerAPI.hash)
Route.post('/utils/hash/compare', AppControllerAPI.compare)



module.exports = Route
