import { useEffect, useState } from 'react'
import { Box } from "@mui/material";

import ListingCard from '../ListingCard/ListingCard'
import ListingCardSkeleton from '../UI/ListingCardSkeleton/ListingCardSkeleton'
import Card from "./Card";
import LinkContent from '../../layouts/CitiesPages/LinkContent';


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

const CarouselCard = ({ card, paragraphs, hotelUrl }) => {
	return (
		<Box 
			sx={{
				textAlign: "left",
				m: "0.5rem",
				pb: "0.25rem",
				minHeight: "550px",
				boxShadow: 1,
				borderRadius: 4,
			}}
		>
			<img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}  src={card?.images[0]} height="340px" />
			<LinkContent
				link={hotelUrl}
				linkText={card?.hotelName}
				text={paragraphs[0]}
			/>
		</Box>
	)
}

// Note: hotelName is just sabreId
const SingleLoadListingCard = ({ hotelName, paragraphs = [], displayNormal = false, isCarouselCard = false}) => {
	const [card, setCard] = useState(null);

	const getHotel = async () => {
		const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/sabre-id/${hotelName}`)
		const json = await result.json()
		setCard(json?.result?.find(item => true))
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

	useEffect(() => {
		getHotel();
	}, [])

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
	return ( 
		<>
			{card ? (
				isCarouselCard
				? (
					<CarouselCard 
						card={card}
						hotelUrl={hotelUrl}
						paragraphs={paragraphs}
					/>
				) : (
					<Card 
						card={card} 
						hotelUrl={hotelUrl} 
						paragraphs={paragraphs} 
					/>
				)
			) : (
				<ListingCardSkeleton />
			)}
		</>
	)
}

export default SingleLoadListingCard;
