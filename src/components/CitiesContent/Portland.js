import { Box, Typography } from '@mui/material';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Portland = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='h2'>
        Exceptional Dog Friendly Hotels
      </Typography>

      <Typography variant='base'>
        This vibrant city embraces its four-legged residents with exceptional
        hotels, ensuring an unforgettable and enjoyable stay.
      </Typography>

      <Typography variant='base'>
        Get ready to discover a world where pet-friendly hospitality reaches new
        heights, creating unforgettable memories for both you and your cherished
        pets.
      </Typography>

      <Typography variant='base'>
        You’ll see a collection of accommodations that offer a truly unique
        experience, where your furry companions are treated like VIPs.{' '}
      </Typography>

      <Typography variant='h5'>Aloft Portland at Cascade Station</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Portland, OR' }}
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
        This contemporary hotel, exuding a perfect blend of style and
        convenience, sets the stage for an unforgettable stay in the vibrant
        heart of Portland. As you step into the spacious and pet-friendly
        accommodations, a sense of home envelops you and your furry friends,
        creating a haven where their happiness and comfort are paramount.
      </Typography>

      <Typography variant='base'>
        Pets up to 70 pounds are welcomed at no additional charge. This
        contemporary hotel blends style and convenience, offering a vibrant
        atmosphere for you and your furry friends. With spacious pet-friendly
        accommodations, your beloved companions will feel right at home.
      </Typography>

      <Typography variant='base'>
        Every aspect of Aloft Portland at Cascade Station has been thoughtfully
        designed to cater to the needs of both you and your pets. The sleek and
        contemporary ambiance sets a lively tone, providing an energizing
        backdrop for your adventures in the city. The modern amenities and
        thoughtful touches ensure that your stay is as convenient as it is
        enjoyable.
      </Typography>

      <Typography variant='base'>
        Embrace the nearby friendly dog park, a haven for outdoor activities and
        social interactions, ensuring a delightful stay for pets and their
        owners.
      </Typography>

      <Typography variant='h5'>The Hoxton Portland</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Portland, OR' }}
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
        Nestled in the heart of the city, The Hoxton Portland extends a warm
        welcome to pets at no additional charge. This trendy hotel embodies
        urban sophistication and chic comfort, ensuring a stylish retreat for
        you and your furry companion.
      </Typography>

      <Typography variant='base'>
        Embrace the joy of exploring the city together, with the assurance that
        a friendly dog park nearby will enhance your experience with moments of
        outdoor bliss and joyful connections.
      </Typography>

      <Typography variant='h5'>
        The Porter Portland Curio Collection by Hilton
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Portland, OR' }}
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
        Every corner of The Porter Portland Curio Collection by Hilton exudes an
        air of refined ambiance, carefully curated to cater to your every need.
        The hotel&apos;s commitment to luxury is evident in its exquisite
        accommodations, which are designed to provide the utmost comfort and
        indulgence.
      </Typography>

      <Typography variant='base'>
        Elegant furnishings, plush bedding, and tasteful decor create a haven of
        relaxation and tranquility, inviting you and your pets to unwind in
        style.
      </Typography>

      <Typography variant='base'>
        The Porter Portland Curio Collection by Hilton allows two pets weighing
        up to 50 pounds for a fee of $75 per stay. This elegant hotel combines
        luxury with convenience, boasting exquisite accommodations and
        impeccable service.
      </Typography>

      <Typography variant='base'>
        Unleash your pet&apos;s playful spirit at the nearby dog park, a
        delightful haven for outdoor exploration and joyful social interactions.
      </Typography>

      <Typography variant='h5'>
        The Benson Portland Curio Collection by Hilton
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Portland, OR' }}
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
        Experience the epitome of luxury at The Benson Portland Curio Collection
        by Hilton, where two pets of any size are warmly welcomed for a fee of
        $40 per stay. They provide special treats for your furry friend.
      </Typography>

      <Typography variant='base'>
        This iconic hotel exudes timeless elegance and charm, offering lavish
        accommodations and unparalleled service.
      </Typography>

      <Typography variant='base'>
        Treat your pet to the nearby friendly dog park, where they can stretch
        their legs and engage in playful interactions amidst the vibrant
        atmosphere of Portland.
      </Typography>

      <Typography variant='h5'>Moxy Portland Downtown</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Portland, OR' }}
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
        At Moxy Portland Downtown, pets up to 70 lbs can join you for a fee of
        $25 per pet per stay. This trendy and spirited hotel combines modern
        comfort with a playful atmosphere, ensuring a memorable stay for you and
        your furry friend.
      </Typography>

      <Typography variant='base'>
        Nearby, a friendly dog park beckons, providing an ideal setting for
        outdoor adventures and opportunities for your pet to mingle with other
        playful companions.
      </Typography>

      <Typography variant='h5'>
        Canopy by Hilton Portland Pearl District Autograph Collection
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'Portland, OR' }}
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
        Discover contemporary elegance at Canopy by Hilton Portland Pearl
        District Autograph Collection, where two pets weighing up to 75 lbs are
        welcomed for a fee of $75 per stay. This stylish hotel embraces the
        spirit of Portland&apos;s vibrant Pearl District, offering sophisticated
        accommodations and personalized service.
      </Typography>

      <Typography variant='base'>
        Delight in the nearby friendly dog park, where your pet can frolic and
        explore the outdoors, forging cherished memories amidst the lively
        energy of the city.
      </Typography>

      <Typography variant='h5'>The Hi-Lo</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[6]}
          city={{ name: 'Portland, OR' }}
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
        Experience a blend of modern design and warm hospitality at The Hi-Lo,
        where two pets weighing up to 50 pounds are cherished guests for a fee
        of $50 per stay and $50 non-refundable deposit. This boutique hotel
        exudes a chic and artistic ambiance, providing a haven of comfort and
        style.
      </Typography>

      <Typography variant='base'>
        Uncover the nearby friendly dog park, offering an ideal space for your
        pet to engage in outdoor adventures and socialize with fellow furry
        explorers.
      </Typography>

      <Typography variant='h5'>Hyatt Centric Downtown Portland</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[7]}
          city={{ name: 'Portland, OR' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[7].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[7].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[7].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={7} />
      )}

      <Typography variant='base'>
        Immerse yourself in the vibrant heart of Portland at Hyatt Centric
        Downtown Portland, where two pets of any size are welcomed for a fee of
        $100 per stay. This contemporary hotel combines modern comforts with a
        prime location, ensuring an enriching experience for you and your furry
        companions.
      </Typography>

      <Typography variant='base'>
        Venture to the nearby friendly dog park, a vibrant gathering spot for
        outdoor activities and joyful encounters.
      </Typography>

      <Typography variant='base'>
        In Portland, pet-friendly hotels open their doors to create a haven
        where you and your cherished pets can enjoy a memorable and stress-free
        stay. From the modern allure of Aloft Portland at Cascade Station to the
        refined elegance of The Benson Portland Curio Collection by Hilton,
        there&apos;s an accommodation option to suit every preference. Discover
        the warmth of hospitality and the joy of pet-friendly amenities as you
        explore the vibrant cityscape of Portland with your beloved pets by your
        side.
      </Typography>
    </Box>
  );
};

export default Portland;
