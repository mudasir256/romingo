import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Prime location near popular attractions',
  'Delicious on-site dining options',
  'State-of-the-art fitness center',
  'Pet-friendly environment',
];

const highlights2 = [
  'Strategic location near the iconic Sunset Strip',
  'Well-equipped fitness center',
  'Pet-friendly ambiance',
];

const highlights3 = [
  'Prime waterfront location',
  'Sumptuous on-site dining options',
  'Modern fitness center',
  'Dog-friendly atmosphere',
];

const highlights4 = [
  'Central West Hollywood location',
  'Close proximity to popular attractions',
  'Fully-equipped fitness center',
  'On-site dining options',
  'Pet-friendly environment',
];

const highlights5 = [
  'Ideal location near Beverly Hills',
  'Complimentary evening wine reception',
  'Top-notch fitness center',
  'Pet-friendly atmosphere',
];

const LosAngeles = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Together with your four-legged companion, find the ideal temporary abode
        as you experience the captivating charm of the City of Angels.
      </Typography>

      <Typography variant='h2'>Dog Friendly and Captivating</Typography>

      <Typography variant='base'>
        Los Angeles is a captivating destination for travelers and their furry
        companions, boasting a wide variety of pet-friendly hotels catering to
        diverse preferences and budgets.
      </Typography>

      <Typography variant='base'>
        From the luxurious Kimpton Palomar Los Angeles - Beverly Hills and the
        trendy Mondrian Los Angeles to the picturesque Marina del Rey Hotel, the
        chic Kimpton La Peer Hotel, and the hospitable Kimpton Hotel Wilshire,
        you and your pet are guaranteed to create unforgettable memories in this
        enchanting city.
      </Typography>

      <Typography variant='base'>
        Immerse yourselves in the multitude of dog-friendly parks, trails, and
        attractions that Los Angeles has to offer, thanks to its numerous
        pet-friendly accommodations.
      </Typography>

      <Typography variant='base'>
        Today we look at a small number of handpicked hotels known for their
        pet-friendly amenities, inviting atmosphere and prime locations. Whether
        you&apos;re drawn to the refinement of a high-end property or the cozy
        charm of a boutique hotel, you&apos;re sure to discover the perfect
        lodging to meet your needs.
      </Typography>

      <Typography variant='h5'>
        Kimpton Palomar Los Angeles - Beverly Hills
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Los Angeles, CA' }}
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
        Immerse yourself in the elegance and refinement of Kimpton Palomar Los
        Angeles - Beverly Hills. This pet-friendly hotel warmly welcomes pets of
        any size at no extra cost, ensuring a delightful stay for both you and
        your companion. Dogs and cats are allowed, making it an ideal choice for
        a diverse array of pet owners.
      </Typography>

      <Typography variant='base'>
        A welcoming dog park is conveniently located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Notable features of Kimpton Palomar Los Angeles - Beverly Hills include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>Mondrian Los Angeles</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Los Angeles, CA' }}
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
        Treat yourself to the sleek and modern atmosphere of Mondrian Los
        Angeles. This pet-friendly hotel requires a waiver to be signed upon
        arrival and a $125 non-refundable deposit. There are some implicit
        restrictions such as pets are not allowed in food and beverage areas or
        near the pool, and they cannot be left unattended in guest rooms. A
        friendly dog park is situated nearby.{' '}
      </Typography>

      {/* List */}
      <HighlightBox
        title='Highlights of Mondrian Los Angeles include:'
        highlights={highlights2}
      />

      <Typography variant='h5'>Marina del Rey Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Los Angeles, CA' }}
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
        The Marina del Rey Hotel invites guests to revel in its breathtaking
        waterfront surroundings while providing the ultimate in luxury and
        comfort. This pet-friendly hotel boasts elegantly designed rooms and
        suites with modern amenities, offering a serene retreat for you and your
        furry friend.
      </Typography>

      <Typography variant='base'>
        Each room features a tasteful blend of contemporary decor and cozy
        furnishings, ensuring a restful stay. Take in the awe-inspiring marina
        views from your private balcony or patio, a feature that adds to the
        hotel&apos;s unique appeal. Delight in the on-site dining options, where
        you can enjoy sumptuous meals at the renowned waterfront restaurant,
        SALT.
      </Typography>

      <Typography variant='base'>
        The hotel also offers top-notch facilities such as a heated infinity
        pool, an outdoor lounge area, and a well-equipped fitness center. The
        accommodating staff at Marina del Rey Hotel will ensure that both you
        and your canine companion are treated to a memorable and relaxing
        experience, creating the perfect backdrop for your Los Angeles
        adventure.
      </Typography>

      <Typography variant='base'>
        This pet-friendly hotel accommodates two dogs up to 40 lbs for an
        additional fee of $50 per pet, per night. Unfortunately, cats are not
        permitted. A lovely dog park is located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Marina del Rey Hotel include:'
        highlights={highlights3}
      />

      <Typography variant='h5'>Kimpton La Peer Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Los Angeles, CA' }}
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
        Savor the fashionable elegance of Kimpton La Peer Hotel, a boutique gem
        offering pet-friendly lodgings in the heart of West Hollywood. Pets stay
        at no extra charge, with no deposit required, no size or weight
        restrictions, and no limit on the number of pets allowed, ensuring a
        comfortable experience for you and your furry friend. A welcoming dog
        park is situated nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Standout features of Kimpton La Peer Hotel include:'
        highlights={highlights4}
      />

      <Typography variant='h5'>Kimpton Hotel Wilshire</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Los Angeles, CA' }}
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
        Relax in the inviting ambiance of Kimpton Hotel Wilshire, a pet-friendly
        hotel providing well-appointed rooms and essential amenities for you and
        your pet. The hotel welcomes two pets of any size at no extra cost, and
        both dogs and cats are allowed. A friendly dog park is conveniently
        located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of Kimpton Hotel Wilshire include:'
        highlights={highlights5}
      />

      <Typography variant='base'>
        Beyond these outstanding pet-friendly hotels, dog friendly Los Angeles
        offers a plethora of dog-friendly parks, trails, and attractions for you
        and your pet to discover together. Venture to the gorgeous Runyon Canyon
        Park or explore the lively Griffith Park for some outdoor enjoyment.
        Your pet will be thrilled to accompany you on those Los Angeles
        escapades.
      </Typography>

      <Typography variant='base'>
        After a day of adventure, indulge in the city&apos;s pet-friendly dining
        scene, featuring a diverse array of restaurants and cafes with outdoor
        seating areas, ideal for sharing a meal with your beloved companion.
      </Typography>

      <Typography variant='base'>
        Los Angeles is the perfect destination for pet owners, offering a rich
        culture, diverse attractions, and a welcoming atmosphere for both humans
        and pets. Gather your pet&apos;s favorite toys, pack your bags and
        embark on an extraordinary journey through the mesmerizing beauty of Los
        Angeles.
      </Typography>
    </Box>
  );
};
export default LosAngeles;
