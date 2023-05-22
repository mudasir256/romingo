import { Box, Typography } from "@mui/material";
import HighlightBox from "./HighlightBox";

const highlights1 = [
  'Prime location near popular attractions',
  'Fitness center',
  'Exquisite dining and bar options',
  'Pet-friendly atmosphere',
];

const highlights2 = [
  'Proximity to popular attractions',
  'Fitness center',
  'Elegant restaurants and bars',
  'Pet-friendly',
];

const highlights3 = [
  'Convenient location near Uptown attractions',
  'Rooftop lounge',
  'Fitness center',
  'On-site dining options',
  'Pet-friendly atmosphere',
  'Complimentary Wi-Fi',
];

const highlights4 = [
  'Prime downtown location',
  'Proximity to popular attractions, such as Reunion Tower and the Dallas World Aquarium',
  'Heated outdoor pool',
  'Fitness center',
  'Multiple dining and bar options',
  'Pet-friendly',
  'Complimentary Wi-Fi',
  'On-site parking',
];


const Dallas = () => {
  return (
    <Box
      px='2.5rem'
      pb='2.5rem'
      display='flex'
      flexDirection='column'
      gap='1.5rem'
    >
      <Typography mt='1rem' variant='base'>
        Today let’s look at some of Dallas&apos; top-notch pet-friendly
        lodgings, featuring the prestigious hotel chains you’re familiar with
        along with a unique boutique establishment.
      </Typography>
      <Typography variant='base'>
        From the idyllic Klyde Warren Park to the charming streets of the Bishop
        Arts District, your pet will be ecstatic to be a part of your dog
        friendly Dallas journey.
      </Typography>
      <Typography variant='h2'>
        Handpicked Dallas Dog Friendly Hotels
      </Typography>
      <Typography variant='base'>
        We carefully hand pick hotels based on their pet-friendly amenities,
        welcoming ambiance and prime location. Whether you prefer the opulence
        of a high-end resort or the inviting appeal of a boutique hotel, be
        assured that you&apos;ll find the perfect accommodation tailored to your
        needs.
      </Typography>
      <Typography variant='base'>
        Some hotels even go above and beyond to pamper your pet, providing
        comfortable pet beds, food and water bowls, and delightful treats,
        making your furry companion feel right at home.
      </Typography>
      <Typography variant='base'>
        After a day filled with exploration, retreat to your pet-friendly hotel,
        where you and your furry companion can relax and recharge, ready for
        another day of excitement in this dazzling city.
      </Typography>
      <Typography variant='h5'>The Highland Dallas Collection</Typography>
      <Typography variant='base'>
        The Highland Dallas Collection offers a perfect blend of elegance and
        pet-friendly hospitality. This boutique hotel provides all the essential
        amenities, including pet beds and food bowls, while its central location
        ensures effortless city exploration for you and your furry companion.
      </Typography>
      <Typography variant='base'>
        The hotel allows dogs for a non-refundable pet fee of $75 plus tax per
        pet. Dogs are allowed in the rooms, but they must be leashed in public
        areas. There are also several pet-friendly parks nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Some noteworthy features of The Highland Dallas Collection include:'
        highlights={highlights1}
      />

      <Typography variant='h5'>HALL Arts Dallas</Typography>

      <Typography variant='base'>
        HALL Arts Dallas provides an experience of contemporary sophistication.
        Nestled in the heart of the vibrant Arts District, this pet-friendly
        hotel offers lavish accommodations and pet amenities, ensuring a truly
        memorable stay.
      </Typography>

      <Typography variant='base'>
        The hotel allows dogs up to 50 pounds for a standard $50, non-refundable
        pet deposit, or a $75 total deposit for the{' '}
        <span style={{ fontStyle: 'italic', fontWeight: '700' }}>
          Sit & Stay Pet Program
        </span>
        . Dogs are allowed in the rooms, but they must be leashed in public
        areas. A dog-friendly park is conveniently located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Prominent highlights of HALL Arts Dallas include:'
        highlights={highlights2}
      />

      <Typography variant='h5'>Canopy by Hilton Dallas Uptown</Typography>

      <Typography variant='base'>
        Canopy by Hilton Dallas Uptown lets you immerse yourself with Western
        urban charm. This boutique hotel offers pet-friendly accommodations
        complete with modern amenities, making it an ideal choice for travelers
        and their pets.
      </Typography>

      <Typography variant='base'>
        The hotel allows dogs up to 75 lbs for an additional fee of $50 per
        stay. Dogs are allowed in the rooms but must be leashed in public areas.
        A pet-friendly park is situated adjacent to the hotel.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Canopy by Hilton Dallas Uptown include:'
        highlights={highlights3}
      />

      <Typography variant='h5'>Hyatt Regency Dallas</Typography>
      <Typography variant='base'>
        Hyatt Regency Dallas offers modern comfort and luxury in a convenient
        downtown location. This pet-friendly hotel features a range of
        amenities, including a heated outdoor pool and multiple dining options,
        ensuring an enjoyable stay for you and your furry companion.
      </Typography>
      <Typography variant='base'>
        The hotel allows up to two dogs up to 50 lbs for an additional fee of
        $150 every six nights. Dogs are allowed in the rooms but must be leashed
        in public areas.
      </Typography>
      <Typography variant='base'>
        A designated dog walking area is available for guests traveling with
        dogs, and several pet-friendly parks are conveniently located nearby.
      </Typography>

      {/* List */}
      <HighlightBox
        title='Key highlights of Hyatt Regency Dallas include:'
        highlights={highlights4}
      />

      <Typography variant='base'>
        Dallas is an exhilarating destination for travelers and their furry
        companions, boasting a wide array of pet-friendly hotels catering to
        diverse preferences and budgets.{' '}
      </Typography>

      <Typography variant='base'>
        Whether you choose the chic Highland Dallas Collection, the artsy HALL
        Arts Dallas, the urban Canopy by Hilton Dallas Uptown, or the
        contemporary Hyatt Regency Dallas, you and your four-legged friend are
        guaranteed an extraordinary experience in this thriving city.
      </Typography>

      <Typography variant='base'>
        In addition to these fabulous pet-friendly hotels, Dallas is home to
        numerous dog-friendly parks, trails and attractions that you and your
        pet can explore together. Unwind with a leisurely stroll through Klyde
        Warren Park or visit the many museums and galleries within the bustling
        Arts District. Your pet will be delighted to join you on your Dallas
        adventures.
      </Typography>

      <Typography variant='base'>
        After a long day of exploration, treat yourself to the city&apos;s
        pet-friendly dining scene, featuring an array of eateries and cafes with
        outdoor seating areas, perfect for sharing a meal with your cherished
        companion.
      </Typography>

      <Typography variant='base'>
        Once you&apos;ve satisfied your appetite, return to the comfort of your
        pet-friendly hotel, where you and your furry friend can relax and
        recharge for another day of adventure in this dynamic city.
      </Typography>

      <Typography variant='base'>
        Dallas is a desired destination for pet owners, with its rich culture,
        diverse attractions, professional sports and welcoming atmosphere for
        both humans and pets alike. So pack your bags, gather your pet&apos;s
        favorite toys, and embark on an unforgettable journey through the
        bustling energy and vibrant charm of Dallas.
      </Typography>
    </Box>
  );
}

export default Dallas