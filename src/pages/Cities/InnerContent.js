import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { utils } from '../../services/utils'

import { gql, useQuery } from "@apollo/client";
import { LocationProperties } from "../../constants/constants";
import ListingCard from "../../components/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

export default function InnerContent({ cityId, cityName, city }) {

  const { loading, error, data } = useQuery(
    gql`
      ${LocationProperties}
    `,
    {
      variables: {
        cityId: cityId,
      },
    }
  );

  const HotelSection = ({ cityName, text, secondaryText, includedHotels = [] }) => {
    
    const hotelsToDisplay = data?.propertiesByLocation.filter(property => includedHotels.some(hotelAlias => hotelAlias === property.alias || hotelAlias === 'all')) || []
   
    return (
      <Box width="100%" padding="2.5rem" display="flex" flexDirection="column" gap="1rem">
        <Divider />
        <Typography mt="1rem" variant="base">{text}</Typography>
        {secondaryText && <Typography mb="1rem" variant="base">{secondaryText}</Typography>}
        
        <Typography variant="h2">Pet-Friendly Hotels in {cityName}</Typography>
        {hotelsToDisplay.map(card => (
          <Box key={card.id} sx={{ py: '0.5em' }}>
            <ListingCard
              {...card}
              city={{ name: city }}
              duration={2}
              highlighted={false}
              petFeePolicy={{ ...card.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, card.petFeePolicy)}} 
            />
          </Box>
        ))}
        {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
      </Box>
    )
  }
  const LinkContent = ({ link, linkText, text }) => (
    <Box>
      <Typography variant="base" component="p"><a href={link} target="_blank" rel="noreferrer">{linkText}</a></Typography>
      <Typography variant="base">{text}</Typography>
    </Box>
  )

  if (cityName === 'San Francisco') {
    return (<>
 
      <HotelSection 
        text="You of course know San Francisco for the Golden Gate Bridge, Alcatraz, and its endless array of tech companies.  However, it&apos;s also a great destination for pet owners, with its temperate climate, ample green space, and pup-friendly stores and restaurants. So before you head to the Bay, here&apos;s what you and your furry friend should keep in mind."
        secondaryText="(If your furry friend could read. Maybe they can. We&apos;re not making any assumptions.)"
        cityName="San Francisco"
        includedHotels={
          [
            'pet-friendly-hotels-san-francisco-hilton-san-francisco-union-square',
            'pet-friendly-hotels-san-francisco-marriott-fishermans-wharf',
            'pet-friendly-hotels-san-francisco-hyatt-regency-san-francisco-embarcadero',
            'pet-friendly-hotels-san-francisco-kimpton-alton-hotel-fishermans-wharf',
            'pet-friendly-hotels-san-francisco-intercontinental-san-francisco',
            'pet-friendly-hotels-san-francisco-argonaut-hotel'
          ]
        }
      />

      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in San Francisco</Typography>
        <Typography variant="base">Looking for things to do with your pet in San Francisco?  Check out some of these pet-friendly activities:</Typography>

        <Typography variant="h5">Explore San Francisco&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent 
          link="https://www.altaplazapark.com/visit" 
          linkText="Alta Plaza Dog Play Areas" 
          text="Alta Plaza Park is one of the most popular dog-friendly parks in San Francisco. The park has plenty of open space for dogs to run around, as well as benches and trees where their owners can relax. There&apos;s also a small pond where dogs can take a swim (or drink from, if they&apos;re more interested in water than balls). Alta Plaza Park is conveniently located near many restaurants and cafes, so dog owners can grab a bite to eat after spending some time at the park."
        />

        
        <LinkContent 
          link="https://www.bellairetx.gov/739/Dog-Park" 
          linkText="Lafayette Dog Park" 
          text="Lafayette Park Dog Play Area is a great place for dog owners to let their furry friends run around and play. The park has plenty of amenities, including a large open space, benches, and water fountains."
        />

        <LinkContent
          link="https://sfrecpark.org/Facilities/Facility/Details/Duboce-Park-Dog-Play-Area-8" 
          linkText="Duboce Park" 
          text="Duboce Park is a great place for a morning jog or a leisurely walk. It has a dog park where your furry friend can run around and play. The park is situated in the heart of the city, making it easy to get to from anywhere."
        />
        
        <LinkContent
          link="https://sfrecpark.org/Facilities/Facility/Details/Head-Brotherhood-Dog-Play-Area-14" 
          linkText="Head & Brotherhood Dog Play Area"
          text="Head & Brotherhood Dog Park is a great place to take your furry friend for a walk or a run. The park has plenty of open space, as well as a few benches where you can sit and relax. There's also a water fountain, so your dog can stay hydrated during their playtime"
        />
       
        <LinkContent 
          link="https://sfrecpark.org/Facilities/Facility/Details/Walter-Haas-Dog-Play-Areas-28" 
          linkText="Walter Haas Dog Play Area"
          text="Walter Haas Dog Play Area is well-maintained and has plenty of space for dogs to run around. There are also several benches where dog owners can relax and watch their pets play. The park is open from dawn until dusk, making it convenient for both morning and evening walks."
        />
        
        <LinkContent
          link="https://sfrecpark.org/Facilities/Facility/Details/Jefferson-Square-Dog-Play-Area-15" 
          linkText="Jefferson Square Dog Play Area" 
          text="Jefferson Square Dog Play Area is a great place for dogs to get some exercise and socialize. The park has a large open space for dogs to run around, as well as several obstacles, including a tunnel and a balance beam."
        />
    
        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.nps.gov/goga/planyourvisit/landsend.htm"
          linkText="Lands End Trail"
          text="This trail is a great option for those looking for an easy hike with their dog. The trail offers stunning views of the Golden Gate Bridge and the San Francisco skyline. It's also a great place to spot wildlife, including birds, squirrels, and deer."
        />

        <LinkContent 
          link="https://sfrecpark.org/facilities/facility/details/Bernal-Heights-Park-151"
          linkText="Bernal Heights Park Trail"
          text="Bernal Heights Park is a great place for a scenic walk with your dog. The trail is well-maintained and easy to follow, making it perfect for an afternoon stroll while taking in the beautiful views of San Francisco. Dogs are welcome off-leash on the trail, so your pup can run around and explore. Be sure to bring water and poop bags for your pet, as there are no waste stations along the way"
        />

        <LinkContent
          link="https://www.parks.ca.gov/?page_id=471"
          linkText="Cataract Falls"
          text="Cataract Falls is a popular hiking spot for dogs and their owners. Dogs are allowed in the 6.4-mile Tamalpais hiking trail. Feel free to let your dog off leash where appropriate!"
        />

        <LinkContent
          link="https://www.parksconservancy.org/parks/fort-funston"
          linkText="Fort Funston"
          text=" Fort Funston is a rugged hike trail that you can walk with your dog, providing scenic views of the Bay and Lake Merced."
        />

        <LinkContent
          link="https://www.alltrails.com/trail/us/california/dawn-falls?u=m"
          linkText="Dawn Falls, Larkspur"
          text="The hike is dog-friendly and offers a great view of Dawn Falls. It's an easy hike, perfect for beginners or those with small children. There are plenty of places to rest along the way, so it won't be too strenuous for you or your pup."
        />

        <LinkContent
          link="https://www.ebparks.org/parks/diablo-foothills"
          linkText="Diablo Foothills Regional Park"
          text="Diablo Foothills Regional Park is a great place to take your dog for a hike. The park has over 50 miles of trails, making it perfect for an adventurous day trip. Dogs are allowed on all trails except for the Backcountry Trail. Be sure to bring plenty of water and some snacks for you and your pup, as there are no food or water stations along the way."
        />

        <Typography variant="h5">Take a Pet-Friendly Boat Ride or Cruise</Typography>
        <LinkContent
          link="https://sanfranciscobayferry.com/"
          linkText="San Francisco Bay Ferry"
          text="Take your dog on a ferry ride around the bay and enjoy the fresh air and beautiful views of San Francisco. Relax on the deck with your pup by your side. Stop at Angel Island for a picnic lunch and spend the day exploring different parts of the Bay Area. You can take your dog if it's within an enclosed pet carrier that can fit on your lap and they do not pose a threat to passengers or crew members."
        />

        <LinkContent
          link="https://www.blueandgoldfleet.com/"
          linkText="San Francisco's Blue and Gold Bay Fleet Cruises"
          text="Take a scenic cruise on the bay while enjoying the fresh air and beautiful views. Bring your dog along for the ride and let them enjoy the sights and smells of San Francisco Bay. Watch sea lions, dolphins, and other marine life in their natural habitats. Relax on deck as you sail by Alcatraz Island, Angel Island, and the Golden Gate Bridge. Dogs are allowed if on a leash."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.barebottle.com/"
          linkText="Barebottle Brewing Company"
          text="Stop by this pet-friendly brewery for a refreshing pint of beer. Your dog can relax at your feet while you enjoy a flight of different beers. The brewery also has a food truck on site, so you can grab a bite to eat. Dogs are welcome inside and out."
        />

        <LinkContent
          link="https://freewheelbrewing.com/"
          linkText="Freewheel Brewing Company"
          text="Looking for a pet-friendly brewery in the Bay Area? Look no further than Freewheel Brewing Company! This brewery welcomes dogs of all shapes and sizes, so you can bring your pup along for a cold one."
        />

        <LinkContent
          link="https://www.hmbbrewingco.com/"
          linkText="Half Moon Bay Brewing Company"
          text="Half Moon Bay Brewing Company is one of the many dog-friendly establishments near San Francisco. They have a wide variety of beers on tap as well as food options that both you and your pup can enjoy. The patio features plenty of seating, shade, and even a water bowl for your pet. It's the perfect place to relax and spend some quality time with your four-legged friend."
        />

        <LinkContent
          link="https://russianhillwinery.com/"
          linkText="Russian Hill Estate Winery"
          text="Looking to take a day trip out of the city. Russian Hill Estate Winery is a dog-friendly winery in nearby Sonoma County. Bring your furry friend along for a day of wine tasting. The winery has a large outdoor space where dogs are allowed to run and play. There are plenty of shaded areas where your dog can take a break from the sun."
        />

        <Typography variant="h5">Check Out San Francisco&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.palmcitysf.com/"
          linkText="Palm City"
          text="Palm City is a great spot for breakfast or lunch with your pup. The restaurant has a large patio where dogs are welcome. Enjoy some of their delicious food while your dog relaxes at your feet."
        />

        <LinkContent
          link="http://www.kitchenstorysf.com/"
          linkText="Kitchen Story"
          text=" Kitchen Story is a pet-friendly restaurant in the Castro that serves up some of the best brunch in town. They have a large patio where dogs are welcome. Your pup can relax while you enjoy their famous french toast or eggs benedict."
        />

        <LinkContent
          link="https://www.delpopolosf.com/"
          linkText="Del Popolo"
          text="Del Popolo is a wood-fired pizza place in the Mission that also happens to be pet-friendly. Enjoy a slice of pizza or two while your dog hangs out on the patio."
        />

        <LinkContent
          link="https://www.novysf.com/"
          linkText="Novy Restaurant"
          text="Novy is a restaurant in the North Beach that has a large pet-friendly patio. They serve American comfort food with a twist. Stop by for lunch or dinner and enjoy a meal with your four-legged friend."
        />

        <Typography variant="h2">San Francisco&apos;s Pet Stores</Typography>
        <Typography variant="base">San Francisco is home to a number of pet stores where you can find everything you need for your furry friend.</Typography>

        <LinkContent
          link="https://www.petsmart.com/"
          linkText="PetSmart"
          text="PetSmart is a pet store chain that has locations all over the country. In San Francisco, there are two stores - one in the Mission and one in the Sunset. PetSmart carries everything you need to take care of your pet, from food and toys to clothes and accessories. They also offer grooming services."
        />

        <LinkContent
          link="https://www.woodlandsmarket.com/petshop/"
          linkText="Woodlands Pet Shop"
          text="Woodlands Pet Shop is a local pet store in the East Cut. They carry a wide variety of items for pets, including food, toys, and accessories. They also have a grooming salon on site."
        />

        <LinkContent
          link="https://www.ilovevp.com/"
          linkText="Village Pets & Stores"
          text="Village Pets & Stores is a pet store in Noe Valley that has been serving the community for over 25 years. They carry everything you need to take care of your pet, from food and toys to clothes and accessories. They also offer grooming services."
        />

        <Typography variant="h2">Dog Daycares and Boarding Facilities in San Francisco</Typography>
        <Typography variant="base">Looking for  a place to leave your dog while you go off on day trips? Check out one of these dog daycares or boarding facilities in San Francisco.</Typography>

        <LinkContent
          link="https://www.playbowdogs.com/"
          linkText="PlayBow Dog Daycare & Sleepovers"
          text=" PlayBow is a dog daycare and boarding facility in Ingleside. They offer a variety of services, including daycare, overnight boarding, walking, and more."
        />

        <LinkContent
          link="https://www.fogcitydogs.com/"
          linkText="Fog City Dogs"
          text="With locations in Bayview and the Marina,  Fog City Dogs is a great option for dog daycare and boarding. Among other services, they offer dog walking, daycare, and boarding."
        />

        <LinkContent
          link="https://www.thegratefuldog.org/"
          linkText="The Grateful Dog"
          text="The Grateful Dog is a locally owned dog daycare and boarding facility in Pacific Heights. They offer a variety of services, including daycare, boarding, walking, and more."
        />

      </Box>
    </>)
  } else if (cityName === 'San Diego') {
    return (<>
      <HotelSection 
        text="Looking for a pet-friendly hotel in San Diego? You're in luck! This guide will help you find the best places to stay in SD that will welcome both you and your furry friend. From dog-walking areas to pet-friendly restaurants, we've got you covered. So pack your bags and bring along your pup – San Diego is waiting for you!"
        secondaryText="San Diego is a pet-friendly city, and that means there are plenty of hotels that will welcome you and your furry friend. Here are some of our top picks for pet-friendly hotels in San Diego:"
        cityName="Gaslamp Quarter and Downtown San Diego"
        includedHotels={
          [
            'pet-friendly-hotels-san-diego-andaz-san-diego',
            'pet-friendly-hotels-san-diego-hotel-indigo-san-diego-gaslamp-quarter',
            'pet-friendly-hotels-san-diego-salomar-san-diego',
            'pet-friendly-hotels-san-diego-intercontinental-san-diego',
            'pet-friendly-hotels-san-diego-kimpton-hotel-palomar-san-diego',
            'pet-friendly-hotels-san-diego-hotel-republic',
            'pet-friendly-hotels-san-diego-pendry-san-diego'
          ]
        }
      />

      <HotelSection 
        text=""
        secondaryText=""
        cityName="La Jolla"
        includedHotels={
          [
            'pet-friendly-hotels-san-diego-hyatt-regency-la-jolla'
          ]
        }
      />

      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in San Diego</Typography>
        <Typography variant="base">Looking for things to do with your pet in San Diego? Check out some of these pet-friendly activities:</Typography>

        <Typography variant="h5">Explore San Diego&apos;s Off-Leash Dog Parks</Typography>
        <Typography variant="base">If you&apos;re looking for a place to take your furry friend for some exercise, San Diego has plenty of off-leash dog parks to choose from. Some of the best ones include:</Typography>

        <LinkContent
          link="https://balboapark.org/parks-trails-gardens/dog-parks/"
          linkText="Balboa Park"
          text="This large park offers plenty of space for dogs to run around and play, and there are also several ponds where they can take a swim. Nate's Point is Balboa Park's all-day off-leash park, though Grapestreet allows off-leash from 7:30 AM until 9 PM."
        />

        <LinkContent
          link="https://oceanbeachsandiego.com/attractions/beaches/dog-beach"
          linkText="Ocean Beach Dog Beach"
          text="This beach is a favorite for dog owners in San Diego, and it offers plenty of space for them to run and play in the sand and surf."
        />

        <LinkContent
          link="https://coronadovisitorcenter.com/listings/coronado-dog-beach/"
          linkText="Coronado Dog Beach"
          text="Another great pet-friendly beach in San Diego, Coronado offers plenty of space for dogs to swim, play, and explore."
        />

        <LinkContent
          link="https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay/dfc"
          linkText="Mission Bay"
          text="Located in Mission Beach, Mission Bay is a pet-friendly park that offers a variety of amenities, including pet waste stations, water fountains, and more. Dogs must be on a leash at all times in most sections of Mission Bay, although Channel Street, Fiesta Island, and Berry Street allow off-leash play."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <Typography variant="base">San Diego is home to some beautiful hiking trails, and many of them are pet-friendly! Here are a few of our favorites:</Typography>

        <LinkContent
          link="https://www.sandiego.gov/park-and-recreation/parks/osp/lospenasquitos"
          linkText="Los Penasquitos Canyon Preserve"
          text="This preserve offers over 10 miles of pet-friendly hiking trails, as well as a creek where dogs can cool off. Leashed dogs are allowed."
        />

        <LinkContent
          link="https://www.fs.usda.gov/recarea/willamette/recarea/?recid=4345"
          linkText="Iron Mountain Trail"
          text="This 6-mile trail offers stunning views of the city and is a great place to take your pup for a hike."
        />

        <LinkContent
          link="https://www.sandiego.gov/park-and-recreation/parks/regional/shoreline/sunset"
          linkText="Sunset Cliffs Natural Park"
          text="This park offers over 68 acres of pet-friendly hiking trails with stunning ocean views."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <Typography variant="base">San Diego is home to a number of pet-friendly breweries and wineries, where you can enjoy a drink with your furry friend by your side. Some of our favorites include:</Typography>

        <LinkContent
          link="https://www.stonebrewing.com/visit/bistros/escondido"
          linkText="Stone Brewing World Bistro & Gardens"
          text="This pet-friendly brewery offers a beer garden where you can enjoy a cold one with your pup outdoors."
        />

        <LinkContent
          link="https://www.karlstrauss.com/"
          linkText="Karl Strauss Brewing Company"
          text="This brewery has pet-friendly outdoor seating, so you can enjoy a pint or two with your four-legged friend."
        />

        <LinkContent
          link="https://www.bocceballwine.com/club/"
          linkText="Bocce Club Winery"
          text="This pet-friendly winery has a beautiful patio where you can relax with your pup and enjoy a glass of wine."
        />

        <Typography variant="h5">Check Out San Diego&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <Typography variant="base">San Diego is home to plenty of pet-friendly restaurants and cafes, where you can enjoy a meal with your pet. Some of our favorites include:</Typography>

        <LinkContent
          link="https://www.thelotent.com/restaurant#!"
          linkText="The Lot"
          text="This pet-friendly restaurant has an outdoor patio where you can enjoy a meal with your pup."
        />

        <LinkContent
          link="https://www.cucinaurbana.ca/"
          linkText="Cucina Urbana"
          text="This pet-friendly eatery has an outdoor patio where dogs are welcome to join their owners for a meal."
        />

        <LinkContent
          link="https://www.asrestaurant.com/"
          linkText="Mister A's"
          text="This pet-friendly restaurant has an outdoor patio with stunning views of the city, making it the perfect place to enjoy a meal with your dog."
        />

        <Typography variant="h2">Take a Pet-Friendly Boat Ride or Cruise</Typography>
        <Typography variant="base">San Diego offers a number of pet-friendly boat rides and cruises, where you can enjoy the city&apos;s beautiful waterfront with your dog by your side. Some of our favorites include:</Typography>

        <LinkContent 
          link="https://www.cityexperiences.com/san-diego/city-cruises/pet-day-on-the-bay-annual-cruise/"
          linkText="Hornblower Cruises & Events"
          text="This pet-friendly cruise company offers a variety of cruises, including dinner cruises, wine tasting cruises, and champagne brunch cruises."
        />

        <LinkContent
          link="https://www.flagshipsd.com/cruises/san-diego-harbor-tour"
          linkText="San Diego Harbor Excursions"
          text="This pet-friendly boat tour company offers a variety of tours, including narrated harbor tours and whale watching tours."
        />


        <Typography variant="h2">Explore San Diego&apos;s Pet-Friendly Attractions</Typography>
        <Typography variant="base">San Diego is home to a number of pet-friendly attractions, where you and your furry friend can explore and have fun. Some of our favorites include:</Typography>

        <LinkContent
          link="https://www.gopetfriendly.com/activities/shopping/ca/san-diego/seaport-village"
          linkText="Seaport Village"
          text="This pet-friendly shopping and dining area offers a variety of shops and restaurants, as well as beautiful waterfront views."
        />

        <LinkContent
          link="https://www.parks.ca.gov/?page_id=663#"
          linkText="Old Town San Diego State Historic Park"
          text="This pet-friendly park is home to a number of historic buildings, as well as a variety of shops and restaurants."
        />

        <Typography variant="base">Go to a game at <a href="https://www.mlb.com/padres/ballpark" targte="_blank" rel="norefferer">Petco Park</a>, where pet-friendly seating is available.</Typography>

        <Typography variant="h2">Shop at San Diego&apos;s Pet Stores</Typography>
        <Typography variant="base">San Diego is home to a number of pet-friendly stores, where you can find everything you need for your furry friend. Some of our favorites include:</Typography>

        <LinkContent
          link="https://stores.petco.com/ca/sandiego/pet-supplies-sandiego-ca-1190.html"
          linkText="Unleashed by Petco"
          text="This pet-friendly store offers a variety of pet supplies, as well as dog training classes."
        />

        <Typography variant="h2">Dog Daycares and Boarding Facilities in San Diego</Typography>
        <Typography variant="base">If you need to set off for an afternoon and can&apos;t bring your pal, San Diego is home to some world-class pet daycares and boarding facilities where your pet will be well taken care of.</Typography>

        <LinkContent
          link="https://www.camprunamutt.com/eastcounty/"
          linkText="Camp Run-A-Mutt"
          text="This pet daycare and boarding facility in Mission Valley also has a pet-friendly patio where you can enjoy a meal with your dog. The facility offers a variety of services, including daycare, boarding, training, and more."
        />

        <LinkContent
          link="https://www.pawsibilitiesrescue.org/"
          linkText="Pawsibilities"
          text="This pet daycare and boarding facility in Kearny Mesa also has a pet-friendly patio where you can enjoy a meal or snack with your dog. The facility offers a variety of services, including daycare, boarding, grooming."
        />

      </Box>
    </>)
  } else if (cityName === 'Palm Springs') {

    return (<>
      <HotelSection 
        text="Planning to travel to Palm Springs with your four-legged friend? You'll be happy to know that this pet-friendly city has plenty of activities and destinations that are perfect for you and your pet. From hotels that welcome pets to trails and parks where they can run and play, here are some of the best places to take your pet in Palm Springs."
        secondaryText=""
        cityName="Palm Springs"
        includedHotels={
          [
            'pet-friendly-hotels-palm-springs-margaritaville-resort-palm-springs',
            'pet-friendly-hotels-palm-springs-arrive-palm-springs',
            'pet-friendly-hotels-palm-springs-kimpton-rowan-palm-springs'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Palm Springs</Typography>

        <Typography variant="h5">Explore Palm Springs&apos;s Off-Leash Dog Parks</Typography>
        <LinkContent
          link="https://www.palmspringsca.gov/government/departments/parks-recreation/parks-facilities/dog-park"
          linkText="David H. Ready Palm Springs Dog Park"
          text="This 1.6 acre off-leash dog park provides distinct play areas for large and small dogs, in addition to picnic benches and tables, drinking fountains, and shade structures."
        />

        <LinkContent
          link="https://escena.com/live/highlights/"
          linkText="Escena Private Community Bark Park"
          text="The Escena Bark Park has a dedicated dog park next to the golf course, so you can take your pup for a playdate before hitting the links. It also has a Lounge & Grill that serves a wide variety of meals."
        />

        <LinkContent
          link="https://www.palmdesert.gov/our-city/departments/parks-recreation/palm-desert-parks/city-park-list/civic-center-park"
          linkText="Civic Center Dog Park"
          text="Apple Valley Dog Park is the perfect place to let your furry friend(s) run free! The park offers two off-leash areas, one for small dogs and another for large dogs."
        />

        <LinkContent
          link="https://www.countyoffice.org/mulligan-dog-park-indio-ca-9b7/"
          linkText="Mulligan Dog Park"
          text="This off-leash dog recreation area in Indio is the perfect place to take your pup for a romp!"
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.hikingproject.com/trail/7103944/homestead-trail-to-palm-desert-cross"
          linkText="Homestead Trail"
          text="The Homestead Trail is a hiking trail located in Palm Desert. The trail is a moderate hike that goes up the Shadow Mountain, and it allows dogs off-leash. The trail offers beautiful views of the surrounding area, and it's a great place for a dog to get some exercise."
        />

        <LinkContent
          link="https://www.laquintaca.gov/business/community-resources/parks-and-trails/cove-oasis-trailhead"
          linkText="La Quinta Cove Oasis"
          text="If you're looking for a large, open space where you can hike with your dog and go on a picnic, the La Quinta Cove Oasis is the perfect spot. This park offers plenty of room for your pet to run around and play, and it also has picnic benches where you can enjoy a meal with your furry friend."
        />

        <LinkContent
          link="https://ranchomirageca.gov/wp-content/uploads/2019/01/Web-version-final-12-11-18.pdf"
          linkText="Butler-Abrams Trail"
          text=" This 2.2 mile trail located in Rancho Mirage is suitable for easy hiking with dogs, and features scenic views of the Santa Rosa Mountains."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>

        <LinkContent
          link="https://www.cvbco.com/"
          linkText="Coachella Brewery"
          text=" For a hazy pour alongside your lazy pooch, try out the Coachella Brewery in Palm Springs! This pet-friendly brewery welcomes dogs in the taproom. They have a wide variety of beer on tap, as well as food trucks that come by to provide snacks."
        />

        <LinkContent
          link="https://www.laspalmasbrewing.com/"
          linkText="Las Palmas Brewing"
          text="Las Palmas Brewing is another pet-friendly brewery in Palm Springs. This brewery allows dogs in the beer garden or front patio. They have a variety of beers on tap, as well as a food menu that features bar bites and burgers."
        />

        <LinkContent
          link="https://www.idyllwildbrewpub.com/"
          linkText="Idyllwild Brewpub"
          text="Idyllwild Brewpub is a great option for dog owners looking for a place to drink -- and is equally accommodating to the dogs themselves! Idyllwild provides clean drinking bowl so your dog can quench itself while you sip a beer. Better yet, they prioritize sustainability through their use of solar panels and pure mountain well water."
        />

        <Typography variant="h5">Check Out Palm Springs&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://4pawscoffeeco.com/"
          linkText="4 Paws Coffee Co."
          text="4 Paws Coffee Co. is a pet-friendly coffee shop that has a special menu just for dogs! This cafe has a variety of coffees and teas, as well as pastries and sandwiches. Dogs are welcome to sit with their owners at the outdoor tables."
        />

        <LinkContent
          link="https://bubbasbonesandbrews.com/home"
          linkText="Bubba's Bones & Brews"
          text="Bubba’s Bones & Brews is a pet-friendly restaurant that specializes in barbecue. They have a wide variety of meats and sides, as well as a full bar. Dogs are welcome to sit with their owners at the outdoor tables."
        />

        <LinkContent
          link="https://farmpalmsprings.com/"
          linkText="Farm"
          text="Farm is a pet-friendly restaurant that specializes in healthy, organic food. They have a wide variety of salads, sandwiches, and main dishes. Dogs are welcome to sit with their owners at the outdoor tables."
        />

        <Typography variant="h2">Palm Springs Dog Daycare and Boarding</Typography>
        <Typography variant="base">Need to run some errands or set off on a daytrip where you can&apos;t bring your pooch? No need to worry, as Palm Springs is home to numerous doggy daycare centers. Here are a few of our favorites:</Typography>

        <LinkContent
          link="https://www.theshabbydogpalmsprings.com/"
          linkText="Shabby Dog Palm Springs"
          text="Shabby Dog is a pet-friendly daycare and boarding center that offers a variety of services, including dog walking, bathing, and grooming."
        />

        <LinkContent
          link="https://thegrandpaw.com/palm-springs/"
          linkText="Doggie Daycamp"
          text="Doggie Daycamp is another great option for pet-friendly daycare and boarding in Palm Springs. They offer a variety of services, including dog walking, bathing, and grooming."
        />

        <LinkContent
          link="https://doggiesdayoutofps.com/"
          linkText="Doggie's Day Out of Palm Springs"
          text=" If you're looking for a pet-friendly daycare center that offers a wide variety of services, Doggie's Day Out is the perfect place for you. They offer everything from dog walking and bathing, to grooming and training."
        />

        <Typography variant="h2">Palm Springs&apos; Best Pet Stores</Typography>
        <Typography variant="base">A pup vacation certainly warrants a new toy or ten, right? Here are your best options for pet stores in Palm Springs.</Typography>

        <LinkContent  
          link="https://stores.petco.com/ca/palmsprings/pet-supplies-palmsprings-ca-1158.html"
          linkText="Petco"
          text="Petco is a pet store chain that offers a wide variety of pet supplies, including food, toys, and accessories. They also offer a wide variety of services, such as dog training and grooming."
        />

        <LinkContent
          link="https://www.petsmart.com/stores/us/ca/palm-springs-store1380.html"
          linkText="PetSmart"
          text='Although Petco may be a better choice for those looking for a one-stop shop, PetSmart is home to some unique services that you won\u&apos;t find at any other pet store. They also offer a variety of classes, such as "pet training for dummies" and "dog obedience school."'
        />

        <LinkContent
          link="http://www.coldnosewarmheart.org/"
          linkText="Cold Nose Warm Heart"
          text="If you're looking for a more boutique pet store experience, look no further than Cold Nose Warm Heart. This pet store specializes in organic and natural pet products. They also offer a wide variety of services, such as dog walking and grooming."
        />

        <LinkContent
          link="https://my.bonesnscones.com/"
          linkText="Bones-N-Scones"
          text="Bones-N-Scones is a pet bakery that specializes in all-natural treats for dogs. They offer a wide variety of flavors, as well as gluten-free and grain-free options."
        />

        <LinkContent
          link="https://earthwisepet.com/"
          linkText="EarthWise Pet Supply"
          text="EarthWise Pet Supply is a pet store that specializes in eco-friendly and natural pet products. They offer a wide variety of food, toys, and accessories."
        />

      </Box>
    </>)
  } else if (cityName === 'Los Angeles') {
    return (<>
      <HotelSection 
        text="Step aside, silver screen celebs -- we know the biggest star of your Los Angeles vacation is sure to be your four-legged friend. From the beaches of Santa Monica to the hipster haven of Silver Lake, you'll have no problem bringing your pup along for the many adventures LA has to offer."
        secondaryText="Though Los Angeles is very accessible for most pets, it's important to remember that not all hotels and businesses in Los Angeles are pet-friendly. By booking your pet-friendly hotel through Romingo, you can easily find the best pet-friendly hotels across the city and bring your pet for no additional fee!"
        cityName="Los Angeles"
        includedHotels={
          [
            'pet-friendly-hotels-los-angeles-mondrian-los-angeles',
            'pet-friendly-hotels-los-angeles-the-line-la',
            'pet-friendly-hotels-los-angeles-kimpton-la-peer-hotel',
            'pet-friendly-hotels-los-angeles-softiel-los-angeles-at-beverly-hills',
            'pet-friendly-hotels-los-angeles-1-hotel-west-hollywood',
            'pet-friendly-hotels-los-angeles-kimpton-hotel-wilshire'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Los Angeles</Typography>
        <Typography variant="base">Next up, let&apos;s dive into the top pet-friendly activities in Los Angeles.</Typography>

        <Typography variant="h5">Visit Los Angeles&apos; Off-Leash Dog Parks and Beaches</Typography>
        <LinkContent
          link="https://www.laparks.org/dogpark/sepulveda"
          linkText="Sepulveda Basin Off-Leash Dog Park"
          text="If you're looking for a less crowded dog park with lots of benches and shades for relaxing with your dog, head to the Sepulveda Basin Off-Leash Dog Park. This park is located in the San Fernando Valley and offers plenty of space for your dog to run around and play."
        />

        <LinkContent
          link="https://www.laparks.org/dogpark/griffith"
          linkText="Griffith Park Dog Park"
          text="If you're looking for a more active dog park, then Griffith Park Dog Park is the place for you. Located in the heart of Griffith Park, this park offers plenty of space for dogs to run and play, as well as a large pond where they can take a swim."
        />

        <LinkContent
          link="https://www.zuma-beach.com/"
          linkText="Zuma Beach"
          text="This beach is located in Malibu and is known for its wide variety of activities, including surfing, sunbathing, and swimming. Dogs are allowed on the beach yearround, but must be leashed from 9 AM-6 PM from November through April."
        />

        <Typography variant="h5">Take a Hike with Your Pup in Los Angeles</Typography>
        <Typography variant="base">For a more active outdoor excursion, hit the best trails in Los Angeles with your pup! Among our favorite trails for hikes with your dog in LA:</Typography>

        <LinkContent
          link="https://www.laparks.org/runyon/"
          linkText="Runyon Canyon"
          text="If you're looking for a great place to hike with your pup in Los Angeles, look no further than Runyon Canyon. This 90-acre park is located in the Hollywood Hills and offers plenty of space for dogs to run and play. There are also some great views of the city from the top of the trail."
        />

        <LinkContent
          link="https://www.alltrails.com/trail/us/california/eaton-canyon-trail?u=m"
          linkText="Eaton Canyon Falls"
          text="This 3.8-mile roundtrip hike is located in Pasadena and leads to a beautiful 40-foot waterfall. Dogs are allowed on this trail, but must be leashed at all times."
        />

        <LinkContent
          link="https://www.laparks.org/griffithpark/"
          linkText="Griffith Park"
          text="Looking to venture beyond Griffith's dog park? This park also offers numerous trails for hiking with your pup. Griffith Park is one of the largest municipal parks in the country, so you're sure to find a trail that's perfect for you and your dog."
        />

        <Typography variant='h5'>Visit a Pet-Friendly Brewery</Typography>
        <Typography variant="base">Cool off with your pup by your side at one of LA&apos;s many pet-friendly breweries. Among our favorites:</Typography>
     
        <LinkContent
          link="https://hpb.la/"
          linkText="Highland Park Brewery"
          text="If you're looking for a great place to relax and have a beer with your dog by your side, head to Highland Park Brewery. This brewery is pet-friendly and offers a large outdoor space where you and your dog can hang out. They also have a food truck on-site, so you can enjoy some delicious grub while you're there."
        />

        <LinkContent
          link="https://www.goldenroad.la/"
          linkText="Golden Road Brewing"
          text="Just across the LA River from the Los Angeles Zoo, you'll find Golden Road Brewing. Enjoy Golden Road's famous Mango Cart with your pup by your side."
        />

        <LinkContent
          link="https://www.frogtownbrewery.com/"
          linkText="Frogtown Brewery"
          text="Boasting a beer garden and rotating array of food trucks, Frogtown is an ideal stop for some suds. Your furry friend will be well taken care of, too -- Frogtown provides water bowls and allows all pups so long as they're kept on a leash."
        />

        <Typography variant="h5">Check Out Los Angeles&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.theeveleigh.com/"
          linkText="Eveleigh"
          text="This West Hollywood restaurant offers a dog-friendly patio, complete with a shady canopy and wide selection of craft cocktails."
        />

        <LinkContent
          link="https://kogibbq.com/"
          linkText="Kogi BBQ Food Truck"
          text="This popular Korean-Mexican fusion food truck is pet-friendly and rolls up to various spots throughout the LA area. It's the perfect spot for you and your pup to grab some tasty grub."
        />

        <LinkContent
          link="https://www.threesquarescafe.com/"
          linkText="3 Square Cafe & Bakery"
          text="This Venice Beach cafe has both pet-friendly indoor and outdoor seating, and offers a wide selection of breakfast and lunch dishes. They also have doggy bowls for water!"
        />

        <Typography variant="h5">Los Angeles Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://puparazzila.com/"
          linkText="Puparazzi LA"
          text="If you're looking for a place to leave your pet while you're on vacation, Puparazzi LA is a great option. They offer dog boarding, dog training, dog walking, and dog grooming, so they can take care of all your pet needs while you're away."
        />

        <LinkContent  
          link="http://ladogworks.com/"
          linkText="LA Dogworks"
          text="Boasting 24-hour service, LA Dogworks offers daycare, boarding, grooming, and training services, so your dog can stay happy and healthy whenever you need to take a humans-only excursion."
        />

        <LinkContent
          link="https://wagville.com/"
          linkText="Wagville"
          text="This daycare, boarding, and pet walking facility is staffed with certified pet care specialists 24/7. And they even offer pick-up and drop-off services, so you don't have to worry about getting your pup to their facility!"
        />

        <LinkContent
          link="https://thewagsclub.com/"
          linkText="The Wags Club"
          text="If you want your furry friend to enjoy some luxury while you putz about LA, The Wags Club offers a cage-free, indoor/outdoor facility."
        />

        <LinkContent
          link="https://www.rileysdoggiedaycare.com/"
          linkText="Riley's Doggie Daycare, Boarding & Grooming"
          text="Riley's is a dog daycare facility located in Downtown LA that offers daycare, boarding, and pet grooming."
        />

        <Typography variant="h5">Los Angeles&apos;s Pet Stores</Typography>
        <LinkContent
          link="https://www.theurbanpet.net/"
          linkText="The Urban Pet"
          text="With 5 locations across LA, The Urban Pet offers pet supplies, grooming services, more than 80 brands of pet food, and even a daycare. It's the perfect place to stock up on supplies for your pup before heading out on an adventure!"
        />

        <LinkContent
          link="https://petprojectla.com/"
          linkText="Pet Project LA"
          text="Perfect for the trendiest of hounds, Pet Project LA sells pooch apparel, pet carriers, healthy food, and more."
        />

        <Box>
          <Typography variant="base" component="p"><a href="https://stores.petco.com/ca/losangeles/pet-supplies-losangeles-ca-908.html" target="_blank" rel="noreferrer">Petco</a> and <a href="https://www.petsmart.com/stores/us/ca/los-angeles-store2195.html" target="_blank" rel="noreferrer">PetSmart</a></Typography>
          <Typography variant="base">No pet lover&apos;s guide to Los Angeles would be complete without mentioning the two largest pet supply stores in the area: Petco and PetSmart. Both stores have multiple locations throughout Los Angeles, so you can easily find what you need when it comes to taking care of your pup. From food and toys to leashes and beds, these stores have it all.</Typography>
        </Box>

      </Box>
    </>)
  } else if (cityName === 'Sacramento') {
    return (<>
      <HotelSection 
        text="Looking for a pet-friendly destination in California? Look no further than Sacramento! This capital city is home to numerous dog parks and activities that will make both you and your furry friend happy. From outdoor adventures to cultural attractions, Sacramento has something for everyone -- and everypup. So what are you waiting for?"
        secondaryText=""
        cityName="Sacramento"
        includedHotels={
          [
            'pet-friendly-hotels-sacramento-hyatt-regency-sacramento',
            'pet-friendly-hotels-sacramento-kimpton-sawyer-hotel'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Sacramento</Typography>
        <Typography variant="base">Looking for pet-friendly activities in Sacramento? Here are a few activities you can indulge in with your pup:</Typography>

        <Typography variant="h5">Explore Sacramento&apos;s Off-Leash Dog Parks</Typography>
        <Typography variant="base">Sacramento has several off-leash dog parks. These include:</Typography>

        <LinkContent 
          link="https://www.cityofsacramento.org/ParksandRec/Parks/Park-Directory/Central-City/Brooks-Truitt-Park"
          linkText="Brook's Truitt Park"
          text="With dedicated areas for large dogs and small dogs, midtown Sacramento's Brook's Truit Park is the perfect place for your pup to play."
        />

        <LinkContent
          link="https://www.countyoffice.org/lynn-robie-dog-park-sacramento-ca-96d/"
          linkText="Lynn Robie Off-Leash Dog Park"
          text="The Lynn Robie Off-Leash Dog Park is a large, fenced dog park in the heart of Sacramento. It features plenty of green grass and trees for your pup to explore between 8:30 AM and 6 PM every day."
        />

        <LinkContent
          link="https://www.cityofsacramento.org/ParksandRec/Parks/Park-Directory/North-Natomas/Blackbird-Park"
          linkText="Blackbird Park Dog Parks"
          text="Blackbird Park has two fenced dog parks, one for small dogs and another for large dogs. Both are equipped with benches and water bowls, perfect for a relaxing day out with your pup!"
        />

        <LinkContent
          link="https://www.countyoffice.org/howe-avenue-dog-park-sacramento-ca-918/"
          linkText="Howe Avenue Dog Park"
          text="The Howe Avenue Dog Park is a fenced dog park with plenty of shade trees, benches and water bowls."
        />

        <LinkContent
          link="http://www.cityofsacramento.org/parksandrec/parks/park-directory/north-natomas/valleyoakpark"
          linkText="Valley Oak Dog Park"
          text="The Valley Oak Dog Park also offers small and large dog areas, along with drinking fountains, table benches, and a turf surface perfect for any pup with a case of the zoomies."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <Typography variant="base">Sacramento&apos;s intense summer heat may get in the way of some of your hiking aspirations, but if you hit the trails during the right time of day (and time of year), there are plenty of pathways sure to satisfy you and your pup.</Typography>

        <LinkContent
          link="https://regionalparks.saccounty.gov/Parks/Pages/JedediahSmith.aspx"
          linkText="Sacramento River Parkway"
          text="A popular spot for walking and biking, the 32-mile long Sacramento River Parkway is a great choice for an easy hike with your pup. With multiple entry points spanning from Old Sacramento to Folsom Lake, the River Parkway is well-paved with scenic views throughout."
        />

        <LinkContent
          link="https://www.cityofsacramento.org/ParksandRec/Parks/Park-Directory/Central-City/Sutters-Landing-Park"
          linkText="Sutter's Landing Regional Park"
          text="Offering 3.2 miles of trails, Sutter's Landing Park is one of the most dog-friendly parks in Sacramento. It features a variety of terrain including meadows, oak woodlands, and riverside areas."
        />

        <LinkContent
          link="https://www.cityofsacramento.org/ParksandRec/Parks/Park-Directory/Land-Park/William-Land"
          linkText="William Land Regional Park"
          text="William Land Regional Park offers a variety of hiking trails for all levels of experience. With over 17 miles of paved and dirt trails, this park is sure to keep both you and your pup on your toes!"
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery in Sacramento</Typography>
        <Typography variant="base">Sacramento is known for both its craft beer and wine, and you can enjoy both with your pup in tow!</Typography>

        <LinkContent
          link="https://bikedogbrewing.com/"
          linkText="Bik Dog Brewing Company"
          text="If you're looking for a pet-friendly brewery in Sacramento, Bike Dog Brewing Company is the place to be. This local brewery has a taproom on Broadway and a tasting room in West Sacramento, both of which are dog friendly. So bring your furry friend along for a day of beer tasting and fun!"
        />

        <LinkContent
          link="http://rev.wine/"
          linkText="Revolution Winery & Kitchen"
          text="Revolution Winery & Kitchen is a pet-friendly winery located in Sacramento's Midtown neighborhood. This urban winery offers a variety of red and white wines, as well as a seasonal food menu. And of course, leashed dogs are always welcome on the patio."
        />

        <LinkContent
          link="https://www.goldenroad.la/404"
          linkText="Golden Road Brewing"
          text="Golden Road Brewing is a dog-friendly brewery located in Midtown Sacramento. Try the Mango Cart Wheat Ale or the Point the Way IPA while your dog enjoys a treat of their own. (Sorry, bud. No hazies for you!)"
        />

        <LinkContent
          link="https://www.bigstumpbrewco.com/"
          linkText="Big Stump Brewery"
          text="Nestled in Old Sacramento, Big Stump Brewery is a great place to enjoy a cold beer with your furry friend. With a rotating selection of beers on tap, there's something for everyone at this pet-friendly brewery."
        />

        <Typography variant="h5">Check Out Sacramento&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <Typography variant="base">Not all eateries allow dog owners to tag along with their pets. Luckily, there are multiple dog-friendly cafes and restaurants where you can eat alongside your favorite dog. Here are a few of our favorites!</Typography>

        <LinkContent
          link="http://thehopgardens.com/"
          linkText="Hop Gardens"
          text="This pet-friendly beer garden features a spacious outdoor patio where you and your pup can enjoy a meal or a cold pint."
        />

        <LinkContent
          link="https://www.ironhorsetavern.net/"
          linkText="Iron Horse Tavern"
          text="Iron Horse is a pet -friendly restaurant located on R Street and Palladio in Folsom. Iron Horse provides a variety of craft cocktails and mocktails, and has a pet-friendly patio."
        />

        <LinkContent 
          link="https://foxandgoose.com/"
          linkText="Fox & Goose Public House"
          text="The Fox & Goose Public House is a dog friendly restaurant located in R Street that has an outside compound suitable for small dogs. The restaurant offers a variety of food items, from sandwiches to pizza, and has a wide selection of beers on tap."
        />

        <LinkContent
          link="http://www.bellabrucafe.com/"
          linkText="Bella Bru Cafe"
          text="Bella Bru Cafe is a pet friendly restaurant located adjacent to Natomas Blvd that allows dogs on the outdoor patio but not indoors."
        />

        <Typography variant="h2">Sacramento Dog Daycare and Boarding</Typography>
        <Typography variant="base">Looking for someone to take care of your pet? There are lots of dog care facilities in Sacramento.</Typography>

        <LinkContent  
          link="https://www.gratefuldogdaycare.com/index.php"
          linkText="Grateful Dog Daycare"
          text="Located at 17th Street, this facility provides dog daycare, grooming, boarding, and walking services."
        />

        <LinkContent
          link="http://www.arcadecreekkennel.com/"
          linkText="Arcade Creek Kennels"
          text="Located on Sacramento's east side, this facility provides convenient dog care services, including grooming, walking, and daycare. Arcade Creek also provides care for cats and rabbits."
        />

        <LinkContent
          link="https://www.chachasdaycare.com/"
          linkText="Cha Cha's Dog Daycare"
          text="If you're looking for a safe and comfortable place for your pup to stay while you're out of town, look no further than Cha Cha's Dog Daycare. This Sacramento daycare has over 20 years of experience in dog care and provides a custom care approach to each pet. So whether your dog is a hyperactive puppy or a senior citizen, Cha Cha's will be sure to take care of them."
        />

        <LinkContent
          link="https://sacramentodoggiedaycare.com/"
          linkText="Waggin' Tails"
          text="If you're looking for a dog daycare in Sacramento that has a private fenced dog park, look no further than Waggin' Tails. This daycare has been providing quality care for dogs since 1998 and offers a 2-acre fenced park where dogs can exercise, socialize, and play in a safe and fun environment."
        />

        <Typography variant="h2">Sacramento&apos;s Pet Stores</Typography>
        <Typography variant="base">Sacramento has a variety of pet stores where you can acquire the supplies of your choice. These include:</Typography>

        <LinkContent
          link="https://incredpets.com/"
          linkText="Incredible Pets"
          text="Incredible Pets has all the dog supplies you may want to purchase, including treats, food, toys, leashes, collars & harnesses, beds, crates, potties, and more."
        />

        <LinkContent
          link="https://www.petsuppliesplus.com/"
          linkText="Pet Supplies Plus Sacramento"
          text="Incredible Pets offers a variety of pet foods, including both organic and non-organic options. They also have a wide selection of pet toys, supplies, and accessories."
        />

        <LinkContent
          link="https://www.landbarkpetsupplies.com/"
          linkText="Land Bark Pet Supplies"
          text="If you're looking for a pet store that specializes in food, toys, and treats, check out Land Bark Pet Supplies. They carry all the top brands of pet food and also have a wide variety of toys and treats to choose from."
        />

        <Box>
          <Typography variant="base" component="p"><a href="https://stores.petco.com/ca/sacramento/pet-supplies-sacramento-ca-371.html" target="_blank" rel="noreferrer">Petco</a> and <a href="https://www.petsmart.com/stores/us/ca/sacramento-store0050.html" target="_blank" rel="noreferrer">PetSmart</a></Typography>
          <Typography variant="base">Of course, both Petco and PetSmart have presences in Sacramento as well. Petco&apos;s all-inone store Arden Fair provides a wide variety of pet products and services, including grooming, vaccination, and training. PetSmart has 3 stores in Sacramento, on Florin Rd, Truxel Rd, and on Delta Shores Cir S.</Typography>
        </Box>
      </Box>
    </>)
  } else {
    return (
      <HotelSection 
        text=""
        secondaryText=""
        cityName={cityName}
        includedHotels={['all']}
      />
    )
  }


}