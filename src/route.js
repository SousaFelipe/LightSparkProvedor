const Route = require('./core/Route')

const AppControllerWEB = require('./app/controllers/web/AppController')
const LoginControllerWEB = require('./app/controllers/web/auth/LoginController')

const AppControllerAPI = require('./app/controllers/api/AppController')
const LoginControllerAPI = require('./app/controllers/api/auth/LoginController')
const FakeMaster = require('./app/controllers/FakeMaster')





Route.post('/login', LoginControllerWEB.login)
Route.post('/logout', LoginControllerWEB.logout)

Route.get('/login', AppControllerWEB.login)
Route.get('/dashboard', AppControllerWEB.dashboard)

Route.get('/errors/subscription/bloqueado', AppControllerWEB.bloqueado)
Route.get('/errors/subscription/cancelado', AppControllerWEB.cancelado)
Route.get('/errors/subscription/pre', AppControllerWEB.pre)
Route.get('/errors/subscription/unknow', AppControllerWEB.unknow)



Route.post('/api/v1/auth', AppControllerAPI.auth)
Route.post(`/api/v1/login`, LoginControllerAPI.login)
Route.post(`/api/v1/logout`, LoginControllerAPI.logout)



Route.post('/utils/encrypt', AppControllerAPI.encrypt)
Route.post('/utils/decrypt', AppControllerAPI.decrypt)
Route.post('/utils/hash', AppControllerAPI.hash)
Route.post('/utils/hash/compare', AppControllerAPI.compare)

Route.get('/fake/signature/check', FakeMaster.signature)
Route.get('/fake/authorization/check', FakeMaster.authorization)



module.exports = Route
