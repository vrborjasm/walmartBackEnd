const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
})

ProductSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', ProductSchema)

module.exports = {
  Product: Product,
}
