import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Proximity to Oceanside&apos;s primary attractions',
  'On-site dining experiences',
  'State-of-the-art fitness center',
  'Pet-friendly environment',
];

const highlights2 = [
  'Strategic beachside location',
  'On-site dining options',
  'Modern fitness center',
  'Dog-friendly atmosphere',
];

const highlights3 = [
  'Excellent location near Oceanside Harbor',
  'Complimentary breakfast offerings',
  'Fitness center',
  'Pet-friendly environment',
  'Gratis Wi-Fi',
];

const highlights4 = [
  'Favorable location near popular destinations',
  'On-site dining alternatives',
  'Fitness center',
  'Pet-friendly ambiance',
];

const Oceanside = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        With an abundance of pet-friendly lodging options, you and your pet can
        immerse yourselves in the myriad of dog-friendly parks, trails, and
        attractions Oceanside has in store.
      </Typography>

      <Typography variant='base'>
        These hotels have been meticulously selected for their pet-focused
        amenities, inviting ambience, and prime location.
      </Typography>

      <Typography variant='base'>
        Whether you seek the refinement of an upscale establishment or the
        warmth of a boutique hotel, you will undeniably find the perfect
        accommodation to meet your desires.
      </Typography>

      <Typography variant='h5'>Mission Pacific</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Oceanside, CA' }}
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
      )} */}

      <Typography variant='base'>
        Bask in the coastal opulence of Mission Pacific, where exceptional
        amenities and breathtaking views seamlessly blend. This pet-friendly
        hotel requires a non-refundable pet fee of $200, ensuring a memorable
        and comfortable sojourn for both you and your cherished companion.
      </Typography>

      <Typography variant='base'>
        Nearby, you&apos;ll find a welcoming dog park, perfect for your
        four-legged friend to frolic and socialize with fellow canines. Within
        the hotel itself, experience unparalleled hospitality as attentive staff
        cater to your needs, while your furry friend enjoys the comforts of a
        pet-friendly environment.
      </Typography>

      <Typography variant='base'>
        Delight in the numerous on-site facilities, such as exquisite dining
        options and a state-of-the-art fitness center, as you create
        unforgettable memories in this luxurious coastal haven.
      </Typography>

      <Typography variant='base'>
        With its prime location and exceptional service, Mission Pacific stands
        as a premier choice for pet owners seeking an upscale dog friendly
        Oceanside experience.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Notable features of Mission Pacific include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>The Seabird</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Oceanside, CA' }}
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
      )} */}

      <Typography variant='base'>
        Indulge in the serene sophistication of The Seabird, a tranquil oasis
        where contemporary elegance meets coastal charm.
      </Typography>

      <Typography variant='base'>
        This pet-friendly hotel requires a non-refundable pet fee of $200,
        providing a warm and welcoming atmosphere for both you and your canine
        companion. Dogs must not exceed 50 lbs individually or 75 lbs combined,
        with a maximum of two dogs allowed per room, ensuring a comfortable stay
        for all guests. A charming dog park is conveniently situated nearby,
        offering the perfect location for your furry friend to explore and
        interact with fellow pups.
      </Typography>

      <Typography variant='base'>
        Within The Seabird, you&apos;ll discover an array of top-notch
        amenities, including exquisite on-site dining options, a well-equipped
        fitness center, and exceptional guest services.
      </Typography>

      <Typography variant='base'>
        By harmoniously blending first-class facilities with pet-friendly
        accommodations, The Seabird has become a sought-after destination for
        discerning travelers and their beloved pets.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Distinctive elements of The Seabird encompass:'
        highlights={highlights2}
      />

      <Typography variant='h5'>Harbor Inn & Suites Oceanside</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Oceanside, CA' }}
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
      )} */}

      <Typography variant='base'>
        Embrace the cozy affordability of Harbor Inn & Suites Oceanside, a
        charming and welcoming retreat for you and your furry companion.
      </Typography>

      <Typography variant='base'>
        This pet-friendly hotel accommodates two pets of any size for an
        additional charge of $75 non-refundable cleaning fee for one night or
        $150 for two or more nights, ensuring a pleasant and worry-free
        experience for all. A delightful dog park can be found nearby, providing
        a fun and engaging space for your four-legged friend to run, play, and
        socialize with other dogs.
      </Typography>

      <Typography variant='base'>
        Harbor Inn & Suites Oceanside boasts a range of attractive amenities,
        including a delicious breakfast, a well-equipped fitness center, and
        friendly, attentive staff. Its prime location near Oceanside Harbor
        allows guests to easily explore the area&apos;`s picturesque waterfront
        and numerous attractions.
      </Typography>

      <Typography variant='base'>
        With its combination of comfortable accommodations, pet-friendly
        atmosphere, and convenient amenities, Harbor Inn & Suites Oceanside has
        become a popular choice for travelers and their pets seeking an
        enjoyable stay in this enchanting coastal town.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Remarkable aspects of Harbor Inn & Suites Oceanside entail:'
        highlights={highlights3}
      />

      <Typography variant='h5'>Ramada by Wyndham Oceanside</Typography>
      {/* {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Oceanside, CA' }}
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
      )} */}

      <Typography variant='base'>
        Unwind in the amiable atmosphere of Ramada by Wyndham Oceanside, a
        welcoming and comfortable lodging option for travelers and their pets.
      </Typography>

      <Typography variant='base'>
        This pet-friendly hotel imposes a pet fee of $20 per pet, per night,
        permitting up to two pets, ensuring a hassle-free stay for you and your
        furry companions. The pet weight restriction is 55 lbs, making it an
        ideal choice for those with small to medium-sized pets. A hospitable dog
        park is conveniently located nearby, offering a perfect space for your
        canine friend to socialize, exercise and explore.
      </Typography>

      <Typography variant='base'>
        Ramada by Wyndham Oceanside boasts a range of attractive amenities, such
        as on-site dining options, a well-equipped fitness center, and Wi-Fi,
        catering to the diverse needs of its guests.
      </Typography>

      <Typography variant='base'>
        With its warm atmosphere, pet-friendly policies, and convenient location
        near popular attractions, Ramada by Wyndham Oceanside is a great choice
        for a memorable stay in the delightful beach town of Oceanside.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Distinguishing features of Ramada by Wyndham Oceanside include:'
        highlights={highlights4}
      />

      <Typography variant='base'>
        Oceanside presents an irresistible allure for travelers and their furry
        friends, boasting an extensive selection of pet-friendly hotels catering
        to diverse tastes and budgets. From the sumptuous Mission Pacific and
        the chic The Seabird to the congenial Harbor Inn & Suites Oceanside and
        the snug Ramada by Wyndham Oceanside, you and your pet will undoubtedly
        have an extraordinary experience in this captivating coastal enclave.
      </Typography>

      <Typography variant='base'>
        Beyond these exceptional pet-friendly hotels, Oceanside provides
        numerous dog-friendly parks, trails and attractions for you and your pet
        to explore in tandem. Delight in the magical Oceanside Harbor Beach or
        meander through the bustling Oceanside Pier for some outdoor excitement.
        Your pet will revel in joining you on your Oceanside escapades.
      </Typography>

      <Typography variant='base'>
        Oceanside, California, epitomizes the ideal destination for pet owners,
        offering a rich cultural landscape, varied attractions and a hospitable
        environment for both humans and pets.
      </Typography>
    </Box>
  );
};

export default Oceanside;
