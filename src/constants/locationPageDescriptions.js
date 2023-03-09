const HOTEL_DESCRIPTIONS = [
	{
		city: 'Austin, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/austin-texas.jpg',
		paragraphOne: "This lively city is known for its live music scene, its delicious food, and its friendly people. Austin is the perfect place to visit if you're looking for a fun-filled vacation with plenty of pet-friendly tourist attractions. There are plenty of pet friendly things to do in this vibrant city, from exploring the river walk to taking a scenic walk through one of the many parks. You can also enjoy some of the best shopping and nightlife in Austin. Whether you're looking for an action-packed vacation or a relaxing weekend getaway, Austin is the perfect destination.",
		paragraphTwo: "There's no shortage of pet-friendly hotels in Austin, Texas. Whether you're looking for a budget-friendly option or a luxurious escape, you're sure to find a hotel that suits your needs. If you're looking to be in the heart of the action, downtown Austin is the place to be. Hotels here put you close to all the best restaurants, bars, and pet-friendly outdoor spaces.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Austin.jpg',
		keywords: "pet friendly hotels Austin, TX, dog friendly hotels Austin, TX, pet friendly bed &amp; breakfasts Austin, TX, dog friendly BBs Austin, TX, pet friendly vacation rentals Austin, TX, dog friendly vacation rentals Austin, TX, Austin, TX pet friendly accommodations, Austin, TX dog friendly lodging"
	},
	{
		city: 'Dallas, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Dallas%20Texas.jpeg',
		paragraphOne: "Dallas has a rich history and plenty to see and do. From the Sixth Floor Museum at Dealey Plaza to the Dallas World Aquarium, there are attractions to suit every interest. And, of course, no visit to Dallas would be complete without a trip to the iconic Reunion Tower. For those looking for a taste of local culture, the Dallas Arts District is home to an array of museums, theaters, and galleries. With so much to see and do, Dallas is a city that has something for everyone, including your pet.",
		paragraphTwo: "If you're looking for pet-friendly hotels in Dallas, Texas, you have plenty of options. From luxurious resorts to more budget-friendly options, you'll be able to find a hotel that suits your needs. For those who want to be close to the action, there are plenty of pet friendly hotels downtown.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Dallas.jpg',
		keywords: "pet friendly hotels Dallas, TX, dog friendly hotels Dallas, TX, pet friendly bed &amp; breakfasts Dallas, TX, dog friendly B&amp;Bs Dallas, TX, pet friendly vacation rentals Dallas, TX, dog friendly vacation rentals Dallas, TX, Dallas, TX pet friendly accommodations, Dallas, TX dog friendly lodging"
	},
	{
		city: 'Houston, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Houston%20Texas.jpg',
		paragraphOne: "Houston is the most populous city in the Southern United States and the fourth most populous city in the country. From the Space Center to the Museum of Natural Science, there are plenty of attractions to keep visitors entertained. The city is also home to a thriving food scene, with everything from Tex-Mex to Vietnamese cuisine on offer. And, of course, no visit to Houston would be complete without taking in a Houston Astros baseball game.",
		paragraphTwo: "There are plenty of pet friendly hotels in Houston, Texas. If you're looking to explore all the city has to offer, there are dozens of hotels centrally located near popular attractions like the Museum District and The Galleria. No matter your budget or preferences, you're sure to find the perfect pet friendly hotel in Houston, Texas.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Houston.jpg',
		keywords: "pet friendly hotels Houston, TX, dog friendly hotels Houston, TX, pet friendly bed & breakfasts Houston, TX, dog friendly B&Bs Houston, TX, pet friendly vacation rentals Houston, TX, dog friendly vacation rentals Houston, TX, Houston, TX pet friendly accommodations, Houston, TX dog friendly lodging"
	},
	{
		city: 'Oceanside, CA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Oceanside%20California.jpeg',
		paragraphOne: "Oceanside, California, is a beautiful oceanside town located in Southern California. Visitors can enjoy stunning ocean views, beaches, pet-friendly hotels, restaurants, and shops. There is also a pier which is a great place to walk, fish, or just take in the views. Oceanside is a popular destination for tourists and locals alike, and there is something for everyone to enjoy. Whether you're interested in surfing, kayaking, or simply exploring the coastline, oceanside is sure to please. If your pet is feeling adventurous as well, there are also plenty do friendly hiking trails in the area.",
		paragraphTwo: "Looking for a pet-friendly place to stay in Oceanside, California? There are plenty of pet friendly hotel options to choose from, whether you're looking for a luxurious getaway or a budget-friendly place to crash. For those wanting to splurge, the Oceanside area offers plenty of upscale hotels with all the bells and whistles, including top-notch amenities and breathtaking views. If you're on a tight budget, don't worry - there are also plenty of hotels that won't break the bank. No matter your budget, there's sure to be a hotel that's perfect for you.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Oceanside.jpg',
		keywords: "pet friendly hotels Oceanside, CA, dog friendly hotels Oceanside, CA, pet friendly bed & breakfasts Oceanside, CA, dog friendly B&Bs Oceanside, CA, pet friendly vacation rentals Oceanside, CA, dog friendly vacation rentals Oceanside, CA, Oceanside, CA pet friendly accommodations, Oceanside, CA dog friendly lodging"
	},
	{
		city: 'Phoenix, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Phoenix%20Arizona.jpg',
		paragraphOne: "Phoenix is a popular destination for tourists and business travelers alike. The capital city of Arizona, Phoenix, is best known for its year-round sun. A lesser-known fact is that it is the fifth-largest city in the United States. This vibrant city offers a diverse range of activities and attractions to keep visitors entertained.",
		paragraphTwo: "From hiking and biking in the Sonoran Desert to exploring the diverse cuisine and nightlife, there's something for everyone in Phoenix. With Phoenix being a hub for business and outdoor adventure alike, there are plenty of pet-friendly hotel options for travelers of all types.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Phoenix.jpg',
		keywords: "pet friendly hotels Phoenix, AZ, dog friendly hotels Phoenix, AZ, pet friendly bed & breakfasts Phoenix, AZ, dog friendly B&Bs Phoenix, AZ, pet friendly vacation rentals Phoenix, AZ, dog friendly vacation rentals Phoenix, AZ, Phoenix, AZ pet friendly accommodations, Phoenix, AZ dog friendly lodging"
	},
	{
		city: 'Scottsdale, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Scottsdale%20Arizona.jpeg',
		paragraphOne: "Scottsdale is a beautiful city in Arizona, just east of the capital city of Phoenix. Sitting at 1,200’ elevation, Scottsdale is a very green city with large orchards of old olive trees. If you are looking for a place to relax and rejuvenate, Scottsdale is the perfect destination. In addition to its many great attractions, Scottsdale has many pet-friendly hotels.",
		paragraphTwo: "While summers can get into triple digits on the thermometer over summer, the head is dry so it is not as oppressive as it can be in other parts of the country. The winters in Scottsdale are mild and the best time to visit. The cool temperatures are perfect for morning hikes with the dog, followed by afternoon rounds of golf at one of the many world-class courses in the area.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Scottsdale.jpg',
		keywords: "pet friendly hotels Scottsdale, AZ, dog friendly hotels Scottsdale, AZ, pet friendly bed & breakfasts Scottsdale, AZ, dog friendly B&Bs Scottsdale, AZ, pet friendly vacation rentals Scottsdale, AZ, dog friendly vacation rentals Scottsdale, AZ, Scottsdale, AZ pet friendly accommodations, Scottsdale, AZ dog friendly lodging"
	},
	{
		city: 'Tucson, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Tucson%20Arizona.jpg',
		paragraphOne: "Tucson is a city in Arizona that is rich in history and culture. Founded in 1775, Tucson was the first European settlement in the state. The city has since grown to become the second-largest in Arizona, with a population of over 1 million people. Tucson is home to several preserved adobe buildings, including the San Xavier del Bac Mission, which was built in the 18th century. The city is also home to the University of Arizona, founded in 1885.",
		paragraphTwo: "Tucson has a warm desert climate and is known for its annual Tucson Rodeo and Tucson Gem & Mineral Show. Visitors can explore the city's many museums and art galleries or drive through one of Tucson's nearby pet-friendly national parks. The winter is the best time to visit Tuscon with your pet. There are plenty of fantastic pet friendly hotels in the area that cater to you and your pets.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Tucson.jpg',
		keywords: "pet friendly hotels Tucson, AZ, dog friendly hotels Tucson, AZ, pet friendly bed & breakfasts Tucson, AZ, dog friendly B&Bs Tucson, AZ, pet friendly vacation rentals Tucson, AZ, dog friendly vacation rentals Tucson, AZ, Tucson, AZ pet friendly accommodations, Tucson, AZ dog friendly lodging"

	},
	{
		city: 'Santa Fe, NM',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Santa%20Fe%20New%20Mexico.jpg',
		paragraphOne: "Santa Fe was founded in 1610 and is the oldest capital city in the United States. The city is known for its art and architecture, as well as its traditional Native American and Hispanic influences. There are several museums, pet-friendly walking trails, amazing restaurants, southwestern art galleries, and the famous Santa Fe Opera House. Visitors can also enjoy a variety of outdoor activities, such as hiking, dog walking, biking, and horseback riding.",
		paragraphTwo: "Many of the hotels in Santa Fe are pet friendly and offer exceptional amenities for accompanying pets. The vast parks and grass areas make Santa Fe one of the best cities to travel to with your pet. Not to mention the great pet friendly hotels in the area.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Santa%20Fe.jpg',
		keywords: "pet friendly hotels Santa Fe, NM, dog friendly hotels Santa Fe, NM, pet friendly bed & breakfasts Santa Fe, NM, dog friendly B&Bs Santa Fe, NM, pet friendly vacation rentals Santa Fe, NM, dog friendly vacation rentals Santa Fe, NM, Santa Fe, NM pet friendly accommodations, Santa Fe, NM dog friendly lodging"
	},
	{
		city: 'San Antonio, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/San%20Antonio.jpg',
		paragraphOne: "Founded in 1718, San Antonio is well known for the infamous 1836 Battle of the Alamo. Today, the Alamo is a popular tourist destination. The city is also home to the pet-friendly San Antonio River Walk, a network of pedestrian paths along the San Antonio River. Other popular attractions include the Tower of the Americas, SeaWorld, and Six Flags.",
		paragraphTwo: "There is so much to see in San Antonio, and it is a great place to visit for a long weekend. Plus, with the many pet-friendly hotels in the area, there is no reason not to plan a trip. While in San Antonio, be sure to visit the McNay Art Museum and the San Antonio Museum of Art.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/San%20Antonio.jpg',
		keywords: "pet friendly hotels San Antonio, TX, dog friendly hotels San Antonio, TX, pet friendly bed & breakfasts San Antonio, TX, dog friendly B&Bs San Antonio, TX, pet friendly vacation rentals San Antonio, TX, dog friendly vacation rentals San Antonio, TX, San Antonio, TX pet friendly accommodations, San Antonio, TX dog friendly lodging"
	},
	{
		city: 'Vail, CO',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Vail%20Colorado.jpg',
		paragraphOne: "Vail Colorado is one of the most popular winter destinations in the United States. Located in the Rocky Mountains, Vail is known for its stunning scenery and world-class ski resorts. Visitors can enjoy a variety of activities both on and off the slopes, including snowboarding, dog sledding, ice skating, and snowmobiling. There are also plenty of high-end retail shops, restaurants, and pet-friendly hotels. Whether you're looking for an action-packed vacation or a relaxing getaway, Vail is the perfect place to enjoy some spectacular winter weather.",
		paragraphTwo: "This vibrant mountain town is also a popular summer destination. The pet-friendly mountainside accommodations make Vail the perfect destination for outdoor adventure year-round. During the summer, there is world-class downhill mountain biking, hiking, fly fishing, and trails for afternoon runs with your dog.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Vail.jpg',
		keywords: "pet friendly hotels Vail, CO, dog friendly hotels Vail, CO, pet friendly bed & breakfasts Vail, CO, dog friendly B&Bs Vail, CO, pet friendly vacation rentals Vail, CO, dog friendly vacation rentals Vail, CO, Vail, CO pet friendly accommodations, Vail, CO dog friendly lodging"
	},
	{
		city: 'Colorado Springs, CO',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Colorado%20Springs.jpg',
		paragraphOne: "Nestled at the base of the Rocky Mountains, Colorado Springs is a beautiful city with plenty to offer visitors. Outdoor enthusiasts can explore the more than 60 parks and trails in the area, including Garden of the Gods Park and Pikes Peak. Colorado Springs is also home to the US Olympic Training Center. History buffs can learn about the city's past at the Museum of Colorado Springs History, while art lovers can appreciate the many sculptures and murals downtown.",
		paragraphTwo: "Outdoor enthusiasts will find plenty to do in Colorado Springs, with hiking, biking, and climbing available. And, of course, no visit to Colorado Springs would be complete without taking in the stunning views of the mountains. There are many pet-friendly hotels in the area, making it easy to bring your pet along for the next big adventure.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Colorado%20Springs.jpg',
		keywords: "pet friendly hotels Colorado Springs, CO, dog friendly hotels Colorado Springs, CO, pet friendly bed & breakfasts Colorado Springs, CO, dog friendly B&Bs Colorado Springs, CO, pet friendly vacation rentals Colorado Springs, CO, dog friendly vacation rentals Colorado Springs, CO, Colorado Springs, CO pet friendly accommodations, Colorado Springs, CO dog friendly lodging"
	},
	{
		city: 'Denver, CO',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Denver.jpg',
		paragraphOne: "The Mile High City, Denver, boasts a vibrant downtown area with plenty of shopping, dining, and pet-friendly hotels. Outside of the city, visitors can enjoy the Rocky Mountains and all the outdoor activities they have to offer. Outdoor enthusiasts can hike, mountain bike, or ski in the nearby mountains, while culture lovers can explore the numerous art galleries and museums.",
		paragraphTwo: "Denver is nestled in the Rocky Mountains and boasts stunning views in every direction. The River Walk in the NoDo downtown region is the perfect place to bring your dog. During the summer months, you will see many dogs and their owners wading in the cool river water. Best of all, some of the top pet-friendly hotels are close by.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Denver.jpg',
		keywords: "pet friendly hotels Denver, CO, dog friendly hotels Denver, CO, pet friendly bed & breakfasts Denver, CO, dog friendly B&Bs Denver, CO, pet friendly vacation rentals Denver, CO, dog friendly vacation rentals Denver, CO, Denver, CO pet friendly accommodations, Denver, CO dog friendly lodging"
	},
	{
		city: 'Seattle, WA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Seattle.jpg',
		paragraphOne: "Seattle is a vibrant city located in the Pacific Northwest region of the United States. The city is situated on Puget Sound, with stunning views of the Cascade Mountains and Olympic Mountain range. Seattle is known for its coffee culture, rain, pet-friendly activities, and live music.",
		paragraphTwo: "The city is also home to several major corporations, including Amazon, Starbucks, and Boeing. Visitors to Seattle can enjoy various activities, from exploring the vibrant downtown area to hiking in the nearby mountains. And, with a wide variety of pet-friendly hotels, Seattle is an excellent destination for the whole family.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Seattle.jpg',
		keywords: "pet friendly hotels Seattle, WA, dog friendly hotels Seattle, WA, pet friendly bed & breakfasts Seattle, WA, dog friendly B&Bs Seattle, WA, pet friendly vacation rentals Seattle, WA, dog friendly vacation rentals Seattle, WA, Seattle, WA pet friendly accommodations, Seattle, WA dog friendly lodging"
	},
	{
		city: 'Portland, OR',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Portland.jpg',
		paragraphOne: "Portland is the largest city in Oregon and the seat of Multnomah County. It is located in the Willamette Valley region of the Pacific Northwest, at the confluence of the Willamette and Columbia rivers.  Portland is the second-most populous city in the Pacific Northwest after Seattle and accounts for nearly two-thirds of Oregon's population.",
		paragraphTwo: "Portland is notable for its mild climate, green spaces, and bridges. The city has been nicknamed \"Bridge City\" for its many bridges spanning the Willamette River. The city is also known for its extensive system of light rail and streetcar lines, as well as its plethora of microbreweries and food carts. If you're looking for a unique city with plenty of pet-friendly hotels, add Portland to your travel list!",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Portland.jpg',
		keywords: "pet friendly hotels Portland, OR, dog friendly hotels Portland, OR, pet friendly bed & breakfasts Portland, OR, dog friendly B&Bs Portland, OR, pet friendly vacation rentals Portland, OR, dog friendly vacation rentals Portland, OR, Portland, OR pet friendly accommodations, Portland, OR dog friendly lodging"
	},
	{
		city: 'Sacramento, CA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Sacramento.jpeg',
		paragraphOne: "Sacramento is the capital city of California, located in the northern part of the state. Sacramento is known for its Gold Rush history, and today it is a booming metropolis with a diverse population. The city has a growing arts and culture scene, and there are plenty of activities to keep visitors entertained. The pet-friendly vibe in Sacramento makes this a great city to visit with your four-legged family member.",
		paragraphTwo: "Sacramento is also home to several professional sports teams, making it an excellent destination for sports fans. Whether you're interested in history or just looking for a fun-filled city to explore, Sacramento is sure to have something for you.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Sacramento.jpeg',
		keywords: "pet friendly hotels Sacramento, CA, dog friendly hotels Sacramento, CA, pet friendly bed & breakfasts Sacramento, CA, dog friendly B&Bs Sacramento, CA, pet friendly vacation rentals Sacramento, CA, dog friendly vacation rentals Sacramento, CA, Sacramento, CA pet friendly accommodations, Sacramento, CA dog friendly lodging"
	},
	{
		city: 'Salt Lake City, UT',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Salt%20Lake%20City.jpeg',
		paragraphOne: "Salt Lake City is the capital of Utah and the largest city in the Intermountain West. The city is home to the iconic salt lake, as well as the world-famous Mormon Temple and Latter-day Saint (LDS) church headquarters. Nestled between a massive lake and huge mountains, Salt Lake City is a great hub for out door enthusiasts. And, with plenty of pet-friendly hotels, it is a great location for the whole family.",
		paragraphTwo: "Salt Lake City is a popular tourist destination for its many outdoor activities, including skiing and hiking in the nearby Wasatch mountains, and its unique history and culture. The city is also a major business center, with many corporations headquartered.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Salt%20Lake%20City.jpg',
		keywords: "pet friendly hotels Salt Lake City, UT, dog friendly hotels Salt Lake City, UT, pet friendly bed & breakfasts Salt Lake City, UT, dog friendly B&Bs Salt Lake City, UT, pet friendly vacation rentals Salt Lake City, UT, dog friendly vacation rentals Salt Lake City, UT, Salt Lake City, UT pet friendly accommodations, Salt Lake City, UT dog friendly lodging"
	},
	{
		city: 'Palm Springs, CA',
		heroImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/ps-hero.jpeg',
		paragraphOne: 'Palm Springs offers something unique and different from many of the famous coastal cities in California. Located in the Sonoran Desert, this city is most known for its golf courses, mountainous views, mid-century architecture, and first-class spa resorts. For those who enjoy warm weather and discovering the charm of locally owned and operated businesses, Palm Springs has more than enough to offer.',
		paragraphTwo: 'Some of the city&apos;s main highlights include its art and culture scene and outdoor adventures where you can find miles of pet-friendly trails, canyons, mountain streams, and beautiful waterfalls. Finally, the cherry on top getting pampered at one of Palm Spring’s luxury stays!',
		secondaryImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/ps-4.jpeg',
		keywords: "pet friendly hotels Palm Springs, CA, dog friendly hotels Palm Springs, CA, pet friendly bed & breakfasts Palm Springs, CA, dog friendly B&Bs Palm Springs, CA, pet friendly vacation rentals Palm Springs, CA, dog friendly vacation rentals Palm Springs, CA, Palm Springs, CA pet friendly accommodations, Palm Springs, CA dog friendly lodging"
	},
	{
		city: 'Los Angeles, CA',
		heroImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/la-hero.jpeg',
		paragraphOne: 'Los Angeles is regarded as one of the most renowned cities in the whole world. This dazzling city is known as the entertainment capital and sits in close proximity to a number of world famous beaches. You can also find amusement parks, countless museums, a variety of pet-friendly tourist attractions, great hikes, and so much more! When you visit Los Angeles, there is never a shortage of things to see, try, and eat -- which is why there are roughly 50 million visitors in Los Angeles every year.',
		paragraphTwo: 'The diverse, multiethnic population of Los Angeles today distinguishes the city as the cultural hub of the Pacific Rim. Furthermore, Los Angeles’ development makes it one of the most coveted cities for dog owners and pet-friendly travel. The area boasts a wide selection of pet-friendly accommodations, recreational opportunities, and attractions.',
		secondaryImage: 'https://storage.googleapis.com/romingo-development-public/images/front-end/la-4.jpeg',
		keywords: "pet friendly hotels Los Angeles, CA, dog friendly hotels Los Angeles, CA, pet friendly bed & breakfasts Los Angeles, CA, dog friendly B&Bs Los Angeles, CA, pet friendly vacation rentals Los Angeles, CA, dog friendly vacation rentals Los Angeles, CA, Los Angeles, CA pet friendly accommodations, Los Angeles, CA dog friendly lodging"
	},
	{
		city: 'Orange County, CA',
		heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/oc-hero.jpeg",
		paragraphOne: 'Orange County is nestled between Los Angeles and Orange County, home to many popular cities like Newport Beach, Anaheim, and Irvine. The county strikes a perfect balance between suburban life and tourist attractions, boosting its popularity in recent decades and making it an inviting destination for California travelers. One major reason for Orange County’s popularity is its accessibility to a variety of indoor and outdoor experiences, delivering a memorable and well-rounded travel experience.',
		paragraphTwo: 'Not only is Orange County a melting pot of cuisines and cultures, you can also discover stellar beaches, luxury shopping experiences, and plenty of outdoor recreational activities. Finally, the county is a desirable place to settle and visit for dog owners and families because of how accommodating its neighborhoods are.',
		secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/oc-4.jpeg",
		keywords: "pet friendly hotels Orange County, CA, dog friendly hotels Orange County, CA, pet friendly bed & breakfasts Orange County, CA, dog friendly B&Bs Orange County, CA, pet friendly vacation rentals Orange County, CA, dog friendly vacation rentals Orange County, CA, Orange County, CA pet friendly accommodations, Orange County, CA dog friendly lodging"
	},
	{
		city: 'San Diego, CA',
		heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sd-hero.jpeg",
		paragraphOne: 'For a change of pace in sunny California, head on over to the state’s second largest city, San Diego. San Diego is renowned for its relaxed culture, idyllic weather, miles of white-sand beaches, and a variety of things to see and do for adventurers (and dogs) of all ages. San Diego is a family-friendly city that’s especially a must visit for those who love the beach. Sitting at the most Southern part of California and by the border of Mexico, this charming city carries an abundance of Spanish influences in their culture, cuisine, and attractions.',
		paragraphTwo: ' San Diego is often considered the most pet-friendly city in California with many pet-friendly spaces to enjoy throughout the city. Those who seek pet-friendly travel will find their hearts filled with what San Diego has to offer thanks to the city’s arts and culture, diverse culinary experiences, and the great outdoors.',
		secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sd-4.jpeg",
		keywords: "pet friendly hotels San Diego, CA, dog friendly hotels San Diego, CA, pet friendly bed & breakfasts San Diego, CA, dog friendly B&Bs San Diego, CA, pet friendly vacation rentals San Diego, CA, dog friendly vacation rentals San Diego, CA, San Diego, CA pet friendly accommodations, San Diego, CA dog friendly lodging"
	},
	{
		city: 'San Francisco, CA',
		heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sf-4.jpeg",
		paragraphOne: 'San Francisco is a lively cultural hub home to grand architectural buildings, world-class cuisine, cable cars, a dynamic waterfront, and plenty of outdoor adventures. The walkable city is adorned with iconic landmarks which is what truly sets San Francisco apart. Taking a stroll through the city’s streets is an exciting experience that will bring you from one unique neighborhood to another. San Francisco is a haven for lovers of performing arts and is also considered one of the United State’s greatest dining cities because of its rich diverse cultural influences, fresh ingredients, and creative chefs who come from all around the world.',
		paragraphTwo: 'Many of San Francisco’s attractions are outdoors, making it an ideal city for pet-friendly travel. Your dog will be intrigued by all the different landscapes and scenic views, and will be welcomed in many restaurants and hotels as well!',
		secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sf-4.jpeg",
		keywords: "pet friendly hotels San Francisco, CA, dog friendly hotels San Francisco, CA, pet friendly bed & breakfasts San Francisco, CA, dog friendly B&Bs San Francisco, CA, pet friendly vacation rentals San Francisco, CA, dog friendly vacation rentals San Francisco, CA, San Francisco, CA pet friendly accommodations, San Francisco, CA dog friendly lodging"
	},
	{	
		city: 'Santa Barbara, CA',
		heroImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sb-hero.jpeg",
		paragraphOne: 'Located on the central coast of California, the laid-back city of Santa Barbara offers the perfect getaway from the hustle and bustle of everyday life. The lovely city features Mediterranean style buildings that reflect its Spanish heritage, along with breathtaking mountain and beach views, and surrounding vineyards.',
		paragraphTwo: 'The breeze swept in from the ocean and its mild sunny climate makes this city an enjoyable destination for outdoor, pet-friendly activities. The city also hosts a number of impressive luxury stays anyone will fall in love with.',
		secondaryImage: "https://storage.googleapis.com/romingo-development-public/images/front-end/sb-4.jpeg",
		keywords: "pet friendly hotels Santa Barbara, CA, dog friendly hotels Santa Barbara, CA, pet friendly bed & breakfasts Santa Barbara, CA, dog friendly B&Bs Santa Barbara, CA, pet friendly vacation rentals Santa Barbara, CA, dog friendly vacation rentals Santa Barbara, CA, Santa Barbara, CA pet friendly accommodations, Santa Barbara, CA dog friendly lodging"
	}
]

module.exports = {
	HOTEL_DESCRIPTIONS
}