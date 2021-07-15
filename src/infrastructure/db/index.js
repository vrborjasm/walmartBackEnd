const mongoose = require('mongoose')

function loadDBConnection({dbUri}) {
  let db = undefined

  return {
    start: async () => {
      db = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('- Connected to MongoDB')
    },
    close: async () => {
      if (db) await db.disconnect()
      console.log('- Closed MongoDB connection')
    },
  }
}

module.exports = {loadDBConnection}
