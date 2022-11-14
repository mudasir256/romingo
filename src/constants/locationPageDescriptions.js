
const HOTEL_DESCRIPTIONS = [
	{
		city: 'Austin, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/austin-texas.jpg',
		paragraphOne: "This lively city is known for its live music scene, its delicious food, and its friendly people. Austin is the perfect place to visit if you're looking for a fun-filled vacation with plenty of pet-friendly tourist attractions. There are plenty of pet friendly things to do in this vibrant city, from exploring the river walk to taking a scenic walk through one of the many parks. You can also enjoy some of the best shopping and nightlife in Austin. Whether you're looking for an action-packed vacation or a relaxing weekend getaway, Austin is the perfect destination.",
		paragraphTwo: "There's no shortage of pet-friendly hotels in Austin, Texas. Whether you're looking for a budget-friendly option or a luxurious escape, you're sure to find a hotel that suits your needs. If you're looking to be in the heart of the action, downtown Austin is the place to be. Hotels here put you close to all the best restaurants, bars, and pet-friendly outdoor spaces.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Austin.jpg'
	},
	{
		city: 'Dallas, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Dallas%20Texas.jpeg',
		paragraphOne: "Dallas has a rich history and plenty to see and do. From the Sixth Floor Museum at Dealey Plaza to the Dallas World Aquarium, there are attractions to suit every interest. And, of course, no visit to Dallas would be complete without a trip to the iconic Reunion Tower. For those looking for a taste of local culture, the Dallas Arts District is home to an array of museums, theaters, and galleries. With so much to see and do, Dallas is a city that has something for everyone, including your pet.",
		paragraphTwo: "If you're looking for pet-friendly hotels in Dallas, Texas, you have plenty of options. From luxurious resorts to more budget-friendly options, you'll be able to find a hotel that suits your needs. For those who want to be close to the action, there are plenty of pet friendly hotels downtown.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Dallas.jpg'
	},
	{
		city: 'Houston',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Houston%20Texas.jpg',
		paragraphOne: "Houston is the most populous city in the Southern United States and the fourth most populous city in the country. From the Space Center to the Museum of Natural Science, there are plenty of attractions to keep visitors entertained. The city is also home to a thriving food scene, with everything from Tex-Mex to Vietnamese cuisine on offer. And, of course, no visit to Houston would be complete without taking in a Houston Astros baseball game.",
		paragraphTwo: "There are plenty of pet friendly hotels in Houston, Texas. If you're looking to explore all the city has to offer, there are dozens of hotels centrally located near popular attractions like the Museum District and The Galleria. No matter your budget or preferences, you're sure to find the perfect pet friendly hotel in Houston, Texas.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Houston.jpg'
	},
	{
		city: 'Oceanside, CA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Oceanside%20California.jpeg',
		paragraphOne: "Oceanside, California, is a beautiful oceanside town located in Southern California. Visitors can enjoy stunning ocean views, beaches, pet-friendly hotels, restaurants, and shops. There is also a pier which is a great place to walk, fish, or just take in the views. Oceanside is a popular destination for tourists and locals alike, and there is something for everyone to enjoy. Whether you're interested in surfing, kayaking, or simply exploring the coastline, oceanside is sure to please. If your pet is feeling adventurous as well, there are also plenty do friendly hiking trails in the area.",
		paragraphTwo: "Looking for a pet-friendly place to stay in Oceanside, California? There are plenty of pet friendly hotel options to choose from, whether you're looking for a luxurious getaway or a budget-friendly place to crash. For those wanting to splurge, the Oceanside area offers plenty of upscale hotels with all the bells and whistles, including top-notch amenities and breathtaking views. If you're on a tight budget, don't worry - there are also plenty of hotels that won't break the bank. No matter your budget, there's sure to be a hotel that's perfect for you.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Oceanside.jpg'
	},
	{
		city: 'Phoenix, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Phoenix%20Arizona.jpg',
		paragraphOne: "Phoenix is a popular destination for tourists and business travelers alike. The capital city of Arizona, Phoenix, is best known for its year-round sun. A lesser-known fact is that it is the fifth-largest city in the United States. This vibrant city offers a diverse range of activities and attractions to keep visitors entertained.",
		paragraphTwo: "From hiking and biking in the Sonoran Desert to exploring the diverse cuisine and nightlife, there's something for everyone in Phoenix. With Phoenix being a hub for business and outdoor adventure alike, there are plenty of pet-friendly hotel options for travelers of all types.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Phoenix.jpg'
	},
	{
		city: 'Scottsdale, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Scottsdale%20Arizona.jpeg',
		paragraphOne: "Scottsdale is a beautiful city in Arizona, just east of the capital city of Phoenix. Sitting at 1,200’ elevation, Scottsdale is a very green city with large orchards of old olive trees. If you are looking for a place to relax and rejuvenate, Scottsdale is the perfect destination. In addition to its many great attractions, Scottsdale has many pet-friendly hotels.",
		paragraphTwo: "While summers can get into triple digits on the thermometer over summer, the head is dry so it is not as oppressive as it can be in other parts of the country. The winters in Scottsdale are mild and the best time to visit. The cool temperatures are perfect for morning hikes with the dog, followed by afternoon rounds of golf at one of the many world-class courses in the area.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Scottsdale.jpg'
	},
	{
		city: 'Tucson, AZ',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Tucson%20Arizona.jpg',
		paragraphOne: "Tucson is a city in Arizona that is rich in history and culture. Founded in 1775, Tucson was the first European settlement in the state. The city has since grown to become the second-largest in Arizona, with a population of over 1 million people. Tucson is home to several preserved adobe buildings, including the San Xavier del Bac Mission, which was built in the 18th century. The city is also home to the University of Arizona, founded in 1885.",
		paragraphTwo: "Tucson has a warm desert climate and is known for its annual Tucson Rodeo and Tucson Gem & Mineral Show. Visitors can explore the city's many museums and art galleries or drive through one of Tucson's nearby pet-friendly national parks. The winter is the best time to visit Tuscon with your pet. There are plenty of fantastic pet friendly hotels in the area that cater to you and your pets.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Tucson.jpg'
	},
	{
		city: 'Santa Fe, MN',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Santa%20Fe%20New%20Mexico.jpg',
		paragraphOne: "Santa Fe was founded in 1610 and is the oldest capital city in the United States. The city is known for its art and architecture, as well as its traditional Native American and Hispanic influences. There are several museums, pet-friendly walking trails, amazing restaurants, southwestern art galleries, and the famous Santa Fe Opera House. Visitors can also enjoy a variety of outdoor activities, such as hiking, dog walking, biking, and horseback riding.",
		paragraphTwo: "Many of the hotels in Santa Fe are pet friendly and offer exceptional amenities for accompanying pets. The vast parks and grass areas make Santa Fe one of the best cities to travel to with your pet. Not to mention the great pet friendly hotels in the area.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Santa%20Fe.jpg'
	},
	{
		city: 'San Antonio, TX',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/San%20Antonio.jpg',
		paragraphOne: "Founded in 1718, San Antonio is well known for the infamous 1836 Battle of the Alamo. Today, the Alamo is a popular tourist destination. The city is also home to the pet-friendly San Antonio River Walk, a network of pedestrian paths along the San Antonio River. Other popular attractions include the Tower of the Americas, SeaWorld, and Six Flags.",
		paragraphTwo: "There is so much to see in San Antonio, and it is a great place to visit for a long weekend. Plus, with the many pet-friendly hotels in the area, there is no reason not to plan a trip. While in San Antonio, be sure to visit the McNay Art Museum and the San Antonio Museum of Art.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/San%20Antonio.jpg'
	},
	{
		city: 'Vail, CO',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Vail%20Colorado.jpg',
		paragraphOne: "Vail Colorado is one of the most popular winter destinations in the United States. Located in the Rocky Mountains, Vail is known for its stunning scenery and world-class ski resorts. Visitors can enjoy a variety of activities both on and off the slopes, including snowboarding, dog sledding, ice skating, and snowmobiling. There are also plenty of high-end retail shops, restaurants, and pet-friendly hotels. Whether you're looking for an action-packed vacation or a relaxing getaway, Vail is the perfect place to enjoy some spectacular winter weather.",
		paragraphTwo: "This vibrant mountain town is also a popular summer destination. The pet-friendly mountainside accommodations make Vail the perfect destination for outdoor adventure year-round. During the summer, there is world-class downhill mountain biking, hiking, fly fishing, and trails for afternoon runs with your dog.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Vail.jpg'
	},
	{
		city: 'Colorado Springs',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Colorado%20Springs.jpg',
		paragraphOne: "Nestled at the base of the Rocky Mountains, Colorado Springs is a beautiful city with plenty to offer visitors. Outdoor enthusiasts can explore the more than 60 parks and trails in the area, including Garden of the Gods Park and Pikes Peak. Colorado Springs is also home to the US Olympic Training Center. History buffs can learn about the city's past at the Museum of Colorado Springs History, while art lovers can appreciate the many sculptures and murals downtown.",
		paragraphTwo: "Outdoor enthusiasts will find plenty to do in Colorado Springs, with hiking, biking, and climbing available. And, of course, no visit to Colorado Springs would be complete without taking in the stunning views of the mountains. There are many pet-friendly hotels in the area, making it easy to bring your pet along for the next big adventure.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Colorado%20Springs.jpg'
	},
	{
		city: 'Denver, CO',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Denver.jpg',
		paragraphOne: "The Mile High City, Denver, boasts a vibrant downtown area with plenty of shopping, dining, and pet-friendly hotels. Outside of the city, visitors can enjoy the Rocky Mountains and all the outdoor activities they have to offer. Outdoor enthusiasts can hike, mountain bike, or ski in the nearby mountains, while culture lovers can explore the numerous art galleries and museums.",
		paragraphTwo: "Denver is nestled in the Rocky Mountains and boasts stunning views in every direction. The River Walk in the NoDo downtown region is the perfect place to bring your dog. During the summer months, you will see many dogs and their owners wading in the cool river water. Best of all, some of the top pet-friendly hotels are close by.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Denver.jpg'
	},
	{
		city: 'Seattle, WA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Seattle.jpg',
		paragraphOne: "Seattle is a vibrant city located in the Pacific Northwest region of the United States. The city is situated on Puget Sound, with stunning views of the Cascade Mountains and Olympic Mountain range. Seattle is known for its coffee culture, rain, pet-friendly activities, and live music.",
		paragraphTwo: "The city is also home to several major corporations, including Amazon, Starbucks, and Boeing. Visitors to Seattle can enjoy various activities, from exploring the vibrant downtown area to hiking in the nearby mountains. And, with a wide variety of pet-friendly hotels, Seattle is an excellent destination for the whole family.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Seattle.jpg'
	},
	{
		city: 'Portland, OR',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Portland.jpg',
		paragraphOne: "Portland is the largest city in Oregon and the seat of Multnomah County. It is located in the Willamette Valley region of the Pacific Northwest, at the confluence of the Willamette and Columbia rivers.  Portland is the second-most populous city in the Pacific Northwest after Seattle and accounts for nearly two-thirds of Oregon's population.",
		paragraphTwo: "Portland is notable for its mild climate, green spaces, and bridges. The city has been nicknamed \"Bridge City\" for its many bridges spanning the Willamette River. The city is also known for its extensive system of light rail and streetcar lines, as well as its plethora of microbreweries and food carts. If you're looking for a unique city with plenty of pet-friendly hotels, add Portland to your travel list!",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Portland.jpg'
	},
	{
		city: 'Sacremento, CA',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Sacramento.jpeg',
		paragraphOne: "Sacramento is the capital city of California, located in the northern part of the state. Sacramento is known for its Gold Rush history, and today it is a booming metropolis with a diverse population. The city has a growing arts and culture scene, and there are plenty of activities to keep visitors entertained. The pet-friendly vibe in Sacramento makes this a great city to visit with your four-legged family member.",
		paragraphTwo: "Sacramento is also home to several professional sports teams, making it an excellent destination for sports fans. Whether you're interested in history or just looking for a fun-filled city to explore, Sacramento is sure to have something for you.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Sacramento.jpeg'
	},
	{
		city: 'Salt Lake City, UT',
		heroImage: 'https://storage.googleapis.com/romingo-production-public/locations/hero/Salt%20Lake%20City.jpeg',
		paragraphOne: "Salt Lake City is the capital of Utah and the largest city in the Intermountain West. The city is home to the iconic salt lake, as well as the world-famous Mormon Temple and Latter-day Saint (LDS) church headquarters. Nestled between a massive lake and huge mountains, Salt Lake City is a great hub for out door enthusiasts. And, with plenty of pet-friendly hotels, it is a great location for the whole family.",
		paragraphTwo: "Salt Lake City is a popular tourist destination for its many outdoor activities, including skiing and hiking in the nearby Wasatch mountains, and its unique history and culture. The city is also a major business center, with many corporations headquartered.",
		secondaryImage: 'https://storage.googleapis.com/romingo-production-public/locations/secondary/Salt%20Lake%20City.jpg'
	}
]

module.exports = {
	HOTEL_DESCRIPTIONS
}