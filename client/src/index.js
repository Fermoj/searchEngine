const axios = require('axios');

let posts=[]

async function getPosts() {
  try {
    const response = await axios.get('http://localhost:3000/api/posts')
     posts =  response.data
     console.log(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

}

getPosts()

