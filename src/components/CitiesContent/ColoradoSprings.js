import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Prime downtown location',
  'Indoor heated pool',
  'Multiple dining and bar options',
  'Pet-friendly atmosphere',
];

const highlights2 = [
  'Convenient location near Garden of the Gods',
  'Close to many popular attractions',
  'Pet-friendly',
];

const highlights3 = [
  'Convenient location near popular attractions',
  'Indoor pool',
  'Fitness center',
  'Pet-friendly atmosphere',
];

const ColoradoSprings = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        With numerous pet-friendly lodging options, dog friendly Colorado
        Springs provides a backdrop of adventures for you and your pet. Unwind
        in dog-friendly parks and trails or explore iconic locations such as the
        Garden of the Gods and Old Colorado City.
      </Typography>

      <Typography variant='h2'>Dog friendly Dining and More</Typography>

      <Typography variant='base'>
        The city also boasts a thriving pet-friendly dining scene with numerous
        eateries offering outdoor seating for you and your companion. After
        exploring, you can retreat to your pet-friendly hotel for much needed
        rest and relaxation.
      </Typography>

      <Typography variant='base'>
        This guide showcases hotels meticulously selected for their pet-friendly
        amenities, inviting atmosphere, and prime location. Whether you desire
        the indulgent comforts of a high-end resort or the warm appeal of a
        boutique hotel, you&apos;re bound to find the perfect accommodation to
        suit your requirements.
      </Typography>

      <Typography variant='base'>
        Some hotels even go the extra mile to pamper your pet, offering cozy pet
        beds, food and water bowls, and delightful treats, ensuring your furry
        friend feels right at home.
      </Typography>

      <Typography variant='h4'>
        Here are some of the top pet-friendly hotels in Colorado Springs:
      </Typography>

      <Typography variant='h5'>Element Colorado Springs Downtown</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Colorado Springs, CO' }}
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
        You can get an eco-friendly stay with pet amenities including beds and
        bowls. Dogs are welcomed with a $50 per night fee (not exceeding $150
        per stay). It&apos;s located close to attractions like Pikes Peak
        Center, Acacia Park, and the Colorado Springs Pioneers Museum.
      </Typography>

      <Typography variant='base'>
        The hotel is a short walk from numerous popular attractions such as
        Pikes Peak Center, Acacia Park, and the Colorado Springs Pioneers
        Museum.
      </Typography>

      <Typography variant='base'>
        As part of the Marriott Autograph Collection, Element Colorado Springs
        Downtown boasts various amenities, including an indoor pool, fitness
        center, and multiple dining options.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Notable features of Element Colorado Springs Downtown include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>
        Hyatt Place Colorado Springs Garden of the Gods
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Colorado Springs, CO' }}
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
        Situated near the awe-inspiring Garden of the Gods Park, Hyatt Place
        Colorado Springs Garden of the Gods presents contemporary accommodations
        and a pet-friendly policy. Spoil your pet with signature Hyatt Place pet
        beds and appreciate the convenience of nearby dog parks and pet-friendly
        attractions throughout Colorado Springs.
      </Typography>

      <Typography variant='base'>
        Hyatt Place Colorado Springs Garden of the Gods is a 3-star hotel
        located near various popular attractions, including Garden of the Gods,
        Rock Ledge Ranch Historic Site, and the University of Colorado at
        Colorado Springs. The hotel features a range of amenities such as an
        outdoor pool, fitness center, and multiple dining options.
      </Typography>

      <Typography variant='base'>
        The hotel permits one dog up to 50 pounds or two dogs totaling 75
        pounds. For stays of 1 to 6 nights, a nonrefundable $75 pet fee applies;
        for stays of 7 to 30 nights, a $75 non-refundable pet fee plus an
        additional $100 cleaning fee are required.{' '}
      </Typography>

      <Typography variant='base'>
        Dogs are allowed in the rooms but must be leashed in public areas. A
        friendly dog park is conveniently located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Hyatt Place Colorado Springs Garden of the Gods include:'
        highlights={highlights2}
      />

      <Typography variant='h5'>Wingate by Wyndham Colorado Springs</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Colorado Springs, CO' }}
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
        For a cozy and budget-friendly stay for you and your pet, Wingate by
        Wyndham Colorado Springs offers pet-friendly rooms and a convenient
        location near parks and pet-friendly attractions, making it an ideal
        choice for pet owners eager to explore the city.
      </Typography>

      <Typography variant='base'>
        Wingate by Wyndham Colorado Springs is a 3-star hotel situated close to
        various popular attractions, such as the Pro Rodeo Hall of Fame, Pulpit
        Rock Park, and the Colorado Springs Fine Arts Center. The hotel provides
        a variety of amenities, including an indoor pool, fitness center, and
        convenient location.
      </Typography>

      <Typography variant='base'>
        The hotel accommodates two dogs up to 25 lbs for an additional fee of
        $20 per pet, per night. Cats are not permitted. Dogs are allowed in the
        rooms but must be leashed in public areas. A friendly dog park is
        situated nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Wingate by Wyndham Colorado Springs include:'
        highlights={highlights3}
      />

      <Typography variant='base'>
        Beyond these pet-friendly hotels, Colorado Springs hosts an array of
        dog-friendly parks, trails, and attractions. Delight in a stroll through
        Old Colorado City or enjoy a thrilling hike through the Garden of the
        Gods. At the end of the day, enjoy a meal at one of the city&apos;s
        pet-friendly eateries before heading back to your hotel.
      </Typography>

      <Typography variant='base'>
        Colorado Springs, with its breathtaking scenery and diverse cultural
        attractions, is an ideal destination for pet owners. With various
        pet-friendly hotels and activities, you and your pet are sure to create
        lasting memories. So, pack your bags and set off on an unforgettable
        journey through the enchanting beauty of Colorado Springs.
      </Typography>
    </Box>
  );
};
export default ColoradoSprings;
