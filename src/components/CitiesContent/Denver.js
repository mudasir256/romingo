import { Box, Typography } from '@mui/material';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Denver = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Today we draw the curtain back on dog friendly Denver&apos;s finest
        pet-friendly accommodations, including some distinguished chains and a
        distinctive boutique gem.
      </Typography>

      <Typography variant='base'>
        Strap in for a wild high altitude ride of discovery as you and your
        furry confidante explore the captivating allure of the Mile High City.
      </Typography>

      <Typography variant='h2'>Dog Friendly Exploration in Denver</Typography>

      <Typography variant='base'>
        Denver is an explorer&apos;s dream, rich with a plethora of pet-friendly
        marvels that are ripe for discovery. From the surreal, red sandstone
        spectacle of the Red Rocks Park and Amphitheatre to the animated streets
        of LoDo, Denver promises an unforgettable journey for you and your pet.
      </Typography>

      <Typography variant='base'>
        We have handpicked a collection of hotels renowned for their
        creature-friendly hospitality, enticing ambiance, and enviable location.
      </Typography>

      <Typography variant='base'>
        So whether your tastes are more inclined towards the lavish decadence of
        an upscale establishment, or the snug comfort of a boutique abode, rest
        assured you will find an accommodation that perfectly fits your bill.
      </Typography>

      <Typography variant='base'>
        And the pet-friendly pampering doesn&apos;t stop at just allowing your
        pet in the premises, many of these hotels go the extra mile, providing
        snug pet beds, food and water bowls, and a selection of delectable
        treats to ensure your cuddly companion is as comfortable as you are.
      </Typography>

      <Typography variant='h5'>Hyatt Centric Downtown Denver</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Denver, CO' }}
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
        This upscale hotel is committed to delivering exceptional hospitality,
        ensuring a memorable stay for both you and your furry companion.
      </Typography>

      <Typography variant='base'>
        A pet fee of $75 is applied for guests staying 1-6 nights & $150 for
        stays of 7 nights or longer at the Hyatt Centric Downtown Denver warmly
        welcomes pets with open arms and a weight restriction of 80 pounds. The
        hotel&apos;s thoughtful canine-friendly amenities have been designed
        with your pet&apos;s comfort and happiness in mind. These provisions
        enable you to enjoy your Denver experience, knowing that your
        four-legged friend is also well taken care of.
      </Typography>

      <Typography variant='base'>
        Inside the stylishly designed interiors, you&apos;ll discover tastefully
        appointed guest rooms, each created to evoke a sense of relaxation and
        tranquility. Alongside plush furnishings and contemporary décor, the
        hotel ensures both you and your pet are provided with a comfortable and
        rejuvenating home away from home.
      </Typography>

      <Typography variant='base'>
        The hotel&apos;s prime location is ideal for exploring Denver&apos;s
        vibrant streets, buzzing restaurants, and popular attractions. As you
        and your pet venture through the city, you&apos;ll find a friendly dog
        park nearby, offering your canine companion the opportunity to run,
        play, and socialize with other furry friends in a safe, inviting
        environment.
      </Typography>

      <Typography variant='h5'>Thompson Denver</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Denver, CO' }}
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
        Thompson Denver is a contemporary gem, exuding style and sophistication
        within the pulsating LoDo district of Denver. This luxury hotel believes
        that your cherished pet should be able to partake in the enjoyment of
        your travels, which is why they warmly welcome your furry companion with
        no additional charge.
      </Typography>

      <Typography variant='base'>
        The hotel&apos;s pet-friendly approach ensures that you and your pet can
        fully immerse yourselves in the dynamic city experience while still
        having a sumptuous abode to retreat to at the end of the day.
      </Typography>

      <Typography variant='base'>
        At Thompson Denver, you can rest assured that your four-legged friend
        will be treated with the same warmth and hospitality as you. The
        hotel&apos;s commitment to delivering a remarkable experience for both
        you and your pet will ensure that your Denver escapade is a memorable
        one.
      </Typography>

      <Typography variant='h5'>
        Historic Hilton Garden Inn Denver Union Station
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Denver, CO' }}
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
        Nestled in the heart of the city, the historic Hilton Garden Inn Denver
        Union Station offers a unique blend of vintage allure and modern
        amenities, making it an ideal choice for travelers seeking both charm
        and comfort.
      </Typography>

      <Typography variant='base'>
        With its pet-friendly policy, the hotel welcomes two pets up to 50 lbs
        for an additional fee of $50 per pet, per stay, ensuring that your
        beloved four-legged companion can join you in discovering the enchanting
        city of Denver.
      </Typography>

      <Typography variant='base'>
        The Hilton Garden Inn Denver Union Station ensures that both you and
        your pet are well-catered for during your stay, with cozy accommodations
        and a welcoming atmosphere. After a day spent exploring the city
        together, you and your pet can unwind in the comfort of your room, or
        take a leisurely stroll to the nearby friendly dog park.
      </Typography>

      <Typography variant='base'>
        In this charming hotel, you&apos;ll be surrounded by history and
        contemporary elegance while enjoying an unforgettable Denver adventure
        with your furry friend by your side.
      </Typography>

      <Typography variant='h5'>Magnolia Hotel Denver</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Denver, CO' }}
          duration={3}
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
        Experience the enchanting blend of contemporary design and classic
        elegance at the Magnolia Hotel Denver. This boutique hotel welcomes two
        pets of any size at no additional fee, offering pet-friendly
        accommodations that create a warm, welcoming atmosphere for both you and
        your pet.
      </Typography>

      <Typography variant='h5'>Kimpton Hotel Born</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Denver, CO' }}
          duration={4}
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
        Finally, the Kimpton Hotel Born beckons with its stylish urban
        sophistication. Located in the heart of Denver&apos;s Union Station
        neighborhood, this boutique hotel warmly embraces all your furry,
        feathery, or scaly family members - regardless of their size, weight, or
        breed, and all at no extra charge.
      </Typography>

      <Typography variant='base'>
        So come pack your bags, gather your pet&apos;s favorite toys and embark
        on an unforgettable adventure in the stunning expanse of Denver. With a
        varied collection of pet-friendly hotels and a host of activities to
        choose from, you and your faithful companion are in for a treat.
      </Typography>

      <Typography variant='base'>
        Let the Mile High City charm you with its rich culture, diverse
        attractions, and welcoming atmosphere as you create precious, cherished
        memories that will indeed last a lifetime.
      </Typography>
    </Box>
  );
};
export default Denver;
