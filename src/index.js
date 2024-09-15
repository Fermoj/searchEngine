const puppeteer = require('puppeteer')

async function scrapeReddit() {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  const link = await page.goto('https://old.reddit.com/')

  //problem att fatta att evaluate ska användas här- såg youtube

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
    console.log(allPosts)
  })

  redditInfo
}
scrapeReddit()

