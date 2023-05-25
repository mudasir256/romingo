import { Box, Typography } from '@mui/material';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const SanAntonio = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        With its blend of history, culture, cuisine, and natural beauty, San
        Antonio offers an unforgettable experience for every visitor.
      </Typography>

      <Typography variant='h2'>Dog Friendly San Antonio</Typography>

      <Typography variant='base'>
        Welcome to dog-friendly San Antonio, where you and your furry companions
        are embraced with open arms.
      </Typography>

      <Typography variant='base'>
        Whether you&apos;re visiting for business or leisure, the city offers a
        range of pet-friendly hotels that prioritize your comfort and the
        well-being of your beloved pets. These accommodating establishments
        provide a warm and welcoming environment, ensuring a comfortable stay
        for both you and your furry friends.
      </Typography>

      <Typography variant='base'>
        San Antonio boasts a variety of pet-friendly hotels that cater to
        different preferences and budgets. From upscale luxury hotels to cozy
        boutique accommodations, there&apos;s a perfect fit for every traveler.
        No matter where you choose to stay, you can expect comfortable
        accommodations and exceptional service that will make you and your furry
        companions feel right at home.
      </Typography>

      <Typography variant='base'>
        Explore the city&apos;s attractions and soak in the vibrant atmosphere,
        knowing that you have a cozy and pet-friendly haven to return to.
        Whether you&apos;re here for important business meetings or seeking to
        immerse yourself in the city&apos;s rich history and culture, San
        Antonio&apos;s pet-friendly hotels offer the perfect base for your
        adventures.
      </Typography>

      <Typography variant='base'>
        Today let’s explore some of the pet-friendly hotels in San Antonio, each
        offering a unique experience and a welcoming environment.
      </Typography>

      <Typography variant='h5'>
        Rodeway Inn San Antonio Near Lackland AFB and Kelly Field
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[0].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[0].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[0].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={0} />
      )}

      <Typography variant='base'>
        Conveniently located near Lackland Air Force Base and Kelly Field,
        Rodeway Inn San Antonio offers a budget-friendly and pet-friendly stay.
        For a nominal fee of $20 per night per pet, you can bring along two pets
        weighing up to 80 lbs. There’s also a $75 refundable deposit. And
        there’s a park nearby for walking.
      </Typography>

      <Typography variant='base'>
        This hotel provides comfortable accommodations and easy access to
        popular attractions, making it an ideal choice for travelers seeking
        affordability and pet-friendly amenities.
      </Typography>

      <Typography variant='h5'>
        La Quinta Inn by Wyndham Brooks City Base
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[1].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[1].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[1].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={1} />
      )}

      <Typography variant='base'>
        Situated in the Brooks City Base area, La Quinta Inn is a pet-friendly
        retreat for both you and your furry friends. With a fee of $25 per night
        with a maximum of $75, you can bring along two pets weighing up to 75
        lbs.
      </Typography>

      <Typography variant='base'>
        This hotel offers comfortable accommodations and convenient amenities,
        ensuring a pleasant stay. Explore the nearby attractions and enjoy the
        warm Texan hospitality with your pets by your side.
      </Typography>

      <Typography variant='h5'>Aloft San Antonio Northwest</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[2].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[2].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[2].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={2} />
      )}

      <Typography variant='base'>
        Experience contemporary comfort at Aloft San Antonio Northwest, a
        pet-friendly hotel that welcomes two pets weighing up to 40 pounds for
        no additional fee. This stylish and modern hotel provides comfortable
        accommodations and a range of amenities, including a fitness center and
        an on-site bar.
      </Typography>

      <Typography variant='base'>
        Whether you&apos;re visiting for business or leisure, Aloft San Antonio
        Northwest offers a welcoming and pet-friendly environment for you and
        your furry companions.
      </Typography>

      <Typography variant='h5'>Sheraton Gunter Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[3].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[3].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[3].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={3} />
      )}

      <Typography variant='base'>
        Immerse yourself in the historic charm and elegance of Sheraton Gunter
        Hotel, a pet-friendly establishment located in downtown San Antonio. For
        a fee of $60 per stay, you can bring along two pets weighing up to 50
        lbs. This iconic hotel seamlessly blends modern amenities with classic
        decor, providing a luxurious retreat for both you and your furry
        friends.
      </Typography>

      <Typography variant='base'>
        Enjoy the hotel&apos;s on-site dining options, fitness center, and
        convenient location near popular attractions.
      </Typography>

      <Typography variant='h5'>
        La Quinta Inn San Antonio North Stone Oak
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[4].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[4].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[4].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={4} />
      )}

      <Typography variant='base'>
        Nestled in the scenic Stone Oak area, La Quinta Inn offers a
        pet-friendly escape for both you and your furry companions. With a fee
        of $25 per night ($25 per night for a max of $75 per room per stay), you
        can bring along two pets. There’s also places to walk nearby.
      </Typography>

      <Typography variant='base'>
        This hotel provides comfortable accommodations and a range of amenities,
        ensuring a pleasant stay. Explore the natural beauty of San Antonio and
        enjoy the welcoming atmosphere of La Quinta Inn.
      </Typography>

      <Typography variant='h5'>
        Sonesta ES Suites San Antonio Downtown Alamo Plaza
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[5].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[5].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[5].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={5} />
      )}

      <Typography variant='base'>
        Discover the spacious comfort of Sonesta ES Suites San Antonio Downtown
        Alamo Plaza, a pet-friendly hotel that warmly welcomes pets weighing up
        to 75 lbs. For a fee of $75 per accommodation per week, you can bring
        along two furry companions.
      </Typography>

      <Typography variant='base'>
        This all-suite hotel offers apartment-style accommodations with separate
        living areas and fully equipped kitchens, providing a
        home-away-from-home experience.
      </Typography>

      <Typography variant='base'>
        Whether you&apos;re traveling for business or leisure, Sonesta ES Suites
        offers a pet-friendly environment for you and your beloved pets.
      </Typography>

      <Typography variant='h5'>
        Thompson San Antonio Hotel Contessa Riverwalk
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[6]}
          city={{ name: 'San Antonio, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[6].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[6].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[6].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={6} />
      )}

      <Typography variant='base'>
        Experience the luxury and sophistication of Thompson San Antonio Hotel
        Contessa Riverwalk, a pet-friendly hotel catering to both business and
        leisure travelers. Their pet fee is $125 per stay per pet with a weight
        limit of 40 pounds.
      </Typography>

      <Typography variant='base'>
        Guests with pets are only available on set floors and select room types
        and based on availability – so call them early if you are traveling with
        a pet.
      </Typography>

      <Typography variant='base'>
        This upscale hotel offers elegant accommodations, stunning views of the
        Riverwalk, and a range of amenities to enhance your stay.
      </Typography>

      <Typography variant='base'>
        Enjoy the hotel&apos;s rooftop pool, fitness center, and on-site dining
        options while immersing yourself in the vibrant atmosphere of San
        Antonio.
      </Typography>

      <Typography variant='base'>
        San Antonio warmly embraces pets, offering a variety of pet-friendly
        hotels that provide comfortable accommodations and exceptional service.
        Whether you seek affordability, modern comfort, or upscale luxury,
        there&apos;s a pet-friendly option to suit your preferences. Explore the
        city&apos;s rich history, vibrant culture, and warm hospitality with
        your beloved pets by your side.
      </Typography>
    </Box>
  );
};

export default SanAntonio;