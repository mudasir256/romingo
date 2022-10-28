const fs = require("fs");
const csv = require('fast-csv');
const fetch = require('node-fetch')

const Sitemap = require("react-router-sitemap").default;

const routes = [
  {
    path: "/",
  },
  {
    path: "/listings",
  },
  // {
  //   path: "/details/:id",
  // },
  {
    path: "/hotel/:alias",
  },
  {
    path: "/checkout*",
  },
  {
    path: "/reservation/manage",
  },
  {
    path: "/los-angeles",
  },
  {
    path: "/san-diego",
  },
  {
    path: "/orange-county",
  },
  {
    path: "/san-francisco",
  },
  {
    path: "/santa-barbara",
  },
  {
    path: "/palm-springs",
  },
  {
    path: "/about",
  },
  {
    path: "/faq",
  },
  {
    path: "/contact",
  },
  {
    path: "/romingo-score",
  },
  {
    path: "/privacy",
  },
  {
    path: "/terms-of-use",
  },
  {
    path: "/romingo-partners",
  },
  {
    path: "/list-your-property",
  },
  {
    path: "/application",
  },
  // {
  //   path: "/blog/:tag?",
  // },
  {
    path: "/blog/post/:id",
  },
];

const aliasMap = []
const idMap = []

async function loadBlogPosts(page) {
  const result = await fetch(`https://blog.romingo.com/wp-json/wp/v2/posts?page=${page}&per_page=50&_embed&_fields=id,excerpt,title,link,_links,_embedded`)
  const json = await result.json()
  const total = result.headers.get("x-wp-total")
  for (let i = 0 ; i < json.length; i++) {
    const postId = json[i].id
    idMap.push({ id: postId })
  }

  if (total > (50 * page)) {
    await loadBlogPosts(page + 1)
  } else {
    console.log('blog seo posts loaded')
  }
}


fs.createReadStream('./hotels.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    aliasMap.push({
      alias: row[22],
    })
  })
  .on('end', async () => {
    await loadBlogPosts(1)
    const paramsConfig = {
      "/hotel/:alias": aliasMap,
      "/blog/post/:id": idMap
    }
    new Sitemap(routes).applyParams(paramsConfig).build("https://romingo.com/").save("./sitemap.xml");
  });