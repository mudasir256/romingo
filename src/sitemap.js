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
    { path: "pet-friendly-hotels/los-angeles-california" },
    { path: "pet-friendly-hotels/san-francisco-california" },
    { path: "pet-friendly-hotels/san-diego-california" },
    { path: "pet-friendly-hotels/orange-county-california" },
    { path: "pet-friendly-hotels/santa-barbara-california" },
    { path: "pet-friendly-hotels/palm-springs-california" },
    { path: "pet-friendly-hotels/austin-texas" },
    { path: "pet-friendly-hotels/dallas-texas" },
    { path: "pet-friendly-hotels/houspathn-texas" },
    { path: "pet-friendly-hotels/oceanside-california" },
    { path: "pet-friendly-hotels/phoenix-arizona" },
    { path: "pet-friendly-hotels/scottsdale-arizona" },
    { path: "pet-friendly-hotels/tucson-arizona" },
    { path: "pet-friendly-hotels/santa-fe-new-mexico" },
    { path: "pet-friendly-hotels/san-antonio-texas" },
    { path: "pet-friendly-hotels/vail-colorado" },
    { path: "pet-friendly-hotels/colorado-springs-colorado" },
    { path: "pet-friendly-hotels/denver-colorado" },
    { path: "pet-friendly-hotels/seattle-washington" },
    { path: "pet-friendly-hotels/portland-oregon" },
    { path: "pet-friendly-hotels/sacramento-california" },
    { path: "pet-friendly-hotels/salt-lake-city-utah" },
];

const aliasMap = []
const idMap = []

async function loadBlogPosts(page) {
  const result = await fetch(`https://blog.romingo.com/wp-json/wp/v2/posts?page=${page}&per_page=50&_embed&_fields=id,excerpt,slug,title,link,_links,_embedded`)
  const json = await result.json()
  const total = result.headers.get("x-wp-total")
  for (let i = 0 ; i < json.length; i++) {
    const postId = json[i].id
    const slug = json[i].slug
    idMap.push({ id: slug })
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