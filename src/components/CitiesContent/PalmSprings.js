import { Box, Typography } from '@mui/material';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import { utils } from '../../services/utils';

const PalmSprings = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        The city also offers a diverse range of outdoor activities, luxurious
        resorts, a vibrant arts scene, and a culinary landscape that tantalizes
        the taste buds, ensuring an unforgettable experience for every visitor.
      </Typography>

      <Typography variant='base'>
        Nestled within this sun-drenched paradise is a plethora of
        accommodations that cater to your pet&apos;s needs and desires, ensuring
        that their presence is celebrated and their comfort is paramount.
      </Typography>

      <Typography variant='base'>
        It&apos;s within these pet-friendly establishments that a symphony of
        delights awaits both you and your cherished companion. Immerse yourself
        in a realm where paws trot alongside human footsteps, where adoring
        gazes and affectionate cuddles are the currency of the realm.
      </Typography>

      <Typography variant='h2'>Dog Friendly Hotels</Typography>

      <Typography variant='base'>
        These hotels have woven a tapestry of warmth and hospitality, ensuring
        that your pet is not merely an accessory but an honored guest, deserving
        of all the creature comforts that Palm Springs has.
      </Typography>

      <Typography variant='base'>
        Pets are not merely tolerated here; they’re celebrated as members of the
        family. Their presence adds an extra layer of joy and companionship to
        your journey.
      </Typography>

      <Typography variant='base'>
        These exceptional hotels have opened their doors (and their hearts) to
        accommodate the needs of your beloved pet.
      </Typography>

      <Typography variant='h5'>Ingleside Inn Palm Springs</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Palm Springs, CA' }}
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
        Prepare to be captivated by the irresistible charm of Ingleside Inn Palm
        Springs. This delightful pet-friendly hotel extends a warm welcome to
        two dogs weighing up to 25 lbs, for a modest fee of $100 per pet, per
        stay. Please bear in mind that feline friends will have to sit this one
        out.
      </Typography>

      <Typography variant='base'>
        This retreat exudes an elegant ambiance and boasts a prime location,
        offering the perfect starting point for your Palm Springs exploration.
        Luxurious guest rooms are thoughtfully appointed, ensuring a comfortable
        and pampering retreat for both you and your furry companion.
      </Typography>

      <Typography variant='base'>
        As an added bonus, a friendly dog park lies in close proximity, offering
        ample space for your canine confidant to frolic and mingle with other
        furry pals.
      </Typography>

      <Typography variant='h5'>
        Avalon Hotel & Bungalows Palm Springs
      </Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[1]}
          city={{ name: 'Palm Springs, CA' }}
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
        Discover a haven of serenity at Avalon Hotel & Bungalows Palm Springs,
        where you and your pet can revel in a tranquil retreat. This
        pet-friendly sanctuary opens its doors to two pets, with a combined
        weight not exceeding 45 lbs per pet. A one-time non-refundable cleaning
        fee of $100 ensures the space is meticulously maintained. Regrettably,
        cats will have to find an alternative spot for their escapades.
      </Typography>

      <Typography variant='base'>
        A variety of stylish bungalows are at your disposal, allowing you and
        your furry companion to luxuriate in privacy and seclusion.
      </Typography>

      <Typography variant='h5'>The Saguaro Palm Springs</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[2]}
          city={{ name: 'Palm Springs, CA' }}
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
        Prepare to be awestruck by the vibrant energy of The Saguaro Palm
        Springs, where an atmosphere of eclectic charm welcomes you and your two
        canine companions, regardless of their size, for a modest fee of $50 per
        stay. It&apos;s important to note that dogs must not be left unattended
        in the guest rooms.
      </Typography>

      <Typography variant='base'>
        This visually striking hotel embraces the essence of Palm Springs,
        offering a lively ambiance that envelops you in the spirit of the city.
        Spacious guest rooms ensure a comfortable stay for both you and your
        pet, while a nearby dog park provides the ideal setting for outdoor
        exploration and the forging of new friendships.
      </Typography>

      <Typography variant='h5'>Margaritaville Resort Palm Springs</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[3]}
          city={{ name: 'Palm Springs, CA' }}
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
        Transport yourself to a tropical paradise at Margaritaville Resort Palm
        Springs, where pets weighing under 100 lbs, including cats, dogs, and
        even birds, are wholeheartedly welcomed. Each room can accommodate up to
        two pets, ensuring your beloved companions can share in the adventure.
      </Typography>

      <Typography variant='base'>
        This exuberant resort lavishes guests and their furry or feathered
        friends with a plethora of activities and amenities, designed to enrich
        your dog friendly Palm Springs escapade. Meanwhile, a welcoming dog park
        beckons nearby, providing a space for outdoor frolics and mingling with
        fellow furry explorers.
      </Typography>

      <Typography variant='h5'>Kimpton Rowan Palm Springs</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[4]}
          city={{ name: 'Palm Springs, CA' }}
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
        Find respite in the lap of sophistication at Kimpton Rowan Palm Springs,
        a pet-friendly haven where there are no restrictions on the kind of pets
        you can bring along, and no additional fees to worry about. This refined
        hotel caters to the needs of travelers and their pets, ensuring an
        indelible and enjoyable stay for all.
      </Typography>

      <Typography variant='base'>
        Positioned ideally, Kimpton Rowan Palm Springs offers seamless access to
        Palm Springs&apos; top attractions. Moreover, the proximity of a
        friendly dog park ensures your furry companion can stretch their legs,
        engage in social encounters, and form lasting connections with new pals.
      </Typography>

      <Typography variant='base'>
        Palm Springs, California, stands tall as a beacon of pet-friendly
        hospitality, boasting an impressive lineup of hotels that cater to
        various tastes and budgets. From the enchanting Ingleside Inn Palm
        Springs to the lavish retreat of Kimpton Rowan Palm Springs, you and
        your cherished pet will uncover the perfect abode for an unforgettable
        adventure in the heart of Palm Springs.
      </Typography>
    </Box>
  );
};

export default PalmSprings;