import { FC, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import ImageSlider from "../../components/ImageSlider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RomingoScore from "../../components/RomingoScore/RomingoScore";
import Check from "@mui/icons-material/Check";
import { useMediaQuery, Chip } from "@mui/material";
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

  const mobile = useMediaQuery('(max-width:800px)')

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
      <Box sx={{ backgroundColor: "#feffff", pt: { sm: "64px", xs: "56px", }, }} >
        <Container maxWidth="lg" sx={{ py: 3, }}>
          <Grid container spacing={2}>
            {!mobile && <Grid item xs={12} md={8} order={{ xs: 2, sm: 1 }}>

              <CheckoutInformation
                sx={{ mt: 2, mb: '1rem', }}
                finePrint={finePrint}
                price={detail?.room?.room?.totalPriceAfterTax}
                priceKey={detail?.room?.room?.priceKey}
              />


            </Grid>}
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Grid container spacing={2}>
                {mobile && <Grid item xs={12}>
                  <CheckoutPageListingCard {...hotel} showPrice={false} noLink small />
                </Grid>}
                <Grid item xs={12} order={{ xs: 1, md: 1 }}>
                  <BookingDetailCard />
                </Grid>
                <Grid item xs={12} order={{ xs: 2, md: 2 }}>
                  <PriceDetailCard />
                </Grid>
                {mobile && <Grid item xs={12} order={2}>
                <Typography variant="h6"
                  sx={{
                    color: "#222",
                    fontFamily: 'Montserrat',
                    textAlign: "left",
                    mb: 1,
                  }}
                >
                  Finish Your Reservation
                </Typography>
                <CheckoutInformation
                  sx={{ mt: 2, mb: '1rem' }}
                  finePrint={finePrint}
                  price={detail?.room?.room?.totalPriceAfterTax}
                  priceKey={detail?.room?.room?.priceKey}
                />
                </Grid>}
                <Grid item xs={12} order={{ xs: 3, md: 3 }}>
                  <CancelPolicy policy={room?.room?.cancelationPolicy} />
                </Grid>
                {/* <Hidden mdDown>
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
                            color: "#222",
                            textAlign: "left",
                            fontFamily: "Montserrat"
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
                </Hidden> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};



export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  neighborhood: string;
  showPrice?: boolean;
  noLink?: boolean;
}

const CheckoutPageListingCard: FC<ListingCardProps>  = ({
  id,
  imageURLs,
  name,
  addressLine1,
  romingoScore,
  city,
  neighborhood,
  cancellation = false,
  lowestAveragePrice,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  noLink = false,
  ...props
}) => {


  return <Box
    sx={{
      color: "text.primary",
      boxShadow: 0,
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      maxWidth: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: highlighted ? "lightBackground.main" : "white",
      borderBottom: '1px solid #ddd', pb: '2rem'
    }}
    {...props}
  >

    <Link
      href="#"
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      underline="none"
      sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 }, maxWidth: "100%" }}
    >
      <Box
        sx={{
          pt: 1,
          px: { xs: 0, sm: 1.8 },
          pb: { xs: 0, sm: '0rem' },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#222",
            fontFamily: "Montserrat",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: "140%",
            fontWeight: 800,
          }}
        >
          {name}
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "95%", sm: "100%" },
              mt: '.5rem',
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontFamily: "Roboto",
              textOverflow: "ellipsis",
              color: "#999",
            }}
          >
            {addressLine1}, {city?.name}
          </Typography>
          {/* <Chip sx={{ mt: '.5rem'}} icon={<LocationCityIcon />} label={neighborhood} /> */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", }}>
            <Box sx={{ mt: '0rem', mb: '0px' }}>
              <RomingoScore score={romingoScore} />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                textAlign: "right",
                justifyContent: "end",
                flexDirection: "column",
              }}
            >
              {showPrice && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      mr: 0.45,
                      letterSpacing: 1,
                      color: "text.secondary",
                      fontSize: "190%",
                    }}
                  >
                    {currency}
                    {Math.round(lowestAveragePrice)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    / night
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  </Box>
}

export default CheckoutPage;
