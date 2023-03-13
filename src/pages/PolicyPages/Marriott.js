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

const One = 'https://www.romingo.com/public/images/policy-images/marriott.jpg';
const Two = 'https://www.romingo.com/public/images/policy-images/marriott-2.jpg';
const Three = 'https://www.romingo.com/public/images/policy-images/marriott-3.jpg';

export default function Marriott() {

	const [hotels, setHotels] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchHotels = async () => {
		const result = await fetch(process.env.REACT_APP_BASE_ENDPOINT + 'v2/hotels-by-name/Westin')
		const data = await result.json()

		const result2 = await fetch(process.env.REACT_APP_BASE_ENDPOINT + 'v2/hotels-by-name/Residence')
		const data2 = await result2.json()
		
		setHotels([...data.hotels, ...data2.hotels])
		setLoading(false)
	}

	useEffect(() => {
		fetchHotels()
	}, [])

	const Header = ({ text }) => (
		<Typography mt="2rem" mb="0.5rem" variant="h4">{text}</Typography>
	)

	const Content = ({ text }) => (
		<Typography variant="p" mb="0.5rem">{text}</Typography>
	)

	return (<>
		<Helmet>
			<title>Marriott&apos;s Pet Policy: An Overview — Romingo</title>
			<description>Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it&apos;s important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free.</description>
			<meta property="og:title" content="Marriott’s Pet Policy: An Overview — Romingo" />
			<meta property="og:description" content="Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it's important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free." />
			<meta property="og:image" content={One} />
		</Helmet>

		<Navbar />
		<Box sx={{ maxWidth: '760px', mx: 'auto', pb: '1rem', px: '1rem' }}>
			<br />
			<Content text="Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it's important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free." />
			<Typography mt="2rem" mb="0.5rem" variant="h4" component="h1">Marriot&apos;s Pet Policy: An Overview</Typography>
			<img src={One} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="Marriott Hotels allows guests to bring up to two pets per room, with a weight limit of 150 pounds per pet. The pets allowed at Marriott hotels include dogs, cats, birds, and fish. Marriott also welcomes service animals at all of their locations. Guests who wish to bring their pets to Marriott hotels will be charged a non-refundable fee of $100 per stay and an additional cleaning fee in some cases." />


			<Header text="How to Find and Book Pet-Friendly Rooms at Marriott Hotels:" />
			<Content text="To find and book pet-friendly rooms at Marriott hotels, pet owners can use resources such as Romingo, which provides a comprehensive list of hotels that allow pets. Marriott also has a dedicated website page for pet-friendly hotels, making searching for and booking a pet-friendly room easy. When booking your stay, be sure to mention that you will be traveling with a pet to ensure that the hotel is aware of your furry friend's presence." />


			<Header text="Pet-Friendly Marriott Hotel Brands" />
			<Content text="Marriott has several pet-friendly hotel brands, offering a range of options for you and your furry friend. Some of the most pet-friendly Marriott brands include:" />

			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}><b>The Ritz-Carlton</b>: The Ritz-Carlton is a luxurious hotel brand that welcomes pets at select locations. They offer special amenities such as gourmet treats and pet-sitting services.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}><b>Residence Inn</b>: Residence Inn is an extended-stay hotel brand that allows pets at all of their locations. They offer spacious suites with full kitchens, perfect for travelers with pets.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}><b>Westin Hotels & Resorts</b>: Westin is a high-end hotel brand that allows pets at select locations. They offer special amenities such as dog beds, food bowls, and treats.</li>
			</ul>

			<Header text="Amenities and Services Provided for Pets at Marriott Hotels:" />
			<img src={Two} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="Many Marriott hotels offer amenities and services specifically designed for pets, including dog beds, bowls, and treats. Some Marriott hotels also offer pet-sitting and dog-walking services, so you can explore the city while your pet is well taken care of." />

			<Header text="What to Expect When Traveling with Pets at Marriott Hotels" />
			<Content text="Traveling with pets can be a fun and rewarding experience, and Marriott hotels aim to make it as comfortable and convenient as possible. When staying at a pet-friendly Marriott hotel, you can expect:" />

			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>A warm welcome for both you and your pet upon arrival</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Comfortable accommodations for pets, including cozy beds and feeding bowls</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Outdoor areas for pets to play and stretch their legs</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Special treats or amenities for your pet, in some cases</li>
			</ul>
		
			<Header text="How to Prepare for a Trip with Pets to Marriott Hotels" />
			<Content text="When preparing for a stay at a Marriott hotel with your furry companion, there are a few key things to keep in mind:" />

			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Make sure your pet is up-to-date on their vaccinations and bring along proof of vaccinations, just in case.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Pack your pet&apos;s favorite toys, bedding, and food to ensure they feel at home in their new surroundings.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>If your pet is anxious or prone to car sickness, speak to your vet about any medications that may be helpful.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Bring a collar and leash for your pet, and ensure they wear an identification tag with your current contact information.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Familiarize yourself with the hotel&apos;s pet policy and any fees or restrictions associated with bringing your pet.</li>
			</ul>

			<Header text="How to Ensure a Comfortable Stay at Marriott Hotels with Your Pet" />
			<img src={Three} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="To ensure a comfortable and enjoyable stay for both you and your pet at a Marriott hotel, here are some simple tips:" />
			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Create a comfortable space for your pet in the hotel room, with their own bed and water and food bowls.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Take your pet for regular walks to stretch their legs and get some exercise.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>If your pet is anxious or stressed, spend some extra time with them to help them feel more comfortable in their new environment.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Be respectful of other guests at the hotel, and keep your pet on a leash in common areas.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1.25rem'}}>Clean up after your pet and dispose of waste properly.</li>
			</ul>

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