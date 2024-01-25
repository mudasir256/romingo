import { useEffect, useState } from 'react'

import {
  Box,
  Typography,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import SingleLoadListingCard from '../../components/SingleLoadListingCard';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'
import IconTags from '../../components/IconTags';

import { utils } from '../../services/utils'
import ListingCard from "../../components/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import One from '../../assets/public/images/policy-images/marriott.jpg';
import Two from '../../assets/public/images/policy-images/marriott-2.jpg';
import Three from '../../assets/public/images/policy-images/marriott-3.jpg';

// const One = 'https://www.romingo.com/public/images/policy-images/marriott.jpg';
// const Two = 'https://www.romingo.com/public/images/policy-images/marriott-2.jpg';
// const Three = 'https://www.romingo.com/public/images/policy-images/marriott-3.jpg';

export default function Marriott() {


	const Header = ({ text }) => (
		<Typography mt="2rem" mb="0.5rem" variant="h5">{text}</Typography>
	)

	const Content = ({ text }) => (
		<Typography variant="base" mb="0.5rem">{text}</Typography>
	)

	return (<>
		<Helmet>
			<title>Marriott Hotels Pet Policy: An Overview — Romingo</title>
			<description>Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it&apos;s important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free.</description>
			<meta property="og:title" content="Marriott Hotels Pet Policy: An Overview — Romingo" />
			<meta property="og:description" content="Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it's important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free." />
			<meta property="og:image" content={One} />
		</Helmet>

		<Navbar />

		<Box 
			sx={{ flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' } }} 
			display="flex"  
			gap="1rem" 
			alignItems="center"
			maxWidth="1800px"
			mx="auto"
		>

			<Box 
				borderRadius={4}
				backgroundColor="white" 
				sx={{
					width: { xs: 'auto', sm: 'auto', md: '420px' },
					p: { xs: '1rem', sm: '1rem', md: '1.5rem' },
					pt: { xs: 0, sm: 0 },
					left: { xs: 0, sm: 0, md: '7%' },
					boxShadow: { xs: 0, sm: 0, md: 3 },
					position: { xs: 'relative', sm: 'relative', md: 'relative' }
				}}
			>
				<Typography variant="h4" component="h1">Find pet-friendly Marriot Hotels on Romingo</Typography>
				<Typography variant="base">The hassle free way to travel with your pet</Typography>
				<Box sx={{  width: '100%', mt: '1rem' }}>
					<LocationPageFilterBar />
				</Box>
			</Box>

			<Box
				component="img"
				src="https://storage.googleapis.com/romingo-production-public/Pet%20Policy%20Images/d425a322-f45f-427e-ab7f-7959c4b1b883.jpg"
				alt="marriot hotel"
				sx={{
					objectFit: "cover",
					width: { xs: '95%', sm: '95%', md: "65%" },
					m: { xs: '0.5rem', sm: '0.5rem', md: '2rem' },
					borderRadius: '10px',
					height: { xs: "40vh", md: "70vh" },
					boxShadow: 0,
				}}
			/>
		</Box>

		<Box maxWidth="920px" mx="auto" px="1rem" sx={{ py: { xs: '1rem', sm: '1rem', md: '4rem'} }}>
			<IconTags />
		</Box>

		<Box sx={{ maxWidth: '760px', mx: 'auto', pb: '1rem', px: '1rem' }}>
			<br />
			<Typography mt="2rem" mb="0.5rem" variant="h4" component="h1">Marriott Hotels Pet Policy: An Overview</Typography>
			<Content text="Marriott Hotels is a global hotel brand that prides itself on providing comfortable and convenient accommodations for travelers. They also have a reputation for being pet-friendly, allowing guests to bring their furry friends along for the journey. Before booking your stay at a Marriott hotel with your pet, it's important to understand their pet policy and any associated fees or restrictions. Luckily, with resources like Romingo, finding and booking pet-friendly rooms at Marriott hotels is easy and stress-free." />
			<img src={One} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="Marriott Hotels allows guests to bring up to two pets per room, with a weight limit of 150 pounds per pet. The pets allowed at Marriott hotels include dogs, cats, birds, and fish. Marriott also welcomes service animals at all of their locations. Guests who wish to bring their pets to Marriott hotels will be charged a non-refundable fee of $100 per stay and an additional cleaning fee in some cases." />


			<Header text="How to Find and Book Pet-Friendly Rooms at Marriott Hotels:" />
			<Content text="To find and book pet-friendly rooms at Marriott hotels, pet owners can use resources such as Romingo, which provides a comprehensive list of hotels that allow pets. Marriott also has a dedicated website page for pet-friendly hotels, making searching for and booking a pet-friendly room easy. When booking your stay, be sure to mention that you will be traveling with a pet to ensure that the hotel is aware of your furry friend's presence." />


			<Header text="Pet-Friendly Marriott Hotel Brands" />
			<Content text="Marriott has several pet-friendly hotel brands, offering a range of options for you and your furry friend. Some of the most pet-friendly Marriott brands include:" />

			<Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
				<SingleLoadListingCard 
					hotelName="100014070" 
					paragraphs={[
						"The Ritz-Carlton is a luxurious hotel brand that welcomes pets at select locations. They offer special amenities such as gourmet treats and pet-sitting services."
					]}
				/>

				<SingleLoadListingCard 
					hotelName="100014664" 
					paragraphs={[
						"Westin is a high-end hotel brand that allows pets at select locations. They offer special amenities such as dog beds, food bowls, and treats."
					]}
				/>

				<SingleLoadListingCard 
					hotelName="100036916" 
					paragraphs={[
						"Residence Inn is an extended-stay hotel brand that allows pets at all of their locations. They offer spacious suites with full kitchens, perfect for travelers with pets."
					]}
				/>

			</Box>
			{/*
			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>The Ritz-Carlton</b>: The Ritz-Carlton is a luxurious hotel brand that welcomes pets at select locations. They offer special amenities such as gourmet treats and pet-sitting services.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Residence Inn</b>: Residence Inn is an extended-stay hotel brand that allows pets at all of their locations. They offer spacious suites with full kitchens, perfect for travelers with pets.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Westin Hotels & Resorts</b>: Westin is a high-end hotel brand that allows pets at select locations. They offer special amenities such as dog beds, food bowls, and treats.</li>
			</ul>
			*/}

			<Header text="Amenities and Services Provided for Pets at Marriott Hotels:" />
			<img src={Two} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="Many Marriott hotels offer amenities and services specifically designed for pets, including dog beds, bowls, and treats. Some Marriott hotels also offer pet-sitting and dog-walking services, so you can explore the city while your pet is well taken care of." />

			<Header text="What to Expect When Traveling with Pets at Marriott Hotels" />
			<Content text="Traveling with pets can be a fun and rewarding experience, and Marriott hotels aim to make it as comfortable and convenient as possible. When staying at a pet-friendly Marriott hotel, you can expect:" />

			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>A warm welcome for both you and your pet upon arrival</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Comfortable accommodations for pets, including cozy beds and feeding bowls</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Outdoor areas for pets to play and stretch their legs</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Special treats or amenities for your pet, in some cases</li>
			</ul>
		
			<Header text="How to Prepare for a Trip with Pets to Marriott Hotels" />
			<Content text="When preparing for a stay at a Marriott hotel with your furry companion, there are a few key things to keep in mind:" />

			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Make sure your pet is up-to-date on their vaccinations and bring along proof of vaccinations, just in case.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Pack your pet&apos;s favorite toys, bedding, and food to ensure they feel at home in their new surroundings.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>If your pet is anxious or prone to car sickness, speak to your vet about any medications that may be helpful.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Bring a collar and leash for your pet, and ensure they wear an identification tag with your current contact information.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Familiarize yourself with the hotel&apos;s pet policy and any fees or restrictions associated with bringing your pet.</li>
			</ul>

			<Header text="How to Ensure a Comfortable Stay at Marriott Hotels with Your Pet" />
			<img src={Three} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Content text="To ensure a comfortable and enjoyable stay for both you and your pet at a Marriott hotel, here are some simple tips:" />
			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Create a comfortable space for your pet in the hotel room, with their own bed and water and food bowls.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Take your pet for regular walks to stretch their legs and get some exercise.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>If your pet is anxious or stressed, spend some extra time with them to help them feel more comfortable in their new environment.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Be respectful of other guests at the hotel, and keep your pet on a leash in common areas.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}>Clean up after your pet and dispose of waste properly.</li>
			</ul>
	
		</Box>
		<Footer />
	</>)
}