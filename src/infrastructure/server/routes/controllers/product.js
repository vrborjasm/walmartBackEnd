const Product = require('../../../db/models/Product').Product

const isPalindrome = filter => {
  return (+filter || filter.length > 3) && filter === filter.split('').reverse().join('')
}

const productsRouteController = async ctx => {
  const {text='', limit = 10, page = 1} = ctx.request.query
  const options = {
    page,
    limit,
  }

  const filter = +text
    ? {id: +text}
    : text
    ? {$or: [{brand: {$regex: text}}, {description: {$regex: text}}]}
    : {}

  const results = await Product.paginate(filter, options)

  return (ctx.body = {
    ...results,
    docs: isPalindrome(text)
      ? results.docs.map(({_id, id, brand, description, image, price}) => ({
          _id,
          id,
          brand,
          description,
          image,
          price,
          finalPrice: Math.round(price / 2, 1),
        }))
      : results.docs,
  })
}

module.exports = {productsRouteController}