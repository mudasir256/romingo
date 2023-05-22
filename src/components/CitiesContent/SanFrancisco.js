import { Box, Typography } from '@mui/material';
import HighlightBox from './HighlightBox';

const highlights1 = [
  'A fitness center',
  'A business center',
  'Several restaurants and bars',
];

const highlights2 = [
  'Pet-friendly',
  'Outdoor pool with stunning views of the city',
];

const highlights3 = [
  'Luxurious accommodations',
  'Pet-friendly',
  'Close to public transportation',
  'Library',
];

const highlights4 = [
  'Close to many popular attractions',
  'Pet-friendly',
  'Rooftop pool with stunning views of the city',
];

const highlights5 = ['Nautical theme', 'Waterfront location', 'Pet-friendly'];

const highlights6 = [
  "Convenient location in Fisherman's Wharf",
  'Pet-friendly',
];

const SanFrancisco = () => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Join us as we look at some of the finest pet-friendly hotels in dog
        friendly San Francisco, showcasing an eclectic mix of properties ranging
        from well-known hotel chains to those secret charming boutique
        establishments.
      </Typography>

      <Typography variant='h2'>Pet-Friendly Criteria</Typography>

      <Typography variant='base'>
        What we found is that San Francisco&apos;s pet-friendly hotels not only
        offer excellent amenities for humans — but there’s a range of services
        and facilities catered to the needs of pets making them completely dog
        friendly.
      </Typography>

      <Typography variant='base'>
        You can get cozy pet beds and gourmet pet treats along with designated
        pet play areas and convenient dog-walking (or dog-sitting) services.
        These establishments literally go “above and beyond” to ensure a
        pleasant and memorable stay for you and your pet.
      </Typography>

      <Typography variant='base'>
        Imagine strolling through the lively streets of Fisherman&apos;s Wharf
        or taking a leisurely hike with your dog in Golden Gate Park, there’s
        plenty to do for everyone.
      </Typography>

      <Typography variant='h2'>
        These are our top picks for Pet Friendly Hotels in San Francisco:
      </Typography>

      <Typography variant='h5'>
        Hyatt Regency San Francisco Embarcadero
      </Typography>

      <Typography variant='base'>
        Hyatt Regency San Francisco Embarcadero is a luxury hotel located on the
        Embarcadero in San Francisco. The hotel offers stunning views of the bay
        and the city skyline. It’s close to many popular attractions: including
        the Ferry Building Marketplace, the Exploratorium and of course Pier 39.
      </Typography>

      <Typography variant='base'>
        The hotel is pet-friendly and allows dogs up to 20 pounds for a fee of
        $100 per pet per stay. Dogs are allowed in the rooms, but they must be
        on a leash in public areas.
      </Typography>

      {/* List */}
      <HighlightBox
        title="The hotel's amenities include:"
        highlights={highlights1}
      />

      <Typography variant='h5'>Hilton San Francisco Union Square </Typography>

      <Typography variant='base'>
        The Hilton San Francisco Union Square is a nice 4-star hotel located in
        the heart of San Francisco, California. There’s many popular attractions
        nearby, including the Powell Street cable car turnaround, the Westfield
        San Francisco Centre and the Moscone Convention Center.
      </Typography>

      <Typography variant='base'>
        The hotel also provides stunning views of the city skyline.
      </Typography>

      <Typography variant='base'>
        The Hilton San Francisco Union Square is pet-friendly and allows up to 2
        dogs up to 75 pounds for a fee of $50 per pet per stay. Dogs are allowed
        in the rooms, but they must be on a leash in public areas.
      </Typography>

      {/* List */}
      <HighlightBox title='Highlights include:' highlights={highlights2} />

      <Typography variant='h5'>Stanford Court</Typography>

      <Typography variant='base'>
        The Stanford Court is a historic hotel located on Nob Hill in San
        Francisco. This historic hotel was built around 1903 and is known for
        its elegant architecture and luxurious accommodations.
      </Typography>

      <Typography variant='base'>
        The Stanford Court is pet-friendly and allows dogs for $75 per stay.
        Dogs are allowed in the rooms, but they must be on a leash in public
        areas. The hotel also has a pet park where dogs can play.
      </Typography>

      <Typography variant='base'>
        The hotel is located in a convenient location, close to public
        transportation and many popular attractions. The hotel is also within
        walking distance of Union Square, Chinatown, and the Financial District.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Here are some of the things that make the Stanford Court a great place to stay:'
        highlights={highlights3}
      />

      <Typography variant='h5'>Hotel Kabuki</Typography>

      <Typography variant='base'>
        Hotel Kabuki is a boutique hotel located in San Francisco&apos;s
        Japantown. The hotel is within walking distance of many popular
        attractions, including the Fillmore Auditorium, the Japan Center Malls
        and the Japanese Tea Garden.
      </Typography>

      <Typography variant='base'>
        Hotel Kabuki is pet-friendly and allows 2 pets up to any size for a fee
        of $25 per pet plus a $50 nonrefundable cleaning fee. Dogs are allowed
        in the rooms, but they must be on a leash in public areas. The hotel is
        located in a convenient location, close to public transportation and
        many popular attractions.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Some of the highlights of Hotel Kabuki include:'
        highlights={highlights4}
      />

      <Typography variant='h5'>Argonaut Hotel</Typography>

      <Typography variant='base'>
        The Argonaut Hotel is a historic hotel located in Fisherman&apos;s Wharf
        in San Francisco, California. The hotel was built in 1907 and is known
        for its nautical theme and waterfront location.
      </Typography>

      <Typography variant='base'>
        The Argonaut Hotel is pet-friendly and allows 2 pets up to any size for
        a fee of $75 per pet for stays from 1-6 nights. For stays of 7 to 30
        nights, it’s $175 per pet. Dogs are allowed in the rooms, but they must
        be on a leash in public areas.
      </Typography>

      <Typography variant='base'>
        The hotel is located in a convenient location, close to public
        transportation and many popular attractions. The hotel is also within
        walking distance of Pier 39, Ghirardelli Square and the Aquarium of the
        Bay.
      </Typography>

      {/* List */}
      <HighlightBox title='Some highlights include:' highlights={highlights5} />

      <Typography variant='h5'>
        Hyatt Centric Fisherman&apos;s Wharf{' '}
      </Typography>

      <Typography variant='base'>
        The Hyatt Centric Fisherman&apos;s Wharf is a 4-star hotel located in
        San Francisco, California. It is situated in the heart of
        Fisherman&apos;s Wharf, close to many popular attractions, including
        Pier 39, Ghirardelli Square and the Aquarium of the Bay.
      </Typography>

      <Typography variant='base'>
        The Hyatt Centric Fisherman&apos;s Wharf is pet-friendly and allows one
        dog up to 50 pounds for a fee of $100 per stay. Dogs are allowed in the
        rooms, but they must be on a leash in public areas. The hotel also has a
        pet park where dogs can play.
      </Typography>

      {/* List */}
      <HighlightBox title='Some highlights include:' highlights={highlights6} />

      <Typography variant='base'>
        San Francisco is definitely a place that caters to pet lovers. From
        luxury hotels to boutique establishments, you&apos;re sure to find the
        perfect place to stay alongside your furry companion.{' '}
      </Typography>

      <Typography variant='base'>
        Book your pet-friendly hotel in San Francisco today and experience
        together all the city has to offer.
      </Typography>
    </Box>
  );
};

export default SanFrancisco;
