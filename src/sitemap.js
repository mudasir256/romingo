const fs = require("fs");
const csv = require('fast-csv');

const Sitemap = require("react-router-sitemap").default;

const routes = [
  {
    path: "/",
  },
  {
    path: "/listings",
  },
  {
    path: "/details/:id",
  },
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

//TODO: blog ids
const idMap = []

fs.createReadStream('./hotels.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    aliasMap.push({
      alias: row[22],
    })
  })
  .on('end', () => {
    const paramsConfig = {
      "/hotel/:alias": aliasMap,
      "/blog/post/:id": idMap
    }
    new Sitemap(routes).applyParams(paramsConfig).build("https://romingo.com/").save("./sitemap.xml");
  });