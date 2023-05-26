import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { utils } from '../../services/utils';

import { gql, useQuery } from '@apollo/client';
import { LocationProperties } from '../../constants/constants';
import ListingCard from '../../components/ListingCard';
import ListingCardSkeleton from '../../components/UI/ListingCardSkeleton';
import Dallas from '../../components/CitiesContent/Dallas';
import Austin from '../../components/CitiesContent/Austin';
import Denver from '../../components/CitiesContent/Denver';
import Houston from '../../components/CitiesContent/Houston';
import ColoradoSprings from '../../components/CitiesContent/ColoradoSprings';
import LosAngeles from '../../components/CitiesContent/LosAngeles';
import Oceanside from '../../components/CitiesContent/Oceanside';
import OrangeCounty from '../../components/CitiesContent/OrangeCounty';
import PalmSprings from '../../components/CitiesContent/PalmSprings';
import Phoenix from '../../components/CitiesContent/Phoenix';
import Portland from '../../components/CitiesContent/Portland';
import Sacramento from '../../components/CitiesContent/Sacramento';
import SanAntonio from '../../components/CitiesContent/SanAntonio';
import SanDiego from '../../components/CitiesContent/SanDiego';
import SanFrancisco from '../../components/CitiesContent/SanFrancisco';
import SantaBarbara from '../../components/CitiesContent/SantaBarbara';
import SantaFe from '../../components/CitiesContent/SantaFe';
import Scottsdale from '../../components/CitiesContent/Scottsdale';
import Seattle from '../../components/CitiesContent/Seattle';
import Tucson from '../../components/CitiesContent/Tucson';
import Vail from '../../components/CitiesContent/Vail';
import SaltLakeCity from '../../components/CitiesContent/SaltLakeCity';

export const getHotelsByAlias = (data, aliases) => {
  return aliases
    .map((alias) =>
      data?.propertiesByLocation.find((property) => property.alias === alias)
    )
    .filter(Boolean); // remove any undefined elements in case a hotel was not found
};

