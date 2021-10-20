import Box from "@mui/material/Box";
import { FC } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { connect, useStore, useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ListingCard from "../../components/ListingCard";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

import ScrollToTop from "../../components/ScrollToTop";

interface Props {
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
  room: RoomInfo;
}

const CheckoutPage: FC<Props> = () => {
  const { finePrint, room } = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const hotel = useSelector((state: any) => {
    return state.hotelDetailReducer.detail;
  });

  return (
    <>
      <ScrollToTop />
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
              <ListingCard {...hotel} />
              <CheckoutInformation
                sx={{ mt: 2 }}
                finePrint={finePrint}
                price={detail?.room?.room?.totalPriceAfterTax}
                priceKey={detail?.room?.room?.priceKey}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <BookingDetailCard />
                </Grid>
                <Grid item xs={12}>
                  <PriceDetailCard />
                </Grid>
                <Grid item xs={12}>
                  <CancelPolicy policy={room?.room?.cancelationPolicy} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CheckoutPage;
