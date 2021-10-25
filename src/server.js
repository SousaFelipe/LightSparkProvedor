require('dotenv').config()
require('./config/database')


const route = require('./route')
const app = require('./app')


app.middlewares()
app.routes(route.routes())

app.run(process.env.PORT)
