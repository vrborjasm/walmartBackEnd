const Product = require('../../../db/models/Product').Product

const productsRouteController = async ctx => {
  const {text, limit = 10, page = 1} = ctx.request.query

  const productById = +text ? await Product.findOne({id: +text}) : null
  const options = {
    page,
    limit,
  }

  const products = productById
    ? [productById]
    : await Product.paginate({$or: [{brand: {$regex: text}}, {description: {$regex: text}}]}, options)

  return (ctx.body = products)
}

module.exports = {productsRouteController}