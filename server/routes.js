const express= require('express')
const router= express.Router()

const {connectDB, savePosts}= require('./database')


// Your collection name
const collectionName = 'posts';


router.get('/posts', async (req, res) => {
  try {
    // Access the collection and fetch the documents
    const collection = db.collection(collectionName)
    const posts = await savePosts() // Fetches all documents in the collection

    // Send the fetched data as JSON response
    res.status(200).json(posts)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({message: 'Error fetching data from database'})
  }

})
module.exports = router
