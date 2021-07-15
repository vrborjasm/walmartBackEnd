const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const logger = require('koa-logger')
const cors = require('@koa/cors')
const {errorHandler} = require('./ middlewares/error-handler')
const {loadRoutes} = require('./routes')

function loadWebServer({port}) {
  const app = new Koa()

  const router = new Router()
  loadRoutes(router)

  app
    .use(errorHandler)
    .use(cors())
    .use(bodyparser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())

  let runningServer = undefined
  return {
    start: () => {
      runningServer = app.listen(port, () => console.log(`- Web server started on PORT: ${port}`))
    },
    close: () => {
      runningServer && runningServer.close()
      console.log('- Closed web server')
    },
  }
}

module.exports = {loadWebServer}
