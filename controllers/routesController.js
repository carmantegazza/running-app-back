const Route = require('../models/routesModels')

const routesController = {
    getRoutes: async(req, res) => {
        try {
            const routes = await Route.find()
            return res.json({message: 'routes', routes: routes})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
    getRoute: async(req, res) => {
        try {
            const route = await Route.findById(req.params.id)
            return res.status(200).json({success:true, message: 'found route', route: route})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
    addRoute: async(req, res) => {
        try {
            const newRoute = await Route.create(req.body)
            return res.status(201).json({success: true, route: newRoute})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
    updateRoute: async(req, res) => {
      try {
        const route =  await Route.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        return res.status(200).json({success:true, route: route})
      } catch (error) {
        return res.status(500).json({success:false})
      }
    },
    deleteRoute: async(req, res) => {
        try {
          await Route.findOneAndDelete({_id:req.params.id})
          return res.status(200).json({success:true, message: 'deleted route'})
        } catch (error) {
          return res.status(500).json({success:false})
        }
        res.send('res')
      }
}


module.exports = routesController