const fs = require("fs");
const csv = require('fast-csv');
const fetch = require('node-fetch')
const {
  simpleSitemapAndIndex,
  lineSeparatedURLsToSitemapOptions
} = require('sitemap')

const hostname = 'https://romingo.com';


const routes = [
  { url: "/", changefreq: 'daily' },
  {
    url: "/listings",
  },
  {
    url: "/checkout*",
  },
  {
    url: "/reservation/manage",
  },

  {
    url: "/about",
  },
  {
    url: "/faq",
  },
  {
    url: "/contact",
  },
  {
    url: "/romingo-score",
  },
  {
    url: "/privacy",
  },
  {
    url: "/terms-of-use",
  },
  {
    url: "/romingo-partners",
  },
  {
    url: "/list-your-property",
  },
  {
    url: "/application",
  },
    { url: "pet-friendly-hotels/los-angeles-california" },
    { url: "pet-friendly-hotels/san-francisco-california" },
    { url: "pet-friendly-hotels/san-diego-california" },
    { url: "pet-friendly-hotels/orange-county-california" },
    { url: "pet-friendly-hotels/santa-barbara-california" },
    { url: "pet-friendly-hotels/palm-springs-california" },
    { url: "pet-friendly-hotels/austin-texas" },
    { url: "pet-friendly-hotels/dallas-texas" },
    { url: "pet-friendly-hotels/housurln-texas" },
    { url: "pet-friendly-hotels/oceanside-california" },
    { url: "pet-friendly-hotels/phoenix-arizona" },
    { url: "pet-friendly-hotels/scottsdale-arizona" },
    { url: "pet-friendly-hotels/tucson-arizona" },
    { url: "pet-friendly-hotels/santa-fe-new-mexico" },
    { url: "pet-friendly-hotels/san-antonio-texas" },
    { url: "pet-friendly-hotels/vail-colorado" },
    { url: "pet-friendly-hotels/colorado-springs-colorado" },
    { url: "pet-friendly-hotels/denver-colorado" },
    { url: "pet-friendly-hotels/seattle-washington" },
    { url: "pet-friendly-hotels/portland-oregon" },
    { url: "pet-friendly-hotels/sacramento-california" },
    { url: "pet-friendly-hotels/salt-lake-city-utah" },

    { url: "pet-friendly-hotels/atlanta-georgia" },
    { url: "pet-friendly-hotels/baltimore-maryland" },
    { url: "pet-friendly-hotels/boston-massachusetts" },
    { url: "pet-friendly-hotels/charlotte-north-carolina" },
    { url: "pet-friendly-hotels/chicago-illinois" },
    { url: "pet-friendly-hotels/cleveland-ohio" },
    { url: "pet-friendly-hotels/detroit-michigan" },
    { url: "pet-friendly-hotels/indianapolis-indiana" },
    { url: "pet-friendly-hotels/miami-florida" },
    { url: "pet-friendly-hotels/milwaukee-wisconsin" },
    { url: "pet-friendly-hotels/minneapolis-minnesota" },
    { url: "pet-friendly-hotels/new-orleans-louisiana" },
    { url: "pet-friendly-hotels/new-york-new-york" },
    { url: "pet-friendly-hotels/washington-dc"},
    { url: '/hyatt-pet-policy' },
    { url: '/hilton-pet-policy' },
    { url: '/marriott-pet-policy'},
    { url: '/boutique-pet-policy'},
    { url: '/ihg-pet-policy'},
    { url: '/motel-6-pet-policy'}
];

// let array = []

fs.createReadStream('./hotels-oct-2.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    // console.log(row)
    routes.push({
      url: `/pet-friendly-hotel/${slugify(row[2])}/${slugify(row[3])}/${row[1]}`,
      changefreq: 'monthly'
    })
    // array.push(`/pet-friendly-hotels/${slugify(row[2])}/${slugify(row[3])}/${row[1]}`)
  })
  .on('end', async () => {

    // fs.writeFile('./alias.csv', array.join(','), 'utf8', function (err) {
    //   if (err) {
    //     console.log('Some error occured - file either not saved or corrupted file saved.');
    //   } else{
    //     console.log('It\'s saved!');
    //   }
    // });
    // return


    await loadBlogPosts(1)

    simpleSitemapAndIndex({
      hostname,
      destinationDir: './',
      sourceData: routes
    }).then(() => {
      console.log('done')
    })

  });


async function loadBlogPosts(page) {
  const result = await fetch(`https://blog.romingo.com/wp-json/wp/v2/posts?page=${page}&per_page=50&_embed&_fields=id,excerpt,slug,title,link,_links,_embedded`)
  const json = await result.json()
  const total = result.headers.get("x-wp-total")
  for (let i = 0 ; i < json.length; i++) {
    const postId = json[i].id
    const slug = json[i].slug
    routes.push({ url: `/blog/post/${slug}`, changefreq: 'monthly' })
  }

  if (total > (50 * page)) {
    await loadBlogPosts(page + 1)
  } else {
    console.log('blog seo posts loaded')
  }
}

function slugify(str) {
  if (!str) {
    return ''
  }
  // Convert all non-word characters to hyphens
  str = str.replace(/[^\w-]/g, '-');

  // Remove all consecutive hyphens
  str = str.replace(/-+/g, '-');

  // Trim leading and trailing hyphens
  str = str.trim('-');

  return str.toLowerCase();
}
