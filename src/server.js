require('dotenv').config()
require('./config/database')


const app = require('./app')


app.run(process.env.PORT)
