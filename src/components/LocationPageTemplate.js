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
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import InnerContent from '../pages/Cities/InnerContent';

//TODO: fix location search bars to search proper locations
const LocationPageTemplate = ({ cityName, state, cityHeroImage }) => {
  
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === cityName);

  const today = new Date();


  const IconTags = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '1.5rem', gap: '1.5rem'}}>
      <Box sx={{ maxWidth: '280px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <PetsIcon />
          &nbsp;&nbsp;Pet-friendly
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Our team has hand-selected the best pet-friendlyhotels and vacation rentals in the US for you to book with Romingo.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '280px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'><PaidIcon />&nbsp;&nbsp;Lowest rates</Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Romingo builds relationships with each of our partners to offer you the lowest rates and $0 booking fees.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '280px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <CheckCircleIcon />
          &nbsp;&nbsp;Accurate & transparent
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Our pet policies are accurate, transparent, and crystal clear. Book with Romingo for a hassle-free and enjoyable pet-friendly trip.
        </Typography>
      </Box>
    </Box>
  );
  return <>
    <Helmet>
      <title>Pet Friendly Hotels {cityName || ''} | Romingo</title>
      <description>{cityContent.paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${cityName} | Romingo`}
      />
      <meta property='og:description' content={cityContent.paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>
    <ScrollToTop />
    <Navbar />
    <Box
      component='img'
      src={cityContent.heroImage}
      alt={cityName}
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
          {`Pet friendly hotels ${cityName}`}
        </Typography>
      </Box>
      <Divider variant='middle' light sx={{ my: 2 }}>
        <Typography variant='body1' color='text.secondary'>
          {state}
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
        <Grid item xs={12} md={7}>
          <Typography variant='base' sx={{ lineHeight: 2 }}>
            {cityContent.paragraphTwo}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            component='img'
            src={cityContent.secondaryImage}
            alt={cityName}
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
          cityName={cityName}
          city={cityName}
          state={state}
        />

        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              $0 PET FEES ON ROMINGO
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

export default LocationPageTemplate;
