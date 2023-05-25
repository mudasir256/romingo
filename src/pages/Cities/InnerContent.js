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
    return <SanFrancisco />;
  } else if (cityName === 'San Diego') {
    return <SanDiego />;
  } else if (cityName === 'Palm Springs') {
    return <PalmSprings />;
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
    return <Sacramento />;
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
      'pet-friendly-hotels-dallas-hall-arts-dallas',
      'pet-friendly-hotels-dallas-canopy-by-hilton-dallas-uptown',
      'pet-friendly-hotels-dallas-hyatt-regency-dallas',
    ];

    console.log(data);
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
    const hotelAliases = [
      '',
    ];

    const hotelsToDisplay = getHotelsByAlias(data, hotelAliases);
    return <Oceanside hotels={hotelsToDisplay} />;
  } else if (cityName === 'Orange County') {
    return <OrangeCounty />;
  } else if (cityName === 'Phoenix') {
    return <Phoenix />;
  } else if (cityName === 'Portland') {
    return <Portland />;
  } else if (cityName === 'Salt Lake City') {
    return <SaltLakeCity />;
  } else if (cityName === 'Santa Fe') {
    return <SantaFe />;
  } else if (cityName === 'Scottsdale') {
    return <Scottsdale />;
  } else if (cityName === 'Seattle') {
    return <Seattle />;
  } else if (cityName === 'Tucson') {
    return <Tucson />;
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
    return <SanAntonio />;
  } else if (cityName === 'Santa Barbara') {
    return <SantaBarbara />;
  } else if (cityName === 'Vail') {
    return <Vail />;
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
