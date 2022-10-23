const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require('fast-csv');
const data = []

const seo = [
  {
    path: "/",
    title: "Book pet friendly hotels - Romingo",
    description: "Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.",
    image: "https://romingo.com/static/media/logo.11150e63.png",
  },
  {
    path: '/listings',
    title: 'Find pet friendly hotels - Romingo',
    description: 'Search for and find pet friendly hotels in your area.',
    image: "https://romingo.com/static/media/logo.11150e63.png"
  },
  {
    path: '/faq',
    title: 'Frequently asked questions - Romingo',
    description: 'Frequently asked questions at Romingo.',
    image: ''
  },
  {
    path: '/about',
    title: 'About - Romingo',
    description: 'Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.',
    image: ''
  },
  {
    path: '/contact',
    title: 'Contact - Romingo',
    description: 'Contact Romingo.',
    image: ''
  },
]
fs.createReadStream('./hotels.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    seo.push({
      path: `/hotel/${row[22]}`,
      title: `${row[4]} Pet Policy - Romingo`,
      description: row[5],
      image: `https://storage.googleapis.com/romingo-production-public/images/${encodeURIComponent(row[16])}/${row[11]}`
    })
  })
  .on('end', () => console.log('loaded hotels.csv'));



const app = new express();

app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use("/public", express.static(path.join(__dirname, "build/images")));


app.get("*", (req, res) => {
  let pathname = req.pathname || req.originalUrl;
  console.log(pathname)
  let page = seo.find((item) => item.path === pathname);
  console.log(page)
  if (page) {
    let html = fs.readFileSync(path.join(__dirname, "build", "index.html"));
    let htmlWithSeo = html
      .toString()
      .replace("__META_TITLE__", page.title)
      .replace("__META_DESCRIPTION__", page.description)
      .replace("__META_TITLE__", page.title)
      .replace("__META_DESCRIPTION__", page.description)
      .replace("__META_IMAGE__", page.image);
    return res.send(htmlWithSeo);
  } else {
    let htmlWithSeo = html
      .toString()
      .replace("__META_TITLE__", 'Romingo')
      .replace("__META_DESCRIPTION__", 'Romingo - book pet friendly hotels.')
      .replace("__META_TITLE__", 'Romingo')
      .replace("__META_DESCRIPTION__", 'Romingo - book pet friendly hotels.')
      .replace("__META_IMAGE__", '');
    return res.send(htmlWithSeo);
  }
});
app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log("listened on");
});