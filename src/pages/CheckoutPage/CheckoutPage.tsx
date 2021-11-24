import { FC, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ListingCard from "../../components/ListingCard";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

import ScrollToTop from "../../components/ScrollToTop";

declare global {
  interface Window {
    Intercom: any;
  }
}

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

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
    });
    window.Intercom("update");
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        sx={{
          backgroundColor: "lightBackground.main",
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
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              <ListingCard {...hotel} showPrice={false} noLink small />
              <CheckoutInformation
                sx={{ mt: 2 }}
                finePrint={finePrint}
                price={detail?.room?.room?.totalPriceAfterTax}
                priceKey={detail?.room?.room?.priceKey}
              />
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} order={{ xs: 1, md: 1 }}>
                  <BookingDetailCard />
                </Grid>
                <Grid item xs={12} order={{ xs: 2, md: 2 }}>
                  <PriceDetailCard />
                </Grid>
                <Grid item xs={12} order={{ xs: 3, md: 3 }}>
                  <CancelPolicy policy={room?.room?.cancelationPolicy} />
                </Grid>
                <Hidden mdDown>
                  <Grid item xs={12} order={{ xs: 4, md: 4 }}>
                    <Box>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          color: "text.primary",
                          borderRadius: 3,
                          border: "none",
                          pt: 2,
                          pb: 2.5,
                          px: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "secondary.main",
                            textAlign: "center",
                          }}
                        >
                          Useful Links
                        </Typography>
                        <Box
                          sx={{
                            mt: 0.5,
                            px: 0.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "bottom",
                              justifyContent: "start",
                              mt: 1.5,
                            }}
                          >
                            <Link
                              href="/faq"
                              target="_blank"
                              rel="noopener noreffer"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 2,
                                }}
                              >
                                Frequently Asked Questions
                              </Typography>
                            </Link>
                            <Link
                              href="/contact"
                              target="_blank"
                              rel="noopener noreffer"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 2,
                                }}
                              >
                                Contact Support
                              </Typography>
                            </Link>
                            <Link
                              href="/terms-of-use"
                              target="_blank"
                              rel="noopener noreffer"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 2,
                                }}
                              >
                                Booking Terms of Use
                              </Typography>
                            </Link>
                            <Link
                              href="/reservation/manage"
                              target="_blank"
                              rel="noopener noreffer"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 2,
                                }}
                              >
                                Manage Booking
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Hidden>
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
