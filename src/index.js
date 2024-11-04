const puppeteer = require('puppeteer')
const {connectDB, savePosts} = require('./database')

/**
 * 1. Run init function. The init function established an DB connection and runs the redditScraping function.
 * 2. When the redditscraping function is run, it checks scraped "post" if it exists in the DB, if it doesn't then save it to the DB
 * 3. Re-run redditscraping function every 5 minutes
 */

async function scrapeReddit() {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  const link = await page.goto('https://old.reddit.com/')

  const redditInfo = await page.evaluate(() => {
    let posts = document.querySelectorAll('#siteTable > div[class*="thing"]')
    let allPosts = []

    posts.forEach(post => {
      let user = post.querySelector('.author').innerText
      let title = post.querySelector('.title').innerText
      //   let date = post.querySelector('.live-timestamp')

      let allData = {user: user, title: title}
      allPosts.push(allData)
    })
    return allPosts
  })
  //console.log('redditinfo:', redditInfo)
  await savePosts(redditInfo)
 const rerunScraping= setInterval(scrapeReddit, 5 *60 * 1000)
  console.log('Upprepas', rerunScraping)
}

async function init() {
  try {
    await connectDB()
    console.log('Database connected successfully')
    await scrapeReddit()
  } catch (error) {
    console.error('error', error)
  }
}
init()
