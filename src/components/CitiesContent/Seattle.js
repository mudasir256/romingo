import { Box, Typography } from '@mui/material';
import ListingCard from '../ListingCard/ListingCard';
import ListingCardSkeleton from '../UI/ListingCardSkeleton/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Seattle = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Seattle mesmerizes with its awe-inspiring natural and built wonders.
        From the soaring Space Needle to the majestic mountain ranges and
        glistening waterways, the city&apos;s landscape is a sight to behold.
      </Typography>

      <Typography variant='h2'>Dog Friendly Seattle</Typography>

      <Typography variant='base'>
        Seattle extends a warm welcome to you and your furry companions,
        presenting a selection of pet-friendly hotels that prioritize comfort
        and convenience for the whole family.
      </Typography>

      <Typography variant='base'>
        These accommodations are dedicated to the well-being of your pets,
        ensuring an unforgettable stay in the Emerald City.
      </Typography>

      <Typography variant='base'>
        Today we embark on a journey to discover the top of Seattle&apos;s
        pet-friendly hotels, each offering a distinct experience and exceptional
        service.
      </Typography>

      <Typography variant='h5'>ACE Hotel Seattle</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Seattle, WA' }}
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
        Unveil the trendy and eclectic ambiance of ACE Hotel Seattle, a
        pet-friendly boutique hotel nestled in the heart of the city. They do
        not charge additional fees for pets.
      </Typography>

      <Typography variant='base'>
        This vibrant hotel boasts stylish accommodations, a lively bar, and a
        prime location within Seattle&apos;s bustling arts and entertainment
        district. Immerse yourself in the artistic spirit of the city and relish
        a pet-friendly sojourn at ACE Hotel Seattle.
      </Typography>

      <Typography variant='h5'>Alexis Royal Sonesta Seattle</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Seattle, WA' }}
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
        Indulge in the lap of luxury at Alexis Royal Sonesta Seattle, a
        pet-friendly hotel exuding elegance and sophistication. With a fee of
        $80 per stay, you can bring along two pets.
      </Typography>

      <Typography variant='base'>
        This boutique hotel showcases exquisitely appointed rooms, an art
        gallery, and a renowned restaurant serving delectable Pacific Northwest
        cuisine.
      </Typography>

      <Typography variant='base'>
        You’ll find an upscale atmosphere infused with warm hospitality at
        Alexis Royal Sonesta Seattle, where both you and your furry companions
        will be pampered and embraced.
      </Typography>

      <Typography variant='h5'>Level South Lake Union</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Seattle, WA' }}
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
        Experience the epitome of comfort at Level South Lake Union, a
        pet-friendly hotel offering spacious apartment-style accommodations. For
        a fee of $25 per accommodation per night, pets weighing are welcomed
        into your home away from home.
      </Typography>

      <Typography variant='base'>
        This modern hotel presents fully equipped kitchens, in-suite laundry
        facilities, and breathtaking views of the city skyline or picturesque
        Lake Union. Delight in the convenience and flexibility of a pet-friendly
        apartment nestled in the vibrant heart of Seattle&apos;s South Lake
        Union neighborhood.
      </Typography>

      <Typography variant='h5'>Hyatt at Olive 8</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Seattle, WA' }}
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
        Unwind in refined style at Hyatt at Olive 8, a pet-friendly hotel
        seamlessly blending modern luxury with a commitment to sustainability.
        With a fee of $50 per stay, you can bring along two pets weighing up to
        75 lbs each. Participate in their pet program and Your dog will also
        receive a welcome letter, an amenity that includes a bed, food, water
        bowls and a welcome biscuit.
      </Typography>

      <Typography variant='base'>
        This eco-conscious hotel showcases sleek and contemporary
        accommodations, a rejuvenating spa, and a farm-to-table restaurant.
        Explore Seattle&apos;s iconic attractions, from the world-famous Pike
        Place Market to the iconic Space Needle, and return to the comforts of
        Hyatt at Olive 8, where both you and your furry companions will be
        embraced with care.
      </Typography>

      <Typography variant='h5'>Hotel Andra</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Seattle, WA' }}
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
        Embark on a journey of Scandinavian-inspired elegance at Hotel Andra, a
        pet-friendly hotel showcasing timeless design and a welcoming
        atmosphere. There’s no additional fee for two pets weighing up to 50
        lbs.
      </Typography>

      <Typography variant='base'>
        This dog friendly boutique hotel offers stylish rooms, a cozy fireplace
        lounge, and a popular restaurant serving Nordic-inspired cuisine.
        Immerse yourself in the cultural richness of Seattle&apos;s Belltown
        neighborhood and delight in a pet-friendly escape at Hotel Andra.
      </Typography>

      <Typography variant='h5'>Kimpton Palladian Hotel</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'Seattle, WA' }}
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
        Uncover the allure of Kimpton Palladian Hotel, a pet-friendly boutique
        hotel seamlessly blending historic elegance with contemporary design.
        There’s no additional fee for pets.
      </Typography>

      <Typography variant='base'>
        This stylish hotel features thoughtfully designed rooms, a
        speakeasy-style bar, and a central location in the vibrant Belltown
        neighborhood. Relish the warm and inviting ambiance of Kimpton Palladian
        Hotel, where both you and your furry companions will be treated as
        esteemed guests.
      </Typography>

      <Typography variant='h5'>Kimpton Hotel Monaco</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[6]}
          city={{ name: 'Seattle, WA' }}
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
        Delight in an enchanting fusion of luxury and whimsy at Kimpton Hotel
        Monaco, a pet-friendly hotel capturing the vibrant spirit of Seattle.
        They welcome all kinds of pets for no additional fee.
      </Typography>

      <Typography variant='base'>
        This boutique hotel showcases vibrant and eclectic accommodations, a
        hosted wine reception, and a central location near the iconic Pike Place
        Market. Immerse yourself in the city&apos;s dynamic charm and enjoy a
        pet-friendly stay at Kimpton Hotel Monaco.
      </Typography>

      <Typography variant='h5'>Kimpton Hotel Vintage Seattle</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[7]}
          city={{ name: 'Seattle, WA' }}
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
        Savor the sophistication of Kimpton Hotel Vintage Seattle, a
        pet-friendly hotel celebrating the splendor of Washington&apos;s wine
        country. They are one of Seattle&apos;s premier pet-friendly hotels that
        do not require any additional fees!
      </Typography>

      <Typography variant='base'>
        This boutique hotel offers wine-inspired accommodations, a nightly wine
        hour, and a prime location in the heart of downtown Seattle. Embark on a
        captivating wine-themed journey and indulge in a pet-friendly retreat at
        Kimpton Hotel Vintage Seattle.
      </Typography>

      <Typography variant='h5'>Hotel 1000 LXR Seattle</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[8]}
          city={{ name: 'Seattle, WA' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[8].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[8].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[8].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={8} />
      )}

      <Typography variant='base'>
        Experience the pinnacle of contemporary luxury at Hotel 1000 LXR
        Seattle, a pet-friendly hotel offering modern sophistication and
        impeccable service. They have a one-time pet registration fee of $100
        per stay.
      </Typography>

      <Typography variant='base'>
        This dog friendly Seattle upscale hotel showcases sleek accommodations,
        a rejuvenating spa, and a renowned restaurant boasting panoramic views
        of the city. Unwind in the lap of luxury and relish a pet-friendly
        escape at Hotel 1000 LXR Seattle.
      </Typography>

      <Typography variant='h5'>Pan Pacific Seattle</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[9]}
          city={{ name: 'Seattle, WA' }}
          duration={2}
          highlighted={false}
          limitImages={true}
          lowestAveragePrice={parseInt(hotels[9].listingsPagePromoText)}
          petFeePolicy={{
            ...hotels[9].petFeePolicy,
            totalFees: utils.computePetFeePolicyTotalFees(
              2,
              1,
              hotels[9].petFeePolicy
            ),
          }}
        />
      ) : (
        <ListingCardSkeleton key={9} />
      )}

      <Typography variant='base'>
        Unveil a sanctuary of tranquility at Pan Pacific Seattle, a pet-friendly
        hotel providing a serene retreat amidst the vibrant cityscape. They have
        a one-time pet cleaning fee will be charged per stay; the fee is $75 per
        pet for rooms or $100 per pet for suites.
      </Typography>

      <Typography variant='base'>
        This contemporary hotel features spacious rooms, a rooftop terrace
        offering captivating views, and a prime location near the picturesque
        South Lake Union.
      </Typography>

      <Typography variant='base'>
        Seattle&apos;s pet-friendly hotels cater to the needs of both you and
        your beloved pets, ensuring a comfortable and enjoyable stay in the
        Emerald City.
      </Typography>

      <Typography variant='base'>
        Embrace the warm hospitality, explore the vibrant neighborhoods, and
        create cherished memories with your furry companions by your side.
      </Typography>
    </Box>
  );
};

export default Seattle;