const {MongoClient} = require('mongodb')
require('dotenv').config()

let client

async function connectDB() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/?retryWrites=true&w=majority`
  client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  await client.connect()
  console.log('Connected to MongoDB')
}

async function savePosts(posts) {
  const database = client.db('reddit_scraper')
  const collection = database.collection('posts')

  await collection.insertMany(posts)
  console.log('Data saved to MongoDB')
}

module.exports = {connectDB, savePosts}
