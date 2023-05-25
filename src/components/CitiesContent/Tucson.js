import { Box, Typography } from '@mui/material';
import ListingCard from '../ListingCard/ListingCard';
import ListingCardSkeleton from '../UI/ListingCardSkeleton/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Tucson = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        But Tucson doesn&apos;t stop there. It shines brightly in the field of
        astronomy, with prestigious programs at the University of Arizona and
        the Kitt Peak National Observatory at the top of the mountain.
        Stargazers and space enthusiasts flock here to marvel at the clear
        desert skies and witness groundbreaking discoveries.
      </Typography>

      <Typography variant='base'>
        When it comes to food, Tucson tantalizes taste buds with its diverse
        culinary scene. A fusion of Mexican, Native American, and Western
        flavors creates a gastronomic adventure. From savoring traditional
        Sonoran hot dogs to indulging in Southwestern cuisine and farm-to-table
        delights.
      </Typography>

      <Typography variant='base'>
        And let&apos;s not forget the outdoor paradise that Tucson offers. With
        over 300 days of sunshine each year, outdoor enthusiasts can immerse
        themselves in a world of adventure.
      </Typography>

      <Typography variant='h2'>Dog Friendly Tucson</Typography>

      <Typography variant='base'>
        In Tucson there are several pet-friendly hotels that prioritize comfort
        and convenience for the whole family. These accommodations ensure your
        pets are cared for, guaranteeing a memorable stay in this breathtaking
        desert city.
      </Typography>

      <Typography variant='base'>
        Let’s look at Tucson&apos;s top pet-friendly hotels – each delivering a
        unique experience and exceptional service.
      </Typography>

      <Typography variant='h5'>Tuxon Sonesta ES Suites Tucson</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Tucson, ZA' }}
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
        Discover a captivating blend of modernity and eclecticism at The Tuxon
        Sonesta ES Suites Tucson. This pet-friendly hotel invites one furry
        companion weighing up to 80 lbs for a nominal fee of $50 per stay,
        ensuring a truly inclusive stay for the whole family. There’s also a
        park nearby for walks.
      </Typography>

      <Typography variant='base'>
        As you step into the hotel&apos;s vibrant ambiance, you&apos;ll be
        greeted by spacious suites that provide a comfortable and stylish
        retreat.
      </Typography>

      <Typography variant='base'>
        The Tuxon Sonesta ES Suites Tucson offers more than just exceptional
        accommodations. Take a refreshing dip in the outdoor pool, where you can
        bask in the warm Arizona sun and unwind in a serene oasis.
      </Typography>

      <Typography variant='base'>
        The hotel&apos;s central location puts you within easy reach of popular
        attractions, allowing you to explore the best of Tucson&apos;s vibrant
        scene. Whether you&apos;re seeking cultural landmarks, shopping
        destinations or culinary delights, you&apos;ll find them all just
        moments away.
      </Typography>

      <Typography variant='h5'>Aloft Tucson University</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Tucson, ZA' }}
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
        Escape to a contemporary haven at Aloft Tucson University, where modern
        style and comfort seamlessly merge to create a truly unforgettable
        retreat.
      </Typography>

      <Typography variant='base'>
        This pet-friendly hotel extends a warm welcome to furry friends where
        pets stay free, ensuring that no member of the family is left behind.
        There’s also a park nearby to get a stretching walk.
      </Typography>

      <Typography variant='base'>
        Prepare to be captivated by the hotel&apos;s stylish accommodations,
        where sleek design meets ultimate comfort. Each room is thoughtfully
        designed to provide a sanctuary of relaxation, featuring modern
        furnishings, plush bedding, and all the amenities you need for a
        delightful stay.
      </Typography>

      <Typography variant='base'>
        Aloft Tucson University goes beyond exceptional accommodations with its
        vibrant lobby bar, where you can socialize and unwind in a lively
        atmosphere. Sip on creative cocktails, indulge in delectable bites, and
        soak up the energetic vibes that make this hotel truly unique.
      </Typography>

      <Typography variant='base'>
        Conveniently situated near the University of Arizona campus, Aloft
        Tucson University offers easy access to the city&apos;s cultural
        attractions, eclectic dining scene and vibrant nightlife.
      </Typography>

      <Typography variant='h5'>Westward Look Wyndham Grand Resort</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Tucson, ZA' }}
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
        Escape to the Westward Look Wyndham Grand Resort, a pet-friendly desert
        oasis boasting awe-inspiring views and luxurious amenities. For a fee of
        $75 per stay, select rooms accommodate two pets of any size.
      </Typography>

      <Typography variant='base'>
        This resort showcases spacious rooms, multiple pools, and an array of
        outdoor activities against the backdrop of the Santa Catalina Mountains.
        Unwind in the tranquil desert ambiance of Westward Look Wyndham Grand
        Resort.
      </Typography>

      <Typography variant='h5'>Motel 6-Tucson, AZ-Downtown</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Tucson, ZA' }}
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
        Motel 6-Tucson, AZ-Downtown offers comfortable simplicity in the heart
        of the city. Welcoming pets up to 35 lbs where “pets stay free,” this
        budget-friendly hotel provides clean rooms, a refreshing outdoor pool,
        and a central location near downtown attractions. Enjoy a convenient and
        pet-friendly stay at Motel 6-Tucson, AZ-Downtown.
      </Typography>

      <Typography variant='h5'>Hotel McCoy</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Tucson, ZA' }}
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
      )} */}

      <Typography variant='base'>
        At Hotel McCoy, Tucson&apos;s artistic spirit comes alive in a
        pet-friendly boutique hotel honoring local art and culture. Select rooms
        accommodate one pet up to 75 lbs for a deposit of $50 per stay that is
        refundable.
      </Typography>

      <Typography variant='base'>
        This unique hotel features vibrant and eclectic accommodations, a
        courtyard with a fire pit, and rotating art exhibits. Immerse yourself
        in the creative ambiance of Hotel McCoy.
      </Typography>

      <Typography variant='base'>
        Dog friendly Tucson hotels cater to you and your beloved pets, ensuring
        a comfortable and enjoyable stay in this desert city. Whether you seek
        trendy boutique accommodations, upscale elegance, or budget-friendly
        options – Tucson has the perfect fit.
      </Typography>

      <Typography variant='base'>
        You’ll find warm hospitality, explore vibrant neighborhoods and create
        cherished memories with your furry companions by your side.
      </Typography>
    </Box>
  );
};

export default Tucson;