const {createMockContext} = require('@shopify/jest-koa-mocks')

const {productsRouteController} = require('../../../src/infrastructure/server/routes/controllers/product')
const Product = require('../../../src/infrastructure/db/models/Product').Product

jest.mock('../../../src/infrastructure/db/models/Product', () => {
  return {
    Product: {
      paginate: jest.fn(),
      isPalindrome: jest.fn()
    },
  }
})

const fakeProduct = ({id, _id='61e34b52cbc38c3a3595f429', brand = 'Walmart', description = 'Walmart', image = 'www.lider.cl/catalogo/images/whiteLineIcon.svg', price = 12, totalDocs = 1,limit = 10,totalPages = 1,page = 1,pagingCounter = 1,hasPrevPage = false,hasNextPage = false,prevPage = null,nextPage = null}) => (
    {
        docs: [
          {
            _id,
            id,
            brand,
            description,
            image,
            price: 20,
            finalPrice: 10
          }
        ],
        totalDocs: 1,
        limit: 10,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    }
)



const fakeFilter = ({text, limit = 10, page = 1}) => [{
    "$or": [
      {
       "brand": {
         "$regex": `${text}`
       },
      },
      {
       "description": {
         "$regex": `${text}`
       },
      },
    ],
  },
  {limit, page}]
  

describe('productsRouteController test', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    
    it('return object by id', async () => {
      const returned = fakeProduct({id: 1})
      Product.paginate.mockReturnValueOnce(returned)
      const ctx = createMockContext({url: '?text=1'})
      await productsRouteController(ctx)
      expect(Product.paginate).toHaveBeenCalledTimes(1)
      expect(Product.paginate).toHaveBeenCalledWith({"id": 1},{"limit": 10, "page": 1})
      expect(ctx.status).toBe(200)
      expect(ctx.body).toEqual(returned)
    })

    it('return object if NOT Id', async () => {
      const returned = fakeProduct({id: 1})
      Product.paginate.mockReturnValueOnce(returned)
      const ctx = createMockContext({url: '?text=aaaa'})
      await productsRouteController(ctx)
  
      expect(Product.paginate).toHaveBeenCalledTimes(1)
      expect(Product.paginate).toHaveBeenCalledWith({
            "$or": [
              {
               "brand": {
                 "$regex": "aaaa"
               },
              },
              {
               "description": {
                 "$regex": "aaaa"
               },
              },
            ],
          },
          {limit: 10, page: 1})
      expect(ctx.status).toBe(200)
      expect(ctx.body).toEqual(returned)
    })
  
    it('return empty if found nothing', async () => {
        const returned = {
            "docs": [
              
            ],
            "totalDocs": 0,
            "limit": 10,
            "totalPages": 1,
            "page": 1,
            "pagingCounter": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
          }
        Product.paginate.mockReturnValueOnce(returned)
        const ctx = createMockContext({url: '?text=aaaass'})
        await productsRouteController(ctx)
    
        expect(Product.paginate).toHaveBeenCalledTimes(1)
        expect(Product.paginate).toHaveBeenCalledWith({
            "$or": [
              {
               "brand": {
                 "$regex": "aaaass"
               },
              },
              {
               "description": {
                 "$regex": "aaaass"
               },
              },
            ],
          },
          {limit: 10, page: 1})
        expect(ctx.status).toBe(200)
        expect(ctx.body).toEqual(returned)
      })

  })
  