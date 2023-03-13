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

const One = 'https://www.romingo.com/public/images/policy-images/motel-6.jpg';
const Two = 'https://www.romingo.com/public/images/policy-images/motel-6-2.jpg';

export default function Motel6() {

	const [hotels, setHotels] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchHotels = async () => {
		const result = await fetch(process.env.REACT_APP_BASE_ENDPOINT + 'v2/hotels-by-name/Motel%206')
		const data = await result.json()
		console.log(data)
		setHotels(data.hotels)
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
			<title>Motel 6&apos;s Pet Policy: An Overview — Romingo</title>
			<description>Traveling with pets can be a wonderful experience, but it&apos;s important to understand the pet policies of hotels before booking your stay. Motel 6 is a popular hotel chain offering a pet-friendly policy at most of its locations. It&apos;s also America&apos;s original pet-friendly hotel chain and has been serving travelers since 1962. Here&apos;s everything you need to know!</description>
			<meta property="og:title" content="Motel 6’s Pet Policy: An Overview — Romingo" />
			<meta property="og:description" content="Traveling with pets can be a wonderful experience, but it's important to understand the pet policies of hotels before booking your stay. Motel 6 is a popular hotel chain offering a pet-friendly policy at most of its locations. It’s also America's original pet-friendly hotel chain and has been serving travelers since 1962. Here’s everything you need to know!" />
			<meta property="og:image" content={One} />
		</Helmet>

		<Navbar />
		<Box sx={{ maxWidth: '760px', mx: 'auto', pb: '1rem', px: '1rem' }}>
			<Content text="Traveling with pets can be a wonderful experience, but it's important to understand the pet policies of hotels before booking your stay. Motel 6 is a popular hotel chain offering a pet-friendly policy at most of its locations. It’s also America's original pet-friendly hotel chain and has been serving travelers since 1962. Here’s everything you need to know!" />
			<Typography mt="2rem" mb="0.5rem" variant="h4" component="h1">Motel 6&apos;s Pet Policy: An Overview</Typography>
			<img src={One} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="Motel 6 welcomes service animals and well-behaved pets at most of its locations. The hotel chain does not charge a pet fee for service animals and allows up to two pets per room. However, Studio 6 locations require a $10 per day pet fee, with a maximum of $75 per stay." />

			<Header text="Pet-Friendly Amenities At Motel 6" />
			<Content text="The amenities and services provided for pets at these hotels include access to grassy areas for walks, pet waste stations, and clean-up bags. Some Motel 6 locations offer pet-friendly rooms with hard-surface floors and beds." />

			<Header text="How to Find and Book Pet-Friendly Rooms at Motel 6 Hotels" />
			<Typography variant="p" mb="0.5rem">To find and book pet-friendly rooms at Motel 6 hotels, pet owners can use resources such as Romingo. Romingo is a premier resource for booking pet-friendly hotels and provides a comprehensive list of hotels that allow pets. When booking a pet-friendly room, be sure to mention that you will be traveling with a pet to ensure that the hotel is aware of your furry friend&apos;s presence. A link to a directory of pet-friendly Motel 6 hotels is also available on the <a href="https://www.motel6.com/en/home/policies/reservation-policies.html" target="_blank" rel="noreferrer">hotel&apos;s website.</a></Typography>

			<Header text="How To Prepare For A Successful Motel 6 Stay With A Pet" />
			<img src={Two} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="To ensure a great trip with your furry friend, a few guidelines need to be followed. Firstly, animals that pose a health or safety risk to other guests or the hotel property may not remain on site. Secondly, pets and service animals must be declared at check-in, and pet owners should be considerate of other guests when walking pets on the hotel property. Lastly, pets should not be left alone in a room or automobile; if they need to be left unattended, they must be secured in a crate or carrier." />
			<Content text="Pet owners should pack essential items such as a pet carrier, food, water, food bowls, a leash or harness, and baggies for clean-up. It's also important to ensure that your pet's collar ID has current contact information and to bring a health certificate, a current rabies vaccination tag, and a photo of each pet when traveling." />
			<Content text="When at the hotel, be sure to follow the guidelines for pets, including keeping them on a leash, attending to them when outside of the room, and not leaving them alone in the room or automobile. If you need to leave your pet unattended in the room, make sure they are secured in a crate or carrier, or notify the front desk that your pet is roaming freely in the room and when housekeeping can enter." />

			<Header text="Why Motel 6 Is Great For Pet-Friendly Stays" />
			<Content text="Motel 6's pet policy allows pet owners to bring their furry friends along on their travels without incurring additional fees, which greatly benefits those traveling on a budget. With guidelines in place to ensure the safety and comfort of all guests, pet owners can enjoy a pleasant stay at Motel 6 hotels with their pets. Be sure to use resources such as Romingo to find and book pet-friendly rooms and follow the guidelines for pets to ensure a comfortable stay for you and your pet." />

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