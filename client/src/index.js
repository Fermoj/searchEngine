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
// function init(){
//     searchBar= document.querySelector(".formSearch")
// searchBar.innerHTML
// }
// init()
// Fetch Data in index.js:

// In index.js, you’ll need to write code to fetch data from the server using the fetch API (or another HTTP client like Axios if needed).
// For example:
// javascript
// Kopiera kod
// async function fetchPosts() {
//   try {
//     const response = await fetch('http://localhost:3000/api/posts'); // Adjust port/path as needed
//     const posts = await response.json();
//     console.log(posts); // Check if posts are received correctly
//     // Now you can render posts to the DOM
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// }
// fetchPosts();
// Render Data to the Page:

// Once you have the data from the server, write functions to display it on your HTML page. You might create HTML elements dynamically in index.js based on the data retrieved.
