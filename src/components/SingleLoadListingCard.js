import ListingCard from './ListingCard/ListingCard'
import { useEffect, useState } from 'react'
import ListingCardSkeleton from './UI/ListingCardSkeleton/ListingCardSkeleton'
import { Box, Typography, Link, useMediaQuery } from "@mui/material";
import ImageSlider from "./ImageSlider/ImageSlider";
//hotelName is just sabreId

const stateCodes = {
		"AL": "Alabama",
		"AK": "Alaska",
		"AS": "American Samoa",
		"AZ": "Arizona",
		"AR": "Arkansas",
		"CA": "California",
		"CO": "Colorado",
		"CT": "Connecticut",
		"DE": "Delaware",
		"DC": "District Of Columbia",
		"FM": "Federated States Of Micronesia",
		"FL": "Florida",
		"GA": "Georgia",
		"GU": "Guam",
		"HI": "Hawaii",
		"ID": "Idaho",
		"IL": "Illinois",
		"IN": "Indiana",
		"IA": "Iowa",
		"KS": "Kansas",
		"KY": "Kentucky",
		"LA": "Louisiana",
		"ME": "Maine",
		"MH": "Marshall Islands",
		"MD": "Maryland",
		"MA": "Massachusetts",
		"MI": "Michigan",
		"MN": "Minnesota",
		"MS": "Mississippi",
		"MO": "Missouri",
		"MT": "Montana",
		"NE": "Nebraska",
		"NV": "Nevada",
		"NH": "New Hampshire",
		"NJ": "New Jersey",
		"NM": "New Mexico",
		"NY": "New York",
		"NC": "North Carolina",
		"ND": "North Dakota",
		"MP": "Northern Mariana Islands",
		"OH": "Ohio",
		"OK": "Oklahoma",
		"OR": "Oregon",
		"PW": "Palau",
		"PA": "Pennsylvania",
		"PR": "Puerto Rico",
		"RI": "Rhode Island",
		"SC": "South Carolina",
		"SD": "South Dakota",
		"TN": "Tennessee",
		"TX": "Texas",
		"UT": "Utah",
		"VT": "Vermont",
		"VI": "Virgin Islands",
		"VA": "Virginia",
		"WA": "Washington",
		"WV": "West Virginia",
		"WI": "Wisconsin",
		"WY": "Wyoming"
}

export default function SingleLoadListingCard({ hotelName, paragraphs = [], displayNormal = false}) {

	const [card, setCard] = useState(null)
	const mobile = useMediaQuery("(max-width:800px)");

	useEffect(() => {
		getHotel()
	}, [])

	const getHotel = async () => {
		const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/sabre-id/${hotelName}`)
		const json = await result.json()
		setCard(json?.result?.find(item => true))
	}

	if (!card) {
		return <ListingCardSkeleton />
	}

	function slugify(str) {
		if (!str) {
			return ''
		}
		// Convert all non-word characters to hyphens
		str = str.replace(/[^\w-]/g, '-');

		// Remove all consecutive hyphens
		str = str.replace(/-+/g, '-');

		// Trim leading and trailing hyphens
		str = str.trim('-');

		return str.toLowerCase();
	}

	const hotelUrl = `/pet-friendly-hotel/${slugify(stateCodes[card?.state])}/${slugify(card?.city)}/${card?.alias}`

	if (displayNormal) {
		return (
			<ListingCard 
				id={card?.travolutionaryId}
				imageURLs={card?.images}
				name={card?.hotelName}
				addressLine1={card?.addressLine}
				romingoScore={card?.starRating}
				numberOfReviews={card?.numberOfReviews}
				city={card?.city}
				showPrice={false}
				alias={card?.alias}
				hotel={{
					id: card?.travolutionaryId,
					pet_fee: card?.petFee,
					pet_fee_value: card?.petFeeValue,
					pet_size: card?.petSize,
					pet_allowance: card?.petAllowance
				}}
				state={card?.state}
				zipcode={card?.zipcode}
			/>
		)
	}


	return(<Box display="flex" flexDirection="row" gap="1rem" justifyContent="justify-between">
		{!mobile && <Box maxWidth="300px">
			<ImageSlider
				images={card?.images}
				name={card?.hotelName}
				height="360px"
				imageCount={10}
				page="listings"
			/>
		</Box>
		}
		<Box overflow="auto" sx={{  height: {xs: 'auto', sm: 'auto', md: "360px" } }}>
			<Typography variant="h6"><Link href={hotelUrl}>{card?.hotelName}</Link></Typography>
			{mobile &&
				<Box mb="0.5rem">
					<ImageSlider
						images={card?.images}
						name={card?.hotelName}
						height="360px"
						imageCount={10}
						page="listings"
					/>
				</Box>
			}
			<Box display="flex" flexDirection="column" gap="1rem">
				{paragraphs.map((paragraph, index) => {

					if (index + 1 === paragraphs.length) {
						return <Typography variant="base" key={index}>{paragraph} <Link href={hotelUrl}>Read more.</Link></Typography>
					}
					return <Typography variant="base" key={index}>{paragraph}</Typography>
				})}
			</Box>	
		</Box>
		{/*
<ListingCard 
			id={card?.travolutionaryId}
			imageURLs={card?.images}
			name={card?.hotelName}
			addressLine1={card?.addressLine}
			romingoScore={card?.starRating}
			numberOfReviews={card?.numberOfReviews}
			city={card?.city}
			showPrice={false}
			alias={card?.alias}
			hotel={{
				id: card?.travolutionaryId,
				pet_fee: card?.petFee,
				pet_fee_value: card?.petFeeValue,
				pet_size: card?.petSize,
				pet_allowance: card?.petAllowance
			}}
			state={card?.state}
			zipcode={card?.zipcode}
		/>
	*/}
	</Box>)
}