import { Box, Typography } from '@mui/material';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Sacramento = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        With close proximity to both mountains and the coast, Sacramento
        provides easy access to outdoor adventures – making it a perfect
        destination for nature enthusiasts. Additionally, the city is known for
        its vibrant farm-to-fork culinary scene, showcasing fresh and locally
        sourced ingredients in its diverse array of restaurants.
      </Typography>

      <Typography variant='h2'>Sacramento: The Dog Friendly City</Typography>

      <Typography variant='base'>
        This hospitable city wholeheartedly embraces its four-legged residents,
        presenting a delightful selection of pet-friendly hotels that prioritize
        the comfort and happiness of your beloved pets.
      </Typography>

      <Typography variant='base'>
        Follow us for a captivating journey as we unveil the pet-friendly havens
        that prioritize the well-being and comfort of your furry companions.
      </Typography>

      <Typography variant='base'>
        Prepare to be captivated by the diverse array of accommodations that go
        above and beyond to create a home-away-from-home for your beloved pets.
      </Typography>

      <Typography variant='h5'>Westin Sacramento</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Sacramento, CA' }}
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
        This place is the epitome of luxury and pet-friendly comfort seen at
        Westin Sacramento. For a fee of $50 per night, two pets weighing up to
        40 pounds each can join you in this haven of tranquility.
      </Typography>

      <Typography variant='base'>
        This elegant hotel beckons with a serene retreat, providing abundant
        space for both you and your pets to unwind and bask in relaxation.
      </Typography>

      <Typography variant='base'>
        Revel in the stylish and meticulously appointed accommodations boasting
        modern amenities and plush bedding, ensuring an exquisite stay for both
        you and your furry friends.
      </Typography>

      <Typography variant='base'>
        Nearby an inviting dog park awaits, offering an ideal setting for
        outdoor adventures and whimsical encounters, where your pets can frolic
        and mingle to their hearts&apos; content.
      </Typography>

      <Typography variant='h5'>
        Hyatt Place Sacramento-Rancho Cordova
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Sacramento, CA' }}
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
        Embark on a journey of modern comfort at Hyatt Place Sacramento-Rancho
        Cordova, a pet-friendly haven warmly embracing pets weighing up to 75
        pounds for a $75 non-refundable pet fee plus an additional $100 cleaning
        fee will be administered.
      </Typography>

      <Typography variant='base'>
        Step into the spacious and thoughtfully designed guest rooms, providing
        a soothing retreat for you and your furry companions. With cozy bedding
        and contemporary amenities, this hotel invites you to unwind in style.
      </Typography>

      <Typography variant='base'>
        Explore the vibrant pulse of the city, secure in the knowledge that your
        pets are well cared for.
      </Typography>

      <Typography variant='h5'>
        Hyatt House Sacramento/Midtown Autograph Collection
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Sacramento, CA' }}
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
        Indulge in the lap of luxury at Hyatt House Sacramento/Midtown Autograph
        Collection, where two esteemed pets weighing up to 50 pounds are
        graciously welcomed for a fee of $125 per stay.
      </Typography>

      <Typography variant='base'>
        Discover the expanse of the lavishly appointed suites, exuding an air of
        opulence and complemented by separate living areas and fully equipped
        kitchens. Luxuriate in the upscale amenities and personalized service
        that define this enchanting hotel, ensuring your unwinding experience is
        second to none. There’s also a nearby dog area.
      </Typography>

      <Typography variant='h5'>The Citizen Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Sacramento, CA' }}
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
        Experience an exquisite blend of historic charm and pet-friendly
        hospitality at The Citizen Hotel. For a fee of $50 per stay, bring along
        two pets of any size.
      </Typography>

      <Typography variant='base'>
        This elegant hotel has cozy and inviting spaces that welcome you and
        your furry companion to unwind and rejuvenate. The attentive staff is
        dedicated to ensuring your pets&apos; comfort and happiness throughout
        your stay.
      </Typography>

      <Typography variant='base'>
        Venture to the nearby friendly dog park, where a world of outdoor
        adventures and joyful encounters awaits, offering a playground for your
        pets to stretch their legs and frolic alongside other four-legged
        friends.
      </Typography>

      <Typography variant='h5'>Larkspur Landing Sacramento</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Sacramento, CA' }}
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
        Larkspur Landing Sacramento welcomes your furry companions. For a fee of
        $75 per stay, two pets weighing up to 60 pounds can stay.
      </Typography>

      <Typography variant='base'>
        Enter the spacious suites, thoughtfully designed with separate sleeping
        and living areas, offering a true home-away-from-home for you and your
        pets. Fully equipped kitchens invite culinary adventures, allowing you
        to prepare meals for both yourself and your furry friends.
      </Typography>

      <Typography variant='base'>
        When it&apos;s time for outdoors, a dog park lies nearby, inviting your
        pets to explore, roam, and play amidst a safe and picturesque
        environment.
      </Typography>

      <Typography variant='h5'>Kimpton Sawyer Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Sacramento, CA' }}
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
        Immerse yourself in the trendy allure of Kimpton Sawyer Hotel, a
        pet-friendly sanctuary extending an invitation to any cherished pets of
        any size at no additional fee. Not only that, they have water bowls
        delivered to the room and can give you courtesy bags when you head out
        for a walk. Talk about awesome!
      </Typography>

      <Typography variant='base'>
        Step into the stylish and contemporary guest rooms, adorned with modern
        amenities and adorned with comfortable furnishings, creating a chic and
        comfortable retreat for both you and your furry companion. The attentive
        staff is devoted to ensuring the well-being of your pets, providing
        pet-friendly amenities and services upon request.
      </Typography>

      <Typography variant='h5'>Hyatt Regency Sacramento</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'Sacramento, CA' }}
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
        At Hyatt Regency Sacramento, a world of luxurious indulgence and
        pet-friendly comfort awaits. For a fee of $100 per stay, two pets
        weighing up to 75 lbs can accompany you on this remarkable journey.
      </Typography>

      <Typography variant='base'>
        Step into the well-appointed guest rooms, offering a haven of relaxation
        and comfort.
      </Typography>

      <Typography variant='base'>
        Relax in the cozy comfort of the plush surroundings, and take comfort in
        the fact that there&apos;s a friendly dog park nearby, ready to cater to
        your pets&apos; energetic nature.
      </Typography>

      <Typography variant='base'>
        Sacramento&apos;s pet-friendly hotels present an oasis where you and
        your cherished pets can revel in a memorable and stress-free stay.
      </Typography>

      <Typography variant='base'>
        From the luxurious comfort of Westin Sacramento to the trendy ambiance
        of Kimpton Sawyer Hotel, a diverse range of options cater to every
        preference.
      </Typography>

      <Typography variant='base'>
        Immerse yourself in the warmth of hospitality and the joy of
        pet-friendly amenities as you explore the vibrant cityscape of
        Sacramento.
      </Typography>
    </Box>
  );
};

export default Sacramento;
