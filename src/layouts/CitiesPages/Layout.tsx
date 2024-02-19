import { FC } from "react";
import Box from "@mui/material/Box";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { gql, useQuery, WatchQueryFetchPolicy } from "@apollo/client";
import { Helmet } from "react-helmet";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import IconTags from '../../components/IconTags';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'
import Loader from "../../components/UI/Loader";

import ListingCardSquare from "../../components/MobileListingsCardHome";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import LinkContent from '../../layouts/CitiesPages/LinkContent';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import { GetHotelsByLocation } from "../../constants/constants";

import moment from 'moment';

// NOTE: 
// If these are changed such that the difference in days between the two values is not '2',
// you must change diffDays below or else receive non-valid price data.
const checkIn = parseInt(moment().add('2', 'weeks').format('x'));
const checkOut = parseInt(moment().add('2', 'weeks').add('2', 'days').format('x'))

const calcLowestAveragePrice = (hotel) => {
  const diffDays = 2; // NOTE:

  const pricing = hotel?.Packages?.find(item => true)?.SimplePrice || hotel?.SuppliersLowestPackagePrices?.find(item => true)?.Value;
  const tax = (parseFloat(hotel?.travoTaxRate || hotel?.taxRate || 0) * pricing);
  const priceWithoutTax = pricing - tax;

  return priceWithoutTax / diffDays;
}

interface LayoutProps {
    paragraphs: Array<Array<string>>,
    singleLoadListingCards: any[],
    searchData: any,
    carouselOneData: any[],
    carouselTwoData: any[],
    city: string,
    stateFull: string,
    cityAndState: string,
}

const CarouselItem = ({item}) => {
    return (
        <Box
            sx={{
                textAlign: "left",
                m: "0.5rem",
                pb: "0.25rem",
                minHeight: "550px",
                boxShadow: 1,
                borderRadius: 4,
            }}
        >
            <img 
                style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}
                src={item.src}
                height="340px" 
            />
            <LinkContent 
                link={item.link}
                linkText={item.linkText}
                text={item.text}
            />
        </Box>
    )
}

