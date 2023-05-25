import { Box, Typography } from '@mui/material';
import ListingCard from '../ListingCard/ListingCard';
import ListingCardSkeleton from '../UI/ListingCardSkeleton/ListingCardSkeleton';
import { utils } from '../../services/utils';

const Vail = ({hotels}) => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Beyond the mountains, Vail&apos;s idyllic village beckons with its
        charming chalets, boutique shops, and an enticing array of culinary
        delights.
      </Typography>

      <Typography variant='base'>
        The town&apos;s vibrant cultural scene comes alive with a rich tapestry
        of festivals, concerts, and art showcases, providing a year-round
        cultural feast for locals and visitors alike. Embodying the perfect
        synergy of outdoor adventure, mountain chic, and a welcoming community
        spirit, Vail shines as an extraordinary destination for a memorable
        mountain escape.
      </Typography>

      <Typography variant='base'>
        With its world-renowned skiing, breathtaking alpine landscapes, and a
        delightful village atmosphere, Vail beckons both you and your furry
        companions to experience its warm hospitality and exceptional
        pet-friendly hotels.
      </Typography>

      <Typography variant='base'>
        As we look forward to cooling off for a while, let’s look at some of the
        top accommodations in the area.
      </Typography>

      <Typography variant='h5'>Grand Hyatt Vail</Typography>
      {hotels.length > 0 ? (
        <ListingCard
          {...hotels[0]}
          city={{ name: 'Vail, CO' }}
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
        You’ll find unrivaled luxury at Grand Hyatt Vail, a pet-friendly haven
        that emanates opulence and refined sophistication. They welcome up to
        two pets, each weighing up to 75 lbs, for a non-refundable pet fee of
        $100 per stay, ensuring that your furry companions are treated with the
        utmost care and comfort.
      </Typography>

      <Typography variant='base'>
        See for yourself the exquisite design of the rooms, where every detail
        has been meticulously crafted to create an atmosphere of pure
        indulgence. Unwind and rejuvenate your senses at the indulgent spa,
        where expert therapists and rejuvenating treatments await, offering a
        sanctuary of relaxation amidst the breathtaking beauty of the Vail
        Valley.
      </Typography>

      <Typography variant='base'>
        Situated amidst the stunning landscapes of the Vail Valley, Grand Hyatt
        Vail allows you to immerse yourself in the alpine charm, where
        snow-capped peaks, pristine nature trails, and the enchanting Vail
        Village await exploration.
      </Typography>

      <Typography variant='base'>
        It’s luxury at it’s finest. What a wonderful pet-friendly sojourn that
        combines refined elegance with the natural wonders of the Vail Valley at
        Grand Hyatt Vail.
      </Typography>

      <Typography variant='h5'>Tivoli Lodge</Typography>

      <Typography variant='base'>
        Step into the lap of mountain luxury at Tivoli Lodge, a pet-friendly
        hotel that encapsulates the very essence of Vail&apos;s alpine beauty.
        For a non-refundable fee of $100 per pet per stay, you can bring along
        two pets.
      </Typography>

      <Typography variant='base'>
        This intimate boutique lodge enchants with cozy rooms, a welcoming
        fireplace lounge, and awe-inspiring vistas of the surrounding mountains.
        Delight in the warmth of Tivoli Lodge&apos;s hospitality and savor a
        pet-friendly escape in the heart of Vail Village.
      </Typography>

      <Typography variant='h5'>Evergreen Lodge at Vail</Typography>

      <Typography variant='base'>
        Escape to the rustic charm of Evergreen Lodge at Vail, a pet-friendly
        retreat that immerses you in the spirit of the mountains.
      </Typography>

      <Typography variant='base'>
        Welcoming pets with a Daily Pet Fee of $40.00 and each additional pet is
        $10.00 daily with a maximum 3 pets allowed in each hotel room. Their Pet
        Friendly rooms are limited so call ahead. This lodge-style haven offers
        comfortable accommodations, an inviting outdoor patio adorned with fire
        pits, and convenient access to Vail&apos;s renowned ski slopes.
      </Typography>

      <Typography variant='base'>
        Unwind amidst the tranquility of the mountains and relish in a
        pet-friendly sanctuary at Evergreen Lodge.
      </Typography>

      <Typography variant='h5'>The Arrabelle at Vail Square</Typography>

      <Typography variant='base'>
        Step into a world of indulgence at The Arrabelle at Vail Square, a
        pet-friendly sanctuary that defines the pinnacle of alpine elegance.
      </Typography>

      <Typography variant='base'>
        Up to two dogs are allowed in a limited number of their rooms, so let
        the hotel know in advance. There’s a fee of $50 per pet per night, and
        nice thing is that there are no weight restrictions. The nearby park
        makes it convenient to take time to go for a walk.
      </Typography>

      <Typography variant='base'>
        This upscale retreat unveils a collection of sumptuous rooms that exude
        sophistication and provide a haven of tranquility. Pamper yourself at
        the world-class spa, where rejuvenation and relaxation await, offering a
        blissful respite from the outside world.
      </Typography>

      <Typography variant='base'>
        Located in the heart of dog friendly Vail Square, The Arrabelle immerses
        you in the grandeur of the surrounding mountains, unveiling breathtaking
        vistas that serve as a backdrop to your pet-friendly escape.
      </Typography>

      <Typography variant='base'>
        Allow yourself to be captivated by the seamless fusion of lavish comfort
        and awe-inspiring natural beauty, as The Arrabelle embraces you and your
        pets with open arms.
      </Typography>

      <Typography variant='h5'>
        Highline Vail - a DoubleTree by Hilton
      </Typography>

      <Typography variant='base'>
        Experience the perfect combination of comfort and convenience at
        Highline Vail, an inviting pet-friendly hotel that offers a warm welcome
        to both you and your beloved four-legged companions.
      </Typography>

      <Typography variant='base'>
        This modern retreat is dedicated to ensuring a memorable stay for pets
        weighing up to 50 lbs, with a fee of $100 per pet per stay.
      </Typography>

      <Typography variant='base'>
        Indulge in stylish accommodations that provide a cozy sanctuary after a
        day of exploration. Stay in top shape at the well-equipped fitness
        center, where you can maintain your active lifestyle while enjoying the
        breathtaking views of the surrounding mountains.
      </Typography>

      <Typography variant='base'>
        After a day of adventure, unwind at the cozy lobby bar, savoring a
        well-deserved drink or engaging in pleasant conversations with fellow
        guests.
      </Typography>

      <Typography variant='base'>
        Highline Vail goes above and beyond to ensure exceptional care for both
        you and your pets, allowing you to create cherished memories and embrace
        the true spirit of Vail&apos;s mountain hospitality.
      </Typography>

      <Typography variant='base'>
        Dog friendly Vail hotels provide a haven of comfort and relaxation
        amidst the awe-inspiring beauty of the Rocky Mountains. Whether you seek
        refined luxury or rustic charm, there exists a perfect accommodation
        option catering to every traveler.
      </Typography>

      <Typography variant='base'>
        Many outdoor adventures await you in the enchanting alpine ambiance.
      </Typography>
    </Box>
  );
};

export default Vail;