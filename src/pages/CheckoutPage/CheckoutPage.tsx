import Box from "@mui/material/Box";
import { FC, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import { connect, useStore, useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ListingCard from "../../components/ListingCard";
import ListingCardMap from "../../components/ListingCardMap";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import DescriptionCard from "../../components/DescriptionCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import RoomCard from "../../components/RoomCard";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

import { gql, useQuery } from "@apollo/client";
import { GetStripeClientSecret } from "../../constants/constants";

interface Props {
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
  room: RoomInfo;
}

const CheckoutPage: FC<Props> = () => {
  const {
    // hotel,
    checkinDescription,
    finePrint,
    room
  } = useSelector((state: any) => state.hotelCheckoutReducer.checkout);

  const detail = useSelector((state: any) => state.hotelCheckoutReducer.checkout);

  const hotel = useSelector((state: any) => {
    return state.hotelDetailReducer.detail
  });

  const { data, error, loading } = useQuery(
    gql`
      ${GetStripeClientSecret}
    `,
    {
      variables: {
        amount: detail?.room.room.totalPrice
      }
    }
  );

  const [clientSecret, setClientSecret] = useState("");

  if (!loading) {
    console.log(data);
  }

  useEffect(() => {
    if (data?.stripePaymentIntentClientSecret) {
      setClientSecret(data.stripePaymentIntentClientSecret);
    }
  }, [data])

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "info.main",
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
              <BookingDetailCard />
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
                clientSecret={clientSecret}
              />
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 3, md: 4 }}>
              <PriceDetailCard />
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
