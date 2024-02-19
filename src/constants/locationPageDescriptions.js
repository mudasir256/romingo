const HOTEL_DESCRIPTIONS = [
  {
    city: 'Austin, TX',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Austin%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Austin.jpg',
    keywords: "pet friendly hotels Austin, TX, dog friendly hotels Austin, TX, pet friendly bed &amp; breakfasts Austin, TX, dog friendly BBs Austin, TX, pet friendly vacation rentals Austin, TX, dog friendly vacation rentals Austin, TX, Austin, TX pet friendly accommodations, Austin, TX dog friendly lodging"
  },
  {
    city: 'Dallas, TX',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Dallas%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Dallas.jpg',
    keywords: "pet friendly hotels Dallas, TX, dog friendly hotels Dallas, TX, pet friendly bed &amp; breakfasts Dallas, TX, dog friendly B&amp;Bs Dallas, TX, pet friendly vacation rentals Dallas, TX, dog friendly vacation rentals Dallas, TX, Dallas, TX pet friendly accommodations, Dallas, TX dog friendly lodging"
  },
  {
    city: 'Houston, TX',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Houston%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Houston.jpg',
    keywords: "pet friendly hotels Houston, TX, dog friendly hotels Houston, TX, pet friendly bed & breakfasts Houston, TX, dog friendly B&Bs Houston, TX, pet friendly vacation rentals Houston, TX, dog friendly vacation rentals Houston, TX, Houston, TX pet friendly accommodations, Houston, TX dog friendly lodging"
  },
  {
    city: 'Oceanside, CA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Oceanside%20California.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Oceanside.jpg',
    keywords: "pet friendly hotels Oceanside, CA, dog friendly hotels Oceanside, CA, pet friendly bed & breakfasts Oceanside, CA, dog friendly B&Bs Oceanside, CA, pet friendly vacation rentals Oceanside, CA, dog friendly vacation rentals Oceanside, CA, Oceanside, CA pet friendly accommodations, Oceanside, CA dog friendly lodging"
  },
  {
    city: 'Phoenix, AZ',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Pheonix%20Hero%20Resided.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Phoenix.jpg',
    keywords: "pet friendly hotels Phoenix, AZ, dog friendly hotels Phoenix, AZ, pet friendly bed & breakfasts Phoenix, AZ, dog friendly B&Bs Phoenix, AZ, pet friendly vacation rentals Phoenix, AZ, dog friendly vacation rentals Phoenix, AZ, Phoenix, AZ pet friendly accommodations, Phoenix, AZ dog friendly lodging"
  },
  {
    city: 'Scottsdale, AZ',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Scottsdale%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Scottsdale.jpg',
    keywords: "pet friendly hotels Scottsdale, AZ, dog friendly hotels Scottsdale, AZ, pet friendly bed & breakfasts Scottsdale, AZ, dog friendly B&Bs Scottsdale, AZ, pet friendly vacation rentals Scottsdale, AZ, dog friendly vacation rentals Scottsdale, AZ, Scottsdale, AZ pet friendly accommodations, Scottsdale, AZ dog friendly lodging"
  },
  {
    city: 'Tucson, AZ',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Tuscan%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Tucson.jpg',
    keywords: "pet friendly hotels Tucson, AZ, dog friendly hotels Tucson, AZ, pet friendly bed & breakfasts Tucson, AZ, dog friendly B&Bs Tucson, AZ, pet friendly vacation rentals Tucson, AZ, dog friendly vacation rentals Tucson, AZ, Tucson, AZ pet friendly accommodations, Tucson, AZ dog friendly lodging"

  },
  {
    city: 'Santa Fe, NM',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Sante%20Fe%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Santa%20Fe.jpg',
    keywords: "pet friendly hotels Santa Fe, NM, dog friendly hotels Santa Fe, NM, pet friendly bed & breakfasts Santa Fe, NM, dog friendly B&Bs Santa Fe, NM, pet friendly vacation rentals Santa Fe, NM, dog friendly vacation rentals Santa Fe, NM, Santa Fe, NM pet friendly accommodations, Santa Fe, NM dog friendly lodging"
  },
  {
    city: 'San Antonio, TX',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/San%20Antonio%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/San%20Antonio.jpg',
    keywords: "pet friendly hotels San Antonio, TX, dog friendly hotels San Antonio, TX, pet friendly bed & breakfasts San Antonio, TX, dog friendly B&Bs San Antonio, TX, pet friendly vacation rentals San Antonio, TX, dog friendly vacation rentals San Antonio, TX, San Antonio, TX pet friendly accommodations, San Antonio, TX dog friendly lodging"
  },
  {
    city: 'Vail, CO',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Vail%20Colorado.jpg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Vail.jpg',
    keywords: "pet friendly hotels Vail, CO, dog friendly hotels Vail, CO, pet friendly bed & breakfasts Vail, CO, dog friendly B&Bs Vail, CO, pet friendly vacation rentals Vail, CO, dog friendly vacation rentals Vail, CO, Vail, CO pet friendly accommodations, Vail, CO dog friendly lodging"
  },
  {
    city: 'Colorado Springs, CO',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Colorado%20Springs.jpg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Colorado%20Springs.jpg',
    keywords: "pet friendly hotels Colorado Springs, CO, dog friendly hotels Colorado Springs, CO, pet friendly bed & breakfasts Colorado Springs, CO, dog friendly B&Bs Colorado Springs, CO, pet friendly vacation rentals Colorado Springs, CO, dog friendly vacation rentals Colorado Springs, CO, Colorado Springs, CO pet friendly accommodations, Colorado Springs, CO dog friendly lodging"
  },
  {
    city: 'Denver, CO',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Denver%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Denver.jpg',
    keywords: "pet friendly hotels Denver, CO, dog friendly hotels Denver, CO, pet friendly bed & breakfasts Denver, CO, dog friendly B&Bs Denver, CO, pet friendly vacation rentals Denver, CO, dog friendly vacation rentals Denver, CO, Denver, CO pet friendly accommodations, Denver, CO dog friendly lodging"
  },
  {
    city: 'Seattle, WA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Seattle%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Seattle.jpg',
    keywords: "pet friendly hotels Seattle, WA, dog friendly hotels Seattle, WA, pet friendly bed & breakfasts Seattle, WA, dog friendly B&Bs Seattle, WA, pet friendly vacation rentals Seattle, WA, dog friendly vacation rentals Seattle, WA, Seattle, WA pet friendly accommodations, Seattle, WA dog friendly lodging"
  },
  {
    city: 'Portland, OR',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Portland%20%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Portland.jpg',
    keywords: "pet friendly hotels Portland, OR, dog friendly hotels Portland, OR, pet friendly bed & breakfasts Portland, OR, dog friendly B&Bs Portland, OR, pet friendly vacation rentals Portland, OR, dog friendly vacation rentals Portland, OR, Portland, OR pet friendly accommodations, Portland, OR dog friendly lodging"
  },
  {
    city: 'Sacramento, CA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Sacramento.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Sacramento.jpeg',
    keywords: "pet friendly hotels Sacramento, CA, dog friendly hotels Sacramento, CA, pet friendly bed & breakfasts Sacramento, CA, dog friendly B&Bs Sacramento, CA, pet friendly vacation rentals Sacramento, CA, dog friendly vacation rentals Sacramento, CA, Sacramento, CA pet friendly accommodations, Sacramento, CA dog friendly lodging"
  },
  {
    city: 'Salt Lake City, UT',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Salt%20Lake%20Ciy%20Hero%20Resized%20.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Salt%20Lake%20City.jpg',
    keywords: "pet friendly hotels Salt Lake City, UT, dog friendly hotels Salt Lake City, UT, pet friendly bed & breakfasts Salt Lake City, UT, dog friendly B&Bs Salt Lake City, UT, pet friendly vacation rentals Salt Lake City, UT, dog friendly vacation rentals Salt Lake City, UT, Salt Lake City, UT pet friendly accommodations, Salt Lake City, UT dog friendly lodging"
  },
  {
    city: 'Palm Springs, CA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Palm%20Springs%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/ps-4.jpeg',
    keywords: "pet friendly hotels Palm Springs, CA, dog friendly hotels Palm Springs, CA, pet friendly bed & breakfasts Palm Springs, CA, dog friendly B&Bs Palm Springs, CA, pet friendly vacation rentals Palm Springs, CA, dog friendly vacation rentals Palm Springs, CA, Palm Springs, CA pet friendly accommodations, Palm Springs, CA dog friendly lodging"
  },
  {
    city: 'Los Angeles, CA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Los%20Angeles%20Hero%20Resized.jpeg',
    secondaryImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/la-4.jpeg',
    keywords: "pet friendly hotels Los Angeles, CA, dog friendly hotels Los Angeles, CA, pet friendly bed & breakfasts Los Angeles, CA, dog friendly B&Bs Los Angeles, CA, pet friendly vacation rentals Los Angeles, CA, dog friendly vacation rentals Los Angeles, CA, Los Angeles, CA pet friendly accommodations, Los Angeles, CA dog friendly lodging"
  },
  {
    city: 'Orange County, CA',
    heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/oc-hero.jpeg",
    secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/oc-4.jpeg",
    keywords: "pet friendly hotels Orange County, CA, dog friendly hotels Orange County, CA, pet friendly bed & breakfasts Orange County, CA, dog friendly B&Bs Orange County, CA, pet friendly vacation rentals Orange County, CA, dog friendly vacation rentals Orange County, CA, Orange County, CA pet friendly accommodations, Orange County, CA dog friendly lodging"
  },
  {
    city: 'San Diego, CA',
    heroImage: "https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/San%20Diego%20Hero%20Resized.jpeg",
    secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sd-4.jpeg",
    keywords: "pet friendly hotels San Diego, CA, dog friendly hotels San Diego, CA, pet friendly bed & breakfasts San Diego, CA, dog friendly B&Bs San Diego, CA, pet friendly vacation rentals San Diego, CA, dog friendly vacation rentals San Diego, CA, San Diego, CA pet friendly accommodations, San Diego, CA dog friendly lodging"
  },
  {
    city: 'San Francisco, CA',
    heroImage: "https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/San%20Francisco%20pet%20friendly%20hotels.jpg",
    secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sf-4.jpeg",
    keywords: "pet friendly hotels San Francisco, CA, dog friendly hotels San Francisco, CA, pet friendly bed & breakfasts San Francisco, CA, dog friendly B&Bs San Francisco, CA, pet friendly vacation rentals San Francisco, CA, dog friendly vacation rentals San Francisco, CA, San Francisco, CA pet friendly accommodations, San Francisco, CA dog friendly lodging"
  },
  { 
    city: 'Santa Barbara, CA',
    heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sb-hero.jpeg",
    secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sb-4.jpeg",
    keywords: "pet friendly hotels Santa Barbara, CA, dog friendly hotels Santa Barbara, CA, pet friendly bed & breakfasts Santa Barbara, CA, dog friendly B&Bs Santa Barbara, CA, pet friendly vacation rentals Santa Barbara, CA, dog friendly vacation rentals Santa Barbara, CA, Santa Barbara, CA pet friendly accommodations, Santa Barbara, CA dog friendly lodging"
  },
  {
    city: 'Atlanta, GA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Atlanta%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: "pet friendly hotels Atlanta, GA, dog friendly hotels Atlanta, GA, pet friendly bed & breakfasts Atlanta, GA, dog friendly B&Bs Atlanta, GA, pet friendly vacation rentals Atlanta, GA, dog friendly vacation rentals Atlanta, GA, Atlanta, GA pet friendly accommodations, Atlanta, GA dog friendly lodging"
  },
  {
    city: "Baltimore, MD",
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Baltimore%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Baltimore, MD, dog friendly hotels Baltimore, MD, pet friendly bed & breakfasts Baltimore, MD, dog friendly B&Bs Baltimore, MD, pet friendly vacation rentals Baltimore, MD, dog friendly vacation rentals Baltimore, MD, Baltimore, MD pet friendly accommodations, Baltimore, MD dog friendly lodging'
  },
  {
    city: 'Boston, MA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Boston%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Boston, MA, dog friendly hotels Boston, MA, pet friendly bed & breakfasts Boston, MA, dog friendly B&Bs Boston, MA, pet friendly vacation rentals Boston, MA, dog friendly vacation rentals Boston, MA, Boston, MA pet friendly accommodations, Boston, MA dog friendly lodging' 
  },
  {
    city: 'Charlotte, NC',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Charlotte%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Charlotte, NC, dog friendly hotels Charlotte, NC, pet friendly bed & breakfasts Charlotte, NC, dog friendly B&Bs Charlotte, NC, pet friendly vacation rentals Charlotte, NC, dog friendly vacation rentals Charlotte, NC, Charlotte, NC pet friendly accommodations, Charlotte, NC dog friendly lodging'
  },
  {
    city: 'Chicago, IL',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/Charlotte%20pet%20friendly%20hotels.jpg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Chicago, IL, dog friendly hotels Chicago, IL, pet friendly bed & breakfasts Chicago, IL, dog friendly B&Bs Chicago, IL, pet friendly vacation rentals Chicago, IL, dog friendly vacation rentals Chicago, IL, Chicago, IL pet friendly accommodations, Chicago, IL dog friendly lodging'
  },
  {
    city: 'Cleveland, OH',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Cleveland%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Cleveland, OH, dog friendly hotels Cleveland, OH, pet friendly bed & breakfasts Cleveland, OH, dog friendly B&Bs Cleveland, OH, pet friendly vacation rentals Cleveland, OH, dog friendly vacation rentals Cleveland, OH, Cleveland, OH pet friendly accommodations, Cleveland, OH dog friendly lodging'
  },
  {
    city: 'Detroit, MI',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Detroit%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Detroit, MI, dog friendly hotels Detroit, MI, pet friendly bed & breakfasts Detroit, MI, dog friendly B&Bs Detroit, MI, pet friendly vacation rentals Detroit, MI, dog friendly vacation rentals Detroit, MI, Detroit, MI pet friendly accommodations, Detroit, MI dog friendly lodging'
  },
  {
    city: 'Indianapolis, IN',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Indianapolis%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Indianapolis, IN, dog friendly hotels Indianapolis, IN, pet friendly bed & breakfasts Indianapolis, IN, dog friendly B&Bs Indianapolis, IN, pet friendly vacation rentals Indianapolis, IN, dog friendly vacation rentals Indianapolis, IN, Indianapolis, IN pet friendly accommodations, Indianapolis, IN dog friendly lodging'
  },
  {
    city: 'Miami, FL',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Miami%20Hero%20Resized.jpg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Miami, FL, dog friendly hotels Miami, FL, pet friendly bed & breakfasts Miami, FL, dog friendly B&Bs Miami, FL, pet friendly vacation rentals Miami, FL, dog friendly vacation rentals Miami, FL, Miami, FL pet friendly accommodations, Miami, FL dog friendly lodging'
  },
  {
    city: 'Milwaukee, WI',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Milwauki%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Milwaukee, WI, dog friendly hotels Milwaukee, WI, pet friendly bed & breakfasts Milwaukee, WI, dog friendly B&Bs Milwaukee, WI, pet friendly vacation rentals Milwaukee, WI, dog friendly vacation rentals Milwaukee, WI, Milwaukee, WI pet friendly accommodations, Milwaukee, WI dog friendly lodging'
  },
  {
    city: 'Minneapolis, MN',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/Minneapolis%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels Minneapolis, MN, dog friendly hotels Minneapolis, MN, pet friendly bed & breakfasts Minneapolis, MN, dog friendly B&Bs Minneapolis, MN, pet friendly vacation rentals Minneapolis, MN, dog friendly vacation rentals Minneapolis, MN, Minneapolis, MN pet friendly accommodations, Minneapolis, MN dog friendly lodging'
  },
  // {
  //   city: 'Nashville',
  //   heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Nashville/Nashville%20Hero.jpg',
  //   secondaryImage: '',
  //   keywords: ''
  // },
  {
    city: 'New Orleans, LA',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/New%20Orleans%20Hero%20Resized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels New Orleans, LA, dog friendly hotels New Orleans, LA, pet friendly bed & breakfasts New Orleans, LA, dog friendly B&Bs New Orleans, LA, pet friendly vacation rentals New Orleans, LA, dog friendly vacation rentals New Orleans, LA, New Orleans, LA pet friendly accommodations, New Orleans, LA dog friendly lodging'
  },
  {
    city: 'New York, NY',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Resized%20Hero%20Images/New%20York%20hero%20REsized.jpeg',
    secondaryImage: '',
    keywords: 'pet friendly hotels New York, NY, dog friendly hotels New York, NY, pet friendly bed & breakfasts New York, NY, dog friendly B&Bs New York, NY, pet friendly vacation rentals New York, NY, dog friendly vacation rentals New York, NY, New York, NY pet friendly accommodations, New York, NY dog friendly lodging'
  },
  {
    city: 'Washington DC, DC',
    heroImage: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Washington%20DC%20pet%20friendly%20hotels.webp',
    secondaryImage: '',
    keywords: 'pet friendly hotels Washington, DC, dog friendly hotels Washington, DC, pet friendly bed & breakfasts Washington, DC, dog friendly B&Bs Washington, DC, pet friendly vacation rentals Washington, DC, dog friendly vacation rentals Washington, DC, Washington, DC pet friendly accommodations, Washington, DC dog friendly lodging'
  }
]

module.exports = {
  HOTEL_DESCRIPTIONS
}