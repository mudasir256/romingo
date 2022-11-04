const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require('fast-csv');
const fetch = require('node-fetch')

const data = []

const seo = [
  {
    path: "/",
    title: "Book pet friendly hotels - Romingo",
    description: "Romingo makes it easy for dog owners to find pet-friendly hotels without paying fees. You and your pet are sure to enjoy hassle-free travel with Romingo.",
    image: "https://romingo.com/public/images/home.jpg",
  },
  {
    path: '/listings',
    title: 'Find pet friendly hotels - Romingo',
    description: 'Search for and find pet friendly hotels in your area.',
    image: "https://romingo.com/public/images/listings.jpg"
  },
  {
    path: '/faq',
    title: 'Frequently asked questions - Romingo',
    description: "Romingo is a simple, user-friendly platform to book quality, dog friendly hotels. Our team works exclusively with hand-selected hotel partners to ensure you and your dog's guest experience is welcoming, warm, and 100% enjoyable. You can finally roam the world free with your pup and Romingo. Romingo does this by providing one, simple pet policy across all hotel partners. We call our streamlined policy the \"Romingo Guarantee\"",
    image: ''
  },
  {
    path: '/about',
    title: 'About - Romingo',
    description: "As a California native, there is nothing as relaxing and refreshing as driving up and down the California Coastline. Travel has always been one of my life's greatest joys, and during a prolonged global pandemic, weekend and car travel escapes with my partner, Jonathan, became a welcomed new outlet. Being near the ocean and feeling that fresh, crisp air recharges and inspires us. But I’ve always struggled leaving my French Bulldog, Maddie, at home when I travel.",
    image: 'https://romingo.com/public/images/home.jpg'
  },
  {
    path: '/contact',
    title: 'Contact - Romingo',
    description: 'Our support team is here for you 24/7! Please get in touch with us using one of the below methods. If you require immediate assistance, we recommend using our chat feature.',
    image: ''
  },
  {
    path: '/los-angeles',
    title: 'Los Angeles Hotels - Romingo',
    description: 'Los Angeles is regarded as one of the most renowned cities in the whole world. This dazzling city is known as the entertainment capital and sits in close proximity to a number of world famous beaches. You can also find amusement parks, countless museums, a variety of pet-friendly tourist attractions, great hikes, and so much more! When you visit Los Angeles, there is never a shortage of things to see, try, and eat -- which is why there are roughly 50 million visitors in Los Angeles every year.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/la-4.jpeg'
  },
  {
    path: '/san-diego',
    title: 'San Diego Hotels - Romingo',
    description: 'For a change of pace in sunny California, head on over to the state’s second largest city, San Diego. San Diego is renowned for its relaxed culture, idyllic weather, miles of white-sand beaches, and a variety of things to see and do for adventurers (and dogs) of all ages. San Diego is a family-friendly city that’s especially a must visit for those who love the beach. Sitting at the most Southern part of California and by the border of Mexico, this charming city carries an abundance of Spanish influences in their culture, cuisine, and attractions.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/sd-2.jpeg'
  }, 
  {
    path: '/orange-county',
    title: 'Orange County Hotels - Romingo',
    description: 'Orange County is nestled between Los Angeles and Orange County, home to many popular cities like Newport Beach, Anaheim, and Irvine. The county strikes a perfect balance between suburban life and tourist attractions, boosting its popularity in recent decades and making it an inviting destination for California travelers. One major reason for Orange County’s popularity is its accessibility to a variety of indoor and outdoor experiences, delivering a memorable and well-rounded travel experience.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/oc-2.jpeg'
  },
  {
    path: '/san-francisco',
    title: 'San Francisco Hotels - Romingo',
    description: 'San Francisco is a lively cultural hub home to grand architectural buildings, world-class cuisine, cable cars, a dynamic waterfront, and plenty of outdoor adventures. The walkable city is adorned with iconic landmarks which is what truly sets San Francisco apart. Taking a stroll through the city’s streets is an exciting experience that will bring you from one unique neighborhood to another. San Francisco is a haven for lovers of performing arts and is also considered one of the United State’s greatest dining cities because of its rich diverse cultural influences, fresh ingredients, and creative chefs who come from all around the world.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/sf-hero.jpeg'
  },
  {
    path: '/santa-barbara',
    title: 'Santa Barbara Hotels - Romingo',
    description: 'Located on the central coast of California, the laid-back city of Santa Barbara offers the perfect getaway from the hustle and bustle of everyday life. The lovely city features Mediterranean style buildings that reflect its Spanish heritage, along with breathtaking mountain and beach views, and surrounding vineyards.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/sb-2.jpeg'
  },
  {
    path: '/palm-springs',
    title: 'Palm Springs Hotels - Romingo',
    description: 'Palm Springs offers something unique and different from many of the famous coastal cities in California. Located in the Sonoran Desert, this city is most known for its golf courses, mountainous views, mid-century architecture, and first-class spa resorts. For those who enjoy warm weather and discovering the charm of locally owned and operated businesses, Palm Springs has more than enough to offer.',
    image: 'https://storage.googleapis.com/romingo-development-public/images/front-end/ps-hero.jpeg'
  },
  {
    path: '/list-your-property',
    title: 'List your property - Romingo',
    description: 'Interested in listing your property on the pet-friendliest site on the web? Learn more about Romingo partnerships & distribution by completing this brief form. Someone from our team will be in touch asap!',
    image: ''
  },
  {
    path: '/reservation/manage',
    title: 'Manage your reservation - Romingo',
    description: "Modify, cancel, or rebook your reservation on Romingo.",
    image: ''
  },
  {
    path: '/terms-of-use',
    title: 'Terms of use - Romingo',
    description: 'Accessing the Romingo website (“Site”) constitutes your agreement to the following Terms or Use (“Terms”). You should read these Terms and our privacy policy in their entirety before accessing, using, or obtaining information or services from the Site.',
    image: ''
  }
]
fs.createReadStream('./hotels.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    seo.push({
      path: `/hotel/${row[22]}`,
      title: `${row[4]} Pet Policy - Romingo`,
      description: row[5],
      image: `https://storage.googleapis.com/romingo-production-public/images/${encodeURIComponent(row[16])}/${row[11]}`,
    })
  })
  .on('end', () => console.log('loaded hotels.csv'));

