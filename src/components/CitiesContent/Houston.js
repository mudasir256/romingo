import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const highlights1 = [
  'Prime location near top attractions',
  'Upscale restaurants and bars',
  'State-of-the-art fitness center',
  'Welcoming pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const highlights2 = [
  'Desirable location near the Medical Center',
  'Exceptional on-site dining options',
  'Modern fitness center',
  'Inviting pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const highlights3 = [
  'Ideal location near the Westchase District',
  'Delectable on-site dining options',
  'Well-equipped fitness center',
  'Hospitable pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const highlights4 = [
  'Prime downtown location',
  'Close proximity to top attractions',
  'Contemporary fitness center',
  'Appetizing on-site dining options',
  'Welcoming pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const highlights5 = [
  'Strategic location near Northwest Houston',
  'Complimentary breakfast',
  'Up-to-date fitness center',
  'Affable pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const Houston = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        From luxurious establishments to cozy boutique properties and
        budget-conscious options, there is a pet-friendly hotel in Houston that
        perfectly aligns with your unique needs and desires, allowing you and
        your beloved pet to create unforgettable memories in this vibrant city.
      </Typography>

      <Typography variant='h2'>Dog Friendly Houston</Typography>

      <Typography variant='base'>
        Today let’s cover a selection of the city&apos;s finest pet-friendly
        accommodations, featuring both well-established hotel chains and
        distinctive boutique properties.
      </Typography>

      <Typography variant='base'>
        Together we can all can discover the perfect place to stay as you
        uncover the enthralling charm of the Lone Star State&apos;s largest
        city.
      </Typography>

      <Typography variant='base'>
        Numerous pet-friendly accommodations in Houston allow you and your furry
        friend to dive into a plethora of dog-friendly parks, trails, and
        attractions.
      </Typography>

      <Typography variant='base'>
        Our goal is to emphasize hotels handpicked for their pet-friendly
        amenities, inviting ambiance and strategic location.
      </Typography>

      <Typography variant='base'>
        Whether you fancy the sophistication of a high-end establishment or the
        coziness of a boutique hotel, rest assured we’ve got you covered..
      </Typography>

      <Typography variant='h5'>Four Seasons Houston</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Houston, TX' }}
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
        Revel in unparalleled luxury and comfort at Four Seasons Houston, a
        pet-friendly hotel that goes the extra mile to ensure an unforgettable
        stay with opulent accommodations and first-class amenities for you and
        your pet.
      </Typography>

      <Typography variant='base'>
        Two pets of any size are welcome at no additional cost, providing a
        lavish experience for your cherished companion. A dog park is located
        nearby also.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of Four Seasons Houston include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>Westin Houston Medical Center</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Houston, TX' }}
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
        Immerse yourself in a revitalizing retreat at the Westin Houston Medical
        Center, a pet-friendly hotel that offers contemporary accommodations and
        attentive amenities in an ideal location.
      </Typography>

      <Typography variant='base'>
        With a pet fee of $150 per stay and allowance for two pets, with a
        maximum weight 75 pounds per pet. A welcoming dog park is situated
        nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of Westin Houston Medical Center include:'
        highlights={highlights2}
      />

      <Typography variant='h5'>Hilton Houston Westchase</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Houston, TX' }}
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
        Uncover the allure and practicality of Hilton Houston Westchase, a
        pet-friendly hotel that provides snug accommodations in an optimal
        location.
      </Typography>

      <Typography variant='base'>
        This hotel will welcome two pets up to 80 lbs for a fee of $75 per pet,
        per stay, accommodating both dogs and cats. A nearby friendly dog park
        adds to this appeal.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of Hilton Houston Westchase include:'
        highlights={highlights3}
      />

      <Typography variant='h5'>C Baldwin Curio Collection by Hilton</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Houston, TX' }}
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
        Embrace the distinctive charm of C Baldwin Curio Collection by Hilton –
        a boutique hotel nestled in the heart of Houston. This unique hotel
        caters up to two pets for a $100 non-refundable fee, per stay –
        guaranteeing a comfortable experience for you and your four-legged
        friend. A friendly dog park is near.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of C Baldwin Curio Collection by Hilton include:'
        highlights={highlights4}
      />

      <Typography variant='h5'>
        La Quinta Inn & Suites by Wyndham Houston NW Brookhollow
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Houston, TX' }}
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
        Delight in a cozy and budget-conscious stay at La Quinta Inn & Suites by
        Wyndham Houston NW Brookhollow. This pet-friendly hotel offers
        well-furnished accommodations and essential amenities to make your stay
        enjoyable.
      </Typography>

      <Typography variant='base'>
        The hotel accommodates two pets up to 75 lbs for an additional fee of
        $25 per night, with both dogs and cats welcome. A friendly dog park is
        conveniently located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key features of La Quinta Inn & Suites by Wyndham Houston NW Brookhollow include:'
        highlights={highlights5}
      />

      <Typography variant='base'>
        Houston&apos;s variety of pet-friendly hotels promises an unforgettable
        experience for you and your pet in this captivating city.
      </Typography>

      <Typography variant='base'>
        Beyond these extraordinary pet-friendly hotels, Houston presents
        numerous dog-friendly parks, trails and attractions for you and your pet
        to explore together.
      </Typography>

      <Typography variant='base'>
        Wander through the picturesque Buffalo Bayou Park or experience the
        lively Discovery Green. Your pet will be thrilled to join you on your
        Houston adventure.
      </Typography>

      <Typography variant='base'>
        After a day of discovery, indulge in the city&apos;s pet-friendly dining
        scene, showcasing an array of restaurants and cafes with outdoor seating
        areas perfect for sharing a meal with your beloved companion. Retire to
        the comfort of your pet-friendly hotel and let you and your furry friend
        unwind and recharge for another day of excitement in this dynamic city.
      </Typography>

      <Typography variant='base'>
        Houston is a dream destination for pet owners, offering a rich culture,
        diverse attractions and a welcoming environment for both humans and
        pets.
      </Typography>

      <Typography variant='base'>
        Gather your pet&apos;s favorite toys, pack your bags, and embark on an
        extraordinary journey through the mesmerizing beauty of Houston.
      </Typography>
    </Box>
  );
};
export default Houston;
