import { useEffect, useState } from 'react'

import {
  Box,
  Typography,
} from "@mui/material";

import { utils } from '../../services/utils'
import ListingCard from "../../components/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";
import SingleLoadListingCard from '../../components/SingleLoadListingCard';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'
import IconTags from '../../components/IconTags';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

import One from '../../assets/public/images/policy-images/ihg.jpg';
import Two from '../../assets/public/images/policy-images/ihg-2.jpg';

// const One = 'https://www.romingo.com/public/images/policy-images/ihg.jpg';
// const Two = 'https://www.romingo.com/public/images/policy-images/ihg-2.jpg';

export default function IHG() {


	const Header = ({ text }) => (
		<Typography mt="2rem" mb="0.5rem" variant="h4">{text}</Typography>
	)

	const Content = ({ text }) => (
		<Typography variant="base" component="p" mb="1rem">{text}</Typography>
	)

	return (<>
		<Helmet>
			<title>IHG Hotels Pet Policy: An Overview — Romingo</title>
			<description>Traveling with your furry companion can be a fun adventure, but it&apos;s crucial to make sure you&apos;re booking a pet-friendly hotel. IHG Hotels & Resorts is a leading hospitality company that offers pet-friendly options across many of its 17 distinct brands. Whether you&apos;re looking for a luxury experience or a budget-friendly stay, there&apos;s an IHG brand that caters to your needs and welcomes your furry friend. Let&apos;s take a closer look at IHG&apos;s pet policies and highlight some of the best pet-friendly options in the portfolio.</description>
			<meta property="og:title" content="IHG Hotels Pet Policy: An Overview — Romingo" />
			<meta property="og:description" content="Traveling with your furry companion can be a fun adventure, but it's crucial to make sure you're booking a pet-friendly hotel. IHG Hotels & Resorts is a leading hospitality company that offers pet-friendly options across many of its 17 distinct brands. Whether you're looking for a luxury experience or a budget-friendly stay, there's an IHG brand that caters to your needs and welcomes your furry friend. Let’s take a closer look at IHG's pet policies and highlight some of the best pet-friendly options in the portfolio." />
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
				<Typography variant="h4" component="h1">Find pet-friendly IHG Hotels on Romingo</Typography>
				<Typography variant="base">The hassle free way to travel with your pet</Typography>
				<Box sx={{  width: '100%', mt: '1rem' }}>
					<LocationPageFilterBar />
				</Box>
			</Box>

			<Box
				component="img"
				src="https://storage.googleapis.com/romingo-production-public/Pet%20Policy%20Images/89027873-4f0c-470d-bac2-b4929b71f36d.jpg"
				alt="IHG hotel"
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

		<Box sx={{ maxWidth: '760px', mx: 'auto', pb: '1rem', px: '1rem'}}>
			<Typography mt="2rem" mb="0.5rem" variant="h4" component="h1">IHG Hotels Pet Policy: An Overview</Typography>
			<img src={One} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base">Traveling with your furry companion can be a fun adventure, but it&apos;s crucial to make sure you&apos;re booking a pet-friendly hotel. IHG Hotels & Resorts is a leading hospitality company that offers pet-friendly options across many of its 17 distinct brands. Whether you&apos;re looking for a luxury experience or a budget-friendly stay, there&apos;s an IHG brand that caters to your needs and welcomes your furry friend. Let&apos;s take a closer look at IHG&apos;s pet policies and highlight some of the best pet-friendly options in the portfolio.</Typography>

			<Header text="Top 9 Pet-Friendly IHG Hotel Brands" />
			
			<Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
				<SingleLoadListingCard 
					hotelName="101034302" 
					paragraphs={[
						"Value brand with free breakfast and fresh coffee, pet policies vary by property with some allowing pets for a reasonable fee of $20 per night."
					]}
				/>

				<SingleLoadListingCard 
					hotelName="100039890" 
					paragraphs={[
						"Extended-stay brand with fully-equipped kitchens, outdoor grills, and free laundry, all locations are pet-friendly with a non-refundable fee of $75 for stays up to 6 nights and $150 for stays 7 nights or longer."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100135376" 
					paragraphs={[
						"Found in cities and urban areas with solid Wi-Fi, premium bedding, gyms, and on-site dining, pet policies vary by location with fees ranging from $75 to $100."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100206366" 
					paragraphs={[
						"Wellness-focused brand with fitness, dining, relaxation, and sleeping pillars, pets must weigh less than 50 pounds with a fee of $100 per stay."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100396330" 
					paragraphs={[
						"Well-known brand with affordable prices and free hot breakfast, many locations allow dogs with fees around $50 per stay."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100329848" 
					paragraphs={[
						"Family-friendly brand with activities included, many locations accept pets with fees around $50."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100007904" 
					paragraphs={[
						"Luxury brand with fine dining and spas, some locations allow small dogs for fees up to $250."
					]}
				/>
				<SingleLoadListingCard 
					hotelName="100399492" 
					paragraphs={[
						"Boutique brand focused on art, wellness, and dining with a “sincerely personal” guest experience, all hotels are pet-friendly with no extra charge for pets of any size, weight, or breed."
					]}
				/>
	
				<SingleLoadListingCard 
					hotelName="100079452" 
					paragraphs={[
						"Extended-stay brand with all-suite accommodations and home-away-from-home amenities, dogs under 50 pounds are welcome with fees around $75 for a 1-week stay."
					]}
				/>

			</Box>

			{/* 
			<ul>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Atwell Suites</b>: All-suites brand with co-working spaces and free breakfast, dogs under 40 pounds are welcome but must be crated when the guest is away.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Avid Hotels</b>: Value brand with free breakfast and fresh coffee, pet policies vary by property with some allowing pets for a reasonable fee of $20 per night.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Candlewood Suites</b>: Extended-stay brand with fully-equipped kitchens, outdoor grills, and free laundry, all locations are pet-friendly with a non-refundable fee of $75 for stays up to 6 nights and $150 for stays 7 nights or longer.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Crowne Plaza Hotels & Resorts</b>: Found in cities and urban areas with solid Wi-Fi, premium bedding, gyms, and on-site dining, pet policies vary by location with fees ranging from $75 to $100.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>EVEN Hotels</b>: Wellness-focused brand with fitness, dining, relaxation, and sleeping pillars, pets must weigh less than 50 pounds with a fee of $100 per stay.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Holiday Inn Express</b>: Well-known brand with affordable prices and free hot breakfast, many locations allow dogs with fees around $50 per stay.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Holiday Inn Hotels & Resorts</b>: Family-friendly brand with activities included, many locations accept pets with fees around $50.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>InterContinental Hotels & Resorts</b>: luxury brand with fine dining and spas, some locations allow small dogs for fees up to $250.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Kimpton Hotels & Restaurants</b>: boutique brand focused on art, wellness, and dining with a “sincerely personal” guest experience, all hotels are pet-friendly with no extra charge for pets of any size, weight, or breed.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Mr & Mrs Smith</b>: Boutique hotel travel club with access to hundreds of unique properties around the world that tend to be pet-friendly, amenities for pets include beds, special menus, toys, walking options, and massages.</li>
				<li style={{ marginBottom: '1rem', fontSize: '1rem'}}><b>Staybridge Suites</b>: Extended-stay brand with all-suite accommodations and home-away-from-home amenities, dogs under 50 pounds are welcome with fees around $75 for a 1-week stay.</li>
			</ul>
				*/}

			<Header text="Pet-Friendly Amenities at IHG Hotels" />
			<Content text="In addition to allowing pets at many of their hotels, IHG offers pet-friendly amenities to make your furry friend feel right at home. Depending on the brand and location, amenities may include pet beds, bowls, treats, and even designated pet areas. Some hotels may also offer pet walking services or recommendations for local pet-friendly parks and trails." />

			<Header text="How to Find and Book Pet-Friendly Rooms at IHG Hotels" />
			<img src={Two} width="100%" style={{ borderRadius: 5, marginTop: '0.5rem', marginBottom: '1rem' }} />
			<Typography variant="base" mb="0.5rem">To find and book pet-friendly rooms at IHG Hotels, pet owners can use resources like Romingo. Romingo is a premier resource for booking pet-friendly hotels and provides a comprehensive list of hotels that allow pets. When booking a pet-friendly room, be sure to mention that you will be traveling with a pet to ensure that the hotel is aware of your furry friend&apos;s presence. A link to a directory of pet-friendly IHG hotels is also available on the <a href="https://www.ihg.com/destinations/us/en/pet-friendly-hotels" target="_blank" rel="noreferrer">hotel&apos;s website.</a></Typography>


			<Header text="How To Prepare For A Successful IHG Hotel Stay With A Pet" />
			<Content text="Traveling with a pet requires a bit of extra preparation to ensure a successful trip. Here are some tips to help you and your furry friend have a comfortable and enjoyable stay at an IHG hotel:" />

			<Content text="1. Contact the hotel in advance: Before your stay, contact the hotel directly to confirm their pet policy and any fees or restrictions that may apply. This will help you avoid any surprises at check-in." />
			<Content text="2. Pack for your pet: Be sure to bring everything your pet will need, including food, water, bowls, toys, and any medication. If you’re traveling by car, consider bringing a crate or carrier for your pet’s safety." />
			<Content text="3. Keep your pet leashed: For the safety of your pet and other hotel guests, always keep your pet on a leash when outside of your room." />
			<Content text="4. Be considerate of other guests: Not everyone loves pets, so be respectful of other hotel guests by keeping your pet quiet and well-behaved at all times." />
			<Content text="5. Clean up after your pet: Always clean up after your pet and dispose of waste properly. Most hotels provide pet waste bags and disposal stations for your convenience." />
			<Content text="By following these tips and being prepared, you and your pet can enjoy a comfortable and stress-free stay at an IHG hotel." />

			<Header text="Why IHG Hotels Are Great For Pet-Friendly Stays" />
			<Content text="IHG Hotels are the perfect place for a pet-friendly stay because they offer a variety of brands that cater to different travel styles, from extended-stay suites to luxury resorts. With some planning and preparation, guests can enjoy a stress-free stay with their pets and create unforgettable memories together." />
		
		</Box>
		<Footer />
	</>)
}