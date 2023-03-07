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
            'all'
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
            'all'
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
            'all'
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
            'all'
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
  } else if (cityName === 'Austin') {
    return (<>
      <HotelSection 
        text="The past few years have seen Austin transform into one of the most popular landing spots for young professionals, entrepreneurs, and creatives. With its unique blend of culture, tech-savvy businesses, and a booming job market, Austin is an ideal place to make your mark in the world. From delicious Tex-Mex eateries to some of the best live music venues around, Austin is sure to keep you entertained for a weekend or extend work-cation."
        secondaryText="But what about your four-legged friend? Don’t worry: Austin has plenty to offer in terms of pet-friendly accommodations and activities. Many hotels are pet-friendly and offer special amenities such as dog beds, treats, and even pet sitters. There are also numerous dog parks scattered around the city. &#09;&#09; From lakeside walks to doggy yoga, Austin has plenty of activities that can make your pet’s visit just as enjoyable as yours."
        cityName="Austin"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Austin</Typography>
        <Typography variant="h5">Explore Austin&apos;s Off-Leash Dog Parks</Typography>
        
        <LinkContent
          link="https://austinparks.org/park/red-bud-isle/"
          linkText="Red Bud Isle"
          text="This sprawling off-leash dog park near the Tom Miller Dam offers plenty of activities for humans as well, including fishing, hiking, biking, and swimming."
        />

        <LinkContent
          link="https://www.yelp.com/biz/barton-springs-pool-austin"
          linkText="Barkin' Springs"
          text="Located just next to Austin hotspot Barton Springs, Barkin' Springs will let your furry friend cool off in style."
        />

        <LinkContent
          link="https://austinparks.org/park/onion-creek-district-park/"
          linkText="Onoin Creek District Park"
          text=" Down in Southeast Austin, Onion Creek District Park offers lovely forest trails, as well as plenty of open space to play in."
        />

        <LinkContent
          link="https://austinparks.org/park/barton-creek-greenbelt/"
          linkText="Barton Creek Greenbelt Preserve"
          text="Offering activities like rock climbing, mountain biking, and bird watching or humans, Barton Creek Greenbelt Preserve is an ideal spot for two-legged and four-legged fun. That's right: your pup is welcome to join you on the trails and explore this scenic area."
        />

        <LinkContent
          link="https://austinparks.org/park/bull-creek/"
          linkText="Bull Creek District Park"
          text="Located north of Austin, Bull Creek District Park is a great spot for some relaxed hiking. The landscape includes limestone ledges and small hills - perfect for those who want to break a sweat with their pup in tow."
        />

        <LinkContent
          link="https://austinparks.org/?s=emma+long"
          linkText="Turkey Creek Trail at Emma Long Metropolitan Park"
          text="Those in search of an even more strenuous hike should check out Turkey Creek Trail at Emma Long Metropolitan Park. This 3-mile trail is quite steep, but offers plenty of rewarding views and wildlife spotting opportunities to make the journey worthwhile."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.circlebrewing.com/"
          linkText="Circle Brewing Company"
          text="Located in North Austin, Circle Brewing Company welcomes furry friends to their outdoor patio. Enjoy a pint while your pup enjoys some snacks - both of you won't be disappointed."
        />

        <LinkContent
          link="https://www.draughthouse.com/"
          linkText="Draught House Pub & Brewery"
          text="With 74 taps and an array of local laudits, Draught House Pub & Brewery has established itself as the perfect spot to grab a beer while your pup hangs out on the dog-friendly patio."
        />

        <LinkContent
          link="https://wanderlustwine.com/"
          linkText="Wanderlust Wine Co"
          text="tching to try some local vino? Head over to Wanderlust Wine Co with your pup and sample a few of their delicious wines! This pet-friendly winery has locations in Downtown Austin and on the Eastside."
        />

        <Typography variant="h5">Check Out Austin&apos;s Pet-Friendly Restaurants and Cafes</Typography>

        <LinkContent
          link="https://www.fatcitystacks.com/"
          linkText="Fat City Stacks"
          text="Enjoy some delicious breakfast sandwiches and coffee with your pup at Fat City Stacks. This pet-friendly café is located in the vibrant South Congress area, and offers an impressive menu just for dogs, featuring chicken meatballs, peanut butter, and greek yogurt ice cream!"
        />

        <LinkContent
          link="https://www.ilikelick.com/"
          linkText="Lick Honest Ice Creams"
          text="On a hot Austin day, cool down with your furry friend at Lick Honest Ice Creams. This pet-friendly shop offers delicious made-from-scratch flavors that are sure to please both you and your pup!"
        />

        <LinkContent
          link="https://www.easytigerusa.com/"
          linkText="Easy Tiger"
          text="What better way to spend a lazy Sunday than with a beer and some pretzels? You can do both while your pup hangs out on the Easy Tiger patio."
        />

        <Typography variant="h2">Austin&apos;s Dog Daycare and Boarding</Typography>
        <Typography variant="base">If you&apos;re looking for doggy daycare while you&apos;re in Austin, here are a few of our favorites:</Typography>

        <LinkContent
          link="https://www.campbowwow.com/austin/"
          linkText="Camp Bow Wow Austin"
          text="Located on the north side of Austin towards Round Rock, Camp Bow Wow offers a safe, fun environment for your pup to socialize and play with other dogs."
        />

        <LinkContent
          link="https://www.dogtopia.com/austin-south/"
          linkText="Dogtopia South Austin"
          text="Dogtopia South Austin offers doggy daycare, boarding, grooming and more. They also have a wide selection of activities to keep your pup entertained while at the facility."
        />

        <LinkContent
          link="https://bhvaustin.com/"
          linkText="BHV Austin"
          text="BHV Austin is a state-of-the-art doggy daycare and boarding facility located in South Austin. They offer spacious play areas, comfortable suites for overnight stays and lots of fun activities to keep your pup happy and healthy!"
        />

        <Typography variant="h2">Austin&apos;s Best Pet Stores</Typography>
        <Typography variant="base">A pup vacation certainly warrants a new toy or ten, right? Here are your best options for pet stores in Austin.</Typography>

        <LinkContent
          link="https://www.pawsonchicon.com/"
          linkText="Paws on Chicon"
          text="Located in East Austin, Paws on Chicon is a great spot to find all your pup's necessities. They carry everything from food and treats to toys and collars - plus, they offer plenty of goodies for cats too!"
        />

        <LinkContent
          link="https://healthypetaustin.com/"
          linkText="Healthy Pet"
          text="With three locations in the Austin area, Healthy Pet is the place to go for all your pup's health needs. From vitamins and supplements to pet-safe cleaning products, this pet store has you covered."
        />

        <LinkContent
          link="https://tomlinsons.com/"
          linkText="Tomlinson's Feed"
          text=" Tomlinson’s Feed has been an Austin favorite for more than 70 years. This pet store has endless options for your pup, including food, treats, toys and grooming supplies. They also offer self-serve dog wash stations!"
        />

        <LinkContent
          link="https://petsupermarket.brickworksoftware.com/store-locator/?page=1&storesPerPage=15"
          linkText="Pet Supermarket"
          text="Pet Supermarket has everything your pup needs, from food and treats to toys, beds and more."
        />

        <Typography variant="h2">Bonus Activity: Paddleboard or Kayak with Your Dog</Typography>
        <Typography variant="base">Take your pup out on the water with you! Take a <a href="https://www.gilisports.com/blogs/sup-near-me/best-places-for-paddle-boarding-in-austin" target="_blank" rel="noreferrer">paddleboard</a> or <a href="https://www.tripadvisor.com/Attractions-g30196-Activities-c61-t191-Austin_Texas.html" target="_blank" rel="noreferrer">kayak tour</a> on one of Austin&apos;s many local bodies of water.</Typography>

      </Box>
    </>)
  } else if (cityName === 'Dallas') {
    return (<>
      <HotelSection 
        text="Planning a trip to Dallas with your tail-wagging pal?  You’ll be pleased to know that the Lone Star State's third-largest city is a pet friendly destination. From parks, trails and even attractions offering special amenities for your furry friends, you’ll find plenty of ways to include them in your getaway."
        secondaryText=""
        cityName="Dallas"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Dallas</Typography>

        <Typography variant="h5">Explore Dallas&apos;s Off-Leash Dog Parks</Typography>
        <LinkContent
          link="http://www.dallasparks.org/Facilities/Facility/Details/NorthBark-Dog-Park-359"
          linkText="NorthBark Dog Park"
          text="Just north of downtown in the cool, shady NorthBark Dog Park, your pup can enjoy an off-leash area to get some exercise and socialize with other dogs. The park has plenty of obstacles for both large and small dogs to jump on, alongside a separate section reserved just for smaller breeds."
        />

        <LinkContent
          link="https://muttscantina.com/"
          linkText="MUTTS Canine Cantina"
          text="For a unique experience, head to MUTTS Canine Cantina with your pup. This dog-centric destination has everything you need for a fun day out with your furry friend – an off-leash park, full bar and restaurant, doggy pool, and even live music."
        />

        <LinkContent
          link="https://www.klydewarrenpark.org/join-give/my-best-friends-dog-park.html"
          linkText="My Best Friend's Park at Klyde Warren Park"
          text="The scenic Klyde Warren Park has plenty of activities for both you and your pup, including an off-leash zone specifically designed with doggy fun in mind. The park also offers a dog water fountain and several areas to cool off in the shade."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.traillink.com/trail/katy-trail-(dallas)/"
          linkText="Katy Trail"
          text="This scenic trail follows the path of an old railroad,  offering 3.5 miles of paved paths ideal for a leisurely stroll with your pup. You can access the trail from several areas around the city and enjoy sweeping views of downtown Dallas as you explore."
        />

        <LinkContent
          link="https://www.traillink.com/trail/bachman-lake-park-loop-trail/"
          linkText="Machman Lake Park Loop Trail"
          text="This 2-mile loop trail is one of the most scenic places to take your pup in Dallas. The path goes around Bachman Lake, offering tranquil views and a few small hills perfect for an energetic walk."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://deepellumbrewing.com/"
          linkText="Deep Ellum Brewing Co"
          text="Sprawling local favorite Deep Ellum Brewing Co. is the perfect place to stop for a sip and some canine fun with your pup. The brewery has several outdoor areas where pets are allowed, and they even host occasional doggy events!"
        />

        <LinkContent
          link="https://oakcliffbrewing.com/"
          linkText="Oak Cliff Brewing Co"
          text="Oak Cliff Brewing Co. is another great option if you want to grab a pint with your pup. The brewery has several outdoor areas where pets are allowed, including a large beer garden perfect for spending time with your furry friend."
        />

        <LinkContent
          link="https://www.peticolasbrewing.com/"
          linkText="Peticolas Brewing Company"
          text="This brewery is the perfect spot for a beer and some pup-play time. They have plenty of outdoor space, including a large lawn where your pooch can run around. Plus, Peticolas also offers several doggy treats to keep your pup happy while you sip on craft brews."
        />

        <Typography variant="h5">Check Out Dallas&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.breadwinnerscafe.com/"
          linkText="Bread Winners Cafe & Bakery"
          text="This cozy cafe is a great spot to grab some biscuits & gravy with your pup (OK, maybe just biscuits for your little friend.)  The restaurant has several pet-friendly outdoor tables perfect for grabbing a bite with your canine companion."
        />

        <LinkContent
          link="https://www.rodeogoat.com/"
          linkText="Rodeo Goat"
          text="Rodeo Goat is a popular spot for craft beers and burgers, and their pet-friendly patio makes it the perfect place to stop with your pup. Cozy up by the fire at night!"
        />

        <LinkContent
          link="https://torchystacos.com/"
          linkText="Torchy's Tacos"
          text="Statewide favorite Torchy’s Tacos also offers outdoor seating for you and your pup. They serve up plenty of Texas-style tacos perfect for a mid-day snack with your furry friend."
        />

        <Typography variant="h2">Dallas&apos;s Best Dog Daycare and Boarding Facilities</Typography>
        <LinkContent
          link="https://www.dogtopia.com/dallas-inwood/"
          linkText="Dogtopia"
          text="Dogtopia of Dallas offers daycare, overnight boarding, and grooming services for your pup. They have spacious play areas to keep your dog active and happy while you’re away. Keep an eye on your pal using Dogtopia's webcam access!"
        />

        <LinkContent
          link="https://www.lakesidepawsfrisco.com/"
          linkText="Lakeside Paws"
          text="Over in Frisco, Lakeside Paws is the perfect spot for your pup to play and stay while you head off on human-only adventures. The facility offers daycare, overnight boarding, dog walking, and spa services – all in a safe, secure environment."
        />

        <LinkContent
          link="https://www.castlecreekpetresort.com/"
          linkText="Castle Creek Pet Resort & Spa"
          text=" For a truly pampered pup, head to Castle Creek Pet Resort & Spa. Sprawling across a 13,000 square feet horse ranch, Castle Creek also offers private indoor suites with individual covered patios."
        />

        <Typography variant="h2">Dallas&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="https://greenpetdallas.com/"
          linkText="Green Pet Supply"
          text="This pet supply store is your one-stop shop for all things pup. Green Pet Supply offers natural and organic products for your furry friend, as well as raw food diet supplies and eco-friendly toys."
        />

        <LinkContent
          link="http://www.odysseypets.com/"
          linkText="Odyssey Pets"
          text="Odyssey Pets is a great spot for pet lovers looking to spoil their companions. They sell everything from treats and toys to clothing, accessories, and grooming supplies – perfect for pampering your pup!"
        />

        <LinkContent
          link="https://stores.petco.com/tx/dallas/pet-supplies-dallas-tx-440.html"
          linkText="Petco"
          text="If you’re looking for a more traditional pet store, Petco is your best bet. They have a wide selection of food and supplies, as well as grooming and vet services. Plus, they offer plenty of pet-friendly events and classes perfect for meeting other pup-lovers in the area."
        />

        <LinkContent
          link="https://theluckydogbarkery.com/"
          linkText="Lucky Dog Barkery"
          text="For some pet-friendly treats, stop by Lucky Dog Barkery. This adorable shop is stocked with natural and organic goodies perfect for your pup. They even have a selection of handcrafted cakes for special occasions!"
        />

      </Box>
    </>)
  } else if (cityName === 'Denver') {
    return (<>
      <HotelSection 
        text="With its mile-high elevation and 300+ days of sunshine each year, Denver is an ideal destination for those looking to enjoy the outdoors. It's also a great stop for dog owners, boasting numerous pet-friendly parks and trails. Denver is home to some of the most impressive cultural attractions in the country, from the Denver Art Museum to Red Rocks Park and Amphitheatre. With its vibrant local music scene and thriving nightlife, Denver has something for everyone. And don't forget about all the delicious restaurants and food trucks scattered throughout the city!"
        secondaryText="In this guide, we'll take a look at how you and your furry friend can make the most of your Denver visit. Let's dive in."
        cityName="Denver"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Denver</Typography>
        <Typography variant="h5">Explore Denver&apos;s Off-Leash Dog Parks</Typography>
        
        <LinkContent
          link="https://www.cityofgolden.net/city-services/dog-parks/"
          linkText="Tony Grampsas Dog Park"
          text=" Golden's 2.5-acre Tony Grampsas Dog Park is one of the most popular off-leash dog parks in the Denver area. Boasting trails and a wooded area, this dog park is a great place for both you and your pup to get some exercise."
        />

        <LinkContent
          link="https://www.lakewood.org/Government/Departments/Community-Resources/Parks-Forestry-and-Open-Space/A-to-Z-Park-List/Forsberg-Iron-Spring-Park"
          linkText="Forsberg Park"
          text="With views of Green Mountain and Red Rocks Ampitheatre, Lakewood's Forsberg Park is a great spot for you and your pup. Take a lap through the park's obstacle course!"
        />

        <LinkContent
          link="https://cpw.state.co.us/placestogo/parks/CherryCreek/Pages/DogOff-LeashArea.aspx"
          linkText="Cherry Creek Dog Off-Leash Area"
          text="This 107-acre off-leash area is located in Denver's Cherry Creek State Park. It features plenty of open space for your pup to romp around, as well as a portion of the creek where they can cool off."
        />

        <LinkContent
          link="https://www.cityofwestminster.us/ParksRecreation/Parks,TrailsOpenSpace/WestminsterHillsOff-LeashDogPark"
          linkText="Westminster Hills Off-Leash Dog Park"
          text="This 420-acre park is located in the Denver suburb of Westminster and offers plenty of trails, open grassy areas, and even a pond for your pup to explore."
        />

        <Typography variant="h5">Take a Hike with Your Pup in Denver</Typography>
        <LinkContent
          link="https://dayhikesneardenver.com/elk-meadow-park-south-loop/"
          linkText="South Loop, Elk Meadow Park"
          text="This easy, 2.6-mile trail offers plenty of views of the surrounding Rockies, making it a great spot for you and your pup to take in nature. Beyond South Loop, Elk Meadow Park offers 25 additional miles of trails!"
        />

        <LinkContent
          link="https://dayhikesneardenver.com/mt-sanitas-hike-near-boulder/"
          linkText="Mt. Sanitas"
          text="If you're looking for a more strenuous hike, Mt. Sanitas is the perfect spot for you and your pup. The 3-mile loop features plenty of elevation changes and great views of Boulder. You can also find more casual trails on the mountainside."
        />

        <LinkContent
          link="https://dayhikesneardenver.com/red-rocks-trail-red-rocks-park/"
          linkText="Red Rocks Trail"
          text="This 6-mile loop trail offers plenty of views and is a great spot for you and your leashed pup to get some exercise. Plus, you can take in the sights at Red Rocks Amphitheatre!"
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.sidewalkdog.com/business/carboy-winery/"
          linkText="Carboy Winery"
          text="Cap Hill's Carboy Winery offers flights of their wines, as well as small bites and cheese plates. Bring your tail-wagging companion for Carboy's Wine and Wags special, every day from 3 PM to 6 PM!"
        />

        <LinkContent
          link="https://www.sidewalkdog.com/business/the-infinite-monkey-theorem-2/"
          linkText="The Infinite Monkey Theorem"
          text="This Denver urban winery offers a great selection of wines, hard ciders, and more. They also offer a pet-friendly patio and occasional pet-centered events."
        />
        <LinkContent
          link="https://www.sidewalkdog.com/business/bigsbys-folly-2/"
          linkText="Bigsby's Folly"
          text="This craft winery in the RiNo Arts District offers a variety of flights and glasses along with small plates. Bigsby's Folly also has an expansive outdoor patio, perfect for you and your pup to enjoy their vino!"
        />

        <Typography variant="h2">Check Out Denver&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.sidewalkdog.com/business/just-be-kitchen/"
          linkText="Just Be Kitchen"
          text="This plant-based eatery offers breakfast, lunch, and dinner with plenty of vegan, paleo, and allergen-friendly options. They even offer pet-friendly outdoor seating!"
        />
        <LinkContent
          link="https://www.sidewalkdog.com/business/highlands-cork-coffee/"
          linkText="Highlands Cork & Coffee"
          text="This cozy cafe in the Highlands neighborhood offers an extensive selection of coffees, teas, and pastries -- and, perhaps most importantly, a selection of treats just for your furry friend."
        />
        <LinkContent
          link="https://www.sidewalkdog.com/business/postino-lohi/"
          linkText="Postino — LoHi"
          text="LoHi's Postino offers an extensive selection of wines and craft beers, along with small plates and bruschetta. Pups can join on the patio and enjoy treats and a water bowl."
        />

        <Typography variant="h2">Denver&apos;s Dog Daycare and Boarding</Typography>
        <Typography variant="base">If you&apos;re in need of a doggy daycare while running errands or exploring around Denver, look no further!</Typography>

        <LinkContent
          link="https://www.barkandplaydenver.com/"
          linkText="Bark & Play"
          text="This sprawling daycare and boarding facility offers both an indoor play area and outdoor play area with a swimming pool and shaded areas."
        />

        <LinkContent
          link="https://www.barklymanor.com/"
          linkText="Barkly Manor"
          text="This large pet boarding and daycare facility offers spacious suites, a variety of play areas, and even swimming pools for your pup to enjoy."
        />

        <Typography variant="h2">Denver&apos;s Best Pet Stores</Typography>

        <LinkContent
          link="https://www.doggiedelightsonbroadway.com/"
          linkText="Doggie Delights on Broadway"
          text="This family-owned pet store offers a wide selection of high-quality pet food and supplies, as well as treats and toys. Bring your furry friend to play with store regulars Tazu and Zimba!"
        />
        <LinkContent
          link="https://lilysbathsandbiscuits.com/"
          linkText="Lily's Bath and Biscuits"
          text="This pet store offers plenty of supplies, grooming services and luxury pet items, as well as a self-service dog wash so you can give your pup a good scrub down."
        />
        <LinkContent
          link="https://www.qualitypaws.com/"
          linkText="Quality Paws Natural Pet"
          text="Quality Paws has an array of natural products, including treats and supplements. They also offer holistic health consultations and classes to help you keep your pup healthy and happy!"
        />
        <LinkContent
          link="https://twopalsandapup.com/"
          linkText="Two Pals & A Pup"
          text="Located in City Park, Two Pals & A Pup offers pet supplies and accessories, as well as homemade dog treats. They also offer custom engraving services so you can have your pup's name or initials inscribed on a tag."
        />

      </Box>
    </>)
  } else if (cityName === 'Oceanside') {
    return (<>
      <HotelSection 
        text="Nestled between Los Angeles and San Diego alongside the Pacific Coast Highway, Oceanside, California is a hidden gem of the Southern California region. With stunning beaches and nearby attractions, Oceanside is one of the most popular destinations for family vacations. From surfing to strolling along the pier, outdoor activities are plentiful in this beach town. It's also a supremely pet-friendly destination: families can take their four-legged friends to the expansive beaches, dog parks, and trails. Let's break down the best pet-friendly travel options Oceanside has to offer!"
        secondaryText=""
        cityName="Oceanside"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Oceanside</Typography>

        <Typography variant="h5">Explore Oceanside&apos;s Off-Leash Dog Parks</Typography>
        
        <LinkContent
          link="https://www.ci.oceanside.ca.us/gov/ns/parks/amenities/parks.asp"
          linkText="Buccaneer Beach Park"
          text="This pet-friendly beach park is the perfect place to take your pup for a morning or evening stroll. The beach allows dogs off leash as long as they remain within voice command of their owners."
        />
        <LinkContent
          link="https://www.carlsbadca.gov/Home/Components/FacilityDirectory/FacilityDirectory/104/7400?selcat=26"
          linkText="Poinsettia Dog Park"
          text="In nearby Carlsbad, the Poinsettia Dog Park is a great option for pet owners who are looking for a place to let their pooch run free. This dog park offers plenty of grass and open space for your pup to enjoy, as well as benches and shady trees to keep you comfortable while you watch them play."
        />
        <LinkContent
          link="https://www.carlsbadca.gov/Home/Components/FacilityDirectory/FacilityDirectory/10/7417"
          linkText="Alga Norte Community Park"
          text="Alga Norte Community Park is an excellent option for pet owners in Oceanside. This park has a large, fenced-in area with obstacles and play equipment that's perfect for off-leash fun. Plus, there are plenty of walking trails and other amenities to enjoy."
        />
        <LinkContent
          link="https://www.cityofvista.com/departments/recreation-comm-services/parks-trails"
          linkText="South Buena Vista Park"
          text="South Buena Vista Park is a great spot for pet owners in Oceanside. This park features plenty of open space, benches and pet waste stations to make your visit easier. Plus, the nearby beach allows you to take your pup for some fun in the sun!"
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>

        <LinkContent
          link="https://www.sandiegocounty.gov/parks/Camping/guajome.html"
          linkText="Guajome Park"
          text="Boasting 4.5 miles of tranquil trails that cut through woodlands, wetlands, and more, Guajome Park is the perfect spot for a leisurely hike with your leashed four-legged friend."
        />
        <LinkContent
          link="https://www.ci.oceanside.ca.us/gov/ns/parks/amenities/trails.asp"
          linkText="San Luis Rey Bike Trail"
          text="This paved bike trail stretches from Oceanside to San Luis Rey River and is the perfect spot for a quick jaunt with your pup. You'll find plenty of benches and pet waste stations along the way, so you can rest when you need to."
        />
        <LinkContent
          link="https://www.sdparks.org/content/sdparks/en/park-pages/SanElijo.html"
          linkText="San Elijo Lagoon Ecological Reserve"
          text="A 15 minute drive down the coast, this reserve is home to miles of trails that are perfect for a leisurely stroll with your pup. The scenery is also stunning, so be sure to bring your camera!"
        />

        <Typography variant='h5'>Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.tripswithpets.com/pet-friendly-activity/wineries/united-states/ca/oceanside/beach-house-winery?arrivalDate=2022-11-20&departureDate=2022-11-22"
          linkText="Beach House Winery"
          text="This pet-friendly winery offers a variety of wines to sample and relax with, all while your pup lounges nearby. The outdoor seating is the perfect spot to take in the views while sipping on a glass of wine."
        />
        <LinkContent
          link="https://www.oceansidebrewingco.com/"
          linkText="Oceanside Brewing Company"
          text="This pet-friendly brewery is a longtime local favorite. Offering a selection of year-round and seasonal beers on tap, Oceanside Brewing Company has outdoor seating for you and your pup."
        />
        <LinkContent
          link="https://www.yelp.com/biz/stone-brewing-tap-room-oceanside-oceanside?osq=dog+friendly+breweries"
          linkText="Stone Brewing Tap Room - Oceanside"
          text="Stone Brewing Tap Room is a great spot for craft beer lovers and their four-legged friends. Relax with your pup on the outdoor patio as you sample a selection of brews from this popular local brewery."
        />

        <Typography variant='h2'>Check Out Oceanside&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.bagbybeer.com/"
          linkText="Bagby"
          text="This pet-friendly restaurant's rotating menu is sure to please even the pickiest of eaters. Enjoy a bite to eat on the sun-drenched patio with your pup by your side."
        />
        <LinkContent
          link="http://beachbreakcafe.menutoeat.com/"
          linkText="Beach Break Cafe"
          text="This pet-friendly cafe is the perfect spot to grab a coffee and some breakfast with your pup. Enjoy the fresh coastal air on the outdoor patio as you take in views of the nearby beach."
        />
        <LinkContent
          link="https://stratfordattheharbor.com/"
          linkText="Stratford at the Harbor"
          text="How about a little ocean breeze to go with your meal? Stratford at the Harbor offers a wide selection of tasty dishes and drinks. Plus, they offer outdoor seating so you can enjoy your meal with your pup in tow."
        />

        <Typography variant='h2'>Oceanside&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://www.pacificpetresort.com/"
          linkText="Oceanside Pet Hotel"
          text="If you need to leave town for a night but don’t want to leave your pup behind, Oceanside Pet Hotel is the perfect choice. Here, they offer a comfortable and secure environment for your pup while you are away."
        />
        <LinkContent
          link="https://theanimalkeeper.com/locations/oceanside-carlsbad/"
          linkText="The Animal Keeper"
          text="This is an excellent choice for pet owners who need a daycare or boarding option. The Animal Keeper offers a variety of fun activities and services to keep your pup entertained."
        />
        <LinkContent
          link="https://www.camprunamutt.com/sorrentovalley/"
          linkText="Camp Run-A-Mutt"
          text="Offering daycare, boarding, and training services, Camp Run-A-Mutt is the perfect spot to socialize your pup. Plus, they offer a secure and supervised environment built with safety in mind."
        />

        <Typography variant="h2">Oceanside&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="https://www.petsmart.com/"
          linkText="PetSmart"
          text="Your one-stop shop for everything pet related, PetSmart offers a variety of products and services to keep your pup happy and healthy. From toys and treats to grooming services, this is your go-to spot for anything you and your pup need."
        />
        <LinkContent
          link="https://pupologie.com/"
          linkText="Pupologie"
          text="Featuring all-natural, organic products and treats, Pupologie is a local pet store you won’t want to miss. Plus, they offer custom gift baskets for your pup."
        />
        <LinkContent
          link="https://www.threedogsc.com/"
          linkText="Three Dog Bakery San Clemente"
          text="If you’re looking for something special for your pup, Three Dog Bakery San Clemente is the place to go. This gourmet bakery offers a selection of treats made with natural and organic ingredients."
        />
        <LinkContent
          link="https://www.petco.com/shop/en/petcostore"
          linkText="PETCO"
          text="This chain pet store is a great option for all of your basic needs. From toys and treats to food and grooming supplies, PETCO has it all! Plus, they offer a variety of services—including vaccinations and microchipping—to keep your pup healthy and happy."
        />

      </Box>
    </>)
  } else if (cityName === 'Orange County') {
    return (<>
      <HotelSection 
        text="You don't have to be a Disney Princess to enjoy a trip to Orange County -- even if your family pooch is treated like royalty. With plenty of dog-friendly activities and places to stay, Orange County is a great spot for you and your furry friend."
        secondaryText=""
        cityName="Orange County"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activities in Orange County</Typography>

        <Typography variant="h5">Explore Orange County&apos;s Off-Leash Dog Parks</Typography>
        <Typography variant="base">If you&apos;re looking for a place to take your furry friend for a good time, check out one of Orange County&apos;s many off-leash dog parks.</Typography>
       
        <LinkContent
          link="https://www.avca.net/"
          linkText="Aliso Viejo Community Association Dog Park"
          text="Aliso Viejo Community Association Dog Park is a great spot for both small and large dogs. This creekside park also features open space, paths with connections to hiking trails, portable toilets, and shaded picnic table areas."
        />
        <LinkContent
          link="https://www.anaheim.net/facilities/facility/details/La-Palma-Park-104"
          linkText="La Palma Park Dog Park"
          text="If you're looking for a great place to take your furry friend for a good time, check out La Palma Park Dog Park. This large dog park has separate areas for large and small dogs, with lots of space to run and play. Water fountains are available and there are benches for people to sit down. Located in Anaheim, this pet-friendly park is a great place to spend the day with your pup!"
        />
        <LinkContent
          link="https://www.yelp.com/biz/maxwell-dog-park-anaheim"
          linkText="Maxwell Dog Park"
          text="Maxwell Dog Park is the perfect spot if you're in the Huntington Beach area and looking for a pet-friendly outing. This spacious dog park features some hills and valleys and a mix of dirt and grass. Drinking fountains are available with benches for owners. There are also a few agility obstacle features here."
        />
        <LinkContent
          link="https://www.anaheim.net/Facilities/Facility/Details/Olive-Hills-Dog-Park-437?&centerLat=33.83939902950562&centerLng=-117.8263788185118&zoom=16"
          linkText="Olive Hills Dog Park"
          text="Up in Fullerton, Olive Hills Dog Park is another great option for pet owners. The park offers separate small and large dog areas with agility equipment, benches, and some artificial turf. The surrounding park features walking paths and tennis courts."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <Typography variant="base">Orange County has miles of trails, perfect for getting out with your pup and enjoying the outdoors.</Typography>

        <LinkContent
          link="https://www.alltrails.com/trail/us/california/aliso-summit-trail"
          linkText="Aliso Summit Trail"
          text="Check out the Aliso Summit Trail if you're looking for a great hike to take your pup on. This dog-friendly hike is a flat dirt trail except for one steep hill at the very end where you will be rewarded with a gorgeous view of the Pacific Ocean and a cool ocean breeze."
        />
        <LinkContent
          link="https://www.alltrails.com/trail/us/california/back-bay-loop"
          linkText="Back Bay Loop"
          text="This mostly-paved trail winds around Upper Newport Bay where you will be greeted with a cool breeze and surrounded by stunning vistas of the water. The highlight of this trail is the marshy preserve near the upper bay which resembles the Everglades."
        />
        <LinkContent
          link="https://www.alltrails.com/trail/us/california/bedford-peak"
          linkText="Bedford Peak Trail"
          text="One of the most challenging dog-friendly hikes in Orange County is Bedford Peak. This trail is steep, but the great views and cooler temperature at the top make it worth the effort. Dogs must be kept on leash."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.gopetfriendly.com/activities/breweries-wineries/ca/san-diego/mission-brewery"
          linkText="Mission Brewery"
          text="Mission Brewery in Costa Mesa is a great spot to bring your pup. This brewery combines beer and sunshine, with plenty of outdoor seating and an on-site food truck."
        />
        <LinkContent
          link="https://www.gopetfriendly.com/activities/breweries-wineries/ca/torrance/absolution-brewing-company"
          linkText="Absolution Brewing Company"
          text="Absolution Brewing Company in Torrance is a pet-friendly brewery that offers a selection of craft beers and wines. The patio area has plenty of seating, so you can enjoy the sunshine while your pup gets to frolic around."
        />

        <Typography variant="h2">Check Out Orange County&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://slaters5050.com/menus/dog-menu/"
          linkText="Slater’s 50/50"
          text="Slater's 50/50 in Anaheim Hills is a great spot for those who want to enjoy some delicious burgers with their pup. The restaurant has both indoor and outdoor seating, so you can either take your pup to the patio or enjoy your meal inside."
        />
        <LinkContent
          link="https://bruxie.com/"
          linkText="Bruxie Gourmet Waffle Shop"
          text="Thinking of taking your pup out for a fun brunch? Check out Bruxie Gourmet Waffle Shop in Huntington Beach. They offer delicious Belgian-style waffles and have plenty of outdoor seating, making it the perfect spot to enjoy some tasty treats with your pup."
        />
        <LinkContent
          link="https://tapsfishhouse.com/taps-brea/"
          linkText="Taps Fish House & Brewery"
          text="Taps Fish House & Brewery in Irvine is a great spot for those looking for delicious seafood and craft beers. The restaurant offers both indoor and outdoor seating, making it the perfect place to bring your pup for lunch or dinner."
        />

        <Typography variant="h2">Orange County Dog Daycare and Boarding</Typography>
        <LinkContent
          link="http://campopiedaycare.com/"
          linkText="Camp Opie Dog Daycare"
          text="Camp Opie Dog Daycare and Boarding in Santa Margarita is a great place to take your pup while you're away. The facility offers social playgroups so that your pup can make friends and have fun. They also offer grooming, boarding, and obedience training."
        />

        <LinkContent
          link="https://ciaociaopetcare.com/"
          linkText="Ciao Ciao PetCare"
          text="Ciao Ciao PetCare is a pet-friendly facility that offers daycare, boarding, and even doggy spa services. The staff here is experienced and attentive to your pup's needs. They offer plenty of outdoor playtime as well as enrichment activities to keep your pup entertained."
        />

        <Typography variant="h2">Orange County&apos;s Best Pet Stores</Typography>
        <LinkContent
          link=""
          linkText="Pet Country"
          text="Pet Country Pet Shop in Anaheim is the perfect spot to pick up all of your pet supplies. The shop offers a variety of natural and organic dog food, toys, treats, and more. They also have a wide selection of pet apparel and accessories for you to choose from."
        />

        <LinkContent
          link=""
          linkText="PetSmart"
          text="PetSmart is a great place to pick up all of your pet supplies and products. The store carries a wide selection of food, toys, treats, and more for cats and dogs. They also have an in-store grooming salon if you need to give your pup a touch up."
        />

      </Box>
    </>)
  } else if (cityName === 'Phoenix') {
    return (<>
      <HotelSection 
        text="Planning a trip to Phoenix, Arizona with your dog in tow? You've got lots to look forward to! From hiking in the Sonoran Desert to exploring downtown art galleries, there is something for everyone in this sizzling desert city. While you pack your sunscreen and a water bowl or four for your furry friend, let's run down the best hotels, activities, and tips for pet-friendly travel in Phoenix."
        secondaryText=""
        cityName="Phoenix"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Phoenix</Typography>

        <Typography variant="h5">Explore Phoenix&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent 
          link="https://www.phoenix.gov/parkssite/Pages/dogparkshancedog.aspx"
          linkText="Hance Park Dog Park at Margaret T. Hance Park"
          text="This large, one-acre park boasts plenty of grassy areas for your pup to run and play, and there's even a shade structure to cool off under and chilled water fountains for much-needed rehydration."
        />

        <LinkContent 
          link="https://www.phoenix.gov/parks/parks/dog-parks"
          linkText="Pinnacle Dog Park"
          text="This two-acre park is located in North Phoenix, just off of I-17. It has separate areas for large dogs and smaller breeds, as well as a number of agility obstacles and toys to keep your pup entertained. The shady trees throughout the park are a great place for some respite from the sun's rays."
        />

        <LinkContent
          link="https://www.phoenix.gov/parks/parks/dog-parks/paradise-valley-dog-park"
          linkText="Paradise Valley Dog Park"
          text="As its name suggests, this park is nestled in Paradise Valley and has some great views to enjoy while your pup frolics. Its one-acre park boasts an agility course, a separate area for small dogs, and plenty of shade and water fountains."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.phoenix.gov/parks/trails/locations/papago-park"
          linkText="Papago Park"
          text="This popular Phoenix park is the perfect place to take a hike with your pup. There are miles of trails (some designated for the off-leash crowd!) that offer stunning views of the desert landscape and wildlife."
        />

        <LinkContent
          link="https://www.alltrails.com/trail/us/arizona/shaw-butte-trail--3"
          linkText="Shaw Butte Trail"
          text="If you're looking for a more strenuous trek, hit up the Shaw Butte Trail. It's located near North Mountain Park and features scenic views of Phoenix and Camelback Mountain in the background."
        />

        <LinkContent
          link="https://www.phoenix.gov/parks/trails/locations/rio-salado-habitat-restoration-area"
          linkText="Rio Salado Habitat Restoration Area"
          text="This urban park is the largest green space in Phoenix and offers plenty of paw-friendly trails for your pup to explore, as well as educational programs for all ages."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="http://santanbrewing.com/"
          linkText="SanTan Brewing Company"
          text="This popular craft brewery welcomes leashed pets in its outdoor seating area. Enjoy a cold beer and pup-friendly treats while you relax in the sun."
        />

        <LinkContent
          link="https://www.helluvabrewing.com/"
          linkText="Helluva Brewing Company"
          text="This small brewery boasts an outdoor patio with plenty of seating and a few pup-friendly games. They also offer an array of craft beers, wine, and kombucha on tap."
        />

        <LinkContent
          link="https://oakcreekvineyards.net/"
          linkText="Oak Creek Vineyard & Winery"
          text="This family-run vineyard in Sedona offers 24 acres of paw-friendly trails and outdoor seating areas with stunning views. Enjoy a glass of wine or a beer while your pup sniffs around the vineyards."
        />

        <Typography variant="h2">Check Out Phoenix&apos;s Pet-Friendly Restaurants and Cafe</Typography>
        <LinkContent 
          link="https://ohsobrewery.com/"
          linkText="O.H.S.O. Eatery + NanoBrewery"
          text="This popular restaurant specializes in craft beer and locally sourced menu items. They welcome pups with open arms, offering a variety of doggy-friendly treats and an outdoor patio complete with canine water bowls."
        />

        <LinkContent
          link="https://www.auntchiladas.com/"
          linkText="Aunt Chilada's"
          text="This Mexican restaurant in Phoenix offers up delicious food and a pet-friendly patio. Your dog will love the pup-approved snacks!"
        />

        <LinkContent
          link="https://www.windsoraz.com/"
          linkText="Windsor"
          text="This perfect spot for brunch offers outdoor seating and a few pup-friendly surprises. Enjoy bottomless mimosas while your pup chomps on some special goodies from the kitchen."
        />

        <Typography variant="h2">Phoenix&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="http://www.applewoodpetresort.com/"
          linkText="Applewood Pet Resort & Spa"
          text="Located just outside of downtown Phoenix, this full-service pet resort offers cage-free daycare and boarding with 24/7 supervision. They even offer a spa service for your pup if they're looking to indulge in some extra pampering while you’re away."
        />

        <LinkContent
          link="https://www.bellridgeah.com/"
          linkText="AZPetVet Bell Ridge"
          text="This pet resort offers all-inclusive doggy daycare and boarding with plenty of exercise and socialization opportunities. They have separate areas for small, medium, and large dogs, as well as vet services onsite."
        />

        <LinkContent
          link="https://boulderfalls.com/"
          linkText="Boulder Falls Pet Resort"
          text="This luxury pet resort is home to a host of activities and amenities for your pup, including a swimming pool, an agility course, and plenty of comfy beds. It's the perfect place for your four-legged friend while you're away!"
        />

        <Typography variant="h2">Phoenix&apos;s Best Pet Stores</Typography>
        <LinkContent  
          link="http://www.phoenixnewtimes.com/locations/kosmos-dog-house-2335325/"
          linkText="Kosmo's Doghouse"
          text="This pet boutique offers a wide selection of food, treats, toys, and accessories for your pup. They also have a great grooming service that will make sure your pup looks and feels their best."
        />

        <LinkContent
          link="https://www.noblebeastpets.com/"
          linkText="Noble Beast"
          text="This pet supply store specializes in natural and organic products, including food, treats, toys, and grooming supplies. Plus, they offer a variety of classes and activities to help keep your pup happy and healthy."
        />

      </Box>
    </>)
  } else if (cityName === 'Portland') {
    return (<>
      <HotelSection 
        text="You may already have some travel plans outlined for your trip to Portland -- a stop by Powell's Book Store, a brewery tour through the Pearl, a frantic escape from the rain. But what about your dog? Fortunately, Portland has something for everyone, including those traveling with their furry friends. You can take a walk or run together along the beautiful Willamette River Greenway, explore one of the many dog-friendly parks in the city, or go on a hike together alongside the stunning Columbia River Gorge."
        secondaryText="In this guide, we'll provide a list of the best hotels, restaurants, and activities that are perfect for animal lovers. So pack your bags and get ready to explore everything that Portland has to offer!"
        cityName="Portland"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Portland</Typography>

        <Typography variant="h5">Explore Portland&apos;s Off-Leash Dog Parks</Typography>
        <Typography variant="base">Portland is home to many off-leash dog parks, which provide a great opportunity for your pup to socialize and burn off some energy. There are parks located all around the city, so no matter where you&apos;re staying, there&apos;s sure to be one nearby. Here are a few of our favorite off-leash dog parks in Portland:</Typography>

        <LinkContent 
          link="https://explorethepearl.com/the-fields-park/"
          linkText="The Fields"
          text="The Fields is a large open field for downtown dogs. The north side of The Fields features a fenced dog park, half of which is reserved for smaller dogs and the other half for larger dogs."
        />

        <LinkContent 
          link="https://www.portlandoregon.gov/parks/finder/index.cfm?action=ViewPark&PropertyID=63"
          linkText="Brentwood Park"
          text="Located in SE Portland, Brentwood Park has plenty of open grassy areas and a small pond where your pup can take a dip."
        />
        <LinkContent 
          link="https://www.portland.gov/parks/chimney-park"
          linkText="Chimney Park"
          text="Tucked away in NE Portland, Chimney Park is a quiet and secluded park with plenty of space for your pup to explore."
        />
        <LinkContent 
          link="https://www.portland.gov/parks/gabriel-park"
          linkText="Gabriel Park"
          text="Gabriel Park is a sprawling park located in SW Portland with plenty of walking trails and grassy areas."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.alltrails.com/trail/us/oregon/wildwood-trail--4"
          linkText="Wildwood Trail"
          text="This 30-mile trail runs through Forest Park, connecting the western and eastern parts of the city. It's a great place to take your pup for a scenic hike or run."
        />

        <LinkContent
          link="https://www.alltrails.com/trail/us/oregon/powell-butte-loop-trail--2"
          linkText="Powell Butte Loop Hike"
          text="This easy 2-mile loop is the perfect way to get some fresh air and take in the stunning views of Mt. Rainier."
        />

        <LinkContent
          link="https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=103"
          linkText="Tryon Creek State Natural Area"
          text="Tyron Creek State Natural Area is a 693-acre park is home to plenty of hiking trails, a lake, and even an off-leash dog area."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.threshold.beer/"
          linkText="Threshold Brewing"
          text="Threshold Brewing in SE Portland is the perfect place to relax and grab a Polish-style beer with your pup. They even have outdoor seating so you can enjoy the sunshine together."
        />

        <LinkContent
          link="https://migrationbrewing.com/"
          linkText="Migration Brewing"
          text="Boasting four pubs across Portland, Migration Brewing has fast become one of the city's favorite spots for craft beer. Many of their locations also have dog-friendly patios, so be sure to bring your pup along!"
        />

        <LinkContent
          link="https://keelerestatevineyard.com/"
          linkText="Keeler Estate"
          text="A wine club for dogs? We're in. Keeler Estate is a pet-friendly winery that offers tours and tastings for both people and their canine companions. (OK, the wine's just for people. But pups get treats too!)"
        />

        <Typography variant="h2">Check Out Portland&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.leisurepublichouse.com/"
          linkText="Leisure Public House"
          text="Offering hot-pressed sandwiches and boozy popsicles in the summer, this relaxed pub in SE Portland is the perfect spot to grab a bite with your pup."
        />

        <LinkContent
          link="https://pdx.eater.com/venue/23244/tamale-boy"
          linkText="Tamale Boy"
          text="This Mexican restaurant in SE Portland has become a favorite among locals for its delicious burritos and tacos, and a favorite among pups for its dog-friendly back patio!"
        />

        <LinkContent
          link="http://www.pizzajerkpdx.com/"
          linkText="Pizza Jerk"
          text="Pizza Jerk is a popular spot for delicious wood-fired pizza and craft beer in NE Portland. They even have a dog-friendly patio that's perfect for sharing a slice with your furry friend."
        />

        <Typography variant="h2">Portland Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://www.barkzone.com/"
          linkText="BarkZone Dog Daycare & Boarding"
          text="If you're looking for a place to board your pup while you explore Portland, look no further than BarkZone. This daycare and boarding facility offers everything from daycare services to overnight stays in their spacious, climate-controlled suites."
        />

        <LinkContent
          link="https://busterandlilly.wixsite.com/mysite"
          linkText="Buster & Lilly's Doggie Daycare"
          text=" Located in SE Portland, Buster & Lilly's Doggie Daycare is the perfect place for your pup to stay while you're away. They offer playgroups and one-on-one time with their experienced staff, as well as overnight boarding services."
        />

        <Typography variant="h2">Portland&apos;s Best Pet Stores</Typography>
        <Typography variant="base">Just in case your pup&apos;s favorite toys get soaked in a Portland puddle, here are your best options for pet stores in town.</Typography>
      
        <LinkContent
          link="https://www.yelp.com/biz/meat-portland?utm_campaign=NULL,0168f9cf-77ab-4440-8e5a-ea1eced5d23e&utm_medium=3b4c1d20-9476-4bb7-8ba7-0900aedc17cc"
          linkText="Meat"
          text="For all your natural pet food needs, check out Meat. Located in SE Portland, this shop specializes in health-conscious pet foods and natural treats."
        />

        <LinkContent
          link="https://www.yelp.com/biz/the-filling-station-pet-supplies-portland-2?utm_campaign=NULL,0168f9cf-77ab-4440-8e5a-ea1eced5d23e&utm_medium=3b4c1d20-9476-4bb7-8ba7-0900aedc17cc"
          linkText="The Filling Station Pet Supplies"
          text="The Filling Station is a local favorite for pet supplies,  toys, and other pet needs. The store is located in the Alberta Arts District and offers everything from cat food to bird cages."
        />

        <LinkContent
          link="https://portlandpetstores.com/saltys-pet-supply/"
          linkText="Salty’s Pet Supply"
          text="Salty’s Pet Supply is another excellent place for pet owners to stop in Portland. Customers love Salty’s for the fantastic staff, the wide selection of products, and the reliable prices that make it easy to find great deals."
        />
      </Box>
    </>)
  } else if (cityName === 'Salt Lake City') {
    return (<>
      <Box width="100%" padding="2.5rem" display="flex" flexDirection="column" gap="1rem">
        <Divider />
        <Typography mt="1rem" variant="base">Looking for an adventurous destination to explore with your pet? We&apos;ll go ahead and put in a vote for Salt Lake City.</Typography>
        <Typography variant="base">SLC is a vibrant city and an ideal hub for outdoor activities in the surrounding breathtaking landscapes. The nearby Wasatch Mountains offer endless opportunities for hiking, biking, camping, skiing and snowboarding. Visitors can also enjoy rafting and fishing on rivers like the Jordan or Weber. Meanwhile, Downtown Salt Lake City boasts art galleries, museums, and historic sites that tell the stories of the region&apos;s past. Music lovers will appreciate the many concert venues scattered throughout the city.</Typography>
        <Typography mb="1rem" variant="base">For pet owners, Salt Lake City has a variety of pet-friendly attractions and activities. The city is home to several dog parks, including Liberty Park, Millcreek Canyon Dog Park, and Sugarhouse Park. Pet owners can also check out the Animal Planet Store in downtown Salt Lake City for interactive fun with their furry friends.</Typography>

        <Typography variant="h2">Pet-Friendly Hotels in Salt Lake City</Typography>
        <Typography variant="base" component="p">Salt Lake City has a number of pet-friendly hotels that offer a comfortable stay for your four-legged companion. Pet owners should be aware that some hotels may have weight limits or other restrictions when it comes to bringing pets, but Romingo&apos;s standardized pet policy ensures that every pet owner can bring two dogs weighing up to 75 lbs each without paying any fees.</Typography>
        {data?.propertiesByLocation.map(card => (
          <Box key={card.id} sx={{ py: '0.5em' }}>
            <ListingCard
              {...card}
              city={{ name: 'Salt Lake City' }}
              duration={2}
              highlighted={false}
              petFeePolicy={{ ...card.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, card.petFeePolicy)}} 
            />
          </Box>
        ))}
        {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
      </Box>

      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Salt Lake City</Typography>

        <Typography variant="h5">Explore Salt Lake City&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent
          link="https://slco.org/parks/tanner-park/"
          linkText="Tanner Park"
          text="Boasting tennis courts, an amphitheater, and even BMX tracks, Tanner Park has lots to offer -- but most importantly for your four-legged friend, its dog park is nearly three acres of off-leash fun."
        />

        <LinkContent
          link="https://www.thrivepetcare.com/veterinary-groups/utah-dog-park-centers"
          linkText="Utah Dog Park"
          text="This indoor, social-friendly park is a great spot for your pet to meet other dogs and enjoy plenty of playtime, regardless of season."
        />

        <LinkContent
          link="https://www.slc.gov/parks/parks-division/lindsey-gardens/"
          linkText="Lindsey Gardens Park"
          text="A small but popular dog park located in the heart of Salt Lake City, Lindsey Gardens offers plenty of amenities."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="http://rootsrated.com/salt-lake-city-ut/hiking/neffs-canyon-hiking"
          linkText="Neff's Canyon"
          text="This picturesque trail offers stunning views of the Wasatch Mountains and plenty of opportunities for your pup to explore."
        />

        <LinkContent
          link="http://rootsrated.com/salt-lake-city-ut/hiking/dog-lake"
          linkText="Dog Lake"
          text="This easy-to-moderately difficult trail circles Dog Lake, offering a great outing for pups and owners of all skill levels."
        />

        <LinkContent
          link="http://rootsrated.com/salt-lake-city-ut/cycling/emigration-canyon"
          linkText="Kilyon Canyon"
          text="Alongside a stream and through canyons, this scenic trail is a perfect journey for you and your pup to explore on a sunny day."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.gopetfriendly.com/activities/breweries-wineries/ut/salt-lake-city/mountain-west-cider"
          linkText="Mountain West Cider"
          text="This cidery allows dogs to join their owners on the patio and offers a delicious selection of ciders for every palette."
        />

        <LinkContent
          link="https://www.gopetfriendly.com/activities/breweries-wineries/ut/salt-lake-city/fisher-brewing-company"
          linkText="Fisher Brewing Company"
          text="Brews and food trucks are a perfect match, and Fisher Brewing Company knows it. This Salt Lake City brewery has a large, pet-friendly outdoor area where you can enjoy a locally-brewed beer or eats from visiting food trucks."
        />

        <LinkContent
          link="https://www.gopetfriendly.com/activities/breweries-wineries/ut/salt-lake-city/tf-brewing"
          linkText="TF Brewing"
          text="TF Brewing is a Salt Lake City-based brewery with a taproom that offers pet-friendly outdoor seating and visiting food trucks. TF boasts 13 rotating taps serving lagers, sours, and more. Bring your pooch and stay warm by the firepits!"
        />

        <Typography variant="h2">Check Out Salt Lake City&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.instagram.com/beerhive_pub/?hl=en"
          linkText="Beerhive Pub"
          text="This downtown pub is a fantastic spot to grab a beer and a bite with your pup. Take advantage of the outside seating or hang out inside while enjoying the wide selection of craft beers, specialty cocktails, and pub grub."
        />

        <LinkContent
          link="https://www.brugeswaffles.com/bruges-bistro-salt-lake-city/"
          linkText="Bruges Belgian Bistro"
          text="Enjoy a delicious Belgian-style meal with your pup on the outdoor patio. Bruges is a great spot for owners and pooches to relax and enjoy some of Salt Lake City's finest beers, mussels, and fries."
        />

        <LinkContent
          link="https://www.facebook.com/cafeon1st"
          linkText="Cafe on 1st"
          text="Just off Main Street in downtown Salt Lake City, Cafe on 1st offers delicious food and coffee with pet-friendly outdoor seating. Enjoy some of the cafe's unique menu items and people-watch while sipping your favorite beverage."
        />

        <Typography variant="h2">Salt Lake City Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://swimatbarleys.com/"
          linkText="Barley's Canine Recreation Center"
          text="Barley's offers a wide range of play and boarding options for your pup. From daycare to overnight stays, your pet will always be supervised with the utmost care in Barley's clean, comfortable facility."
        />

        <LinkContent
          link="https://desertdogdaycare.com/"
          linkText="Desert Dog Daycare"
          text="This daycare center offers a safe and fun environment for your pup while you're away. Desert Dog boasts large outdoor play areas and plenty of indoor space, ensuring that your pooch will be well-taken care of during its stay."
        />

        <LinkContent
          link="https://diggitydogresort.com/"
          linkText="Diggity Dog Resort"
          text="This resort offers overnight and daycare boarding options for your pup. Whether you're looking for a place to leave your pet for an extended period or just need a spot for it to stay while you run errands, Diggity Dog Resort will be sure that your furry friend is well taken care of!"
        />

        <Typography variant="h2">Salt Lake City&apos;s Best Pet Stores</Typography>

        <LinkContent
          link="https://www.petspawt.com/"
          linkText="Pet Spawt"
          text="With a wide selection of pet supplies and grooming services, Pet Spawt is an excellent spot to find all your pet needs. From food and toys to clothing and treats, you'll be sure to find something special for your pup here."
        />

        <LinkContent  
          link="https://dogsmeow.com/"
          linkText="The Dog’s Meow"
          text="Stop by this locally-owned pet store for an extensive selection of treats, toys, and other pet supplies. The Dog’s Meow also hosts fun events such as agility classes and obedience training."
        />

        <LinkContent
          link="https://houndandcat.com/"
          linkText="Hound and Cat"
          text="This unique pet store offers everything from food and toys to apparel and accessories for your pup. They also offer a self-service grooming station, so you can get your pup spruced up while you shop."
        />
      </Box>
    </>)
  } else if (cityName === 'Santa Fe') {
    return (<>
      <Box width="100%" padding="2.5rem" display="flex" flexDirection="column" gap="1rem">
        <Divider />
        <Typography mt="1rem" variant="base">Santa Fe, New Mexico is a vibrant and historical city full of culture, entertainment, and outdoor activities. From the Santa Fe Plaza and its many museums to the stunning Sangre de Cristo Mountains and ski slopes, there&apos;s something for everyone in this unique high desert community -- and yes, that applies to pet owners looking to travel to Santa Fe with their four-legged friends!</Typography>
        <Typography variant="base">The city is home to some of the best art galleries in all of America. From traditional Native American pottery to cutting-edge contemporary works, art lovers can enjoy a variety of artistic styles. Visitors can also explore the city&apos;s many historic sites and museums, including the Loretto Chapel, San Miguel Mission and Palace of the Governors.</Typography>
        <Typography variant="base">Outdoor enthusiasts have an abundance of activities to choose from in Santa Fe. Nature lovers can hike or bike in the Sangre de Cristo Mountains, which offer excellent views of the city and its surrounding areas. Skiers and snowboarders can enjoy skiing and snowboarding at nearby ski resorts like Ski Santa Fe.</Typography>
        <Typography mb="1rem" variant="base">Finally, pet owners will be happy to know that Santa Fe is a pet-friendly city. Visitors can bring their furry friends along on many of the city&apos;s trails, parks and even some hotels. With its variety of pet-friendly activities, it&apos;s easy for visitors to find something for everyone in the family -- including your pup!</Typography>
        <Typography variant="h2">Pet-Friendly Hotels in Santa Fe</Typography>
        {data?.propertiesByLocation.map(card => (
          <Box key={card.id} sx={{ py: '0.5em' }}>
            <ListingCard
              {...card}
              city={{ name: 'Santa Fe' }}
              duration={2}
              highlighted={false}
              petFeePolicy={{ ...card.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, card.petFeePolicy)}} 
            />
          </Box>
        ))}
        {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
      </Box>

      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Santa Fe</Typography>

        <Typography variant="h5">Explore Santa Fe&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent
          link="https://thedogparkproject.org/index.html"
          linkText="Frank S. Ortiz Dog Park"
          text="This sprawling park offers plenty of space to run, play, and explore. Dogs must be leashed when entering the park but can then be let off leash once inside."
        />

        <LinkContent
          link="http://sfhumanesociety.org/services-get-involved/dog-parks/"
          linkText="Santa Fe Animal Shelter Dog Park"
          text="This smaller, fenced-in park offers a safe and secure environment for dogs to run and play. Dogs must remain leashed when entering the park."
        />

        <LinkContent
          link="https://www.santafenm.gov/ft_marcy_recreation_complex"
          linkText="Fort Marcy Dog Park"
          text="Built especially for small dogs, Fort Marcy Dog Park is the perfect place for your little pup to get some exercise and meet new friends."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.santafe.org/new_mexico_state_capitol/"
          linkText="State Capitol Grounds"
          text="Take a leisurely stroll with your pup around the state Capitol grounds and enjoy beautiful scenery along the way."
        />

        <LinkContent
          link="https://railyardpark.org/about/"
          linkText="Railyard Park Conservancy"
          text="Perfect for both long and short walks, this historic park is a great place to take your pup for an outing."
        />

        <LinkContent
          link="http://www.cerrillosnewmexico.com/cerrillos-state-park"
          linkText="Cerrillos Hills State Park"
          text="Take a hike with your pup through the rolling hills of this state park and explore its many trails. Make sure to keep your dog on a leash during the entire hike."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="http://www.duelbrewing.com/"
          linkText="Duel Brewing"
          text="Stop by this pet-friendly brewery for a refreshing drink and enjoy some of their unique beers while your pup explores the outdoor patio."
        />

        <LinkContent
          link="https://rowleyfarmhouse.com/"
          linkText="Rowley Farmhouse Ales"
          text="Take your pup for a visit to this pet-friendly and independently-owned brewery, where you can enjoy some of their delicious ales and snacks."
        />

        <LinkContent
          link="http://www.estrelladelnortevineyard.com/"
          linkText="Estrella Del Norte Vineyard and Tasting Room"
          text="Relax on the outdoor patio at Estrella Del Norte Vineyard and enjoy some of their award-winning wines while your pup lounges alongside you."
        />

        <Typography variant="h2">Check Out Santa Fe&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.elfarolsantafe.com/"
          linkText="El Farol"
          text="Enjoy some delicious Spanish cuisine and a glass of wine with your pup at this pet-friendly restaurant."
        />

        <LinkContent
          link="https://cowgirlsantafe.com/"
          linkText="Cowgirl BBQ"
          text="Stop by this popular barbeque joint for some of their delicious Texas-style cuisine and let your pup join you on the outdoor patio."
        />

        <Typography variant="h2">Santa Fe&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="http://topdogsantafe.com/"
          linkText="Top Dog Pet Resort"
          text="If you need to board your pup for the day or for a longer stay, Top Dog Pet Resort offers top-notch care in a comfortable and safe environment."
        />

        <LinkContent
          link="https://zoomiesinc.com/"
          linkText="Zoomies"
          text="If you need a place to take your pup during the day while you explore Santa Fe, Zoomies offers doggie daycare services in a fun and loving atmosphere."
        />

        <Typography variant="h2">Santa Fe&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="https://www.tecatu.com/"
          linkText="Teca Tu-A Pawsworthy Pet Emporium"
          text="Stop by this pet emporium for everything you need to spoil your pup, including beds, toys and treats."
        />

        <LinkContent
          link="https://www.petco.com/shop/en/petcostore"
          linkText="PETCO"
          text="This chain popular pet store offers all the necessities you need to keep your pup happy and healthy."
        />

        <LinkContent
          link="https://martysmeals.com/"
          linkText="Marty’s Meals"
          text="This pet-friendly store offers an array of healthy food and treats for your pup, as well as a wide selection of supplies."
        />
      </Box>
    </>)
  } else if (cityName === 'Scottsdale') {
    return (<>
      <Box width="100%" padding="2.5rem" display="flex" flexDirection="column" gap="1rem">
        <Divider />
        <Typography mt="1rem" variant="base">Whether you&apos;re headed to Scottsdale for Spring Training, spring break, or just to enjoy some sunshine, there&apos;s something for everyone. From exceptional golf courses and luxury spas to art galleries and free live music events, Scottsdale has what it takes to make your trip one you won&apos;t soon forget. Don&apos;t forget to take a tour of the vibrant downtown area that is home to unique shops, restaurants, and lively bars. If you’re feeling particularly adventurous, take a hot air balloon ride to get an aerial view of the entire city!</Typography>
        <Typography variant="base">Pet-friendly hotel accommodations, dog parks, and local hiking trails make it easy to have a great time with your pooch. Plus, Scottsdale is home to some of Arizona’s most pet-friendly attractions, from the Southwest Wildlife Conservation Center to McDowell Sonoran Preserve, where you can explore miles of pet-friendly trails.</Typography>
        <Typography variant="base">Let&apos;s dive into our guide to pet-friendly travel in Scottsdale, Arizona!</Typography>

        <Typography variant="h2">Pet-Friendly Hotels in Scottsdale</Typography>
        {data?.propertiesByLocation.map(card => (
          <Box key={card.id} sx={{ py: '0.5em' }}>
            <ListingCard
              {...card}
              city={{ name: 'Scottsdale' }}
              duration={2}
              highlighted={false}
              petFeePolicy={{ ...card.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, card.petFeePolicy)}} 
            />
          </Box>
        ))}
        {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
      </Box>

      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Scottsdale</Typography>

        <Typography variant="h5">Explore Scottsdale&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent
          link="https://www.scottsdaleaz.gov/parks/dog-parks"
          linkText="Chaparral Park"
          text="Located on the north side of Scottsdale, Chaparral Park offers two off-leash dog areas. The first is a one-acre area for small dogs and puppies, while the second is a two-acre area for larger breeds."
        />

        <LinkContent
          link="https://www.scottsdaleaz.gov/parks/eldorado-park"
          linkText="Eldorado Park"
          text="Spend an afternoon at Eldorado Park in Scottsdale, Arizona, which spans over sixty acres with something for everyone in the family. Take your dog for a walk along the greenbelt walking path around the lake."
        />

        <LinkContent
          link="https://www.scottsdaleaz.gov/parks/dog-parks"
          linkText="Vista del Camino Dog Park"
          text="Humans and their canine friends can enjoy off-leash playtime at Vista del Camino Dog Park. This half-acre park offers water stations, benches, and shade trees. Leashed dogs are also welcome throughout the larger Vista del Camino Park. Parking for the dog park is available off Pierce Street."
        />

        <LinkContent
          link="https://www.scottsdaleaz.gov/parks/dog-parks"
          linkText="Horizon Dog Park"
          text="Horizon Dog Park is a small off-leash area located on the far west end of Horizon Park. Features include a large shade structure, human and canine water fountains, and a water feature to control the dust."
        />


        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="http://mcdowellsonoran.org/"
          linkText="McDowell Sonoran Preserve"
          text="Scottsdale’s McDowell Sonoran Preserve is a great spot for hiking with your pup. Spanning over 30,000 acres of desert land, the preserve is home to more than 200 miles of trails ranging from easy strolls to steep climbs."
        />

        <LinkContent
          link="https://www.mcdowellsonoran.org/trailhead-main/toms"
          linkText="Tom’s Thumb"
          text="Tom’s Thumb is a popular hiking spot in the McDowell Mountains with spectacular views. It's an ideal place to spend an afternoon with your pup, as it offers several moderate trails that wind up and around huge rock formations."
        />

        <LinkContent
          link="https://www.mcdowellsonoran.org/gateway"
          linkText="Gateway Trailhead"
          text="Take a hike at the Gateway Trailhead, located near the McDowell Sonoran Preserve Visitor Center. With more than 8 miles of trails and spectacular views of the valley below, this is a top option for an afternoon adventure with your pup."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://mcfatebrewing.com/"
          linkText="McFate Brewing Company"
          text="Enjoy a cold beer and some pup-friendly snacks at McFate Brewing Company. This pet-friendly brewery offers an outdoor patio that’s perfect for kicking back with your four-legged friend."
        />

        <LinkContent
          link="https://cheefbotanicals.com/cbd-best-sellers/"
          linkText="Scottsdale Beer Company"
          text="Let your pup join you as you sample craft beer at Scottsdale Beer Company. A pet-friendly patio and a range of rotating taps make this brewery worth checking out."
        />

        <LinkContent
          link="https://www.suvinowineryaz.com/"
          linkText="Su Vino Winery"
          text="Enjoy a glass of wine beneath the stars at Su Vino Winery. Not only is it pet-friendly, but it also features plenty of live music and space for your pup to roam around."
        />

        <Typography variant="h2">Check Out Scottsdale&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.facebook.com/MorningSqueezeScottsdale"
          linkText="Morning Squeeze"
          text="Grab a bite to eat at Morning Squeeze, an all-day breakfast spot that’s also pet-friendly. Enjoy classic diner fare like omelets, biscuits and gravy, and French toast in their outdoor patio with your pup."
        />

        <LinkContent
          link="https://aznypdpizza.com/nypd-pizza-locations-az/north-scottsdale-raintree-101"
          linkText="NYPD Pizza - North Scottsdale"
          text="This pet-friendly pizzeria is a great spot to grab dinner with your dog. Enjoy classic pizza and calzones, along with salads and sandwiches, in NYPD Pizza’s outdoor patio."
        />

        <LinkContent
          link="https://www.facebook.com/ohsodistillery"
          linkText="O.H.S.O Eatery & Distillery"
          text="This local eatery is the perfect spot to spend an afternoon with your four-legged friend. Enjoy craft beer, creative cocktails, and a range of American comfort food in O.H.S.O’s pet-friendly patio."
        />

        <Typography variant="h2">Scottsdale&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://www.pawcommons.com/scottsdale-az/"
          linkText="Paw Commons Pet Resort"
          text="Take a break from your pup and let them stay at Paw Commons Pet Resort. This popular daycare and boarding facility offers luxurious suites, play yards, spa services, and plenty of activities for your furry friend."
        />

        <LinkContent
          link="https://alwaysunleashed.com/"
          linkText="Always Unleashed Resort"
          text="Another great option for daycare and boarding is Always Unleashed Resort. This pet resort offers comfortable lodging, fun activities, and 24-hour supervision."
        />

        <LinkContent
          link="https://www.petitepupdaycare.com/"
          linkText="Petite Pup Daycare"
          text="Petite Pup Daycare is an excellent option for smaller breeds or puppies. They offer a variety of play areas, exercise classes, and activities designed to keep your pup safe and entertained."
        />

        <Typography variant="h2">Scottsdale&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="http://www.seespotonline.com/"
          linkText="See Spot Shop"
          text="See Spot Shop is a pet boutique offering an array of products for your pup. From stylish collars and leashes to healthy treats and toys, they have everything you need to keep your furry friend happy and healthy."
        />

        <LinkContent
          link="https://www.petco.com/shop/en/petcostore"
          linkText="PETCO"
          text="PETCO is a great spot to stock up on supplies for your pup. Shop their wide selection of pet food, toys, treats and more at this local store."
        />

        <LinkContent
          link="http://www.scottsdalelivestock.com/"
          linkText="Scottsdale Livestock"
          text="Visit Scottsdale Livestock for a wide selection of pet supplies and accessories. From grooming tools to training equipment, you’ll find everything you need for your pup here."
        />

        <LinkContent
          link="https://www.petsmart.com/"
          linkText="PetSmart"
          text="PetSmart offers all the essentials for your furry friend. Shop their selection of pet food, toys, treats and more at this popular chain."
        />

      </Box>
    </>)
  } else if (cityName === 'Seattle') {
    return (<>
      <HotelSection 
        text="If you're looking for a great place to take your pup on vacation, Seattle is an excellent choice! With so many activities and places to stay, it's the perfect destination for any dog-loving traveler. Whether you want to explore the city or just relax with your pup, Seattle has something for everyone. So pack up the leash and head out on an adventure today. Your pup will love every minute of it!"
        secondaryText=""
        cityName="Seattle"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Seattle</Typography>

        <Typography variant="h5">Explore Seattle&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent 
          link="https://www.seattle.gov/parks/allparks/blue-dog-pond"
          linkText="Blue Dog Pond"
          text="If you're up for a game of fetch, Blue Dog Pond is the place for you and your pup. The wide open field is fenced in, meaning your dog can run to their heart's content. Just be warned that during rainy seasons, the ground can get pretty muddy. But no need to worry – there are parkside water stations where you can wash off your pup's dirty paws before heading home."
        />

        <LinkContent
          link="https://www.seattle.gov/parks/allparks/denny-park"
          linkText="Denny Park"
          text="Denny Park’s off-leash area isn’t as large as Blue Dog Pond, but it offers plenty of room for a good game of fetch. Plus, the park has beautiful views of downtown Seattle, so you can enjoy the sights while your pup enjoys their playtime."
        />

        <LinkContent
          link="https://www.dogwoodplaypark.com/"
          linkText="Dogwood Play Park"
          text="This is a great spot for socializing and bonding with your pup. With plenty of space to play, agility equipment, a dog pool, and an on-site bar, Dogwood Play Park has everything you need for a fun day out with your pet."
        />

        <LinkContent
          link="https://www.seattle.gov/parks/find/parks/jose-rizal-park"
          linkText="Dr. Jose Rizal Park"
          text="This is the spot for a social media–worthy photoshoot of your pooch amid the Seattle skyline. Plus, if the gate-protected off-leash area doesn’t provide enough stimulation, the park’s walking paths with stunning views just might."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://www.wta.org/go-hiking/hikes/ira-spring-memorial#trailhead-map"
          linkText="Ira Spring Trail at Mason Lake"
          text="The 6.5-mile trail is named after Ira Spring, a lifelong conservationist and nature photographer. Fittingly, it's a photographer’s dream. The trail starts gradually, and you can cool off in Mason Creek before the serious climbing begins around 2 miles in. Enjoy the gorgeous views of Mason Lake and Bandera Mountain before heading back down. Or heck, bring gear and stay in one of the designated camping areas overnight!"
        />

        <LinkContent
          link="https://www.wta.org/go-hiking/hikes/navaho-pass#trailhead-map"
          linkText="Navaho Pass"
          text="Get ready for a beautiful day out with your pup at Navaho Pass. The trail is 5.5 miles round trip and offers views of the Cascade Mountains, glimpses of the Snoqualmie River, and plenty of opportunities to take pictures—it’s literally picture perfect!"
        />

        <LinkContent
          link="https://www.wta.org/go-hiking/hikes/anderson-and-watson-lakes#trailhead-map"
          linkText="Anderson and Watson Lakes"
          text="This trail may be short, but it packs a punch with mesmerizing views of Anderson and Watson Lakes. After the initial climb, hikers can take a leisurely stroll through an old growth forest before heading back to the car."
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://www.sidewalkdog.com/business/patterson-cellars/"
          linkText="Patterson Cellars"
          text="With tasting rooms in Woodinville, Leavenworth, and South Seattle, Patterson Cellars is most definitely a local favorite. Even better, all of the locations are dog-friendly! Pups can visit the patios and tasting rooms. Drink away your worries while your dog looks on judgingly and nibbles on provided treats and water."
        />

        <LinkContent
          link="https://www.sidewalkdog.com/business/elsom-cellars/"
          linkText="Elsom Cellars"
          text="Elsom Cellars is the perfect spot for a getaway with your pup. The bright and airy tasting room atmosphere makes for an easygoing afternoon, or you can grab a bottle to bring out to their dog-friendly patio. Plus, they have a food truck onsite so no one goes hungry!"
        />

        <LinkContent
          link="https://www.sidewalkdog.com/business/spoiled-dog-winery/"
          linkText="Spoiled Dog Winery"
          text="This is the ultimate pup-friendly spot. Spoiled Dog Winery allows your dogs to roam the outside area, plus they have a doggie pool! Humans can sip on their award-winning bottles of wine while their four-legged friends cool off in the pool. It’s also a great opportunity to meet other pet parents and make local (human) friends!"
        />

        <Typography variant="h2">Check Out Seattle&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://www.normseatery.com/"
          linkText="Norm’s Eatery & Ale House"
          text="This is a great spot for brunch, lunch, and dinner. Not only do they serve up delicious food and tasty drinks but their outside area is pet-friendly too! You can enjoy your meal with your pup by your side."
        />

        <LinkContent
          link="http://www.supersixseattle.com/"
          linkText="Super Six"
          text="Tucked away in a former auto body shop, Super Six is a vibrant spot that serves up some really yummy Asian-fusion cuisine. The restaurant has an outside area where your pup can sit and watch you enjoy your meal."
        />

        <LinkContent
          link="https://www.portagebaycafe.com/"
          linkText="Portage Bay Cafe"
          text="Fiending for something organic? Check out Portage Bay Cafe. Their mission is to provide food with 100% organic ingredients and they have an outside seating area that’s perfect for bringing your pup along."
        />

        <Typography variant="h2">Seattle&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="https://www.acanine.com/"
          linkText="A Canine Experience Inc."
          text="A Canine Experience Inc. is a great option for both daycare and boarding. They have large indoor play areas where your pup can run around and make friends, plus they offer enrichment classes to help keep them mentally stimulated when you’re away. Plus, their staff are all certified trainers so you know your pup will be in good hands!"
        />

        <LinkContent
          link="http://caninecomfortcorner.com/"
          linkText="Canine Comfort Corner"
          text="Canine Comfort Corner is a great option for dogs who prefer more personal attention. Their team of expert dog handlers will give your pup individualized care while you’re away. They offer daycare, boarding, and training services so your pup can have an enjoyable stay without feeling overwhelmed or stressed out."
        />

        <Typography variant="h2">Seattle&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="https://www.petpros.net/lake-city-pet-stores/"
          linkText="PetPros"
          text="PetPros is a great option for pet supplies. They carry everything from food to toys, and even have a grooming salon on site! Curbside pickup and delivery options are available for those who don’t want to venture out on an infamous Seattle rainy day."
        />

        <LinkContent
          link="https://www.emeraldcitypetsupplies.com/products/shop/"
          linkText="Emerald City Pet Supplies"
          text="Emerald City Pet Supplies is a great option for pet owners looking for natural, organic products. They have a wide selection of holistic food, treats, supplements and more! Plus, their staff are always happy to answer any questions you may have about your pup’s nutrition."
        />

        <LinkContent
          link="https://www.allthebestpetcare.com/"
          linkText="All The Best Pet Care"
          text="Family-owned local chain All The Best Pet Care is a great option for pet owners looking for high-quality food and supplies."
        />

      </Box>
    </>)
  } else if (cityName === 'Tucson') {
    return (<>
      <HotelSection 
        text="Planning a visit to Tucson, Arizona? You'll find plenty to keep you busy! From cultural attractions like The Tucson Museum of Art and the Arizona Sonora Desert Museum, to outdoor activities like hiking in Saguaro National Park, or exploring the windy streets of downtown Tucson, there's something for everyone. And if you're bringing your pet, don't forget to check out the popular dog-friendly parks and trails."
        secondaryText="Here's our guide to pet-friendly travel in Tucson."
        cityName="Tucson"
        includedHotels={
          [
            'all'
          ]
        }
      />
      <Box px="2.5rem" pb="2.5rem" display="flex" flexDirection="column" gap="1.5rem">
        <Typography mt="1rem" variant="h2">Pet-Friendly Activies in Tucson</Typography>

        <Typography variant="h5">Explore Tucson&apos;s Off-Leash Dog Parks</Typography>

        <LinkContent
          link="https://webcms.pima.gov/cms/one.aspx?portalId=169&pageId=1415"
          linkText="Smiling Dog Ranch Dog Park at George Mehl Family Foothills Park"
          text="With acres of open space to explore, Smiling Dog Ranch is the perfect spot for your pup to run and play."
        />

        <LinkContent
          link="https://webcms.pima.gov/cms/one.aspx?portalId=169&pageId=1427"
          linkText="McDonald District Park"
          text="Offering a fenced-in area for your pup to run and play, McDonald District Park is a popular spot for Tucson dog owners."
        />

        <LinkContent
          link="https://www.tucsonaz.gov/parks/dog-parks#PurpleHeart"
          linkText="Purple Heart Park - Ivan's Spot"
          text="Named after a late, beloved police dog, Ivan's Spot is open to off-leash play and offers plenty of room for your pup to roam. Choose between devoted areas for large and small dogs!"
        />

        <LinkContent
          link="https://webcms.pima.gov/cms/One.aspx?portalId=169&pageId=1367"
          linkText="Brandi Fenton Memorial Park"
          text="Offering an extensive, fenced-in area for off-leash play, Brandi Fenton Memorial Park is another popular spot for Tucson dog owners."
        />

        <Typography variant="h5">Take a Hike with Your Pup</Typography>
        <LinkContent
          link="https://webcms.pima.gov/cms/one.aspx?portalId=169&pageId=6688"
          linkText="Sweetwater Preserve Trailhead"
          text="Packed with breathtaking views, this trail is perfect for both you and your pup to explore—just make sure to keep your pup leashed at all times."
        />

        <LinkContent
          link="https://azstateparks.com/catalina/explore/facility-information"
          linkText="Catalina State Park"
          text="Offering stunning desert views, Catalina State Park is a great spot to take a hike with your pup. With more than 5,000 acres of foothills and canyons, you and your furry friend are sure to have an amazing time."
        />

        <LinkContent
          link="https://webcms.pima.gov/cms/one.aspx?portalId=169&pageId=6109"
          linkText="Agua Caliente Hill Trail"
          text="With plenty of room for your pup to roam and explore, Agua Caliente Hill Trail is a great spot to spend a morning. Just make sure to follow leash laws and bring water—it can get hot out there!"
        />

        <Typography variant="h5">Visit a Pet-Friendly Brewery or Winery</Typography>
        <LinkContent
          link="https://barriobrewing.com/"
          linkText="Barrio Brewing Co."
          text="Barrio Brewing Co. is a popular spot for drinkers and dogs alike—just make sure to keep your pup leashed at all times! Enjoy an ice-cold brew in their beer garden, and don't forget to order some delicious food from their food truck."
        />

        <LinkContent
          link="https://www.borderlandsbrewing.com/"
          linkText="Borderlands Brewing Co."
          text="Borderlands Brewing Co. is a great spot to kick back with a cold one, and your pup can join in on the fun too! They offer plenty of outdoor seating, so you and your pup can relax in style."
        />

        <LinkContent
          link="https://www.pueblovidabrewing.com/"
          linkText="Pueblo Vida Brewing Company"
          text="One of the newest additions to Tucson's craft beer scene, Pueblo Vida Brewing Company offers plenty of outdoor seating for you and your pup. Enjoy a cold pint in their spacious beer garden, and make sure to order some grub from one of their food trucks!"
        />

        <Typography variant="h2">Check Out Tucson&apos;s Pet-Friendly Restaurants and Cafes</Typography>
        <LinkContent
          link="https://barriobrewing.com/"
          linkText="Barrio Brewing Company"
          text="This popular brewery is a great spot for you and your pup to grab a bite. Choose from their selection of craft beers, and don't forget to order one of their delicious menu items."
        />

        <LinkContent
          link="http://www.foxrestaurantconcepts.com/zinburger.html"
          linkText="Zinburger"
          text="Located in the La Encantada Shopping Center, Zinburger is a great spot for you and your pup to grab a bite. Popular menu items include their signature burgers and salads."
        />

        <LinkContent
          link="https://firetruckbrewing.com/"
          linkText="Firetruck Brewing Company"
          text="Firetruck Brewing Company is a great spot for you and your pup to grab a bite. Enjoy their selection of craft beers, as well as delicious bar food like street tacos and flatbread pizza."
        />

        <Typography variant="h2">Tucson&apos;s Dog Daycare and Boarding</Typography>
        <LinkContent
          link="http://www.dawghouse.biz/"
          linkText="Dawg House"
          text="With plenty of room for your pup to run and play, Dawg House is a popular spot for Tucson dog owners. They offer both daycare and boarding services, so you can rest easy knowing that your pup is in good hands while you're away."
        />

        <LinkContent
          link="https://cobysdoghouse.com/"
          linkText="Cobys Dog House"
          text="Cobys Dog House is a great spot for you to board your pup while you're away. They offer a wide range of services, including daycare and overnight boarding, so your pup can stay safe and comfortable while you're away."
        />

        <LinkContent
          link="http://sabinocanyonpetresort.com/"
          linkText="Sabino Canyon Pet Resort"
          text="Offering a wide variety of services, including daycare, boarding and grooming, Sabino Canyon Pet Resort is the perfect spot for your pup to stay while you're away. They offer plenty of outdoor space for your pup to frolic!"
        />

        <Typography variant="h2">Tucson&apos;s Best Pet Stores</Typography>
        <LinkContent
          link="https://www.dogsndonutstucson.com/"
          linkText="Dogs-N-Donuts"
          text="This popular pet store offers a wide selection of pet supplies and treats, including natural and organic food for your pup. They also offer self-serve dog wash stations, so you can pamper your pup in style!"
        />

        <LinkContent
          link="https://www.petco.com/shop/en/petcostore"
          linkText="PETCO"
          text="PETCO is a great spot to pick up all of your pet supplies. They have a wide selection of food, toys, and other items for your pup. Plus, they offer plenty of helpful advice from their knowledgeable staff!"
        />

        <LinkContent
          link="https://oldtownhorseandpet.com/"
          linkText="Old Town Horse & Pets"
          text="Locally owned and operated, Old Town Horse & Pets offers a wide selection of pet supplies and accessories. They carry a wide variety of food, toys, and other items for your four-legged friend."
        />
      </Box>
    </>)
  } //Houston, Colorado Springs, Vail, San Antonio


  else {
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