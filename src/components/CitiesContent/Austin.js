import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Elegant and stylish accommodations',
  'Array of amenities for guests',
  'Pet-friendly policies',
  'Proximity to major attractions',
];

const highlights2 = [
  'Opulent accommodations',
  'Pet-friendly policies',
  'Prime location',
];

const highlights3 = [
  'Stylish and contemporary accommodations',
  'Pet-friendly policies',
  'Proximity to popular attractions',
];

const highlights4 = [
  'Prime downtown Austin location',
  'Pet-friendly environment',
];

const highlights5 = [
  'Prime downtown Austin location',
  'Pet-friendly atmosphere',
];

const Austin = ({ hotels }) => {

  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Today let’s take a tour of Austin&apos;s finest pet-friendly hotels,
        featuring a diverse selection of establishments, all the way from
        luxurious hotel chains to charming boutique properties.
      </Typography>
      <Typography variant='h2'>Dedicated to Pets</Typography>
      <Typography variant='base'>
        With the city&apos;s dedicated commitment to providing a pet-friendly
        environment, it&apos;s no surprise that Austin boasts an impressive
        array of hotels that cater specifically to the needs of pet owners and
        their beloved companions.
      </Typography>
      <Typography variant='base'>
        Expect to find special amenities designed with your pet&apos;s comfort
        in mind, such as cozy pet beds, tasty treats, and designated play areas.
      </Typography>
      <Typography variant='base'>
        These establishments are situated in prime locations that provide easy
        access to nearby dog-friendly parks, hiking trails and other outdoor
        spaces where your pet can frolic and explore.
      </Typography>
      <Typography variant='base'>
        Whether you&apos;re looking to indulge in Austin&apos;s world-renowned
        live music scene, delve into the city&apos;s rich history, or simply
        enjoy a leisurely stroll along the picturesque waterfront, Austin&apos;s
        pet-friendly hotels are the perfect base for your adventures.
      </Typography>

      <Typography variant='h5'>Hotel Ella</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Austin, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[0].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[0].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[1].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={0} />
      )}

      <Typography variant='base'>
        Nestled near the University of Texas, Hotel Ella is an upscale boutique
        hotel situated in a beautifully restored historic mansion. This
        pet-friendly hotel in Austin, Texas, boasts 47 exquisitely designed
        rooms and suites, offering guests a touch of elegance and sophistication
        during their stay.
      </Typography>
      <Typography variant='base'>
        At Hotel Ella, pet lovers will find a welcoming environment for their
        furry companions. The hotel accommodates 2 dogs of any size for no
        additional fee. Dogs are allowed in the rooms, but they must be leashed
        in public areas. Additionally, there’s a nearby dog friendly park where
        dogs can play and socialize.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Some noteworthy features of The Highland Dallas Collection include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>South Congress Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Austin, TX' }}
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
        South Congress Hotel is a chic boutique hotel offering fashionable
        accommodations and a pet-friendly atmosphere. With its prime location
        near dog-friendly parks, shops, and eateries, the South Congress Hotel
        is the perfect choice for pet owners who appreciate exploring their
        surroundings.
      </Typography>

      <Typography variant='base'>
        Situated in the heart of Austin&apos;s iconic South Congress area, the
        hotel is surrounded by an array of eclectic shops, restaurants, and
        bars. Its proximity to public transportation makes navigating the city a
        breeze.
      </Typography>

      <Typography variant='base'>
        Welcoming up to 2 dogs of any size for no additional fee but must be
        attended to at all times. Dogs are allowed in the rooms but must be
        leashed in public areas. There’s a nearby pet park where dogs can frolic
        and socialize.
      </Typography>

      <Typography variant='h5'>Four Seasons Austin</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Austin, TX' }}
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
        Discover exceptional service and lavish amenities at the Four Seasons
        Hotel Austin. Situated along the shores of Lady Bird Lake in downtown
        Austin, this pet-friendly hotel provides dedicated services tailored to
        your furry companion, such as pet beds, bowls and treats.
      </Typography>

      <Typography variant='base'>
        Venture out to explore the picturesque surroundings, including the
        nearby Ann and Roy Butler Hike-and-Bike Trail, with your pet by your
        side.
      </Typography>

      <Typography variant='base'>
        Welcoming dogs and cats up to 60 pounds for no additional fee. Dogs are
        allowed in the rooms but must be leashed in public areas. There’s a
        nearby dog friendly park for canine guests to play and socialize.
      </Typography>
      <Typography variant='base'>
        Conveniently situated near numerous popular attractions, guests can
        easily visit the Texas State Capitol, Zilker Park, and the vibrant 6th
        Street Entertainment District.{' '}
      </Typography>

      {/* List */}
      <HighlightBox title='Key highlights include:' highlights={highlights2} />

      <Typography variant='h5'>The Otis Hotel Autograph Collection</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Austin, TX' }}
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
        Experience sophistication at this boutique hotel, part of the Autograph
        Collection. The Otis Hotel welcomes pets with open arms, offering
        pet-friendly rooms and amenities to ensure your four-legged friend feels
        at home while you explore Austin&apos;s dynamic cultural scene.
      </Typography>

      <Typography variant='base'>
        Welcoming two dogs up to 30 lbs for an additional fee of $100 per stay,
        The Otis Hotel Autograph Collection ensures your pet enjoys a
        comfortable stay. Conveniently located near popular attractions, this
        pet-friendly hotel allows you to experience the best of Austin with your
        furry companion by your side.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of The Otis Hotel Autograph Collection include:'
        highlights={highlights3}
      />

      <Typography variant='h5'>Hyatt House Austin Downtown</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Austin, TX' }}
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
        Nestled in the heart of downtown, Hyatt House Austin Downtown offers
        spacious, pet-friendly suites with separate living and sleeping areas.
        Take advantage of the hotel&apos;s convenient location to explore nearby
        parks and pet-friendly attractions with your furry companion.
      </Typography>

      <Typography variant='base'>
        The Hyatt House Austin Downtown, a 4-star extended-stay hotel, is
        ideally located within walking distance of popular attractions like the
        Texas State Capitol, Sixth Street Entertainment District, and the Austin
        Convention Center.
      </Typography>

      <Typography variant='base'>
        Welcoming dogs with these rules: One dog up to 50 pounds, two dogs up to
        75 pounds. Up to 6 nights, $75/day. 7-30 nights is an additional $100
        cleaning fee. Contact them for stays over 30 nights.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of the Hyatt House Austin Downtown include:'
        highlights={highlights4}
      />

      <Typography variant='h5'>Element Austin Downtown</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'Austin, TX' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[5].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[5].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[4].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={5} />
      )}

      <Typography variant='base'>
        This eco-friendly hotel offers a revitalizing stay for you and your pet.
        Element Austin Downtown&apos;s pet-friendly rooms provide all the
        necessary amenities, including pet beds and food bowls, while its
        central location makes it easy to explore the city together.
      </Typography>

      <Typography variant='base'>
        Element Austin Downtown, a Marriott Autograph Collection hotel, is
        ideally located in the heart of Austin, within walking distance of
        popular attractions like the Texas State Capitol, Sixth Street
        Entertainment District, and the Austin Convention Center.
      </Typography>

      <Typography variant='base'>
        Element Austin Downtown is pet-friendly and allows up to 2 dogs up to 40
        pounds for no additional fee. Sorry that cats are not allowed. Dogs are
        allowed in the rooms, but they must be on a leash in public areas.
        There’s a nearby pet park where dogs can play.
      </Typography>

      {/* List */}
      <HighlightBox title='Key highlights include:' highlights={highlights5} />

      <Typography variant='base'>
        Whether you&apos;re visiting dog friendly Austin for business or leisure
        or to move there, these pet-friendly hotels offer a comfortable and
        enjoyable stay for both you and your four-legged companion.{' '}
      </Typography>
    </Box>
  );
};

export default Austin;