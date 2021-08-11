import Box from "@material-ui/core/Box";
import { FC } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ListingCard from "../../components/ListingCard";
import ListingCardMap from "../../components/ListingCardMap";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import DescriptionCard from "../../components/DescriptionCard";
import CheckoutInformation from "../../components/CheckoutInformation";

interface Props {
  footerMenus: {
    about: {
      text: string;
      link: string;
    }[];
    contact: {
      text: string;
      link: string;
    }[];
    blog: {
      text: string;
      link: string;
    }[];
    sitemap: {
      text: string;
      link: string;
    }[];
  };
  hotel: {
    image: string;
    name: string;
    location: string;
    score: number;
    price: number;
    currency?: string;
    amenities?: string[];
  };
  bookingDetails: {
    checkin: string;
    checkout: string;
    guests: {
      adults: number;
      dogs: number;
      children: number;
    },
    roomType: string;
  },
  priceDetails: {
    price: number;
    stateTax: number;
    cityTax: number;
    total: number;
  },
  checkinDescription: {
    title: string;
    description: string;
  },
  finePrint: {
    title: string;
    description: string;
  }
}

const CheckoutPage: FC<Props> = ({ footerMenus, hotel, bookingDetails, priceDetails, checkinDescription, finePrint }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px"
          }
        }}
      >
        <Container maxWidth="lg"
          sx={{
            py: 3
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Hidden smDown>
                <ListingCard {...hotel} />
              </Hidden>
              <Hidden smUp>
                <ListingCardMap {...hotel} />
              </Hidden>
            </Grid>
            <Grid item xs={12} sm={4}>
              <BookingDetailCard details={bookingDetails} />
            </Grid>
            <Grid item xs={12} sm={8} order={{xs: 4, sm: 3}}>
              <CancelPolicy />
              <DescriptionCard 
                {...checkinDescription} 
                sx={{
                  mt: 2
                }}
              />
              <CheckoutInformation 
                sx={{
                  mt: 2
                }}
                finePrint={finePrint}
              />
            </Grid>
            <Grid item xs={12} sm={4} order={{xs: 3, sm: 4}}>
              <PriceDetailCard details={priceDetails} />
              <Hidden smDown>
                <DescriptionCard 
                  {...finePrint} 
                  sx={{
                    mt: 2
                  }}
                />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer 
        footerMenus={footerMenus}
      />
    </>
  );
};

export default CheckoutPage;
