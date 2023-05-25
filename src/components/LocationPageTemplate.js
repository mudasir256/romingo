import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { utils } from '../services/utils';

import Map from './UI/Map/Map';
import Navbar from './Navbar';
import Footer from './Footer';

import ScrollToTop from './ScrollToTop';
import FilterBar from './FilterBar';

import { Helmet } from 'react-helmet';
import ListingCard from './ListingCard';
import { useStore, useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { LocationProperties } from '../constants/constants';
import ListingCardSkeleton from './UI/ListingCardSkeleton';

import { HOTEL_DESCRIPTIONS } from '../constants/locationPageDescriptions';
import { LargeFilterBar } from '../components/LargeFilterBar';
import './Header/Header.scss';

import PetsIcon from '@mui/icons-material/Pets';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import InnerContent from '../pages/Cities/InnerContent';

const LocationPageTemplate = ({ cityName, cityHeroImage }) => {
  let cityList = useSelector((state: any) => state.cityListReducer.cities);
  if (cityList.length === 0) {
    cityList = [
      {
        __typename: 'City',
        id: '7e08002b-7e64-4ada-a384-72ccb14bf430',
        name: 'Phoenix, AZ',
        zoom: 14,
        center: {
          __typename: 'GeoPoint',
          latitude: 33.45840281311827,
          longitude: -112.05255542479466,
        },
        state: {
          __typename: 'State',
          id: 'e8b69614-cd44-4653-8923-83e07264a7e8',
          code: 'AZ',
          name: 'Arizona',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'd901cc78-317d-4406-9bdb-5aa0a8842469',
        name: 'Scottsdale, AZ',
        zoom: 15,
        center: {
          __typename: 'GeoPoint',
          latitude: 33.492202151782365,
          longitude: -111.93067822095234,
        },
        state: {
          __typename: 'State',
          id: 'e8b69614-cd44-4653-8923-83e07264a7e8',
          code: 'AZ',
          name: 'Arizona',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '15960a9c-5383-4fc7-9181-8adbf5ca60e2',
        name: 'Tucson, AZ',
        zoom: 13,
        center: {
          __typename: 'GeoPoint',
          latitude: 32.1781411270059,
          longitude: -110.98059371741202,
        },
        state: {
          __typename: 'State',
          id: 'e8b69614-cd44-4653-8923-83e07264a7e8',
          code: 'AZ',
          name: 'Arizona',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'cbbce53d-f247-445e-9713-adc6266393b7',
        name: 'Fresno, CA',
        zoom: 4,
        center: {
          __typename: 'GeoPoint',
          latitude: 39.8295817848248,
          longitude: -98.57711931288252,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'ba12d364-9b1f-48c5-9ddc-7e68b40df076',
        name: 'Los Angeles, CA',
        zoom: 11,
        center: {
          __typename: 'GeoPoint',
          latitude: 34.07351043341975,
          longitude: -118.36388928440947,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '4b367e08-9bb8-48c8-a1a5-dec2877db3bb',
        name: 'Monterey, CA',
        zoom: 4,
        center: {
          __typename: 'GeoPoint',
          latitude: 39.8295817848248,
          longitude: -98.57711931288252,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'c17cdabe-4d0e-4d90-a73f-e7462e8062c6',
        name: 'Oceanside, CA',
        zoom: 7,
        center: {
          __typename: 'GeoPoint',
          latitude: 36.66396053855996,
          longitude: -121.79566061594069,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '2714faad-9ea8-4851-9506-274710cdd51b',
        name: 'Orange County, CA',
        zoom: 11,
        center: {
          __typename: 'GeoPoint',
          latitude: 33.814835417227876,
          longitude: -117.8732462306437,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'd4c10666-addf-47a6-9870-767518d9ebad',
        name: 'Palm Springs, CA',
        zoom: 13,
        center: {
          __typename: 'GeoPoint',
          latitude: 33.826291140277625,
          longitude: -116.52769996292206,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'e59740b1-2ac7-4fbb-9e37-8435519b1e36',
        name: 'Sacramento, CA',
        zoom: 14,
        center: {
          __typename: 'GeoPoint',
          latitude: 38.56966429077877,
          longitude: -121.47691471356607,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '6f2cf61f-c769-47d9-9e46-90c5664b60b1',
        name: 'San Diego, CA',
        zoom: 13,
        center: {
          __typename: 'GeoPoint',
          latitude: 32.743646786327545,
          longitude: -117.19080348404489,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '82145909-13b4-4aab-be20-e0db474021c1',
        name: 'San Francisco, CA',
        zoom: 14,
        center: {
          __typename: 'GeoPoint',
          latitude: 37.79057588458158,
          longitude: -122.41495830286681,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '70877f49-f361-4c63-b989-0e06d4ce6990',
        name: 'San Jose, CA',
        zoom: 13,
        center: {
          __typename: 'GeoPoint',
          latitude: 37.35580342818613,
          longitude: -121.93120783775824,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '58b23325-2016-44ef-886f-67e962dab17f',
        name: 'Santa Barbara, CA',
        zoom: 13,
        center: {
          __typename: 'GeoPoint',
          latitude: 34.422513844337736,
          longitude: -119.70634260640723,
        },
        state: {
          __typename: 'State',
          id: 'e65dd039-c9f0-4aed-8272-798d193a047d',
          code: 'CA',
          name: 'California',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '505f1a17-4675-42d3-b97f-2652629f1c8e',
        name: 'Colorado Springs, CO',
        zoom: 7,
        center: {
          __typename: 'GeoPoint',
          latitude: 38.671691907530956,
          longitude: -104.89353093847643,
        },
        state: {
          __typename: 'State',
          id: 'b01ca431-9ee0-4273-87c0-7ca006589935',
          code: 'CO',
          name: 'Colorado',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '3f8f2474-639b-4aab-a5d0-acdbce4039a2',
        name: 'Denver, CO',
        zoom: 9,
        center: {
          __typename: 'GeoPoint',
          latitude: 39.72419122269387,
          longitude: -105.08292974309663,
        },
        state: {
          __typename: 'State',
          id: 'b01ca431-9ee0-4273-87c0-7ca006589935',
          code: 'CO',
          name: 'Colorado',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '026e2dfb-46c8-42a6-8645-633f96679a32',
        name: 'Vail, CO',
        zoom: 4,
        center: {
          __typename: 'GeoPoint',
          latitude: 39.8295817848248,
          longitude: -98.57711931288252,
        },
        state: {
          __typename: 'State',
          id: 'b01ca431-9ee0-4273-87c0-7ca006589935',
          code: 'CO',
          name: 'Colorado',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'a4bc71b7-bbc2-4d83-923b-ee3a8796f504',
        name: 'Santa Fe, NM',
        zoom: 7,
        center: {
          __typename: 'GeoPoint',
          latitude: 34.17561862236365,
          longitude: -106.98051156679449,
        },
        state: {
          __typename: 'State',
          id: 'fe34ef17-3db2-4c92-a039-be0ae6c655a8',
          code: 'NM',
          name: 'New Mexico',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '6489f174-caa5-448b-99b3-158b4f853979',
        name: 'Portland, OR',
        zoom: 16,
        center: {
          __typename: 'GeoPoint',
          latitude: 45.51694267860578,
          longitude: -122.67756732789714,
        },
        state: {
          __typename: 'State',
          id: 'dbcbdf44-145d-4757-b9b8-d0b4dac1ac7b',
          code: 'OR',
          name: 'Oregon',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '1f8845f6-64d8-4d6e-a8b9-0d7aee57582f',
        name: 'Austin, TX',
        zoom: 14,
        center: {
          __typename: 'GeoPoint',
          latitude: 30.26579431949263,
          longitude: -97.73958345472823,
        },
        state: {
          __typename: 'State',
          id: '1053bd71-a412-4df5-9e2c-167753477274',
          code: 'TX',
          name: 'Texas',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '7c05e81c-8dfc-4907-a362-9e8b396064d3',
        name: 'Dallas, TX',
        zoom: 15,
        center: {
          __typename: 'GeoPoint',
          latitude: 32.78697148686097,
          longitude: -96.79596518229704,
        },
        state: {
          __typename: 'State',
          id: '1053bd71-a412-4df5-9e2c-167753477274',
          code: 'TX',
          name: 'Texas',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '451df9f5-56f4-45c6-a095-f1d741fcc659',
        name: 'Houston, TX',
        zoom: 8,
        center: {
          __typename: 'GeoPoint',
          latitude: 30.51923465518753,
          longitude: -96.02908168517064,
        },
        state: {
          __typename: 'State',
          id: '1053bd71-a412-4df5-9e2c-167753477274',
          code: 'TX',
          name: 'Texas',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '1e27fd75-6455-439b-9f15-a1e9de266baa',
        name: 'San Antonio, TX',
        zoom: 16,
        center: {
          __typename: 'GeoPoint',
          latitude: 29.425822158899287,
          longitude: -98.49034195130702,
        },
        state: {
          __typename: 'State',
          id: '1053bd71-a412-4df5-9e2c-167753477274',
          code: 'TX',
          name: 'Texas',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: '48732f57-bece-4053-a5bf-7f32acc36f54',
        name: 'Salt Lake City, UT',
        zoom: 14,
        center: {
          __typename: 'GeoPoint',
          latitude: 40.75316893922888,
          longitude: -111.88515696391335,
        },
        state: {
          __typename: 'State',
          id: '58faf4df-19ec-447c-ad3f-d81d9084d6f2',
          code: 'UT',
          name: 'Utah',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
      {
        __typename: 'City',
        id: 'f3c389db-0def-4065-b3b9-5efa0bf54e72',
        name: 'Seattle, WA',
        zoom: 15,
        center: {
          __typename: 'GeoPoint',
          latitude: 47.60653154712568,
          longitude: -122.33051193865947,
        },
        state: {
          __typename: 'State',
          id: '20669e01-70db-45af-917b-7a51739f4423',
          code: 'WA',
          name: 'Washington',
          country: {
            __typename: 'Country',
            id: 'US',
            name: 'United States',
          },
        },
      },
    ];
  }
  const foundCity = cityList.find((city) => city.name === cityName);
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === cityName);

  const today = new Date();

  const onlyCity = foundCity.name.split(',')[0];

  const IconTags = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '1em' }}>
      <Box sx={{ maxWidth: '240px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <PetsIcon />
          &nbsp;&nbsp;Pet-friendly
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          We have searched thousands of hotels to find you the pet-friendliest.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '200px' }}>
        <Typography variant='h6'>$0 pet fees</Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          You will always pay $0 in hotel pet fees with Romingo.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '240px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <DoneAllIcon />
          &nbsp;&nbsp;Romingo guarentee
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Every hotel on Romingo welcomes up to 2 pets of 50 or 75 lbs. each.
        </Typography>
      </Box>
    </Box>
  );
  return (
    <>
      <Helmet>
        <title>Pet friendly hotels {onlyCity} - Romingo</title>
        <description>{cityContent.paragraphOne}</description>
        <meta name='keywords' content={cityContent.keywords} />
        <meta
          property='og:title'
          content={`Pet friendly hotels ${onlyCity} - Romingo`}
        />
        <meta property='og:description' content={cityContent.paragraphOne} />
        <meta property='og:image' content={cityContent.heroImage} />
      </Helmet>
      <ScrollToTop />
      <Navbar />
      <Box
        component='img'
        src={cityContent.heroImage}
        alt={foundCity.name}
        sx={{
          objectFit: 'cover',
          width: '100%',
          height: { xs: '40vh', md: '70vh' },
          boxShadow: 0,
        }}
      />
      <Container maxWidth='md'>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography component='h1' variant='h2' color='text.primary'>
            {`Pet friendly hotels ${onlyCity}`}
          </Typography>
        </Box>
        <Divider variant='middle' light sx={{ my: 2 }}>
          <Typography variant='body1' color='text.secondary'>
            {foundCity.state.name.toUpperCase()}
          </Typography>
        </Divider>
        <Grid
          container
          spacing={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 6,
          }}
        >
          <Grid item xs={12}>
            <Typography
              component='h2'
              variant='body1'
              sx={{ textAlign: 'justify', lineHeight: 2 }}
            >
              {cityContent.paragraphOne}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant='middle' sx={{ mb: 1 }}>
              <Typography variant='body1' color='text.secondary'>
                BOOK YOUR GETAWAY!
              </Typography>
            </Divider>
            <Hidden mdDown>
              <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
                <LargeFilterBar city={foundCity.id} />
              </Box>
              <IconTags />
            </Hidden>
            <Hidden mdUp>
              <FilterBar city={foundCity.id} />
            </Hidden>{' '}
            <Divider light variant='middle' sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant='base' sx={{ lineHeight: 2 }}>
              {cityContent.paragraphTwo}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              component='img'
              src={cityContent.secondaryImage}
              alt={foundCity.name}
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '250px',
                boxShadow: 4,
                borderRadius: 3,
              }}
              loading='lazy'
            />
          </Grid>

          <InnerContent
            cityId={foundCity.id}
            cityName={onlyCity}
            city={foundCity.name}
          />

          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant='middle' sx={{ mb: 1 }}>
              <Typography variant='body1' color='text.secondary'>
                $0 PET FEES ON ROMINGO
              </Typography>
            </Divider>
            <Hidden mdDown>
              <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
                <LargeFilterBar city={foundCity.id} />
              </Box>
              <IconTags />
            </Hidden>
            <Hidden mdUp>
              <FilterBar city={foundCity.id} />
            </Hidden>{' '}
            <Divider light variant='middle' sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default LocationPageTemplate;
