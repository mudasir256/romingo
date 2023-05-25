import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Prime location near attractions',
  'Spacious suites',
  'Delectable breakfast',
  'Pet-friendly atmosphere',
];

const highlights2 = [
  'Convenient location near popular attractions',
  'On-site dining options',
  'Fitness center',
  'Pet-friendly atmosphere',
];

const highlights3 = [
  'Prime location near Orange County Airport',
  'On-site dining options',
  'Fitness center',
  'Pet-friendly atmosphere',
];

const highlights4 = [
  'Convenient location near Orange County Airport',
  'Fully-equipped kitchens',
  'Fitness center',
  'Pet-friendly atmosphere',
];

const highlights5 = [
  'Prime location near Huntington Beach',
  'Spacious suites',
  'Complimentary breakfast',
  'Pet-friendly atmosphere',
];

const highlights6 = [
  'Convenient location near Huntington Beach',
'On-site dining options',
'Fitness center',
'Pet-friendly atmosphere',

];

const OrangeCounty = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        This coastal haven boasts a remarkable array of pet-friendly
        accommodations tailored to diverse preferences and budgets.
      </Typography>

      <Typography variant='base'>
        Let’s look at some outstanding pet-friendly lodgings in Orange County,
        each dedicated to delivering a one-of-a-kind experience while ensuring
        the comfort and happiness of both you and your furry friend.
      </Typography>

      <Typography variant='h5'>
        Homewood Suites Anaheim Convention Center-Disneyland
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Orange County, CA' }}
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
        Step into the inviting atmosphere of Homewood Suites Anaheim Convention
        Center-Disneyland, a haven for you and your pet. When you book with
        Romingo, guests enjoy no pet fees (the hotel typically charges $75 for
        up to 4 nights and $125 for 4+ nights). This pet-friendly hotel&apos;s
        prime location offers convenient access to nearby attractions.
      </Typography>

      <Typography variant='base'>
        Each spacious suite presents a home-like atmosphere, complete with a
        fully-equipped kitchen. Savor the complimentary breakfast served daily.
        A friendly dog park is situated nearby, providing your furry companion
        with a place to roam and mingle.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Homewood Suites include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>Clarion Hotel Anaheim Resort</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Orange County, CA' }}
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
        Bask in the warm hospitality of Clarion Hotel Anaheim Resort, where two
        pets up to 75 lbs per pet are welcomed with open arms. Booking with
        Romingo allows guests to enjoy no pet fees (the hotel usually charges
        $40 per pet, per night).
      </Typography>

      <Typography variant='base'>
        The hotel&apos;s strategic location ensures easy access to popular
        attractions for an unforgettable Orange County experience. Relish
        on-site dining options, a fitness center, and cozy rooms designed with
        relaxation in mind. Your pet will love the nearby charming dog park,
        ideal for outdoor frolicking and socializing.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Clarion Hotel Anaheim Resort include:'
        highlights={highlights2}
      />

      <Typography variant='h5'>
        DoubleTree by Hilton Santa Ana - Orange County Airport
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Orange County, CA' }}
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
        Appreciate the contemporary sophistication of DoubleTree by Hilton Santa
        Ana - Orange County Airport. This pet-friendly hotel accommodates one
        dog up to 25 lbs for an additional fee of $75 per stay.
      </Typography>

      <Typography variant='base'>
        Located near the John Wayne Airport, the hotel serves as an excellent
        base for exploring the Orange County area. Indulge in on-site dining
        options and benefit from the well-equipped fitness center.
      </Typography>

      <Typography variant='base'>
        The nearby friendly dog park is the perfect spot for your pet to stretch
        their legs and socialize.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of DoubleTree by Hilton Santa Ana include:'
        highlights={highlights3}
      />

      <Typography variant='h5'>
        Sonesta Simply Suites Orange County Airport
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Orange County, CA' }}
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
        Discover the cozy charm of Sonesta Simply Suites Orange County Airport,
        a pet-friendly hotel that accommodates two pets up to 80 lbs per pet.
        With Romingo, guests enjoy no pet fees (the hotel typically charges $75
        for up to 7 nights and $150 for 7+ nights).
      </Typography>

      <Typography variant='base'>
        The hotel offers convenience for travelers and residents alike. Each
        suite boasts a fully-equipped kitchen, perfect for extended stays. The
        nearby delightful dog park invites your pet to explore and socialize.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Sonesta Simply Suites include:'
        highlights={highlights4}
      />

      <Typography variant='h5'>
        Sonesta ES Suites Huntington Beach Fountain Valley
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Orange County, CA' }}
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
        Treat yourself to the spacious luxury of Sonesta ES Suites Huntington
        Beach Fountain Valley, a pet-friendly hotel that warmly welcomes
        well-mannered pets without breed or weight restrictions. Up to two pets
        are permitted per suite, with a $75 fee for stays up to 7 nights and
        $150 for longer stays.
      </Typography>

      <Typography variant='base'>
        The prime location near Huntington Beach offers countless opportunities
        for leisure and adventure. Roomy suites provide a comfortable retreat,
        while complimentary breakfast fuels you for the day ahead.
      </Typography>

      <Typography variant='base'>
        A shaded dog park is conveniently located nearby, ensuring your
        pet&apos;s happiness during your stay.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Sonesta ES Suites include:'
        highlights={highlights5}
      />

      <Typography variant='h5'>
        Sonesta Select Huntington Beach Fountain Valley
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[5]}
          city={{ name: 'Orange County, CA' }}
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
        Unwind in the chic ambiance of Sonesta Select Huntington Beach Fountain
        Valley, a pet-friendly hotel that welcomes well-mannered pets without
        breed or weight restrictions. Up to two pets are allowed per suite, with
        a $75 fee per stay.
      </Typography>

      <Typography variant='base'>
        This hotel&apos;s convenient location near Huntington Beach guarantees
        easy access to the area&apos;s attractions.
      </Typography>

      <Typography variant='base'>
        Satisfy your cravings at the on-site dining options and keep up with
        your fitness routine at the well-equipped fitness center. A hospitable
        dog park is conveniently located nearby, offering a space for your pet
        to explore and play.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Sonesta Select include:'
        highlights={highlights6}
      />

      <Typography variant='base'>
        Orange County offers an eclectic mix of pet-friendly hotels for
        travelers and their four-legged companions.
      </Typography>

      <Typography variant='base'>
        From the exceptional Homewood Suites Anaheim Convention
        Center-Disneyland to the stylish Sonesta Select Huntington Beach
        Fountain Valley, you and your pet are sure to find the perfect lodging
        option for an unforgettable Orange County escapade.
      </Typography>
    </Box>
  );
};

export default OrangeCounty;
