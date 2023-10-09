//config inicial de la app con express
const express = require('express')
require('dotenv').config()
require('./config/database.js')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

app.set('port', PORT)

const routesRouter = require('./routes/routesRouter.js')

//porque el origen de la peticion es distinto al del servidor 
app.use(cors())
//para poder leer el body de la peticion
app.use(express.json())

//procesa las solicitudes a traves del router
app.get('/', (req, res) => {res.send('trainig app API')} )
app.use( '/api', routesRouter )
  
app.listen(PORT, () => { console.log('server running on port: ' + app.get('port')) })
