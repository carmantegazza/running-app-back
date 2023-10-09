const express = require('express')

const routesRouter = express.Router()
const routesController = require('../controllers/routesController')

routesRouter.get('/routes', routesController.getRoutes)
routesRouter.post('/routes', routesController.addRoute)

routesRouter.get('/route/:id', routesController.getRoute)
routesRouter.put('/route/:id', routesController.updateRoute)
routesRouter.delete('/route/:id', routesController.deleteRoute)

module.exports = routesRouter