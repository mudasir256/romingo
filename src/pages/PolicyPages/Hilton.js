import { useEffect, useState } from 'react'

import {
	Box,
	Typography,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

import { utils } from '../../services/utils'
import ListingCard from "../../components/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

const One = 'https://www.romingo.com/public/images/policy-images/hilton.jpg';
const Two = 'https://www.romingo.com/public/images/policy-images/hilton-2.jpg';
const Three = 'https://www.romingo.com/public/images/policy-images/hilton-3.jpg';
const Four = 'https://www.romingo.com/public/images/policy-images/hilton-4.jpg';
const Five = 'https://www.romingo.com/public/images/policy-images/hilton-5.jpg';

export default function Hilton() {

	const [hotels, setHotels] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchHotels = async () => {
		try {
			console.log(process.env.REACT_APP_BASE_ENDPOINT)
			const result = await fetch(process.env.REACT_APP_BASE_ENDPOINT + 'v2/hotels-by-name/Hilton', {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			})
			const data = await result.json()
			console.log(data)
			setHotels(data.hotels)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	useEffect(() => {
		console.log('fetch hotels!')
		fetchHotels()
	}, [])

	return (<>
		<Helmet>
			<title>A Guide to Hilton&apos;s Pet Policy: What You Need to Know — Romingo</title>
			<description>If you&apos;re traveling with your furry friend, it&apos;s important to understand the pet policies of the hotels you&apos;re considering. Hilton is one hotel chain that is known for being pet-friendly, but what exactly does that mean? In this guide, we&apos;ll provide an overview of Hilton&apos;s pet policy and offer tips for traveling with pets to Hilton hotels.</description>
			<meta property="og:title" content="A Guide to Hilton's Pet Policy: What You Need to Know — Romingo" />
			<meta property="og:description" content="If you're traveling with your furry friend, it's important to understand the pet policies of the hotels you're considering. Hilton is one hotel chain that is known for being pet-friendly, but what exactly does that mean? In this guide, we'll provide an overview of Hilton's pet policy and offer tips for traveling with pets to Hilton hotels." />
			<meta property="og:image" content={One} />
		</Helmet>

		<Navbar />
		<Box sx={{ maxWidth: '760px', mx: 'auto', pb: '1rem', px: '1rem' }}>
			<Typography mt="2rem" mb="0.5rem" variant="h4" component="h1">A Guide to Hilton&apos;s Pet Policy: What You Need to Know</Typography>
			<Typography variant="base">If you&apos;re traveling with your furry friend, it&apos;s important to understand the pet policies of the hotels you&apos;re considering. Hilton is one hotel chain that is known for being pet-friendly, but what exactly does that mean? In this guide, we&apos;ll provide an overview of Hilton&apos;s pet policy and offer tips for traveling with pets to Hilton hotels.</Typography>
			<Typography mt="2rem" mb="0.5rem" variant="h4">Hilton&apos;s Pet Policy: All You Need to Know</Typography>
			<Typography variant="base">Hilton&apos;s pet policy allows guests to bring their pets to select hotels within the Hilton portfolio. Dogs and cats are the most common types of pets allowed, although some hotels may allow other types of animals as well. There is typically a non-refundable fee associated with bringing a pet, which can range from $50 to $150 per stay. Some hotels may also have restrictions on the size or breed of pet allowed, so it&apos;s important to check with the hotel in advance.</Typography>
			<Typography mt="2rem" variant="h4">The Best Pet-Friendly Hilton Hotel Brands for Your Next Vacation</Typography>
			<img src={One} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />

			<Typography mt="2rem" mb="0.5rem" variant="h4">Pet-Friendly Hilton Hotels: Where to Stay with Your Furry Friend</Typography>
			<Typography variant="base">If you&apos;re planning a vacation with your furry friend, it can be challenging to find pet-friendly hotels that are accommodating and comfortable. However, Hilton Hotels have several pet-friendly options that are perfect for you and your pet. Let&apos;s take a closer look at the best pet-friendly Hilton hotels and what makes them stand out.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">1. Hilton Hotels & Resorts</Typography>
			<Typography variant="base">First on the list is Hilton Hotels & Resorts, a top-tier brand within the Hilton portfolio. Hilton Hotels & Resorts provides spacious and luxurious accommodations that cater to both guests and their pets. The hotel welcomes pets weighing up to 75 pounds and even provides a comfortable bed, food, and water bowls. Additionally, there is a designated pet area for you to take your furry friend for a stroll.</Typography>
		
			<Typography mt="2rem" mb="0.5rem" variant="h4">2. Embassy Suites by Hilton</Typography>
			<Typography variant="base">If you&apos;re looking for a more relaxed and comfortable atmosphere, Embassy Suites by Hilton might be the perfect option for you. The hotel provides two-room suites, perfect for those traveling with pets. These suites offer separate living and sleeping areas, providing ample space for both you and your furry companion. The hotel also provides a complimentary cooked-to-order breakfast, ensuring you start your day on a high note.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">3. Home2 Suites by Hilton</Typography>
			<Typography variant="base">For a modern and affordable option, look no further than Home2 Suites by Hilton. This unique hotel provides pet-friendly accommodations that won&apos;t break the bank. The hotel features a designated pet area, perfect for your furry friend to play and relax, as well as a complimentary breakfast. The hotel&apos;s spacious suites also include a kitchen, perfect for preparing your meals if you&apos;re traveling with your pet.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">4. Hilton Garden Inn</Typography>
			<Typography variant="base">Hilton Garden Inn is another great option for those seeking a comfortable and convenient pet-friendly hotel. The hotel provides comfortable rooms and suites that cater to both you and your pet. Additionally, the hotel has a designated pet area where your furry friend can play and relax.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">5. DoubleTree by Hilton</Typography>
			<Typography variant="base">Last but not least, DoubleTree by Hilton is another top option for pet-friendly accommodations. The hotel offers spacious rooms and suites that provide plenty of space for you and your furry friend. Additionally, the hotel provides a warm chocolate chip cookie at check-in, which is a nice touch.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">How to Find and Book Pet-Friendly Rooms at Hilton Hotels</Typography>
			<img src={Two} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base">Hilton makes it easy to find pet-friendly rooms by using the Romingo website or app. Just enter your destination and dates, and the site will show you all of the pet-friendly hotels in the area. You can then book your room directly through Romingo or by visiting the Hilton website.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">What to Expect When Traveling with Pets to Hilton Hotels</Typography>
			<Typography variant="base">When traveling with pets to Hilton hotels, you should always prepare in advance. Be sure to pack any necessary items for your pet, such as food, water, bowls, toys, and a crate if needed. You should also bring along any medical records and proof of vaccinations. To ensure a comfortable stay for both you and your pet, consider booking a pet-friendly room with easy access to outdoor areas for walking and exercise.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">Types of Pets Allowed at Hilton Hotels</Typography>
			<img src={Three} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base">Hilton hotels accept cats and dogs up to a certain weight limit. Of course, service animals are allowed at all of their properties without any restrictions or fees. Some Hilton brands may also permit other types of animals, such as birds and fish, so it is best to check with the individual hotel for specific requirements.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">Fees and Restrictions Associated With Bringing Pets to Hilton Hotels</Typography>
			<Typography variant="base">Some Hilton hotels may charge a fee for bringing a pet with you. The fees vary by property, so it is important to check your reservation details before making your travel plans. Most properties will also limit the number of pets allowed in any single room and require that animals remain on a leash when in public areas.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">Amenities and Services Provided For Pets at Hilton Hotels</Typography>
			<img src={Four} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base">Hilton offers many services and amenities specifically designed with pet owners in mind. These include beds, bowls and treats or toys upon request, as well as pet walking and sitting services. Most hotels also offer designated pet relief areas with waste bags and disposal receptacles.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">What to Expect When Traveling With Pets at Hilton Hotels</Typography>
			<Typography variant="base">When traveling with pets at a Hilton hotel, it is important to be aware of the rules and regulations that are in place. Most hotels require pets to remain on a leash when outside the room, and pet owners must clean up after their animals in common areas. Additionally, guests must sign a form at check-in to acknowledge they have read and understood the hotel’s pet policy.</Typography>

			<Typography mt="2rem" mb="0.5rem" variant="h4">How to Prepare for a Trip With Pets to Hilton Hotels</Typography>
			<img src={Five} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base">When preparing for a trip with pets to a Hilton hotel, it is important to plan ahead. Be sure to bring along any necessary supplies and medications your pet may need during the stay. Additionally, you should make sure your pet is up-to-date on all vaccinations and has a collar and tags with your contact information in case they get lost. Finally, it is important to be aware of the local laws and regulations regarding animals when traveling.</Typography>
			
			<Box mt="1rem" />
			{hotels.map(card => (
				<Box key={card.id} sx={{ py: '0.5rem' }}>
					<ListingCard
						{...card}
						duration={2}
						highlighted={false}
						limitImages={true}
						petFeePolicy={{ ...card.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, card.petFeePolicy)}} 
					/>
				</Box>
			))}
			{loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
		</Box>
		<Footer />
	</>)
}