async function loadBlogPosts(page) {
  const result = await fetch(`https://blog.romingo.com/wp-json/wp/v2/posts?page=${page}&per_page=50&_embed&_fields=id,excerpt,title,link,_links,_embedded`)
  const json = await result.json()
  const total = result.headers.get("x-wp-total")

  for (let i = 0 ; i < json.length; i++) {
    const url = json[i].link
    const postId = json[i].id
    fetch(`https://blog.romingo.com/wp-json/yoast/v1/get_head?url=${url}`).then(res => res.json()).then(seoJson => {
      const { og_title, og_description, og_image } = seoJson.json
      seo.push({
        path: `/blog/post/${postId}`,
        title: og_title,
        description: og_description,
        image: og_image[0].url
      })
    })
  }

  if (total > (50 * page)) {
    loadBlogPosts(page + 1)
  } else {
    console.log('blog seo posts loaded')
  }
}

loadBlogPosts(1)

const app = new express();

app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use("/public", express.static(path.join(__dirname, "build/")));

app.get('/sitemap.xml', function(req, res, next) {
  res.sendFile(__dirname + '/public/sitemap.xml'); 
})

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
      .replace("__META_IMAGE__", page.image)
      .replace("__META_URL__", `https://romingo.com${page.path}`);
    return res.send(htmlWithSeo);
  } else {
    let html = fs.readFileSync(path.join(__dirname, "build", "index.html"));
    let htmlWithSeo = html
      .toString()
      .replace("__META_TITLE__", 'Romingo')
      .replace("__META_DESCRIPTION__", 'Romingo - book pet friendly hotels.')
      .replace("__META_TITLE__", 'Romingo')
      .replace("__META_DESCRIPTION__", 'Romingo - book pet friendly hotels.')
      .replace("__META_IMAGE__", '')
      .replace("__META_URL__", pathname);
    return res.send(htmlWithSeo);
  }
});
app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log("listened on");
});