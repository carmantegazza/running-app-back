//config inicial de la app con express
const express = require('express')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()
require('./config/database.js')

const app = express()

const PORT = process.env.PORT || 5000

app.set('port', PORT)

const routesRouter = require('./routes/routesRouter')
const eventsRouter = require('./routes/eventsRouter')
const usersRouter = require('./routes/usersRouter')

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api' , usersRouter )

app.use( '/api', routesRouter, eventsRouter )
app.get('/', (req, res) => {res.send('trainig app API')} )

app.listen(PORT, () => { console.log('server running on port: ' + app.get('port')) })
