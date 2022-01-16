const {pingRouteController} = require('./controllers/ping')
const {productsRouteController} = require('./controllers/product')

function loadRoutes(router) {
  router.get('/ping', pingRouteController)
  router.get('/products', productsRouteController)

  return router
}

module.exports = {loadRoutes}
