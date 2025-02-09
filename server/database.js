const {MongoClient} = require('mongodb')
require('dotenv').config()

let client

async function connectDB() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@feri.y4ndk.mongodb.net/?retryWrites=true&w=majority&appName=Feri`
  client = new MongoClient(uri)
  await client.connect()
  console.log('Connected to MongoDB')
  const db = client.db('reddit_scraper')
  return {db, client}
}

//får in elementen som extraherats från reddit sidan
//först initierar den till mongo DB databasen med följande namn
//skapar en kollektion i den databsen som heter "posts"
//Därefter kollar den om objekten finns i kollektionen, om inte så läggs de till
async function savePosts(posts) {
  const {db} = await connectDB()
  const collection = db.collection('posts')
  for (const post of posts) {
    const {user, title} = post
    const elementsInDb = await collection.findOne({
      user: {$eq: user, $ne: null},
      title: {$eq: title, $ne: null}
    })

    if (!elementsInDb) {
      const newDocumentSaved = await collection.insertOne(post)
      console.log('Nytt objekt sparat', newDocumentSaved)
    } else console.log('Data saved to MongoDB')
  }
}

module.exports = {connectDB, savePosts}
