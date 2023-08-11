import ListingCard from './ListingCard/ListingCard'
import { useEffect, useState } from 'react'
import ListingCardSkeleton from './UI/ListingCardSkeleton/ListingCardSkeleton'

//hotelName is just sabreId
export default function SingleLoadListingCard({ hotelName }) {

	const [card, setCard] = useState(null)

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

	return(
		<ListingCard 
			id={card?.travolutionaryId}
			imageURLs={card?.images}
			name={card?.hotelName}
			addressLine1={card?.addressLine}
			romingoScore={card?.starRating}
			city={card?.city}
			showPrice={false}
			alias={card?.travolutionaryId}
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