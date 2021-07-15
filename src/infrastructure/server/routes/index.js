const {pingRouteController} = require('./controllers/ping')

function loadRoutes(router) {
  router.get('/ping', pingRouteController)

  return router
}

module.exports = {loadRoutes}
