import { Box, Typography } from '@mui/material';
import ListingCard from '../ListingCard/ListingCard';
import ListingCardSkeleton from '../UI/ListingCardSkeleton/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Scottsdale = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Scottsdale is also renowned for its world-class resorts, golf courses,
        and spa retreats. Visitors can indulge in luxurious amenities,
        rejuvenate at award-winning spas, and tee off on championship golf
        courses set against the backdrop of the Sonoran Desert.
      </Typography>

      <Typography variant='base'>
        The city&apos;s commitment to wellness and relaxation sets it apart as a
        premier destination for those seeking a luxurious and pampering getaway.
      </Typography>

      <Typography variant='h2'>About Dog Friendly Scottsdale</Typography>

      <Typography variant='base'>
        Art and culture thrive in Scottsdale, with a vibrant arts district and a
        strong emphasis on public art. The city is home to numerous art
        galleries, museums, and art festivals that showcase both local and
        international talent.
      </Typography>

      <Typography variant='base'>
        Downtown Scottsdale allows visitors to explore Native American art,
        contemporary works, and Southwestern-inspired pieces that reflect the
        city&apos;s rich artistic heritage with a wide range of shops.
      </Typography>

      <Typography variant='base'>
        Scottsdale&apos;s culinary scene is a delightful fusion of flavors and
        experiences. From upscale fine dining establishments to trendy
        farm-to-table eateries, the city offers a diverse range of culinary
        options to satisfy every palate. Food enthusiasts can savor innovative
        Southwestern cuisine, international delicacies and indulge in locally
        sourced fresh ingredients.
      </Typography>

      <Typography variant='base'>
        Beyond its natural beauty, luxury resorts, and artistic offerings,
        Scottsdale hosts a variety of events and festivals throughout the year.
        From the Arabian Horse Show and the Scottsdale Culinary Festival to the
        Scottsdale Arts Festival and the Scottsdale International Film Festival,
        there is always something exciting happening in the city.
      </Typography>

      <Typography variant='base'>
        Scottsdale&apos;s unique blend of natural wonders, luxury resorts,
        cultural experiences, and a thriving arts scene create an unforgettable
        destination for visitors. Whether you&apos;re seeking outdoor
        adventures, indulgent relaxation, artistic exploration, or culinary
        delights, Scottsdale offers a one-of-a-kind experience that captivates
        the senses and leaves a lasting impression.
      </Typography>

      <Typography variant='base'>
        Scottsdale is also a pet-friendly destination, where furry companions
        are welcomed with open arms. Explore the city&apos;s pet-friendly
        hotels, each offering a unique experience and a warm embrace for you and
        your beloved pets.
      </Typography>

      <Typography variant='h5'>
        Home2 Suites Scottsdale by Salt River
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Scottsdale, AZ' }}
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
        Experience the comforts of home at Home2 Suites Scottsdale by Salt
        River, a pet-friendly hotel that caters to both short and extended
        stays. In select rooms, you can bring along two pets weighing up to 75
        pounds for a fee of $75 per stay (1 to 4 nights) and $125 stay (5 or
        more nights).
      </Typography>

      <Typography variant='base'>
        This modern hotel offers spacious suites equipped with kitchenettes,
        separate living areas, and thoughtful amenities. Conveniently located
        near the Salt River Fields and other popular attractions, Home2 Suites
        Scottsdale is the perfect choice for travelers seeking a pet-friendly
        and comfortable stay.
      </Typography>

      <Typography variant='h5'>Scottsdale Plaza Resort</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Scottsdale, AZ' }}
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
        Discover a luxurious oasis at Scottsdale Plaza Resort, a pet-friendly
        haven that exudes elegance and tranquility. In select rooms, you can
        bring along two pets weighing up to 50 pounds for a fee of $75 per pet
        per stay.
      </Typography>

      <Typography variant='base'>
        This sprawling resort offers a range of accommodations, from spacious
        rooms to private villas, each thoughtfully designed to provide a serene
        retreat. Enjoy the resort&apos;s multiple pools, spa services, and
        exquisite dining options while savoring the warm Scottsdale sunshine
        with your furry companions by your side.
      </Typography>

      <Typography variant='h5'>Hotel Valley Ho</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Scottsdale, AZ' }}
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
        Step into a mid-century modern paradise at Hotel Valley Ho, a
        pet-friendly hotel that effortlessly blends retro charm with
        contemporary luxury. In select rooms, you can bring along two pets
        weighing up to 75 pounds where pets stay free.
      </Typography>

      <Typography variant='base'>
        This iconic hotel features stylish accommodations and award-winning
        dining experiences. Located in the heart of downtown Scottsdale, Hotel
        Valley Ho offers a vibrant atmosphere, artistic flair, and a
        pet-friendly environment for you and your furry friends to enjoy.
      </Typography>

      <Typography variant='h5'>ADERO Scottsdale</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Scottsdale, AZ' }}
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
        Immerse yourself in the natural beauty of the desert at ADERO
        Scottsdale, a pet-friendly resort that offers a serene and rejuvenating
        escape. In select rooms, you can bring along two pets weighing up to 25
        pounds for a fee of $150 per stay.
      </Typography>

      <Typography variant='base'>
        This eco-friendly resort showcases breathtaking views of the surrounding
        mountains and offers luxurious accommodations designed with
        sustainability in mind. Relax by the infinity pool, indulge in
        rejuvenating spa treatments, and embark on desert adventures, all while
        creating lasting memories with your furry companions.
      </Typography>

      <Typography variant='h5'>Andaz Scottsdale</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Scottsdale, AZ' }}
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
        Uncover a desert hideaway at Andaz Scottsdale, a pet-friendly resort
        that captures the essence of Southwestern charm and luxury. In select
        rooms, there is no charge for pets up through December 31, 2023.
      </Typography>

      <Typography variant='base'>
        This boutique hotel features modern casitas surrounded by lush desert
        landscapes, providing a tranquil retreat. Enjoy the resort&apos;s
        poolside cabanas, world-class dining experiences, and curated art
        displays, all while reveling in the warmth of Scottsdale&apos;s
        hospitality alongside your beloved pets.
      </Typography>

      <Typography variant='base'>
        Scottsdale&apos;s pet-friendly hotels offer a range of options to suit
        different preferences and needs. Whether you&apos;re seeking a modern
        suite, a luxurious resort, or a boutique hideaway, there&apos;s a
        perfect fit for you and your furry companions.
      </Typography>

      <Typography variant='base'>
        Enjoy the warm hospitality, comfortable accommodations, and pet-friendly
        atmosphere as you explore the captivating beauty of Scottsdale with your
        beloved pets.
      </Typography>
    </Box>
  );
};

export default Scottsdale;