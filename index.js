require('dotenv').config()
const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require('fast-csv');
const fetch = require('node-fetch')

const { HOTEL_DESCRIPTIONS } = require('./locationPageDescriptions')

const data = []

const defaultKeywords = "hotels, travel, pet friendly hotels, hotels near me, booking hotel, hotel booking, hotels nearby"

const seo = [
  {
    path: '/',
    title: 'Book pet friendly hotels - Romingo',
    description:
      'Romingo offers pet lovers an easy way to book pet-friendly travel. Experience the best dog-friendly hotels with Romingo, offering the lowest rates with $0 pet fees. You and your pet can roam the world freely with Romingo.',
    image: 'https://romingo.com/public/images/home.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/listings',
    title: 'Find pet friendly hotels - Romingo',
    description: 'Search for and find pet friendly hotels in your area.',
    image: 'https://romingo.com/public/images/listings.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/faq',
    title: 'Frequently asked questions - Romingo',
    description:
      'Romingo is a simple, user-friendly platform to book quality, dog friendly hotels. Our team works exclusively with hand-selected hotel partners to ensure you and your dog\'s guest experience is welcoming, warm, and 100% enjoyable. You can finally roam the world free with your pup and Romingo. Romingo does this by providing one, simple pet policy across all hotel partners. We call our streamlined policy the "Romingo Guarantee"',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/about',
    title: 'About - Romingo',
    description:
      "As a California native, there is nothing as relaxing and refreshing as driving up and down the California Coastline. Travel has always been one of my life's greatest joys, and during a prolonged global pandemic, weekend and car travel escapes with my partner, Jonathan, became a welcomed new outlet. Being near the ocean and feeling that fresh, crisp air recharges and inspires us. But I’ve always struggled leaving my French Bulldog, Maddie, at home when I travel.",
    image: 'https://romingo.com/public/images/home.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/contact',
    title: 'Contact - Romingo',
    description:
      'Our support team is here for you 24/7! Please get in touch with us using one of the below methods. If you require immediate assistance, we recommend using our chat feature.',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/pet-friendly-hotels/los-angeles-california',
    title: 'Pet Friendly Hotels in Los Angeles | Romingo',
    description:
      "Time in the dazzling city of Los Angeles isn't complete without your pet! These pet friendly hotels will ensure you have the best stay possible.",
    image: HOTEL_DESCRIPTIONS[17].heroImage,
    keywords: HOTEL_DESCRIPTIONS[17].keywords,
  },
  {
    path: '/pet-friendly-hotels/san-diego-california',
    title: 'Pet Friendly Hotels San Diego | Romingo',
    description:
      "San Diego is a must if you're in California. We have the best deals on pet friendly hotels so you can take your visit to the next level!",
    image: HOTEL_DESCRIPTIONS[19].heroImage,
    keywords: HOTEL_DESCRIPTIONS[19].keywords,
  },
  {
    path: '/pet-friendly-hotels/orange-county-california',
    title: 'Pet Friendly Hotels Orange County, CA | Romingo',
    description:
      'Are you planning a visit to Orange County with your furry friend? Look no further than these top pet-friendly hotels to make your trip unforgettable!',
    image: HOTEL_DESCRIPTIONS[18].heroImage,
    keywords: HOTEL_DESCRIPTIONS[18].keywords,
  },
  {
    path: '/pet-friendly-hotels/san-francisco-california',
    title: 'Pet Friendly Hotels San Fransisco | Romingo',
    description:
      "A vacation to San Fransisco isn't complete without your furry friend. Find the best deals for pet friendly hotels to book here!",
    image: HOTEL_DESCRIPTIONS[20].heroImage,
    keywords: HOTEL_DESCRIPTIONS[20].keywords,
  },
  {
    path: '/pet-friendly-hotels/santa-barbara-california',
    title: 'Pet Friendly Hotels Santa Barbara | Romingo',
    description:
      'Enjoy all the relaxing sights and activities of Santa Barbara, and bring your furry friend with you! Explore the best pet friendly hotels here!',
    image: HOTEL_DESCRIPTIONS[21].heroImage,
    keywords: HOTEL_DESCRIPTIONS[21].keywords,
  },
  {
    path: '/pet-friendly-hotels/palm-springs-california',
    title: 'Palm Springs Pet Friendly Hotels | Romingo',
    description:
      "Palm Springs is a must-see in California. Don't leave your furry friend behind! Explore the best pet friendly hotels here.",
    image: HOTEL_DESCRIPTIONS[16].heroImage,
    keywords: HOTEL_DESCRIPTIONS[16].keywords,
  },
  {
    path: '/pet-friendly-hotels/austin-texas',
    title: 'Pet Friendly Hotels Austin | Romingo',
    description:
      'Austin is known for its live music and incredible food. If you’re traveling with your pet, here are the best pet-friendly hotels in Austin, Texas!',
    image: HOTEL_DESCRIPTIONS[0].heroImage,
    keywords: HOTEL_DESCRIPTIONS[0].keywords,
  },
  {
    path: '/pet-friendly-hotels/dallas-texas',
    title: 'Pet Friendly Hotels Dallas | Romingo ',
    description:
      'If you’re visiting Dallas, there’s no shortage of places to see and activities to enjoy. Here’s our ultimate guide to a pet-friendly stay in Dallas.',
    image: HOTEL_DESCRIPTIONS[1].heroImage,
    keywords: HOTEL_DESCRIPTIONS[1].keywords,
  },
  {
    path: '/pet-friendly-hotels/houston-texas',
    title: 'Pet Friendly Hotels Houston | Romingo',
    description:
      'There are plenty of attractions to visit in Houston! Explore the best pet friendly hotels around to take your stay to the next level.',
    image: HOTEL_DESCRIPTIONS[2].heroImage,
    keywords: HOTEL_DESCRIPTIONS[2].keywords,
  },
  {
    path: '/pet-friendly-hotels/oceanside-california',
    title: 'Pet Friendly Hotels in Oceanside | Romingo',
    description:
      'Explore the beautiful beaches of oceanside with your furry friend. These pet friendly hotels in Oceanside, California are a must stay. Learn more!',
    image: HOTEL_DESCRIPTIONS[3].heroImage,
    keywords: HOTEL_DESCRIPTIONS[3].keywords,
  },
  {
    path: '/pet-friendly-hotels/phoenix-arizona',
    title: 'Pet Friendly Hotels Phoenix, AZ | Romingo',
    description:
      "Exploring Phoenix isn't complete without your pet. Make sure you know the top rated pet friendly hotels to book for your trip!",
    image: HOTEL_DESCRIPTIONS[4].heroImage,
    keywords: HOTEL_DESCRIPTIONS[4].keywords,
  },
  {
    path: '/pet-friendly-hotels/scottsdale-arizona',
    title: 'Pet Friendly Hotels in Scottsdale, AZ | Romingo',
    description:
      'Consider a visit to Scottsdale, AZ? These top-rated pet friendly hotels will take your stay to the next level. Learn more here!',
    image: HOTEL_DESCRIPTIONS[5].heroImage,
    keywords: HOTEL_DESCRIPTIONS[5].keywords,
  },
  {
    path: '/pet-friendly-hotels/tucson-arizona',
    title: 'Pet friendly hotels Tucson — Romingo',
    description: HOTEL_DESCRIPTIONS[6].paragraphOne.slice(0, 160),
    image: HOTEL_DESCRIPTIONS[6].heroImage,
    keywords: HOTEL_DESCRIPTIONS[6].keywords,
  },
  {
    path: '/pet-friendly-hotels/santa-fe-new-mexico',
    title: 'Pet Friendly Hotels Santa Fe | Romingo',
    description:
      'Explore the beautiful architecture, art, and incredible food of Santa Fe with your dog! These pet friendly hotels are a must.',
    image: HOTEL_DESCRIPTIONS[7].heroImage,
    keywords: HOTEL_DESCRIPTIONS[7].keywords,
  },
  {
    path: '/pet-friendly-hotels/san-antonio-texas',
    title: 'Pet Friendly Hotels San Antonio | Romingo',
    description:
      "If you're visiting the beautiful city of San Antonio, Texas, you'll need to find the best hotel deals. Explore the top pet friendly hotels here.",
    image: HOTEL_DESCRIPTIONS[8].heroImage,
    keywords: HOTEL_DESCRIPTIONS[8].keywords,
  },
  {
    path: '/pet-friendly-hotels/vail-colorado',
    title: 'Pet Friendly Hotels Colorado Springs | Romingo',
    description:
      "Colorado Springs is the perfect travel destination, especially if you're planning a trip with your pet. Explore the best pet-friendly hotels here!",
    image: HOTEL_DESCRIPTIONS[9].heroImage,
    keywords: HOTEL_DESCRIPTIONS[9].keywords,
  },
  {
    path: '/pet-friendly-hotels/colorado-springs-colorado',
    title: 'Pet friendly hotels Colorado Springs — Romingo',
    description: HOTEL_DESCRIPTIONS[10].paragraphOne.slice(0, 160),
    image: HOTEL_DESCRIPTIONS[10].heroImage,
    keywords: HOTEL_DESCRIPTIONS[10].keywords,
  },
  {
    path: '/pet-friendly-hotels/denver-colorado',
    title: 'Pet Friendly Hotels Denver, CO | Romingo',
    description:
      'Thinking of exploring Denver? Compare these pet-friendly hotels with real customer reviews, along with tips for making the most of your trip.',
    image: HOTEL_DESCRIPTIONS[11].heroImage,
    keywords: HOTEL_DESCRIPTIONS[11].keywords,
  },
  {
    path: '/pet-friendly-hotels/seattle-washington',
    title: 'Pet Friendly Hotels Seattle | Romingo',
    description:
      'Paying the vibrant city of Seattle a visit this year? Bring your pup with you and enjoy these top-rated pet friendly hotels.',
    image: HOTEL_DESCRIPTIONS[12].heroImage,
    keywords: HOTEL_DESCRIPTIONS[12].keywords,
  },
  {
    path: '/pet-friendly-hotels/portland-oregon',
    title: 'Pet Friendly Hotels Portland, Oregon | Romingo',
    description:
      'Portland, Oregon is home to fantastic food and even better people. Explore the top rate pet friendly hotels to make your trip unforgettable here!',
    image: HOTEL_DESCRIPTIONS[13].heroImage,
    keywords: HOTEL_DESCRIPTIONS[13].keywords,
  },
  {
    path: '/pet-friendly-hotels/sacramento-california',
    title: 'Pet Freindly Hotels Sacramento | Romingo',
    description:
      'Sacramento, CA is home to beautiful views and great people. Thinking of paying a visit? Find the best pet friendly hotels here.',
    image: HOTEL_DESCRIPTIONS[14].heroImage,
    keywords: HOTEL_DESCRIPTIONS[14].keywords,
  },
  {
    path: '/pet-friendly-hotels/salt-lake-city-utah',
    title: 'Pet Friendly Hotels Salt Lake City | Romingo',
    description:
      'Are you looking to explore the mountainous beauty of Salt Lake City with your furry friend? Find the best pet friendly hotels here.',
    image: HOTEL_DESCRIPTIONS[15].heroImage,
    keywords: HOTEL_DESCRIPTIONS[15].keywords,
  },
  {
    path: '/list-your-property',
    title: 'List your property - Romingo',
    description:
      'Interested in listing your property on the pet-friendliest site on the web? Learn more about Romingo partnerships & distribution by completing this brief form. Someone from our team will be in touch asap!',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/reservation/manage',
    title: 'Manage your reservation - Romingo',
    description: 'Modify, cancel, or rebook your reservation on Romingo.',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/terms-of-use',
    title: 'Terms of use - Romingo',
    description:
      'Accessing the Romingo website (“Site”) constitutes your agreement to the following Terms or Use (“Terms”). You should read these Terms and our privacy policy in their entirety before accessing, using, or obtaining information or services from the Site.',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/blog',
    title: 'Romingo Blog',
    description:
      'Discover pet-friendly travel tips and exclusive deals for Romingo.',
    image: '',
    keywords: defaultKeywords,
  },
  {
    path: '/hilton-pet-policy',
    title:
      'A Guide to Hilton Hotels Pet Policy: What You Need to Know — Romingo',
    description:
      "If you're traveling with your furry friend, it's important to understand the pet policies of the hotels you're considering. Hilton is one hotel chain that is known for being pet-friendly, but what exactly does that mean? In this guide, we'll provide an overview of Hilton's pet policy and offer tips for traveling with pets to Hilton hotels.",
    image: 'https://www.romingo.com/public/images/policy-images/hilton.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/hyatt-pet-policy',
    title:
      'A Guide to Hyatt Hotels Pet Policy: What You Need to Know — Romingo',
    description:
      "Are you planning to travel with your furry friend and looking for a pet-friendly hotel? Look no further than Hyatt, a hotel brand that has a longstanding commitment to creating comfortable and welcoming experiences for both pets and their owners. But before booking your stay, it's important to understand Hyatt's pet policy and any fees and restrictions that come with bringing your pet along. Luckily, you don't have to navigate this process alone. Romingo is the premier resource for booking pet-friendly hotels, and we've got all the information you need to plan the perfect pet-friendly getaway with Hyatt.",
    image: 'https://www.romingo.com/public/images/policy-images/hyatt.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/ihg-pet-policy',
    title: 'IHG Hotels Pet Policy: An Overview — Romingo',
    description:
      "Traveling with your furry companion can be a fun adventure, but it's crucial to make sure you're booking a pet-friendly hotel. IHG Hotels & Resorts is a leading hospitality company that offers pet-friendly options across many of its 17 distinct brands. Whether you're looking for a luxury experience or a budget-friendly stay, there's an IHG brand that caters to your needs and welcomes your furry friend. Let’s take a closer look at IHG's pet policies and highlight some of the best pet-friendly options in the portfolio.",
    image: 'https://www.romingo.com/public/images/policy-images/ihg.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/marriott-pet-policy',
    title: 'Marriott Hotels Pet Policy: An Overview — Romingo',
    description:
      "Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it's important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free.",
    image: 'https://www.romingo.com/public/images/policy-images/marriott.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/motel-6-pet-policy',
    title: 'Motel 6 Hotels Pet Policy: An Overview — Romingo',
    description:
      "Traveling with pets can be a wonderful experience, but it's important to understand the pet policies of hotels before booking your stay. Motel 6 is a popular hotel chain offering a pet-friendly policy at most of its locations. It’s also America's original pet-friendly hotel chain and has been serving travelers since 1962. Here’s everything you need to know!",
    image: 'https://www.romingo.com/public/images/policy-images/motel-6.jpg',
    keywords: defaultKeywords,
  },
  {
    path: '/boutique-pet-policy',
    title: 'Why Choose a Dog-Friendly Boutique Hotel? — Romingo',
    description:
      "Are you tired of leaving your furry best friend behind when you hit the road for a vacation? Well, we've got some good news for you! Dog-friendly boutique hotels are on the rise, and we've put together the ultimate guide to help you find the perfect spot for you and your pooch.",
    image: 'https://www.romingo.com/public/images/policy-images/boutique.webp',
    keywords: defaultKeywords,
  },
];
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
  const result = await fetch(`https://blog.romingo.com/wp-json/wp/v2/posts?page=${page}&per_page=50&_embed&_fields=id,slug,excerpt,title,link,_links,_embedded`)
  const json = await result.json()
  const total = result.headers.get("x-wp-total")

  for (let i = 0 ; i < json.length; i++) {
    const url = json[i].link
    const postId = json[i].id
    const postSlug = json[i].slug
    fetch(`https://blog.romingo.com/wp-json/yoast/v1/get_head?url=${url}`).then(res => res.json()).then(seoJson => {
      const { og_title, og_description, og_image } = seoJson.json
      seo.push({
        path: `/blog/post/${postSlug}`,
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

if (process.env.NODE_ENV !== 'development') {
  app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));  
}

app.get('/sitemap.xml', function(req, res, next) {
  res.sendFile(__dirname + '/public/sitemap.xml'); 
})

app.get('/robots.txt', function(req, res, next) {
  res.sendFile(__dirname + '/public/robots.txt'); 

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
      .replace("__META_URL__", `https://romingo.com${page.path}`)
      .replace("__META_KEYWORDS__", page.keywords);
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
      .replace("__META_URL__", pathname)
      .replace("__META_KEYWORDS__", "hotels, travel, pet friendly hotels, hotels near me, booking hotel, hotel booking, hotels nearby");
    return res.send(htmlWithSeo);
  }
});
app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log("listened on");
});