const Layout: FC<LayoutProps> = ({
    paragraphs,
    singleLoadListingCards,
    searchData,
    carouselOneData,
    carouselTwoData,
    city,
    stateFull,
    cityAndState,
}) => {
  const mobile = useMediaQuery("(max-width:800px)");
    const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === cityAndState);

  const queryParams = {
    adults: 1,
    checkIn: checkIn,
    checkOut: checkOut,
    children: 0,
    latitude: searchData.lat,
    longitude: searchData.lng,
  }
  const getHotelsQuery = gql`${GetHotelsByLocation({...queryParams, maxWaitInSeconds: 3})}`;
  const options: { fetchPolicy: WatchQueryFetchPolicy } = {
    fetchPolicy: 'network-only', // TODO
  }
  const { data, loading } = useQuery(getHotelsQuery, options);

  return (
    <>
        <Helmet>
            <title>{`Pet Friendly Hotels ${cityAndState} | Romingo`}</title>
            <meta property="description" content={paragraphs[0][0]} />
            <meta name='keywords' content={cityContent.keywords} />
            <meta
                property='og:title'
                content={`Pet Friendly Hotels ${cityAndState} | Romingo`}
            />
            <meta property='og:description' content={paragraphs[0][0]} />
            <meta property='og:image' content={cityContent.heroImage} />
        </Helmet>

        <ScrollToTop />
        <Navbar />
        
        <Box 
            sx={{ 
                flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                maxWidth: "1800px",
                mx: "auto",
            }} 
        >
        <Box
            sx={{
                width: { xs: 'auto', sm: 'auto', md: '420px' },
                p: { xs: '1rem', sm: '1rem', md: '1.5rem' },
                pt: { xs: 0, sm: 0 },
                left: { xs: 0, sm: 0, md: '7%' },
                boxShadow: { xs: 0, sm: 0, md: 3 },
                position: { xs: 'relative', sm: 'relative', md: 'relative' },
                borderRadius: 4,
                backgroundColor: "white",
            }}
        >
            <Typography variant="h4" component="h1">
                Find pet-friendly hotels in {city}
            </Typography>
            <Typography variant="base">
                The hassle free way to travel with your pet
            </Typography>
            <Box sx={{  width: '100%', mt: '1rem' }}>
                <LocationPageFilterBar search={searchData} />
            </Box>
        </Box>

        <Box
            component="img"
            src={cityContent.heroImage}
            alt={city}
            sx={{
                objectFit: "cover",
                width: { xs: '95%', sm: '95%', md: "65%" },
                m: { xs: '0.5rem', sm: '0.5rem', md: '2rem' },
                borderRadius: '10px',
                height: { xs: "40vh", md: "70vh" },
                boxShadow: 0,
            }}
        />
        </Box>

        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography component="h1" variant="h2" color="text.primary">
                    Pet Friendly Hotels {city}
                </Typography>
            </Box>
            <Divider variant="middle" sx={{ my: 2 }}>
                <Typography variant="body1" color="text.secondary">
                    {stateFull.toUpperCase()}
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
                    {paragraphs[0] && paragraphs[0].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[0].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}
                </Grid>
                <Grid item xs={12} sx={{ mb: 1, mt: "2rem" }}>  
                    <IconTags />
                </Grid>
                
                <Box
                    sx={{
                        mt: "1rem",
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        maxWidth: "900px",
                    }}
                >
                    <Typography component="h2" variant="h2">The Top Pet Friendly Accommodations in {city}</Typography>

                    {paragraphs[1] && paragraphs[1].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[1].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}

                    {singleLoadListingCards.map(card => (
                        <SingleLoadListingCard
                            key={card.hotelName}
                            hotelName={card.hotelName}
                            paragraphs={card.paragraphs}
                        />
                    ))}

                    {paragraphs[2] && paragraphs[2].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[2].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}

                    
                    <Typography variant="h2">Explore More Hotels</Typography>
                    {loading ? 
                        (
                            <Loader size="200px"/>
                        ) : (
                            <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                            >
                                {data.getHotels.hotels.slice(15).map((hotel, i) => (
                                    <Box 
                                        key={i}
                                        sx={{
                                            textAlign: "left",
                                            mx: "auto",
                                            pb: "0.25rem",
                                            minHeight: "550px",
                                            maxWidth: '400px',
                                        }}
                                    >
                                        <ListingCardSquare
                                            {...hotel}
                                            name={hotel.hotelName}
                                            lowestTotalPriceAfterTax={calcLowestAveragePrice(hotel)}
                                            highlighted={false}
                                        />
                                    </Box>
                                ))}
                            </Carousel>
                        )
                    }

                    <Typography variant="h2">
                        The Top Pet-Friendly Activities in {city}
                    </Typography>

                    {paragraphs[3] && paragraphs[3].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[3].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}

                    <Carousel
                        infiniteLoop={true}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                        centerMode={mobile ? false: true}
                        centerSlidePercentage={mobile ? 100 : 70}
                    >
                        {carouselOneData.map((item, index) => (
                            <CarouselItem key={index} item={item} />
                        ))}
                    </Carousel>

                    {paragraphs[4] && paragraphs[4].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[4].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}

                    <Typography variant="h2">
                        The Top Pet-Friendly Restaurants in {city}
                    </Typography>

                    {paragraphs[5] && paragraphs[5].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[5].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}
                    
                    <Carousel
                        infiniteLoop={true}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                        centerMode={mobile ? false: true}
                        centerSlidePercentage={mobile ? 100 : 70}
                    >
                        {carouselTwoData.map((item, index) => (
                            <CarouselItem key={index} item={item} />
                        ))}
                    </Carousel>

                    {paragraphs[6] && paragraphs[6].map((p, i) => (
                        <Typography
                            key={i}
                            variant="base"
                            component="p"
                            sx={{ 
                                fontSize: '0.9rem',
                                mb: i !== paragraphs[6].length-1 && '1rem',
                            }}
                        >
                            {p}
                        </Typography>
                    ))}
                </Box>
            </Grid>
        </Container>

        <Footer />
    </>
  );
};

export default Layout;
