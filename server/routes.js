const express= require('express')
const router= express.Router()

const {connectDB}= require('./database')

connectDB().catch("häär", console.error)


router.get('/posts', async (req, res) => {
  try {
     const {db, client}= await connectDB()
    const posts = await collection.find().toArray()

    res.status(200).json(posts)
    client.close()
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({message: 'Error fetching data from database'})
  }

})
module.exports = router
