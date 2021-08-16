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
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
}

const CheckoutPage: FC<Props> = ({
  hotel,
  bookingDetails,
  priceDetails,
  checkinDescription,
  finePrint,
}) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Hidden smDown>
                <ListingCard {...hotel} />
              </Hidden>
              <Hidden smUp>
                <ListingCardMap {...hotel} />
              </Hidden>
            </Grid>
            <Grid item xs={12} md={4}>
              <BookingDetailCard details={bookingDetails} />
            </Grid>
            <Grid item xs={12} md={8} order={{ xs: 4, md: 3 }}>
              <CancelPolicy />
              <DescriptionCard
                {...checkinDescription}
                sx={{
                  mt: 2,
                }}
              />
              <CheckoutInformation
                sx={{
                  mt: 2,
                }}
                finePrint={finePrint}
              />
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 3, md: 4 }}>
              <PriceDetailCard details={priceDetails} />
              <Hidden mdDown>
                <DescriptionCard
                  {...finePrint}
                  sx={{
                    mt: 2,
                  }}
                />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CheckoutPage;