// const hotelsToDisplay =
//   data?.propertiesByLocation.filter((property) =>
//     [
//       'pet-friendly-hotels-austin-hotel-ella',
//       'pet-friendly-hotels-austin-south-congress-hotel',
//       'pet-friendly-hotels-austin-four-seasons-austin',
//     ].some(
//       (hotelAlias) => hotelAlias === property.alias || hotelAlias === 'all'
//     )
//   ) || [];

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

  const HotelSection = ({
    cityName,
    text,
    secondaryText,
    includedHotels = [],
  }) => {
    const hotelsToDisplay =
      data?.propertiesByLocation.filter((property) =>
        includedHotels.some(
          (hotelAlias) => hotelAlias === property.alias || hotelAlias === 'all'
        )
      ) || [];

    return (
      <Box
        width='100%'
        padding='2.5rem'
        display='flex'
        flexDirection='column'
        gap='1rem'
      >
        <Divider />
        <Typography mt='1rem' variant='base'>
          {text}
        </Typography>
        {secondaryText && (
          <Typography mb='1rem' variant='base'>
            {secondaryText}
          </Typography>
        )}

        <Typography variant='h2'>Pet-Friendly Hotels in {cityName}</Typography>
        {hotelsToDisplay.map((card) => (
          <Box key={card.id} sx={{ py: '0.5em' }}>
            <ListingCard
              {...card}
              city={{ name: city }}
              duration={2}
              highlighted={false}
              limitImages={true}
              lowestAveragePrice={parseInt(card.listingsPagePromoText)}
              petFeePolicy={{
                ...card.petFeePolicy,
                totalFees: utils.computePetFeePolicyTotalFees(
                  2,
                  1,
                  card.petFeePolicy
                ),
              }}
            />
          </Box>
        ))}
        {loading && (
          <Box>
            <ListingCardSkeleton key={0} />
            <ListingCardSkeleton key={0} />
          </Box>
        )}
      </Box>
    );
  };
  const LinkContent = ({ link, linkText, text }) => (
    <Box>
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

  if (cityName === 'San Francisco') {
    const hotelAliases = [
      'pet-friendly-hotels-san-francisco-hyatt-regency-san-francisco-embarcadero',
      'pet-friendly-hotels-san-francisco-hilton-san-francisco-union-square',
      'pet-friendly-hotels-san-francisco-stanford-court-san-francisco',
      'pet-friendly-hotels-san-francisco-hotel-kabuki',
      'pet-friendly-hotels-san-francisco-argonaut-hotel',
      'pet-friendly-hotels-san-diego-hyatt-centric-fishermans-wharf-san-francisco',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SanFrancisco hotels={hotelsToDisplay} />;

  } else if (cityName === 'San Diego') {
    const hotelAliases = [
      'pet-friendly-hotels-san-diego-paradise-point-san-diego',
      'pet-friendly-hotels-san-diego-hilton-san-diego-bayfront',
      'pet-friendly-hotels-san-diego-carte-hotel-san-diego-downtown-curio-collection-by-hilton',
      'pet-friendly-hotels-san-diego-salomar-san-diego',
      'pet-friendly-hotels-san-the-monsaraz-san-diego',
      'pet-friendly-hotels-san-diego-manchester-grand-hyatt-san-diego',
      'pet-friendly-hotels-san-diego-intercontinental-san-diego',
      'pet-friendly-hotels-san-diego-hyatt-regency-mission-bay',
      'pet-friendly-hotels-san-diego-hyatt-regency-la-jolla',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SanDiego hotels={hotelsToDisplay} />;

  } else if (cityName === 'Palm Springs') {
    const hotelAliases = [
      'pet-friendly-hotels-palm-springs-ingleside-inn-palm-springs',
      'pet-friendly-hotels-palm-springs-avalon-hotel-&-bungalows-palm-springs',
      'pet-friendly-hotels-palm-springs-the-saguaro-palm-springs',
      'pet-friendly-hotels-palm-springs-margaritaville-resort-palm-springs',
      'pet-friendly-hotels-palm-springs-kimpton-rowan-palm-springs',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <PalmSprings hotels={hotelsToDisplay} />;

  } else if (cityName === 'Los Angeles') {
    const hotelAliases = [
      'pet-friendly-hotels-los-angeles-kimpton-hotel-palomar-los-angeles-beverly-hills',
      'pet-friendly-hotels-los-angeles-mondrian-los-angeles',
      'pet-friendly-hotels-los-angeles-marina-del-ray-hotel',
      'pet-friendly-hotels-los-angeles-kimpton-la-peer-hotel',
      'pet-friendly-hotels-los-angeles-kimpton-hotel-wilshire',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <LosAngeles hotels={hotelsToDisplay} />;

  } else if (cityName === 'Sacramento') {
    const hotelAliases = [
      'pet-friendly-hotels-sacramento-westin-sacramento',
      'pet-friendly-hotels-sacramento-hyatt-place-sacramento-rancho-cordova',
      'pet-friendly-hotels-sacramento-hyatt-house-sacramento-midtown',
      'pet-friendly-hotels-sacramento-citizen-hotel-autograph-collection',
      // 'pet-friendly-hotels-sacramento-larkspur-landing-sacramento',
      'pet-friendly-hotels-sacramento-kimpton-sawyer-hotel',
      'pet-friendly-hotels-sacramento-hyatt-regency-sacramento',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    console.log(hotelsToDisplay);
    return <Sacramento hotels={hotelsToDisplay} />;

  } else if (cityName === 'Austin') {
    const hotelAliases = [
      'pet-friendly-hotels-austin-hotel-ella',
      'pet-friendly-hotels-austin-south-congress-hotel',
      'pet-friendly-hotels-austin-four-seasons-austin',
      'pet-friendly-hotels-austin-the-otis-hotel-autograph-collection',
      'pet-friendly-hotels-austin-hyatt-house-austin-downtown',
      'pet-friendly-hotels-austin-element-austin-downtown',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Austin hotels={hotelsToDisplay} />;

  } else if (cityName === 'Dallas') {
    const hotelAliases = [
      'pet-friendly-hotels-dallas-the-highland-dallas-collection',
      // 'pet-friendly-hotels-dallas-hall-arts-dallas',
      // 'pet-friendly-hotels-dallas-canopy-by-hilton-dallas-uptown',
      'pet-friendly-hotels-dallas-hyatt-regency-dallas',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    console.log(hotelsToDisplay);
    return <Dallas hotels={hotelsToDisplay} />;

  } else if (cityName === 'Denver') {
    const hotelAliases = [
      'pet-friendly-hotels-denver-hyatt-centric-downtown-denver',
      'pet-friendly-hotels-denver-thompson-denver',
      'pet-friendly-hotels-denver-hilton-garden-inn-denver-union-station',
      'pet-friendly-hotels-denver-magnolia-hotel-denver',
      'pet-friendly-hotels-denver-kimpton-hotel-la-born',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Denver hotels={hotelsToDisplay} />;

  } else if (cityName === 'Oceanside') {
    const hotelAliases = [''];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Oceanside hotels={hotelsToDisplay} />;

  } else if (cityName === 'Orange County') {
    const hotelAliases = [
      'pet-friendly-hotels-orange-county-homewood-suites-anaheim-convention-center-disneyland',
      'pet-friendly-hotels-orange-county-clarion-hotel-anaheim-resort',
      'pet-friendly-hotels-orange-county-double-tree-by-hilton-santa-ana-orange-county-airport',
      'pet-friendly-hotels-orange-county-sonesta-simple-suites-orange-county-airport',
      'pet-friendly-hotels-orange-county-sonesta-select-huntington-beach-fountain-valley',
      'pet-friendly-hotels-orange-county-sonesta-select-huntington-beach-fountain-valley',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <OrangeCounty hotels={hotelsToDisplay} />;

  } else if (cityName === 'Phoenix') {
    const hotelAliases = [
      'pet-friendly-hotels-phoenix-hyatt-place-phoenix-downtown',
      'pet-friendly-hotels-phoenix-sonesta-simply-suites-phoenix-north',
      'pet-friendly-hotels-phoenix-kimpton-hotel-palomar-phoenix',
      'pet-friendly-hotels-phoenix-sleep-inn-phoenix-north',
      'pet-friendly-hotels-phoenix-embassy-suites-phoenix-biltmore',
      'pet-friendly-hotels-phoenix-comfort-inn-and-suites-phoenix-north-hotel',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Phoenix hotels={hotelsToDisplay} />;

  } else if (cityName === 'Portland') {
    const hotelAliases = [
      'pet-friendly-hotels-portland-aloft-portland-at-cascade-station',
      'pet-friendly-hotels-portland-the-hoxton-portland',
      'pet-friendly-hotels-portland-the-porter-portland-curio-collection-by-hilton',
      'pet-friendly-hotels-portland-the-benson-portland-curio-collection-by-hilton',
      'pet-friendly-hotels-portland-moxy-portland-downtown',
      'pet-friendly-hotels-portland-canopy-by-hilton-portland-pearl-district',
      'pet-friendly-hotels-portland-autograph-collection-the-hi-lo',
      'pet-friendly-hotels-portland-hyatt-centric-downtown-portland',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Portland hotels={hotelsToDisplay} />;

  } else if (cityName === 'Salt Lake City') {
    const hotelAliases = [
      'pet-friendly-hotels-salt-lake-city-motel-6-salt-lake-city-ut-downtown',
      'pet-friendly-hotels-salt-lake-city-motel-6-salt-lake-city-ut-west-airport',
      'pet-friendly-hotels-salt-lake-city-hotel-monaco',
      'pet-friendly-hotels-salt-lake-city-hilton-salt-lake-city-center',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SaltLakeCity hotels={hotelsToDisplay} />;

  } else if (cityName === 'Santa Fe') {
    const hotelAliases = [
      'pet-friendly-hotels-santa-fe-motel-6-santa-fe',
      'pet-friendly-hotels-santa-fe-motel-6-santa-fe-plaza-downtown',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SantaFe hotels={hotelsToDisplay} />;

  } else if (cityName === 'Scottsdale') {
    const hotelAliases = [
      'pet-friendly-hotels-scottsdale-home2-suites-scottsdale-by-salt-river',
      'pet-friendly-hotels-scottsdale-scottsdale-plaza-resort',
      'pet-friendly-hotels-scottsdale-hotel-valley-ho',
      'pet-friendly-hotels-scottsdale-adero-scottsdale',
      'pet-friendly-hotels-scottsdale-andaz-scottsdale',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Scottsdale hotels={hotelsToDisplay} />;

  } else if (cityName === 'Seattle') {
    const hotelAliases = [
      'pet-friendly-hotels-seattle-ace-hotel-seattle',
      'pet-friendly-hotels-seattle-alexis-royal-sonesta',
      'pet-friendly-hotels-level-south-lake-union',
      'pet-friendly-hotels-seattle-hyatt-at-olive-8',
      'pet-friendly-hotels-seattle-hotel-andra',
      'pet-friendly-hotels-seattle-kimpton-palladian-hotel',
      'pet-friendly-hotels-seattle-kimpton-hotel-monaco-seattle',
      'pet-friendly-hotels-seattle-kimpton-hotel-vintage-seattle',
      'pet-friendly-hotels-seattle-hotel-1000-lxr-seattle',
      'pet-friendly-hotels-seattle-pan-pacific-seattle',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Seattle hotels={hotelsToDisplay} />;

  } else if (cityName === 'Tucson') {
    const hotelAliases = [
      'pet-friendly-hotels-tucson-sonesta-es-suites-tucson',
      'pet-friendly-hotels-tucson-aloft-tucson-university',
      'pet-friendly-hotels-tucson-westward-look-wyndham-grand-resort',
      'pet-friendly-hotels-tucson-motel-6-tucson-az-downtown',
      '',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Tucson hotels={hotelsToDisplay} />;

  } else if (cityName === 'Colorado Springs') {
    const hotelAliases = [
      'pet-friendly-hotels-colorado-springs-element-colorado-springs-downtown',
      'pet-friendly-hotels-colorado-springs-hyatt-place-colorado-springs-garden-of-the-gods',
      'pet-friendly-hotels-colorado-springs-wingate-by-wyndham-colorado-springs',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <ColoradoSprings hotels={hotelsToDisplay} />;

  } else if (cityName === 'Houston') {
    const hotelAliases = [
      'pet-friendly-hotels-houston-four-seasons-houston',
      'pet-friendly-hotels-houston-westin-houston-medical-center',
      'pet-friendly-hotels-houston-hilton-houston-westchase',
      'pet-friendly-hotels-houston-c-baldwin-curio-collection-by-hilton',
      'pet-friendly-hotels-houston-la-quinta-inn-&-suites-by-wyndham-houston-nw-brookhollow',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Houston hotels={hotelsToDisplay} />;

  } else if (cityName === 'San Antonio') {
    const hotelAliases = [
      'pet-friendly-hotels-san-antonio-rodeway-inn-san-antonio-hotel',
      'pet-friendly-hotels-san-antonio-la-quinta-inn-by-wyndham-brooks-city-base',
      'pet-friendly-hotels-san-antonio-aloft-san-antonio-northwest',
      'pet-friendly-hotels-san-antonio-sheraton-gunter-hotel',
      'pet-friendly-hotels-san-antonio-la-quinta-san-antonio-north-stone-oak',
      'pet-friendly-hotels-san-antonio-sonesta-es-suites-san-antonio-downtown-alamo-plaza',
      'pet-friendly-hotels-san-antonio-thompson-san-antonio',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SanAntonio hotels={hotelsToDisplay} />;

  } else if (cityName === 'Santa Barbara') {
    const hotelAliases = [
      'pet-friendly-hotels-santa-barbara-motel-6-goleta-ca-santa-barbara',
      'pet-friendly-hotels-santa-barbara-motel-6-santa-barbara-ca-state-street',
      'pet-friendly-hotels-santa-barbara-motel-6-santa-barbara-ca-beach',
      'pet-friendly-hotels-santa-barbara-kimpton-goodland-the-leta',
      'pet-friendly-hotels-santa-barbara-the-kimpton-canary',
    ];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <SantaBarbara hotels={hotelsToDisplay} />;

  } else if (cityName === 'Vail') {
    const hotelAliases = ['pet-friendly-hotels-denver-grand-hyatt-vail'];
    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Vail hotels={hotelsToDisplay} />;

  } else {
    return (
      <HotelSection
        text=''
        secondaryText=''
        cityName={cityName}
        includedHotels={['all']}
      />
    );
  }
}
