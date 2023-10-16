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
    title: 'Romingo: Pet Friendly Hotels',
    description: 'Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and the lowest rates guaranteed provide a truly pet-friendly experience. Roam the world freely with Romingo.',
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
    title: 'Pet Friendly Hotels in Los Angeles, CA | Romingo',
    description:
      "Time in the dazzling city of Los Angeles isn't complete without your pet! These pet friendly hotels will ensure you have the best stay possible.",
    image: HOTEL_DESCRIPTIONS[17].heroImage,
    keywords: HOTEL_DESCRIPTIONS[17].keywords,
  },
  {
    path: '/pet-friendly-hotels/san-diego-california',
    title: 'Pet Friendly Hotels San Diego, CA | Romingo',
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
    title: 'Pet Friendly Hotels San Fransisco, CA | Romingo',
    description:
      "A vacation to San Fransisco isn't complete without your furry friend. Find the best deals for pet friendly hotels to book here!",
    image: HOTEL_DESCRIPTIONS[20].heroImage,
    keywords: HOTEL_DESCRIPTIONS[20].keywords,
  },
  {
    path: '/pet-friendly-hotels/santa-barbara-california',
    title: 'Pet Friendly Hotels Santa Barbara, CA | Romingo',
    description:
      'Enjoy all the relaxing sights and activities of Santa Barbara, and bring your furry friend with you! Explore the best pet friendly hotels here!',
    image: HOTEL_DESCRIPTIONS[21].heroImage,
    keywords: HOTEL_DESCRIPTIONS[21].keywords,
  },
  {
    path: '/pet-friendly-hotels/palm-springs-california',
    title: 'Pet Friendly Hotels Palm Springs, CA | Romingo',
    description:
      "Palm Springs is a must-see in California. Don't leave your furry friend behind! Explore the best pet friendly hotels here.",
    image: HOTEL_DESCRIPTIONS[16].heroImage,
    keywords: HOTEL_DESCRIPTIONS[16].keywords,
  },
  {
    path: '/pet-friendly-hotels/austin-texas',
    title: 'Pet Friendly Hotels Austin, TX | Romingo',
    description:
      'Austin is known for its live music and incredible food. If you’re traveling with your pet, here are the best pet-friendly hotels in Austin, Texas!',
    image: HOTEL_DESCRIPTIONS[0].heroImage,
    keywords: HOTEL_DESCRIPTIONS[0].keywords,
  },
  {
    path: '/pet-friendly-hotels/dallas-texas',
    title: 'Pet Friendly Hotels Dallas, TX | Romingo ',
    description:
      'If you’re visiting Dallas, there’s no shortage of places to see and activities to enjoy. Here’s our ultimate guide to a pet-friendly stay in Dallas.',
    image: HOTEL_DESCRIPTIONS[1].heroImage,
    keywords: HOTEL_DESCRIPTIONS[1].keywords,
  },
  {
    path: '/pet-friendly-hotels/houston-texas',
    title: 'Pet Friendly Hotels Houston, TX | Romingo',
    description:
      'There are plenty of attractions to visit in Houston! Explore the best pet friendly hotels around to take your stay to the next level.',
    image: HOTEL_DESCRIPTIONS[2].heroImage,
    keywords: HOTEL_DESCRIPTIONS[2].keywords,
  },
  {
    path: '/pet-friendly-hotels/oceanside-california',
    title: 'Pet Friendly Hotels in Oceanside, CA | Romingo',
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
    title: 'Pet friendly hotels Tucson, AZ | Romingo',
    description: "Tucson beckons as a vibrant desert destination, its landscapes dazzling and history rich. Nestled in the Sonoran Desert's heart, Tucson blends natural beauty with Southwestern charm, offering something for all. From traversing picturesque desert trails to immersing in the city's artistic offerings, this captivating desert oasis delights.",
    image: HOTEL_DESCRIPTIONS[6].heroImage,
    keywords: HOTEL_DESCRIPTIONS[6].keywords,
  },
  {
    path: '/pet-friendly-hotels/santa-fe-new-mexico',
    title: 'Pet Friendly Hotels Santa Fe, NM | Romingo',
    description:
      'Explore the beautiful architecture, art, and incredible food of Santa Fe with your dog! These pet friendly hotels are a must.',
    image: HOTEL_DESCRIPTIONS[7].heroImage,
    keywords: HOTEL_DESCRIPTIONS[7].keywords,
  },
  {
    path: '/pet-friendly-hotels/san-antonio-texas',
    title: 'Pet Friendly Hotels San Antonio, TX | Romingo',
    description:
      "If you're visiting the beautiful city of San Antonio, Texas, you'll need to find the best hotel deals. Explore the top pet friendly hotels here.",
    image: HOTEL_DESCRIPTIONS[8].heroImage,
    keywords: HOTEL_DESCRIPTIONS[8].keywords,
  },
  {
    path: '/pet-friendly-hotels/vail-colorado',
    title: 'Pet Friendly Hotels Vail, CO | Romingo',
    description:
      "Colorado Springs is the perfect travel destination, especially if you're planning a trip with your pet. Explore the best pet-friendly hotels here!",
    image: HOTEL_DESCRIPTIONS[9].heroImage,
    keywords: HOTEL_DESCRIPTIONS[9].keywords,
  },
  {
    path: '/pet-friendly-hotels/colorado-springs-colorado',
    title: 'Pet Friendly Hotels Colorado Springs, CO | Romingo',
    description: "Situated at the base of the Rocky Mountains, Colorado Springs captivates with stunning landscapes, rich history and with a variety of outdoor activities available. It's a favorite for pet owners with its diverse selection of pet-friendly hotels.",
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
    title: 'Pet Friendly Hotels Seattle, WA | Romingo',
    description:
      'Paying the vibrant city of Seattle a visit this year? Bring your pup with you and enjoy these top-rated pet friendly hotels.',
    image: HOTEL_DESCRIPTIONS[12].heroImage,
    keywords: HOTEL_DESCRIPTIONS[12].keywords,
  },
  {
    path: '/pet-friendly-hotels/portland-oregon',
    title: 'Pet Friendly Hotels Portland, OR | Romingo',
    description:
      'Portland, Oregon is home to fantastic food and even better people. Explore the top rate pet friendly hotels to make your trip unforgettable here!',
    image: HOTEL_DESCRIPTIONS[13].heroImage,
    keywords: HOTEL_DESCRIPTIONS[13].keywords,
  },
  {
    path: '/pet-friendly-hotels/sacramento-california',
    title: 'Pet Friendly Hotels Sacramento, CA | Romingo',
    description:
      'Sacramento, CA is home to beautiful views and great people. Thinking of paying a visit? Find the best pet friendly hotels here.',
    image: HOTEL_DESCRIPTIONS[14].heroImage,
    keywords: HOTEL_DESCRIPTIONS[14].keywords,
  },
  {
    path: '/pet-friendly-hotels/salt-lake-city-utah',
    title: 'Pet Friendly Hotels Salt Lake City, UT | Romingo',
    description:
      'Are you looking to explore the mountainous beauty of Salt Lake City with your furry friend? Find the best pet friendly hotels here.',
    image: HOTEL_DESCRIPTIONS[15].heroImage,
    keywords: HOTEL_DESCRIPTIONS[15].keywords,
  },
  {
    path: '/pet-friendly-hotels/atlanta-georgia',
    title: 'Pet Friendly Hotels Atlanta, GA | Romingo',
    description: 'Discovering Atlanta with your dog is now simpler with many pet-friendly hotels and attractions available in the city.  Atlanta offers numerous options for pet owners who want to travel with their pets. These options include dog parks, hiking trails, and pet-friendly patios and cafes.',
    image: HOTEL_DESCRIPTIONS[22].heroImage,
    keywords: HOTEL_DESCRIPTIONS[22].keywords,
  },
  {
    path: '/pet-friendly-hotels/baltimore-maryland',
    title: 'Pet Friendly Hotels Baltimore, MD | Romingo',
    description: "If you're a pet lover looking to explore a vibrant city, Baltimore is the perfect destination for pet-friendly travel! Known for its rich history, diverse culture, and scenic waterfront, this charming city welcomes furry companions with open arms.",
    image: HOTEL_DESCRIPTIONS[23].heroImage,
    keywords: HOTEL_DESCRIPTIONS[23].keywords,
  },
  {
    path: '/pet-friendly-hotels/boston-massachusetts',
    title: 'Pet Friendly Hotels Boston, MA | Romingo',
    description: "Boston is an ideal destination for pet-friendly travel, where the bustling city seamlessly merges with a warm and welcoming atmosphere for furry companions. Exploring this historic city becomes even more enjoyable when you can share it with your beloved pets. Numerous pet-friendly accommodations, from charming boutique hotels to cozy bed and breakfasts, readily open their doors to pets of all sizes. ",
    image: HOTEL_DESCRIPTIONS[24].heroImage,
    keywords: HOTEL_DESCRIPTIONS[24].keywords,
  },
  {
    path: '/pet-friendly-hotels/charlotte-north-carolina',
    title: 'Pet Friendly Hotels Charlotte, NC | Romingo',
    description: "Charlotte, a vibrant city nestled in the heart of North Carolina, beckons pet owners with its warm hospitality and numerous pet-friendly travel options. Whether you're a local or a visitor, exploring this bustling city with your furry companion is a delightful experience.",
    image: HOTEL_DESCRIPTIONS[25].heroImage,
    keywords: HOTEL_DESCRIPTIONS[25].keywords,
  },
  {
    path: '/pet-friendly-hotels/chicago-illinois',
    title: 'Pet Friendly Hotels Chicago, IL | Romingo',
    description: "Chicago is an ideal destination for pet-friendly travel, offering a plethora of activities and accommodations that cater to our beloved four-legged companions. The city boasts numerous parks and green spaces, such as the iconic Millennium Park and Grant Park, where dogs can run off-leash and socialize with other pups.",
    image: HOTEL_DESCRIPTIONS[26].heroImage,
    keywords: HOTEL_DESCRIPTIONS[26].keywords,
  },
  {
    path: '/pet-friendly-hotels/cleveland-ohio',
    title: 'Pet Friendly Hotels Cleveland, OH | Romingo',
    description: "Cleveland offers a delightful array of pet-friendly travel experiences for you and your furry companions. Whether you're exploring the lush parks, strolling along the picturesque waterfront, or visiting pet-welcoming attractions, there's something for everyone in this pet-loving metropolis.",
    image: HOTEL_DESCRIPTIONS[27].heroImage,
    keywords: HOTEL_DESCRIPTIONS[27].keywords,
  },
  {
    path: '/pet-friendly-hotels/detroit-michigan',
    title: 'Pet Friendly Hotels Detroit, MI | Romingo',
    description: "Detroit, a city renowned for its rich history and vibrant culture, has emerged as an increasingly pet-friendly travel destination, welcoming both locals and visitors to explore its wonders with their furry companions. From charming boutique hotels and cozy bed-and-breakfasts that cater to pets, to a plethora of parks and recreational spaces designed for four-legged friends, Detroit has become a haven for pet enthusiasts. Visitors can take leisurely strolls with their dogs along the scenic RiverWalk or unwind at the numerous dog-friendly cafes and restaurants scattered throughout the city.",
    image: HOTEL_DESCRIPTIONS[28].heroImage,
    keywords: HOTEL_DESCRIPTIONS[28].keywords,
  },
  {
    path: '/pet-friendly-hotels/indianapolis-indiana',
    title: 'Pet Friendly Hotels Indianapolis, IN | Romingo',
    description: "If you're a pet owner looking to explore the vibrant city of Indianapolis, you're in for a treat as the city warmly embraces pet-friendly travel! Indianapolis boasts a myriad of pet-friendly accommodations, making it easy to find comfortable and welcoming lodgings for you and your furry companion. From charming boutique hotels to cozy motels and vacation rentals, there's something to suit every budget and preference. Once you've settled in, you'll discover a plethora of pet-friendly attractions and activities to enjoy together.",
    image: HOTEL_DESCRIPTIONS[29].heroImage,
    keywords: HOTEL_DESCRIPTIONS[29].keywords,
  },
  {
    path: '/pet-friendly-hotels/miami-florida',
    title: 'Pet Friendly Hotels Miami, FL | Romingo',
    description: "Miami is an ideal destination for pet-friendly travel, offering a plethora of opportunities for unforgettable adventures with your four-legged companions. From sun-kissed beaches to vibrant parks and trendy cafes, the city ensures that no member of your family is left behind. Take a leisurely stroll along the iconic South Beach, where pets are welcomed on designated areas, allowing them to frolic in the gentle waves and soft sand. ",
    image: HOTEL_DESCRIPTIONS[30].heroImage,
    keywords: HOTEL_DESCRIPTIONS[30].keywords,
  },
  {
    path: '/pet-friendly-hotels/milwaukee-wisconsin',
    title: 'Pet Friendly Hotels Milwaukee, WI | Romingo',
    description: "Milwaukee, known for its vibrant culture and scenic landscapes, is an ideal destination for pet-friendly travel enthusiasts. This charming city along the shores of Lake Michigan warmly welcomes four-legged companions, making it a haven for pet owners seeking unforgettable experiences with their furry friends. Whether exploring the picturesque Milwaukee Riverwalk, strolling through the pet-friendly parks like Estabrook Park or Grant Park, or enjoying a day at the dog-friendly Bradford Beach, there are endless opportunities for pets to stretch their paws and soak up the fresh air. ",
    image: HOTEL_DESCRIPTIONS[31].heroImage,
    keywords: HOTEL_DESCRIPTIONS[31].keywords,
  },
  {
    path: '/pet-friendly-hotels/minneapolis-minnesota',
    title: 'Pet Friendly Hotels Minneapolis, MN | Romingo',
    description: "Minneapolis is a haven for pet-friendly travel, making it an ideal destination for those who want to explore the city without leaving their furry companions behind. From its numerous parks and green spaces to its abundance of pet-friendly accommodation options, Minneapolis warmly welcomes pets with open arms. One can begin their adventure by strolling through the iconic Chain of Lakes, where dogs can run off-leash and splash in the water. The city boasts an impressive selection of pet-friendly cafes and restaurants, ensuring that pet owners can enjoy a meal with their four-legged friends by their side. ",
    image: HOTEL_DESCRIPTIONS[32].heroImage,
    keywords: HOTEL_DESCRIPTIONS[32].keywords,
  },
  {
    path: '/pet-friendly-hotels/new-orleans-louisiana',
    title: 'Pet Friendly Hotels New Orleans, LA | Romingo',
    description: "New Orleans, the vibrant city of jazz, culture, and mouthwatering cuisine, warmly welcomes four-legged travelers. Pet-friendly travel in the Big Easy has become increasingly popular, as more hotels, activities, and restaurants embrace the presence of our furry friends. Whether you're strolling through the historic French Quarter, exploring the lush City Park, or indulging in some delicious gumbo, your pets can now join in on the fun. From pet-friendly hotels offering special amenities to a plethora of exciting activities catered to pets, New Orleans ensures a memorable and inclusive experience for every member of your family, including the ones with wagging tails.",
    image: HOTEL_DESCRIPTIONS[33].heroImage,
    keywords: HOTEL_DESCRIPTIONS[33].keywords,
  },
  {
    path: '/pet-friendly-hotels/new-york-new-york',
    title: 'Pet Friendly Hotels New York, NY | Romingo',
    description: "New York City offers a vibrant and exciting atmosphere for both locals and tourists, and luckily for pet owners, it also happens to be a remarkably pet-friendly destination. Exploring the Big Apple with your furry companion has never been easier, as numerous hotels, parks, and attractions welcome pets with open arms. Many hotels throughout the city now accommodate pets, providing comfortable accommodations and even special amenities for our four-legged friends. ",
    image: HOTEL_DESCRIPTIONS[34].heroImage,
    keywords: HOTEL_DESCRIPTIONS[34].keywords,
  },
  {
    path: '/pet-friendly-hotels/washington-dc',
    title: 'Pet Friendly Hotels Washington D.C. | Romingo',
    description: "Washington, D.C., the capital of the United States, is a vibrant and historical city that welcomes pet-friendly travel with open arms. Traveling to this bustling metropolis with your furry companion is a delightful experience, as many accommodations, attractions, and parks cater to pets. Numerous hotels in Washington, D.C., are pet-friendly, offering comfortable accommodations and special amenities to ensure your pet's comfort during your stay. ",
    image: HOTEL_DESCRIPTIONS[35].heroImage,
    keywords: HOTEL_DESCRIPTIONS[35].keywords,
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
// fs.createReadStream('./hotels.csv')
//   .pipe(csv.parse({ headers: false }))
//   .on('error', error => console.error(error))
//   .on('data', row => {
//     seo.push({
//       path: `/hotel/${row[22]}`,
//       title: `${row[4]} Pet Policy - Romingo`,
//       description: row[5],
//       image: `https://storage.googleapis.com/romingo-production-public/images/${encodeURIComponent(row[16])}/${row[11]}`,
//     })
//   })
//   .on('end', () => console.log('loaded hotels.csv'));

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