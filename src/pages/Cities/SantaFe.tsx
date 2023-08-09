import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import FilterBar from "../../components/FilterBar";
import { DesktopFilterBar } from "./DesktopFilterBar"
import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import { LargeFilterBar } from '../../components/LargeFilterBar';
import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

const SantaFe: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Santa Fe, NM');

  const city = 'Santa Fe'
  const paragraphOne = "Santa Fe, a picturesque and charming destination, welcomes travelers with open arms, and this includes our four-legged companions too! Embracing the essence of pet-friendly travel, Santa Fe offers a plethora of opportunities to explore the city's rich culture and natural beauty with your beloved pets by your side. The city boasts a wide array of pet-friendly accommodations, ranging from cozy boutique hotels to charming vacation rentals, ensuring a comfortable stay for both you and your furry friends."

  const Text = ({ text }) => (
    <Typography variant="base">{text}</Typography>
  )
  const Bold = ({ text }) => (
    <Typography variant="p"><b>{text}</b></Typography>
  )

  const LinkContent = ({ link, linkText, text }) => (
    <Box mt="0.5rem">
      <Typography variant='base' component='p'>
        <a href={link} target='_blank' rel='noreferrer'>
          {linkText}
        </a>
      </Typography>
      <Typography variant='base' component='p'>
        {text}
      </Typography>
    </Box>
  );

  const Img = ({ src, text }) => (<>
    <img loading="lazy" style={{ marginTop: "-1rem", borderRadius: 6, maxHeight: '480px', objectFit: 'cover' }} src={src} />
    <Typography mt="-1.25rem" variant="base" component="p">Photo Credit: {text}</Typography>
  </>)

  return <>
    <Helmet>
      <title>Pet Friendly Hotels Santa Fe, NM | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, NM | Romingo`}
      />
      <meta property='og:description' content={paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src={cityContent.heroImage}
      alt={city}
      sx={{
        objectFit: "cover",
        width: "100%",
        height: { xs: "40vh", md: "70vh" },
        boxShadow: 0,
      }}
    />
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography component="h1" variant="h2" color="text.primary">
          Pet Friendly Hotels {city}
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          NEW MEXICO
        </Typography>
      </Divider>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            Take a leisurely stroll through the historic Plaza or venture into the vibrant Railyard Arts District, where many restaurants and cafes have outdoor seating areas that cater to pets. Nature-loving pet owners will be delighted by the numerous pet-friendly hiking trails and parks dotted throughout the city and surrounding areas. Additionally, Santa Fe&apos;s warm and friendly community extends a warm welcome to pets, making it easy to find pet grooming services, pet supply stores, and even pet-friendly events.
          </Typography>
        </Grid>
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            Whether you&apos;re exploring the city&apos;s art scene, savoring its culinary delights, or simply immersing yourself in the serene landscapes, Santa Fe promises an unforgettable and inclusive pet-friendly adventure for all.
          </Typography>
        </Grid>

        <Grid ml="auto" mt="0.5rem" item xs={12} md={4}>
          <Box
            component="img"
            src={cityContent.secondaryImage}
            alt={city}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "250px",
              boxShadow: 4,
              borderRadius: 3,
            }}
          />
        </Grid>

      
        <Box
          width='100%'
          mt="1rem"
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Santa Fe</Typography>

          <Bold text="La Fonda on the Plaza" />
          {/* <SingleLoadListingCard hotelName="" />* /}
          <Text text="Situated in the heart of Santa Fe's historic Plaza, La Fonda on the Plaza exudes old-world charm while offering modern amenities. This iconic hotel not only boasts a rich history but also extends a warm welcome to pets. Upon arrival, your furry friend will receive a pet bed, bowls, and treats, making them feel right at home. The hotel's convenient location allows for leisurely strolls with your pet through the enchanting streets of Santa Fe." />
          <Text text="Up to two pets under 45 pounds can stay at La Fonda on the Plaza for a fee of $50 per night, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Nightly turndown service', 'Lounge area', 'Outdoor pool and hot tub', 'Fitness center']}
          />

          <Bold text="Hotel Santa Fe" />
          {/* <SingleLoadListingCard hotelName="" />*/}
          <Text text="Known for its elegant Southwestern style, Hotel Santa Fe blends Native American culture with contemporary luxury. Your pets will feel like honored guests, as the hotel provides pet-friendly rooms equipped with comfortable pet beds and food bowls. The hotel's lush garden courtyards offer an excellent space for you and your furry companion to relax and unwind." />
          <Text text="When you stay at Hotel Santa Fe, you can bring two dogs of any size for a fee of $25 per pet, per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Daily breakfast', 'Evening receptions', 'Spa services', 'Fitness center']}
          />

          <Bold text="The Inn of the Five Graces" />
          <SingleLoadListingCard hotelName="100435660" />
          <Text text="Tucked away in a tranquil corner of Santa Fe, The Inn of the Five Graces is a hidden gem that warmly welcomes pets. This boutique hotel boasts exquisitely designed rooms and suites, each offering a unique and luxurious experience. The staff goes the extra mile to ensure your pets are pampered with special treats and toys during their stay." />
          <Text text="You are welcome to bring your pet to this hotel for a fee of $100 per dog, per night. They ask the dog is medium-sized or smaller and must be house-broken." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Private courtyards', 'Spa treatements', 'On-site dining options', 'Free daily breakfast', 'Soaking pool and sun deck', 'Live music', 'Courtyard bar', 'Fitness center']}
          />

          <Bold text="Drury Plaza Hotel in Santa Fe" />
          <SingleLoadListingCard hotelName="100082428" />
          <Text text="Conveniently located near the historic downtown area, Drury Plaza Hotel provides a pet-friendly environment with well-appointed rooms that cater to both you and your furry friends. The hotel's rooftop pool and hot tub area offer stunning views of Santa Fe's surrounding beauty, and your pets are allowed to enjoy the area on a leash." />
          <Text text="Two dogs under 80 pounds are welcome to stay at Drury Plaza Hotel in Santa Fe for a fee of $50 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free Wi-Fi', 'On-site dining options']}
          />

          <Bold text="The Lodge at Santa Fe" />
          <SingleLoadListingCard hotelName="100110414" />
          <Text text="Surrounded by the breathtaking Sangre de Cristo Mountains, The Lodge at Santa Fe offers a scenic and pet-friendly retreat. Your pets will be greeted with treats and a warm smile upon arrival. With spacious rooms and a pet-friendly policy that extends to the hotel's common areas, you and your furry companions will have a delightful stay." />
          <Text text="When you stay at The Lodge at Santa Fe, you are welcome to bring dogs that weigh up to 50 pounds to the property. There is an additional $35 pet fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site bar', 'Pool and hot tub', 'Seasonal performance of the Benitez Cabaret']}
          />

          <Bold text="Inn and Spa at Loretto" />
          {/* <SingleLoadListingCard hotelName="" />*/}
          <Text text="Nestled at the heart of Santa Fe, Inn and Spa at Loretto is a pet-friendly hotel with a serene ambiance. The hotel offers designated pet-friendly rooms and provides walking services for your pets if you wish to explore Santa Fe without them for a while. Additionally, the concierge can assist in arranging pet-sitting services, ensuring your pets are cared for while you indulge in some spa relaxation." />
          <Text text="Two dogs are welcome to travel with you to the Inn and Spa at Loretto. The pet fee is $75 per stay for the first dog and $35 per stay for the second dog." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Salon', 'Fitness center']}
          />



          <Typography variant="h2">The Top Pet-Friendly Activities in Santa Fe</Typography>
          
          <LinkContent
            link="https://www.santafe.org/visiting-santa-fe/neighborhoods/plaza-and-downtown/"
            linkText="Santa Fe Plaza"
            text="Take a leisurely stroll with your furry friend through the iconic Santa Fe Plaza, the heart of the city. Rich in history and surrounded by charming adobe buildings, the Plaza is a great place to soak in the vibrant atmosphere and immerse yourself in the local culture."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image19.png" text="Santa Fe Plaza" />

          <LinkContent
            link="https://www.alltrails.com/trail/us/new-mexico/dale-ball-trails-north"
            linkText="Dale Ball Trails"
            text="For the active and adventurous, the Dale Ball Trails offer a network of well-marked, pet-friendly hiking paths. You and your pet can explore the beautiful Santa Fe foothills, providing ample opportunities for scenic hikes and outdoor adventures."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image20.png" text="AllTrails" />

          <LinkContent
            link="https://railyardsantafe.com/"
            linkText="Santa Fe Railyard Arts District"
            text="Discover the artistic side of Santa Fe at the Railyard Arts District. This pet-friendly area is home to galleries, boutiques, and restaurants with outdoor seating that welcome your pets. Enjoy some art appreciation and indulge in delicious local cuisine while your furry companion lounges beside you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image6.png" text="Santa Fe Railyard Arts District" />

          <LinkContent
            link="https://www.emnrd.nm.gov/spd/find-a-park/hyde-memorial-state-park/"
            linkText="Hyde Memorial State Park"
            text="Located just a short drive from Santa Fe, Hyde Memorial State Park is a pet-friendly oasis nestled in the mountains. Leashed pets are welcome on the trails, making it an ideal spot for a day of hiking and picnicking amidst the natural beauty of New Mexico."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image15.png" text="Hyde Memorial State Park" />

          <LinkContent
            link="https://santafebotanicalgarden.org/"
            linkText="Santa Fe Botanical Garden"
            text="With well-maintained paths and stunning landscapes, the Santa Fe Botanical Garden is a pet-friendly place to explore. Take a leisurely walk amidst native plants and flowers, all while your pet enjoys the fresh scents and sights."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image18.png" text="Santa Fe Botanical Garden" >

          <LinkContent
            link="https://www.nps.gov/places/santa-fe-national-historic-trail.htm"
            linkText="Santa Fe National Historic Trail"
            text="Step back in time by walking a section of the Santa Fe National Historic Trail with your pet. This historic route was once used by traders, and you can now traverse parts of it with your furry friend by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image10.png" text="Santa Fe National Historic Trail" />

          <LinkContent
            link="https://santafespirits.com/locations/downtown-tasting-room"
            linkText="Santa Fe Spirits Tasting Room"
            text="If you're a fan of spirits and cocktails, Santa Fe Spirits Tasting Room is a pet-friendly option. Enjoy sampling local spirits and spirits-inspired cocktails while your pet rests comfortably at your side."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image4.png" text="Santa Fe Spirits Tasting Room" />

          <LinkContent
            link="https://www.emnrd.nm.gov/spd/find-a-park/cerrillos-hills-state-park/"
            linkText="Cerrillos Hills State Park"
            text="Embark on a pet-friendly adventure to Cerrillos Hills State Park, a hidden gem with scenic trails and historical sites. The diverse terrain makes it an exciting spot for hikers, and leashed pets are welcome to join the fun."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image12.png" text="Cerrillos Hills State Park" />

          <LinkContent
            link="https://golondrinas.org/"
            linkText="El Rancho de las Golondrinas"
            text="Explore New Mexico's past at El Rancho de las Golondrinas, a living history museum that allows leashed pets. This immersive experience provides a glimpse into the region's cultural heritage, making it a unique outing for you and your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image1.png" text="El Rancho de las Golondrinas" />

          <LinkContent
            link="https://santafefarmersmarket.com/"
            linkText="Santa Fe Farmers' Market"
            text="Wrap up your pet-friendly escapades with a visit to the Santa Fe Farmers' Market. While pets are not allowed inside the market buildings, the surrounding areas offer a lively atmosphere, and your pet can enjoy the company of fellow furry friends."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image14.png" text="Santa Fe Farmers' Market" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Santa Fe</Typography>
          <LinkContent
            link="https://teahousesantafe.com/"
            linkText="The Teahouse"
            text="Situated in a charming historic adobe, The Teahouse is a pet-friendly gem that serves an extensive selection of teas and delectable treats. Relax on the outdoor patio with your pet by your side while savoring their mouthwatering pastries and enjoying the lovely atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image9.png" text="The Teahouse" />

          <LinkContent
            link="https://cowgirlsantafe.com/"
            linkText="Cowgirl BBQ"
            text="A favorite among locals and visitors alike, Cowgirl BBQ offers a lively ambiance and a pet-friendly patio. Indulge in classic BBQ dishes and Tex-Mex specialties while your pet lounges comfortably beside you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image3.png" text="Cowgirl BBQ" />

          <LinkContent
            link="https://www.facebook.com/tiasophias/"
            linkText="Tia Sophia's"
            text="Known for its traditional New Mexican breakfast and lunch fare, Tia Sophia's welcomes pets on their charming outdoor patio. Treat yourself to mouthwatering breakfast burritos and enchiladas while your furry friend receives attention from the friendly staff."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image16.png" text="Tia Sophia's" />

          <LinkContent
            link="https://www.boxcar-restaurants.com/santafe/"
            linkText="Boxcar"
            text="Boxcar is a trendy eatery with a dog-friendly patio, making it an ideal spot for casual dining with your pet. Enjoy their diverse menu, including burgers, salads, and handcrafted cocktails, as you and your furry companion soak in the lively atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image7.png" text="Boxcar" />

          <LinkContent
            link="https://tomasitas.com/"
            linkText="Tomasita's"
            text="Specializing in Northern New Mexican cuisine, Tomasita's offers a pet-friendly patio where you can enjoy traditional dishes like enchiladas and green chile stew. The restaurant's friendly staff is sure to dote on your furry friend while you savor the flavors of the Southwest."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image13.png" text="Tomasita's" />

          <LinkContent
            link="https://elparasol.com/santa-fe-cerrillos-road/"
            linkText="El Parasol"
            text="A local favorite for quick and delicious Mexican food, El Parasol provides outdoor seating for you and your pet to enjoy together. From tacos to tamales, the menu boasts a variety of mouthwatering options that will satisfy your cravings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image17.png" text="El Parasol" />

          <LinkContent
            link="https://www.secondstreetbrewery.com/"
            linkText="Second Street Brewery"
            text="A pet-friendly microbrewery with a warm and inviting atmosphere, Second Street Brewery is an excellent choice for beer enthusiasts. Their outdoor seating area is perfect for you and your pet to enjoy some relaxation and tasty brews."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image2.png" text="Second Street Brewery" />

          <LinkContent
            link="https://jambocafe.net/"
            linkText="Jambo Café"
            text="Experience the vibrant flavors of African and Caribbean cuisine at Jambo Café, a pet-friendly restaurant with a diverse menu. Your pet can join you on the patio as you indulge in dishes like coconut curry and jerk chicken."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image5.png" text="Jambo Café" />

          <LinkContent
            link="https://www.counterculturesantafe.com/"
            linkText="Counter Culture Café"
            text="Tucked in the heart of Santa Fe, Counter Culture Café offers a pet-friendly courtyard where you can savor global-inspired dishes and delectable desserts. The relaxed ambiance and attentive service will ensure a delightful dining experience for both you and your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image11.png" text="Counter Culture Café" />

          <LinkContent
            link="https://www.elfarolsantafe.com/"
            linkText="El Farol"
            text="El Farol is not just any ordinary bar; it is a captivating and charming establishment that exudes a unique aura of warmth and hospitality. Nestled in the heart of a bustling city, this hidden gem has earned its reputation as a gathering place for the locals and the inquisitive souls who stumble upon its doors. "
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image8.png" text="El Farol" />



        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default SantaFe;
