const express = require('express')

const path = require('path')
const router = express.Router()

const {connectDB} = require('./database')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

router.get('/api/posts', async (req, res) => {
  try {
    const {db, client} = await connectDB()
    const collection = db.collection('posts')
    const posts = await collection.find().toArray()
    res.status(200).json(posts)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({message: 'Error fetching data from database'})
  }
})

module.exports = router
